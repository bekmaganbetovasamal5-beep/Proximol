import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import Button from '@/components/common/Button';

export default function Onboarding1Screen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleNext = () => {
    router.push('/onboarding/2');
  };

  const handleSkip = () => {
    // Пропустить онбординг и перейти к настройке профиля
    router.push('/profile/location');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Progress Dots */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>

      {/* Skip Button */}
      <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
        <Text style={styles.skipText}>Пропустить</Text>
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        {/* Icon */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Ionicons name="eye-off-outline" size={80} color="#FF6B6B" />
        </Animated.View>

        {/* Title and Description */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Анонимное голосование</Text>
          <Text style={styles.subtitle}>
            Твои ответы и выборы полностью конфиденциальны
          </Text>
        </Animated.View>

        {/* Features */}
        <Animated.View
          style={[
            styles.featuresContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="checkmark-circle" size={20} color="#4ECDC4" />
            </View>
            <Text style={styles.featureText}>
              Никто не узнает, как ты проголосовал
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="checkmark-circle" size={20} color="#4ECDC4" />
            </View>
            <Text style={styles.featureText}>
              Только статистика и результаты
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="checkmark-circle" size={20} color="#4ECDC4" />
            </View>
            <Text style={styles.featureText}>
              Без давления и осуждения
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Button
          title="Далее"
          onPress={handleNext}
          variant="primary"
          size="large"
          style={styles.nextButton}
        />

        <View style={styles.pagination}>
          <Text style={styles.paginationText}>1 из 4</Text>
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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 32,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E6ED',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF6B6B',
    width: 24,
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
  },
  skipText: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#636E72',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 16,
  },
  featuresContainer: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: '#2D3436',
    fontWeight: '500',
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  nextButton: {
    marginBottom: 16,
  },
  pagination: {
    alignItems: 'center',
  },
  paginationText: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
  },
});