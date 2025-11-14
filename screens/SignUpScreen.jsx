import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const Colors = {
  background: '#FFFFFF',
  orangeAccent: '#FF8C00',
  redAccent: '#FF3B30',
  textPrimary: '#1C1C1C',
  textSecondary: '#696969',
  inputBackground: '#F7F7F7'
};

const SignUpScreen = ({ onSignUp, onBackToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logoScale = useRef(new Animated.Value(0.8)).current;
  useEffect(() => {
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignUp = () => {
    if (onSignUp) onSignUp(name, email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <Animated.View style={{ transform: [{ scale: logoScale }], marginBottom: 32 }}>
            <Image 
              source={require('../assets/logo.gif')} 
              style={styles.logoImage} 
              resizeMode="cover" 
            />
          </Animated.View>

          <Text style={styles.title}>CREATE ACCOUNT</Text>
          <Text style={styles.subtitle}>Join Smart Reminder today</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={Colors.textSecondary}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity onPress={handleSignUp} style={styles.buttonWrapper}>
            <LinearGradient
              colors={[Colors.orangeAccent, Colors.redAccent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={onBackToLogin}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Developed by Mawii</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  wrapper: { flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 },
  content: { width: '85%', alignItems: 'center', marginTop: 20 },
  logoImage: { width: 140, height: 140, borderRadius: 70 },
  title: { fontSize: 32, fontWeight: '700', color: Colors.textPrimary, letterSpacing: 1, marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 16, color: Colors.textSecondary, marginBottom: 32, textAlign: 'center' },
  input: { width: '100%', backgroundColor: Colors.inputBackground, color: Colors.textPrimary, borderRadius: 14, paddingHorizontal: 18, paddingVertical: 16, fontSize: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2 },
  buttonWrapper: { width: '100%', borderRadius: 14, overflow: 'hidden', marginBottom: 20 },
  button: { paddingVertical: 16, alignItems: 'center', borderRadius: 14 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  loginContainer: { flexDirection: 'row', alignItems: 'center' },
  loginText: { color: Colors.textSecondary, fontSize: 14 },
  loginLink: { color: Colors.orangeAccent, fontSize: 14, fontWeight: '600' },
  footer: { paddingBottom: 10 },
  footerText: { fontSize: 12, color: Colors.textSecondary, textAlign: 'center' }
});

export default SignUpScreen;
