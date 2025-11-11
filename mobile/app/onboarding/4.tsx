import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import Button from '@/components/common/Button';

export default function Onboarding4Screen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

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
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    router.push('/profile/location');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Progress Dots */}
      <View style={styles.progressContainer}>
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={[styles.progressDot, styles.activeDot]} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Success Animation */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <Ionicons name="trophy-outline" size={80} color="#FFD700" />
          <View style={styles.checkmark}>
            <Ionicons name="checkmark" size={24} color="white" />
          </View>
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
          <Text style={styles.title}>Готов начать?</Text>
          <Text style={styles.subtitle}>
            Присоединяйтесь к сотням учеников твоей школы
          </Text>
        </Animated.View>

        {/* Benefits */}
        <Animated.View
          style={[
            styles.benefitsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.benefitItem}>
            <Ionicons name="people-outline" size={20} color="#FF6B6B" style={styles.benefitIcon} />
            <Text style={styles.benefitText}>
              <Text style={styles.benefitHighlight}>1000+</Text> учеников уже пользуются
            </Text>
          </View>

          <View style={styles.benefitItem}>
            <Ionicons name="star-outline" size={20} color="#FFA500" style={styles.benefitIcon} />
            <Text style={styles.benefitText}>
              <Text style={styles.benefitHighlight}>50+</Text> интересных категорий
            </Text>
          </View>

          <View style={styles.benefitItem}>
            <Ionicons name="time-outline" size={20} color="#4ECDC4" style={styles.benefitIcon} />
            <Text style={styles.benefitText}>
              <Text style={styles.benefitHighlight}>5 минут</Text> на полное прохождение
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
            title="Начать сейчас"
            onPress={handleGetStarted}
            variant="primary"
            size="large"
            style={styles.getStartedButton}
          />

          <TouchableOpacity onPress={handleBack} style={styles.backLink}>
            <Text style={styles.backLinkText}>
              <Ionicons name="chevron-back" size={16} color="#636E72" />
              {' '}Вернуться назад
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Bottom Pagination */}
      <View style={styles.bottomPagination}>
        <Text style={styles.paginationText}>4 из 4</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
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
    backgroundColor: '#FFD700',
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFFACD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  checkmark: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#636E72',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 16,
  },
  benefitsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  benefitIcon: {
    marginRight: 16,
  },
  benefitText: {
    flex: 1,
    fontSize: 16,
    color: '#636E72',
    lineHeight: 24,
  },
  benefitHighlight: {
    fontWeight: 'bold',
    color: '#2D3436',
  },
  ctaContainer: {
    width: '100%',
    alignItems: 'center',
  },
  getStartedButton: {
    marginBottom: 20,
  },
  backLink: {
    padding: 12,
  },
  backLinkText: {
    fontSize: 14,
    color: '#636E72',
    textAlign: 'center',
  },
  bottomPagination: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 20,
  },
  paginationText: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
    marginBottom: 8,
  },
  progressBar: {
    width: 200,
    height: 4,
    backgroundColor: '#E0E6ED',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
});