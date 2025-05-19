'use client'
import { useState, useEffect  } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  const [isLogin, setIsLogin] = useState(mode !== 'signup'); // default login
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLogin(mode !== 'signup'); // kalau mode=signup, set isLogin ke false
  }, [mode])

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-basegreen to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <LoginForm 
              key="login" 
              onToggleAuth={toggleAuthMode} 
              loading={loading} 
              setLoading={setLoading} 
            />
          ) : (
            <SignupForm 
              key="signup" 
              onToggleAuth={toggleAuthMode} 
              loading={loading} 
              setLoading={setLoading} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}