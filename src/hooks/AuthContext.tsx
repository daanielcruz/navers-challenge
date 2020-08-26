import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  email: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface SignInResponse {
  email: string;
  token: string;
  id?: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<SignInResponse>(() => {
    const token = localStorage.getItem('@Navers:token');
    const email = localStorage.getItem('@Navers:email');
    if (token && email) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, email };
    }

    return {} as SignInResponse;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const res = await api.post<SignInResponse>('/users/login', {
      email,
      password,
    });
    const { token, email: userInMail } = res.data;
    localStorage.setItem('@Navers:token', token);
    localStorage.setItem('@Navers:email', userInMail);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, email });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Navers:token');
    localStorage.removeItem('@Navers:email');
    setData({} as SignInResponse);
  }, []);

  return (
    <AuthContext.Provider value={{ email: data.email, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
