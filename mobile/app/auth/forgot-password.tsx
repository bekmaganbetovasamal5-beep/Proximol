import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '@/components/common/Button';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleSendReset = () => {
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

    // Здесь будет логика отправки письма для сброса пароля
    // После успешной отправки переходим к экрану подтверждения
    router.push('/auth/reset-password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Забыли пароль?</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Icon Section */}
        <View style={styles.iconSection}>
          <Ionicons name="lock-closed-outline" size={60} color="#FF6B6B" />
          <Text style={styles.title}>Восстановление пароля</Text>
          <Text style={styles.subtitle}>
            Введите ваш email, и мы отправим вам инструкцию по восстановлению пароля
          </Text>
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#B8B8D0" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Введите ваш email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#B8B8D0"
          />
        </View>

        {/* Send Button */}
        <Button
          title="Отправить инструкцию"
          onPress={handleSendReset}
          variant="primary"
          size="large"
          style={styles.sendButton}
        />

        {/* Help Text */}
        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>
            Не получили письмо? Проверьте папку "Спам" или повторите попытку через несколько минут
          </Text>
        </View>

        {/* Back to Login */}
        <View style={styles.backContainer}>
          <Text style={styles.backText}>Вспомнили пароль? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text style={styles.backLink}>Вернуться к входу</Text>
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
  iconSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
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
  sendButton: {
    marginBottom: 24,
  },
  helpContainer: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  helpText: {
    fontSize: 14,
    color: '#636E72',
    textAlign: 'center',
    lineHeight: 20,
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 14,
    color: '#636E72',
  },
  backLink: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
});