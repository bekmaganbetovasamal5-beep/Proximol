import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import Button from '@/components/common/Button';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  description: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

export default function AboutScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const teamMembers: TeamMember[] = [
    {
      name: 'Александр Петров',
      role: 'CEO & Founder',
      avatar: '👨‍💼',
      description: 'Вдохновитель Proximol, отвечает за стратегию развития',
    },
    {
      name: 'Мария Иванова',
      role: 'Lead Developer',
      avatar: '👩‍💻',
      description: 'Главный разработчик, создатель технической архитектуры',
    },
    {
      name: 'Дмитрий Сидоров',
      role: 'UX/UI Designer',
      avatar: '🎨',
      description: 'Дизайнер интерфейсов, создал уникальный стиль приложения',
    },
    {
      name: 'Елена Козлова',
      role: 'Community Manager',
      avatar: '👥',
      description: 'Менеджер сообщества, отвечает за поддержку пользователей',
    },
  ];

  const features: Feature[] = [
    {
      icon: 'shield-checkmark-outline',
      title: 'Безопасность',
      description: 'Полная анонимность голосований и защита личных данных',
    },
    {
      icon: 'school-outline',
      title: 'Эксклюзивность',
      description: 'Только для вашего учебного заведения',
    },
    {
      icon: 'heart-outline',
      title: 'Позитив',
      description: 'Фокус на комплиментах и поддержке',
    },
    {
      icon: 'sparkles-outline',
      title: 'Инновации',
      description: 'Современный подход к традиционным голосованиям',
    },
    {
      icon: 'people-outline',
      title: 'Сообщество',
      description: 'Единое пространство для общения и самовыражения',
    },
    {
      icon: 'analytics-outline',
      title: 'Аналитика',
      description: 'Детальная статистика и достижения',
    },
  ];

  useEffect(() => {
    animateIn();
  }, []);

  const animateIn = () => {
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
  };

  const handleContactSupport = () => {
    Linking.openURL('mailto:support@proximol.app');
  };

  const handleVisitWebsite = () => {
    Linking.openURL('https://proximol.app');
  };

  const handleRateApp = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.proximol.app');
  };

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: 'Попробуй Proximol - приложение для анонимных голосований в школе! Узнай, что о тебе думают. https://proximol.app',
        url: 'https://proximol.app',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleOpenSocial = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>О приложении</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#2D3436" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Logo Section */}
        <Animated.View
          style={[
            styles.logoSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.logo}>
            <Ionicons name="people-circle-outline" size={80} color="#FF6B6B" />
          </View>
          <Text style={styles.appName}>Proximol</Text>
          <Text style={styles.tagline}>Узнай, что о тебе думают</Text>
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Версия 1.0.0</Text>
          </View>
        </Animated.View>

        {/* Description */}
        <Animated.View
          style={[
            styles.descriptionSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Что такое Proximol?</Text>
          <Text style={styles.description}>
            Proximol - это инновационная платформа для анонимных голосований и получения обратной связи в учебных заведениях. Мы создали безопасное пространство, где каждый может высказать свое мнение и получить позитивные комплименты от одноклассников.
          </Text>
        </Animated.View>

        {/* Features */}
        <Animated.View
          style={[
            styles.featuresSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Наши преимущества</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name={feature.icon as any} size={24} color="#FF6B6B" />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Stats */}
        <Animated.View
          style={[
            styles.statsSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Proximol в цифрах</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10,000+</Text>
              <Text style={styles.statLabel}>Пользователей</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Школ</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>25,000+</Text>
              <Text style={styles.statLabel}>Голосований</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8⭐</Text>
              <Text style={styles.statLabel}>Рейтинг</Text>
            </View>
          </View>
        </Animated.View>

        {/* Team */}
        <Animated.View
          style={[
            styles.teamSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Наша команда</Text>
          <View style={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <View key={index} style={styles.teamMemberCard}>
                <View style={styles.teamMemberAvatar}>
                  <Text style={styles.avatarText}>{member.avatar}</Text>
                </View>
                <Text style={styles.teamMemberName}>{member.name}</Text>
                <Text style={styles.teamMemberRole}>{member.role}</Text>
                <Text style={styles.teamMemberDescription}>{member.description}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Contact */}
        <Animated.View
          style={[
            styles.contactSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Связаться с нами</Text>
          <View style={styles.contactOptions}>
            <TouchableOpacity style={styles.contactOption} onPress={handleContactSupport}>
              <View style={styles.contactIcon}>
                <Ionicons name="mail-outline" size={20} color="#FF6B6B" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Поддержка</Text>
                <Text style={styles.contactDescription}>support@proximol.app</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#B8B8D0" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactOption} onPress={handleVisitWebsite}>
              <View style={styles.contactIcon}>
                <Ionicons name="globe-outline" size={20} color="#4ECDC4" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle">Веб-сайт</Text>
                <Text style={styles.contactDescription}>proximol.app</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#B8B8D0" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Social Media */}
        <Animated.View
          style={[
            styles.socialSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Мы в соцсетях</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#1877F2' }]}
              onPress={() => handleOpenSocial('https://facebook.com/proximol')}
            >
              <Ionicons name="logo-facebook" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]}
              onPress={() => handleOpenSocial('https://twitter.com/proximol')}
            >
              <Ionicons name="logo-twitter" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#E4405F' }]}
              onPress={() => handleOpenSocial('https://instagram.com/proximol')}
            >
              <Ionicons name="logo-instagram" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#FF0000' }]}
              onPress={() => handleOpenSocial('https://youtube.com/proximol')}
            >
              <Ionicons name="logo-youtube" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          style={[
            styles.actionsSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Button
            title="Оценить приложение"
            onPress={handleRateApp}
            variant="primary"
            size="large"
            style={styles.actionButton}
          />

          <View style={styles.actionButtonsRow}>
            <Button
              title="Поделиться"
              onPress={handleShareApp}
              variant="outline"
              size="large"
              style={[styles.actionButton, styles.shareButton]}
            />

            <Button
              title="Поддержка"
              onPress={handleContactSupport}
              variant="outline"
              size="large"
              style={[styles.actionButton, styles.supportButton]}
            />
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View
          style={[
            styles.footerSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.footerText}>
            © 2024 Proximol. Все права защищены.
          </Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => Linking.openURL('https://proximol.app/privacy')}>
              <Text style={styles.footerLink}>Политика конфиденциальности</Text>
            </TouchableOpacity>
            <Text style={styles.footerSeparator}>•</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://proximol.app/terms')}>
              <Text style={styles.footerLink}>Условия использования</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
  },
  shareButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#636E72',
    marginBottom: 16,
  },
  versionContainer: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  versionText: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
  },
  descriptionSection: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#636E72',
    lineHeight: 24,
  },
  featuresSection: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    marginBottom: 8,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
    flex: 1,
  },
  featureDescription: {
    fontSize: 14,
    color: '#636E72',
    lineHeight: 20,
    flex: 1,
  },
  statsSection: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
    textAlign: 'center',
  },
  teamSection: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    marginBottom: 8,
  },
  teamGrid: {
    gap: 16,
  },
  teamMemberCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  teamMemberAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
  },
  teamMemberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  teamMemberRole: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '500',
    marginBottom: 8,
  },
  teamMemberDescription: {
    fontSize: 14,
    color: '#636E72',
    textAlign: 'center',
    lineHeight: 20,
  },
  contactSection: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    marginBottom: 8,
  },
  contactOptions: {
    gap: 12,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 2,
  },
  contactDescription: {
    fontSize: 14,
    color: '#636E72',
  },
  socialSection: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    marginBottom: 8,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsSection: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    marginBottom: 8,
  },
  actionButton: {
    marginBottom: 16,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  shareButton: {
    flex: 1,
  },
  supportButton: {
    flex: 1,
  },
  footerSection: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 12,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerLink: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  footerSeparator: {
    fontSize: 14,
    color: '#B8B8D0',
  },
});