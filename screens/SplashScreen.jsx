import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 

// --- Updated Color Palette ---
const Colors = {
  // *** TEMPORARY CHANGE FOR VISIBILITY TEST ***
  // Changed from '#1F1F1F' to 'white' so dark clock hands will be visible.
  background: 'white', 
  // ********************************************
  orangeAccent: '#FF8C00', 
  redAccent: '#FF3B30', 
  // Changed text color to black so text is visible on the white background
  textPrimary: 'black', 
  textSecondary: '#696969', 
};

// Component for the GIF Logo
const GradientLogo = () => (
  <View style={styles.iconContainer}>
    {/* Use the Image component to display the GIF. 
        Path is relative to the screens folder: '../assets/logo.gif' */}
    <Image 
      // Ensure the file name matches exactly: logo.gif
      source={require('../assets/logo.gif')} 
      style={styles.logoImage}
      // 'cover' scales the image to fill the view, clipping to the circle.
      resizeMode="cover" 
    />
  </View>
);

const SplashScreen = ({ onFinishLoading }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* StatusBar adjusted for light background */}
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} /> 
      
      <View style={styles.content}>
        <GradientLogo />
        
        {/* App Title */}
        <Text style={styles.title}>SMART REMINDER</Text>
        
        {/* App Tagline */}
        <Text style={styles.tagline}>
          Your daily productivity companion.
        </Text>
      </View>
      
      <View style={styles.footer} />
    </SafeAreaView>
  );
};

// --- Styles ---

// screens/SplashScreen.jsx (Styles part)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
  },
  // --- INCREASED SIZE HERE ---
  iconContainer: {
    marginBottom: 40,
    width: 180, // Increased from 120
    height: 180, // Increased from 120
    borderRadius: 90, // Set to half of width/height (180/2 = 90)
    overflow: 'hidden', 
  },
  // --------------------------
  logoImage: { 
    width: '100%', 
    height: '100%', 
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 2, 
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: Colors.textSecondary, 
    fontWeight: '400',
    opacity: 0.85,
  },
  footer: {
    paddingBottom: 20,
  }
});

export default SplashScreen;