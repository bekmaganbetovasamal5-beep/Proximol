import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '@/components/common/Button';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleLogin = () => {
    // Валидация и вход
    if (!email || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    // Здесь будет логика входа
    // После успешного входа переходим в главное приложение
    router.push('/polls/main');
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  const handleRegistration = () => {
    router.push('/auth/registration');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Вход</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Ionicons name="people-circle-outline" size={60} color="#FF6B6B" />
          <Text style={styles.appName}>Proximol</Text>
          <Text style={styles.tagline}>Узнай, что о тебе думают</Text>
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#B8B8D0" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#B8B8D0" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#B8B8D0"
            />
          </TouchableOpacity>
        </View>

        {/* Remember Me */}
        <View style={styles.rememberContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkboxInner, rememberMe && styles.checkboxChecked]}>
              {rememberMe && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.rememberText}>Запомнить меня</Text>
        </View>

        {/* Login Button */}
        <Button
          title="Войти"
          onPress={handleLogin}
          variant="primary"
          size="large"
          style={styles.loginButton}
        />

        {/* Forgot Password */}
        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Забыли пароль?</Text>
        </TouchableOpacity>

        {/* Registration Link */}
        <View style={styles.registrationContainer}>
          <Text style={styles.registrationText}>Нет аккаунта? </Text>
          <TouchableOpacity onPress={handleRegistration}>
            <Text style={styles.registrationLink}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
  },
  placeholder: {
    width: 40,
  },
  form: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3436',
    marginTop: 16,
  },
  tagline: {
    fontSize: 16,
    color: '#636E72',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2D3436',
    paddingVertical: 16,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#B8B8D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  rememberText: {
    fontSize: 14,
    color: '#636E72',
  },
  loginButton: {
    marginBottom: 20,
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#FF6B6B',
    textDecorationLine: 'underline',
  },
  registrationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registrationText: {
    fontSize: 14,
    color: '#636E72',
  },
  registrationLink: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
});