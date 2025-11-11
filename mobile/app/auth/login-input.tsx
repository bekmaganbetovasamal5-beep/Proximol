import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '@/components/common/Button';

export default function LoginInputScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleLogin = () => {
    if (!password) {
      alert('Пожалуйста, введите пароль');
      return;
    }

    // Здесь будет логика проверки пароля
    // После успешного входа переходим в главное приложение
    router.push('/polls/main');
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
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

      {/* Content */}
      <View style={styles.content}>
        {/* Email Display */}
        <View style={styles.emailContainer}>
          <Text style={styles.emailLabel}>Email</Text>
          <Text style={styles.emailValue}>{email}</Text>
        </View>

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordLabel}>Пароль</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Введите пароль"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#B8B8D0"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#B8B8D0"
              />
            </TouchableOpacity>
          </View>
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

        {/* Alternative Login */}
        <View style={styles.alternativeContainer}>
          <Text style={styles.alternativeText}>Или войдите через</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={24} color="#FF6B6B" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={24} color="#2D3436" />
            </TouchableOpacity>
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  emailContainer: {
    marginBottom: 24,
  },
  emailLabel: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 8,
  },
  emailValue: {
    fontSize: 16,
    color: '#2D3436',
    fontWeight: '500',
  },
  passwordContainer: {
    marginBottom: 32,
  },
  passwordLabel: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2D3436',
  },
  loginButton: {
    marginBottom: 20,
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#FF6B6B',
    textDecorationLine: 'underline',
  },
  alternativeContainer: {
    alignItems: 'center',
  },
  alternativeText: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});