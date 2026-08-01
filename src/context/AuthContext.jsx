import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const ADMIN_EMAIL = 'resultankilic.business@gmail.com';

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

  // Registered users list in system (stored locally + synced with Supabase if configured)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem('altin_koc_users_list');
    if (savedUsers) {
      try { return JSON.parse(savedUsers); } catch (e) {}
    }
    return [
      {
        id: 'admin-1',
        name: 'Resul Tanrıkulu (Sistem Yöneticisi)',
        email: ADMIN_EMAIL,
        role: 'admin',
        phone: '0555 000 00 00',
        status: 'Approved',
        createdAt: '2026-08-01',
      },
      {
        id: 'student-1',
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        role: 'student',
        phone: '0555 123 45 67',
        field: 'Sayısal',
        targetRank: 'İlk 500',
        status: 'Approved',
        createdAt: '2026-08-01',
      },
      {
        id: 'mentor-1',
        name: 'Kaan Yıldırım',
        email: 'kaan@example.com',
        role: 'mentor',
        phone: '0555 987 65 43',
        university: 'Boğaziçi Bilgisayar',
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
    localStorage.setItem('altin_koc_users_list', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Login function
  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // Check Supabase if configured
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password,
        });
        if (!error && data?.user) {
          const userRole = cleanEmail === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'student';
          const userObj = {
            id: data.user.id,
            email: cleanEmail,
            name: data.user.user_metadata?.name || cleanEmail.split('@')[0],
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

    if (cleanEmail === ADMIN_EMAIL.toLowerCase()) {
      const adminObj = {
        id: 'admin-super',
        name: 'Resul Tanrıkulu (Super Admin)',
        email: ADMIN_EMAIL,
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
    const isAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();

    const newUser = {
      id: 'user-' + Date.now(),
      name: name || cleanEmail.split('@')[0],
      email: cleanEmail,
      phone: phone || '',
      role: isAdmin ? 'admin' : (rolePreference || 'student'),
      status: isAdmin ? 'Approved' : 'Pending', // Admin auto approved, others approved by admin
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

  const isAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() || currentUser?.role === 'admin';
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
        ADMIN_EMAIL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
