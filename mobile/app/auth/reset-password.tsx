import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '@/components/common/Button';

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    if (newPassword.length < 8) {
      alert('Пароль должен содержать минимум 8 символов');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    // Здесь будет логика сброса пароля
    // После успешного сброса переходим к экрану успеха
    router.push('/auth/reset-success');
  };

  const isPasswordValid = (password: string) => {
    return password.length >= 8;
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 8) return { text: 'Слишком короткий', color: '#FF6B6B' };
    if (password.length < 12) return { text: 'Средний', color: '#FFA500' };
    return { text: 'Надежный', color: '#4ECDC4' };
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Новый пароль</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Icon Section */}
        <View style={styles.iconSection}>
          <Ionicons name="key-outline" size={60} color="#FF6B6B" />
          <Text style={styles.title}>Создайте новый пароль</Text>
          <Text style={styles.subtitle}>
            Придумайте надежный пароль для вашего аккаунта
          </Text>
        </View>

        {/* New Password Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Новый пароль</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Минимум 8 символов"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              placeholderTextColor="#B8B8D0"
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              <Ionicons
                name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#B8B8D0"
              />
            </TouchableOpacity>
          </View>
          {newPassword && (
            <Text style={[styles.passwordStrength, { color: getPasswordStrength(newPassword).color }]}>
              {getPasswordStrength(newPassword).text}
            </Text>
          )}
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Подтвердите пароль</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Введите пароль еще раз"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#B8B8D0"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#B8B8D0"
              />
            </TouchableOpacity>
          </View>
          {confirmPassword && newPassword && confirmPassword !== newPassword && (
            <Text style={styles.passwordMismatch}>Пароли не совпадают</Text>
          )}
        </View>

        {/* Password Requirements */}
        <View style={styles.requirementsContainer}>
          <Text style={styles.requirementsTitle}>Требования к паролю:</Text>
          <View style={styles.requirementItem}>
            <Ionicons
              name={isPasswordValid(newPassword) ? "checkmark-circle" : "ellipse-outline"}
              size={16}
              color={isPasswordValid(newPassword) ? "#4ECDC4" : "#B8B8D0"}
            />
            <Text style={styles.requirementText}>Минимум 8 символов</Text>
          </View>
        </View>

        {/* Reset Button */}
        <Button
          title="Сохранить новый пароль"
          onPress={handleResetPassword}
          variant="primary"
          size="large"
          style={styles.resetButton}
        />

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
    marginBottom: 32,
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
  inputSection: {
    marginBottom: 16,
  },
  inputLabel: {
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
  passwordStrength: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  passwordMismatch: {
    fontSize: 12,
    color: '#FF6B6B',
    marginTop: 4,
    marginLeft: 4,
  },
  requirementsContainer: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 14,
    color: '#636E72',
    marginLeft: 8,
  },
  resetButton: {
    marginBottom: 20,
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