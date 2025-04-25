import userApi from '@/api/userApi';
import Loader from '@/components/common/Loader';
import { User } from '@/types/user';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const data = await userApi.userProfile();
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <Loader text="Loading Your Profile..." />;
  }

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, isLoggedIn: !!user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useSession = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useSession must be used within a UserProvider');
  }
  return context;
};
