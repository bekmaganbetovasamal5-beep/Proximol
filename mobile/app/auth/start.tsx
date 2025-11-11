import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/common/Button';

export default function AuthStartScreen() {
  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleRegistration = () => {
    router.push('/auth/registration');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Logo and Title Section */}
      <View style={styles.headerSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="people-circle-outline" size={80} color="#FF6B6B" />
        </View>
        <Text style={styles.title}>Proximol</Text>
        <Text style={styles.subtitle}>Узнай, что о тебе думают</Text>
        <Text style={styles.description}>
          Анонимные опросы и комплименты для твоей школы
        </Text>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons name="eye-off-outline" size={24} color="#4ECDC4" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Анонимно</Text>
            <Text style={styles.featureDescription}>
              Твои ответы никому не видны
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons name="school-outline" size={24} color="#FFA500" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Для школы</Text>
            <Text style={styles.featureDescription}>
              Только ученики твоей школы
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Ionicons name="heart-outline" size={24} color="#FF69B4" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Комплименты</Text>
            <Text style={styles.featureDescription}>
              Узнай лучшие качества друзей
            </Text>
          </View>
        </View>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsSection}>
        <Button
          title="Зарегистрироваться"
          onPress={handleRegistration}
          variant="primary"
          size="large"
          style={styles.registerButton}
        />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Уже есть аккаунт?</Text>
          <Button
            title="Войти"
            onPress={handleLogin}
            variant="outline"
            size="medium"
            textStyle={styles.loginButtonText}
          />
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
  headerSection: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    paddingHorizontal: 32,
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#636E72',
    lineHeight: 20,
  },
  buttonsSection: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  registerButton: {
    marginBottom: 24,
  },
  loginContainer: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 12,
  },
  loginButtonText: {
    fontSize: 14,
  },
});