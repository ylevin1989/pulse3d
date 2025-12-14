import React, { createContext, useContext, useState, useEffect } from 'react';

// Configuration
const ADMIN_USERNAME = 'ylevin';
// SHA-256 hash for 'apexhot1'
const PASSWORD_HASH = '86a4575db2837d45542a1aa74246995641772428172c72b2255776d662137024';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('pulse_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    // Check Username
    if (username.toLowerCase() !== ADMIN_USERNAME.toLowerCase()) {
      return false;
    }

    // Check Password Hash
    const inputHash = await hashPassword(password);
    
    if (inputHash === PASSWORD_HASH) {
      localStorage.setItem('pulse_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('pulse_auth');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};