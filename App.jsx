import React, { useState, useEffect } from 'react';
import SplashScreen from './screens/SplashScreen'; 
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';   

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); 
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }


  return (
    <>
      <LoginScreen />
    </>
  );
};

export default App;