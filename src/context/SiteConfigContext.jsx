import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_SITE_CONTENT } from '../data/siteContent';
import { supabase } from '../lib/supabase';

const SiteConfigContext = createContext();

export function SiteConfigProvider({ children }) {
  const [editMode, setEditMode] = useState(false); // Live In-Line Visual Edit Mode

  // Master Site Config
  const [siteConfig, setSiteConfig] = useState(() => {
    const saved = localStorage.getItem('altin_koc_master_config_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_SITE_CONTENT;
  });

  // Sync to localStorage and Supabase DB table 'site_config'
  useEffect(() => {
    localStorage.setItem('altin_koc_master_config_v2', JSON.stringify(siteConfig));

    // Broadcast to other open browser tabs
    window.dispatchEvent(new Event('site_config_updated'));

    // Try syncing to Supabase DB if connected
    if (supabase) {
      supabase.from('site_config').upsert([
        { id: 'master', content: siteConfig, updated_at: new Date().toISOString() }
      ]).then(({ error }) => {
        if (error) console.warn('Supabase site_config sync:', error.message);
      });
    }
  }, [siteConfig]);

  // Load from Supabase on initial mount if available
  useEffect(() => {
    if (supabase) {
      supabase.from('site_config').select('content').eq('id', 'master').single().then(({ data }) => {
        if (data?.content) {
          setSiteConfig(data.content);
        }
      }).catch(() => {});
    }
  }, []);

  // Update specific nested path in siteConfig
  const updateConfigValue = (path, value) => {
    setSiteConfig((prev) => {
      const keys = path.split('.');
      const newConfig = JSON.parse(JSON.stringify(prev));
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  const resetToDefault = () => {
    setSiteConfig(INITIAL_SITE_CONTENT);
    localStorage.removeItem('altin_koc_master_config_v2');
  };

  return (
    <SiteConfigContext.Provider
      value={{
        siteConfig,
        setSiteConfig,
        editMode,
        setEditMode,
        updateConfigValue,
        resetToDefault,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
