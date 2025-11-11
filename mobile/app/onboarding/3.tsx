import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import Button from '@/components/common/Button';

export default function Onboarding3Screen() {
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
    router.push('/onboarding/4');
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
        <View style={styles.progressDot} />
        <View style={[styles.progressDot, styles.activeDot]} />
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
          <Ionicons name="how-to-regulation-outline" size={80} color="#4ECDC4" />
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
          <Text style={styles.title}>Как это работает?</Text>
          <Text style={styles.subtitle}>
            Простой и увлекательный процесс голосования
          </Text>
        </Animated.View>

        {/* Steps */}
        <Animated.View
          style={[
            styles.stepsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Ответь на 10 вопросов</Text>
              <Text style={styles.stepDescription}>
                О разных категориях и темах
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Получи результаты</Text>
              <Text style={styles.stepDescription}>
                Кто и в чем лучший в твоем классе
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Узнай комплименты</Text>
              <Text style={styles.stepDescription}>
                Красивые слова о твоих друзьях
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Сохрани память</Text>
              <Text style={styles.stepDescription}>
                Лучшие моменты и достижения
              </Text>
            </View>
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
          <Text style={styles.paginationText}>3 из 4</Text>
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
    backgroundColor: '#4ECDC4',
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
    backgroundColor: '#F0FFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
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
  stepsContainer: {
    width: '100%',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#636E72',
    lineHeight: 20,
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