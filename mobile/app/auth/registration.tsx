import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '@/components/common/Button';

export default function RegistrationScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleRegister = () => {
    // Валидация и регистрация
    if (!name || !email || !password || !confirmPassword) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    if (!acceptTerms) {
      alert('Пожалуйста, примите условия использования');
      return;
    }

    // Здесь будет логика регистрации
    router.push('/onboarding/1');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Регистрация</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.formTitle}>Создать аккаунт</Text>
        <Text style={styles.formSubtitle}>Присоединяйтесь к Proximol</Text>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#B8B8D0" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Имя и фамилия"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
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

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#B8B8D0" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#B8B8D0"
            />
          </TouchableOpacity>
        </View>

        {/* Terms Checkbox */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAcceptTerms(!acceptTerms)}
          >
            <View style={[styles.checkboxInner, acceptTerms && styles.checkboxChecked]}>
              {acceptTerms && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            Я принимаю <Text style={styles.checkboxLink}>условия использования</Text> и{' '}
            <Text style={styles.checkboxLink}>политику конфиденциальности</Text>
          </Text>
        </View>

        {/* Register Button */}
        <Button
          title="Зарегистрироваться"
          onPress={handleRegister}
          variant="primary"
          size="large"
          style={styles.registerButton}
        />

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Уже есть аккаунт? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text style={styles.loginLink}>Войти</Text>
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
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: '#636E72',
    marginBottom: 32,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
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
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#636E72',
    lineHeight: 20,
  },
  checkboxLink: {
    color: '#FF6B6B',
    textDecorationLine: 'underline',
  },
  registerButton: {
    marginBottom: 24,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#636E72',
  },
  loginLink: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
});