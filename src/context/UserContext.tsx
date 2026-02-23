'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  prenom: string;
  nom: string;
  email: string;
  age: string;
  statut: string;
  domaine: string;
  location: string;
}

interface UserContextType {
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;
  isLoggedIn: boolean;
}

const defaultUserData: UserData = {
  prenom: '',
  nom: '',
  email: '',
  age: '',
  statut: '',
  domaine: '',
  location: '',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserDataState] = useState<UserData>(defaultUserData);

  const setUserData = (data: Partial<UserData>) => {
    setUserDataState(prev => ({ ...prev, ...data }));
  };

  const isLoggedIn = !!(userData.prenom && userData.email);

  return (
    <UserContext.Provider value={{ userData, setUserData, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
