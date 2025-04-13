
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { LogIn, User, Lock, Mail } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    
    // Note: in a real app, you'd navigate after confirming successful login
    // Here we'll just simulate that for demo purposes
    setTimeout(() => {
      const from = location.state?.from?.pathname || '/';
      navigate(from);
    }, 1000);
  };

  return (
    <Layout>
      <div className="marketplace-container py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-marketplace-purple" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-6">Sign In to Your Account</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-marketplace-purple hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-marketplace-purple hover:bg-marketplace-purple/90 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Signing in...'
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <Separator />
            
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-marketplace-purple hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">
                For demo purposes, you can use:
              </p>
              <p className="text-gray-500 text-sm">
                User: user@example.com / Password: password123
              </p>
              <p className="text-gray-500 text-sm">
                Vendor: vendor@example.com / Password: password123
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
