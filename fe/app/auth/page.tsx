'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

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