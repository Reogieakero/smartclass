import React, { useState, useEffect } from 'react';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' | 'signup' | 'home'

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000); // splash for 3 sec
  }, []);

  if (isLoading) return <SplashScreen />;

  if (currentScreen === 'login') {
    return (
      <LoginScreen
        onLogin={() => setCurrentScreen('home')}
        onSignUpPress={() => setCurrentScreen('signup')}
      />
    );
  }

  if (currentScreen === 'signup') {
    return (
      <SignUpScreen
        onSignUp={() => setCurrentScreen('home')}
        onBackToLogin={() => setCurrentScreen('login')}
      />
    );
  }

  if (currentScreen === 'home') {
    return <HomeScreen />;
  }

  return null;
};

export default App;
