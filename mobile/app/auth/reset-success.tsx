import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import Button from '@/components/common/Button';

export default function ResetSuccessScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Успешно</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Success Animation */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
            },
          ]}
        >
          <Ionicons name="checkmark-circle" size={80} color="#4ECDC4" />
          <View style={styles.successBadge}>
            <Ionicons name="shield-checkmark-outline" size={24} color="white" />
          </View>
        </Animated.View>

        {/* Success Message */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Пароль успешно изменен!</Text>
          <Text style={styles.subtitle}>
            Ваш пароль был успешно обновлен. Теперь вы можете войти в аккаунт с новым паролем
          </Text>
        </Animated.View>

        {/* Security Tips */}
        <Animated.View
          style={[
            styles.tipsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.tipsTitle}>Советы по безопасности:</Text>
          <View style={styles.tipItem}>
            <View style={styles.tipIcon}>
              <Ionicons name="lock-closed-outline" size={16} color="#4ECDC4" />
            </View>
            <Text style={styles.tipText}>
              Используйте уникальный пароль для каждого сервиса
            </Text>
          </View>
          <View style={styles.tipItem}>
            <View style={styles.tipIcon}>
              <Ionicons name="refresh-outline" size={16} color="#4ECDC4" />
            </View>
            <Text style={styles.tipText}>
              Регулярно меняйте пароль (рекомендуется каждые 3 месяца)
            </Text>
          </View>
          <View style={styles.tipItem}>
            <View style={styles.tipIcon}>
              <Ionicons name="person-outline" size={16} color="#4ECDC4" />
            </View>
            <Text style={styles.tipText}>
              Не делитесь паролем с другими пользователями
            </Text>
          </View>
        </Animated.View>

        {/* CTA Buttons */}
        <Animated.View
          style={[
            styles.ctaContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Button
            title="Войти в аккаунт"
            onPress={handleLogin}
            variant="primary"
            size="large"
            style={styles.loginButton}
          />

          <TouchableOpacity onPress={() => router.push('/auth/forgot-password')} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>
              <Ionicons name="help-circle-outline" size={16} color="#636E72" />
              {' '}Нужна помощь?
            </Text>
          </TouchableOpacity>
        </Animated.View>
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
    alignItems: 'center',
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F0FFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  successBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  tipsContainer: {
    width: '100%',
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E6FFFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#636E72',
    lineHeight: 20,
  },
  ctaContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    marginBottom: 16,
    width: '100%',
  },
  helpLink: {
    padding: 12,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#636E72',
    textAlign: 'center',
  },
});