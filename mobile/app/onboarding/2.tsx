import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import Button from '@/components/common/Button';

export default function Onboarding2Screen() {
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
    router.push('/onboarding/3');
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/profile/location');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Progress Dots */}
      <View style={styles.progressContainer}>
        <View style={styles.progressDot} />
        <View style={[styles.progressDot, styles.activeDot]} />
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
          <Ionicons name="school-outline" size={80} color="#FFA500" />
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
          <Text style={styles.title}>Только для твоей школы</Text>
          <Text style={styles.subtitle}>
            Голосовать могут только ученики твоего учебного заведения
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
              Безопасное сообщество одноклассников
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="checkmark-circle" size={20} color="#4ECDC4" />
            </View>
            <Text style={styles.featureText}>
              Проверка школы при регистрации
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="checkmark-circle" size={20} color="#4ECDC4" />
            </View>
            <Text style={styles.featureText}>
              Relevant и актуальные темы
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.navigationButtons}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#636E72" />
          </TouchableOpacity>

          <Button
            title="Далее"
            onPress={handleNext}
            variant="primary"
            size="large"
            style={styles.nextButton}
          />
        </View>

        <View style={styles.pagination}>
          <Text style={styles.paginationText}>2 из 4</Text>
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
    backgroundColor: '#FFA500',
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
    backgroundColor: '#FFF8F0',
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
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    flex: 1,
    marginLeft: 16,
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