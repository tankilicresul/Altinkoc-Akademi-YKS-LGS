import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_SITE_CONTENT } from '../data/siteContent';

const SiteConfigContext = createContext();

export function SiteConfigProvider({ children }) {
  // Load full site configuration from localStorage or initial fallback
  const [siteConfig, setSiteConfig] = useState(() => {
    const saved = localStorage.getItem('altin_koc_master_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_SITE_CONTENT;
  });

  useEffect(() => {
    localStorage.setItem('altin_koc_master_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  // Master function to update any top-level key (info, ranks, mentors, faqs)
  const updateSiteConfig = (key, value) => {
    setSiteConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Helper to update specific sub-fields in info/general text
  const updateInfoField = (field, value) => {
    setSiteConfig((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        [field]: value,
      },
    }));
  };

  // Helper to update specific stats
  const updateStatsField = (field, value) => {
    setSiteConfig((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        stats: {
          ...prev.info.stats,
          [field]: value,
        },
      },
    }));
  };

  // Helper to update founders
  const updateFounders = (newFounders) => {
    setSiteConfig((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        founders: newFounders,
      },
    }));
  };

  const resetToDefault = () => {
    setSiteConfig(INITIAL_SITE_CONTENT);
    localStorage.removeItem('altin_koc_master_config');
  };

  return (
    <SiteConfigContext.Provider
      value={{
        siteConfig,
        updateSiteConfig,
        updateInfoField,
        updateStatsField,
        updateFounders,
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
