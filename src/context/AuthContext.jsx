import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const ADMIN_EMAILS = [
  'resultankilic.business@gmail.com',
  'miracuresin3@gmail.com',
];

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initial state checked from localStorage for session persistence
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('altin_koc_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return null; // default null (anonymous visitor)
  });

  // Registered users list in system (stored locally + synced with Supabase)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem('altin_koc_users_list_v2');
    if (savedUsers) {
      try { return JSON.parse(savedUsers); } catch (e) {}
    }
    return [
      {
        id: 'admin-resul',
        name: 'Resul Tankılıç (Kurucu & Super Admin)',
        email: 'resultankilic.business@gmail.com',
        role: 'admin',
        phone: '0546 895 10 95',
        status: 'Approved',
        createdAt: '2026-08-01',
      },
      {
        id: 'admin-mirac',
        name: 'Miraç Üresin (Kurucu & Super Admin)',
        email: 'miracuresin3@gmail.com',
        role: 'admin',
        phone: '0543 108 52 56',
        status: 'Approved',
        createdAt: '2026-08-01',
      },
    ];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('altin_koc_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('altin_koc_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('altin_koc_users_list_v2', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const checkIsAdmin = (email) => {
    if (!email) return false;
    return ADMIN_EMAILS.some(a => a.toLowerCase() === email.trim().toLowerCase());
  };

  // Login function
  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const isAdminUser = checkIsAdmin(cleanEmail);

    // Check Supabase if configured
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password,
        });
        if (!error && data?.user) {
          const userRole = isAdminUser ? 'admin' : 'student';
          const userObj = {
            id: data.user.id,
            email: cleanEmail,
            name: data.user.user_metadata?.name || (cleanEmail.includes('mirac') ? 'Miraç Üresin (Kurucu)' : cleanEmail.includes('resul') ? 'Resul Tankılıç (Kurucu)' : cleanEmail.split('@')[0]),
            role: userRole,
          };
          setCurrentUser(userObj);
          return { success: true, user: userObj };
        }
      } catch (err) {
        console.warn('Supabase auth fallback to local:', err);
      }
    }

    // Local Auth Handling
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (isAdminUser) {
      const adminName = cleanEmail.includes('mirac')
        ? 'Miraç Üresin (Kurucu & Super Admin)'
        : 'Resul Tankılıç (Kurucu & Super Admin)';

      const adminObj = {
        id: 'admin-' + (cleanEmail.includes('mirac') ? 'mirac' : 'resul'),
        name: adminName,
        email: cleanEmail,
        role: 'admin',
        status: 'Approved',
      };
      setCurrentUser(adminObj);
      return { success: true, user: adminObj };
    }

    if (existing) {
      setCurrentUser(existing);
      return { success: true, user: existing };
    }

    // If new email without prior registration, create basic student account
    const newUser = {
      id: 'user-' + Date.now(),
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      role: 'student',
      status: 'Approved',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  // Register function
  const register = async ({ name, email, phone, rolePreference }) => {
    const cleanEmail = email.trim().toLowerCase();
    const isAdminUser = checkIsAdmin(cleanEmail);

    const newUser = {
      id: 'user-' + Date.now(),
      name: name || cleanEmail.split('@')[0],
      email: cleanEmail,
      phone: phone || '',
      role: isAdminUser ? 'admin' : (rolePreference || 'student'),
      status: isAdminUser ? 'Approved' : 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setRegisteredUsers((prev) => [...prev.filter((u) => u.email.toLowerCase() !== cleanEmail), newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    if (supabase) {
      supabase.auth.signOut().catch(() => {});
    }
  };

  // Admin updateUserRole function
  const updateUserRole = (userId, newRole, newStatus = 'Approved') => {
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole, status: newStatus } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, role: newRole, status: newStatus }));
    }
  };

  const isAdmin = checkIsAdmin(currentUser?.email) || currentUser?.role === 'admin';
  const isApprovedStudentOrMentor = Boolean(currentUser && (currentUser.role === 'student' || currentUser.role === 'mentor' || currentUser.role === 'admin'));

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        registeredUsers,
        isAdmin,
        isApprovedStudentOrMentor,
        login,
        register,
        logout,
        updateUserRole,
        ADMIN_EMAILS,
        checkIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
