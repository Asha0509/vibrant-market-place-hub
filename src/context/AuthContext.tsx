
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Define types for our user and auth context
type User = {
  id: string;
  email: string;
  name: string;
  isVendor: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string, isVendor: boolean) => void;
  logout: () => void;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for simulating authentication
const mockUsers = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe',
    isVendor: false,
  },
  {
    id: '2',
    email: 'vendor@example.com',
    password: 'password123',
    name: 'Jane Smith',
    isVendor: true,
  },
];

// Provider component to wrap our app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user was previously logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('marketplace_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('marketplace_user', JSON.stringify(userWithoutPassword));
        toast.success(`Welcome back, ${foundUser.name}!`);
      } else {
        toast.error('Invalid email or password');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const signup = (name: string, email: string, password: string, isVendor: boolean) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userExists = mockUsers.some((u) => u.email === email);
      
      if (userExists) {
        toast.error('User with this email already exists');
        setIsLoading(false);
        return;
      }
      
      const newUser = {
        id: `${mockUsers.length + 1}`,
        email,
        name,
        isVendor,
      };
      
      setUser(newUser);
      localStorage.setItem('marketplace_user', JSON.stringify(newUser));
      toast.success('Account created successfully!');
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('marketplace_user');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
