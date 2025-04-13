
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { UserPlus, User, Lock, Mail, Store } from 'lucide-react';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVendor, setIsVendor] = useState(false);
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check for vendor flag in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('vendor') === 'true') {
      setIsVendor(true);
    }
  }, [location]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(name, email, password, isVendor);
    
    // Note: in a real app, you'd navigate after confirming successful signup
    // Here we'll just simulate that for demo purposes
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <Layout>
      <div className="marketplace-container py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <UserPlus className="h-8 w-8 text-marketplace-orange" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-6">Create Your Account</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              
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
                  minLength={8}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="vendor-mode"
                  checked={isVendor}
                  onCheckedChange={setIsVendor}
                />
                <Label htmlFor="vendor-mode" className="cursor-pointer flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  Register as a Vendor
                </Label>
              </div>
              
              {isVendor && (
                <div className="bg-purple-50 p-3 rounded-md text-sm text-purple-800">
                  <p>
                    As a vendor, you'll be able to list your products and manage your store after registration.
                  </p>
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full bg-marketplace-orange hover:bg-marketplace-orange/90 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Creating account...'
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
              
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-marketplace-purple hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-marketplace-purple hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </form>
          
          <div className="mt-6">
            <Separator />
            
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-marketplace-purple hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
