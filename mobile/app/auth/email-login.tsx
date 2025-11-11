import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '@/components/common/Button';

export default function EmailLoginScreen() {
  const [email, setEmail] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (!email) {
      alert('Пожалуйста, введите email');
      return;
    }

    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Пожалуйста, введите корректный email');
      return;
    }

    // Переходим к экрану ввода пароля
    router.push({
      pathname: '/auth/login-input',
      params: { email }
    });
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
        <Text style={styles.headerTitle}>Вход по email</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Ionicons name="mail-outline" size={60} color="#FF6B6B" />
          <Text style={styles.title}>С возвращением!</Text>
          <Text style={styles.subtitle}>
            Введите ваш email для входа в аккаунт
          </Text>
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#B8B8D0" style={styles.inputIcon} />
          <Text style={styles.input}>email</Text>
        </View>

        {/* Continue Button */}
        <Button
          title="Продолжить"
          onPress={handleContinue}
          variant="primary"
          size="large"
          style={styles.continueButton}
        />

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
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2D3436',
  },
  continueButton: {
    marginBottom: 20,
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