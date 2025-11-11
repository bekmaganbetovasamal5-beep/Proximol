import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/common/Button';

interface StatData {
  label: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface RankingItem {
  position: number;
  name: string;
  score: number;
  isCurrentUser: boolean;
}

export default function ResultsStatsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('month');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const stats: StatData[] = [
    {
      label: 'Участий в голосованиях',
      value: '24',
      change: 15,
      icon: 'bar-chart-outline',
      color: '#FF6B6B',
    },
    {
      label: 'Получено комплиментов',
      value: '18',
      change: 8,
      icon: 'heart-outline',
      color: '#FD79A8',
    },
    {
      label: 'Среднее место',
      value: '4.2',
      change: -2,
      icon: 'podium-outline',
      color: '#4ECDC4',
    },
    {
      label: 'Созданных опросов',
      value: '3',
      change: 2,
      icon: 'create-outline',
      color: '#6C5CE7',
    },
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Активный участник',
      description: 'Принять участие в 10 голосованиях',
      icon: 'star-outline',
      color: '#FFD700',
      unlocked: true,
      progress: 10,
      maxProgress: 10,
    },
    {
      id: '2',
      title: 'Любимец класса',
      description: 'Получить 20 комплиментов',
      icon: 'heart-outline',
      color: '#FD79A8',
      unlocked: true,
      progress: 18,
      maxProgress: 20,
    },
    {
      id: '3',
      title: 'Чемпион',
      description: 'Занять 1 место в 3 голосованиях',
      icon: 'trophy-outline',
      color: '#FFA500',
      unlocked: false,
      progress: 1,
      maxProgress: 3,
    },
    {
      id: '4',
      title: 'Создатель',
      description: 'Создать 5 интересных опросов',
      icon: 'color-palette-outline',
      color: '#6C5CE7',
      unlocked: false,
      progress: 3,
      maxProgress: 5,
    },
  ];

  const rankings: RankingItem[] = [
    { position: 1, name: 'Анна Петрова', score: 485, isCurrentUser: false },
    { position: 2, name: 'Михаил Иванов', score: 472, isCurrentUser: false },
    { position: 3, name: 'Вы', score: 468, isCurrentUser: true },
    { position: 4, name: 'Елена Смирнова', score: 445, isCurrentUser: false },
    { position: 5, name: 'Дмитрий Козлов', score: 432, isCurrentUser: false },
  ];

  const periods = [
    { id: 'week', name: 'Неделя' },
    { id: 'month', name: 'Месяц' },
    { id: 'all', name: 'Все время' },
  ];

  useEffect(() => {
    animateIn();
  }, [selectedPeriod]);

  const animateIn = () => {
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
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getMedalEmoji = (position: number) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  const getMedalColor = (position: number) => {
    switch (position) {
      case 1: return '#FFD700';
      case 2: return '#C0C0C0';
      case 3: return '#CD7F32';
      default: return '#636E72';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Моя статистика</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#2D3436" />
        </TouchableOpacity>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.id}
            style={[
              styles.periodItem,
              selectedPeriod === period.id && styles.activePeriodItem,
            ]}
            onPress={() => setSelectedPeriod(period.id as any)}
          >
            <Text style={[
              styles.periodText,
              selectedPeriod === period.id && styles.activePeriodText,
            ]}>
              {period.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <Animated.View
          style={[
            styles.statsGrid,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {stats.map((stat, index) => (
            <Animated.View
              key={index}
              style={[
                styles.statCard,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30 + index * 5, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                <Ionicons name={stat.icon as any} size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <View style={styles.changeContainer}>
                <Ionicons
                  name={stat.change >= 0 ? 'trending-up' : 'trending-down'}
                  size={14}
                  color={stat.change >= 0 ? '#4ECDC4' : '#FF6B6B'}
                />
                <Text style={[
                  styles.changeText,
                  { color: stat.change >= 0 ? '#4ECDC4' : '#FF6B6B' },
                ]}>
                  {Math.abs(stat.change)}%
                </Text>
              </View>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Ranking Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Рейтинг класса</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Все результаты</Text>
              <Ionicons name="chevron-forward" size={16} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
          <View style={styles.rankingList}>
            {rankings.map((item) => (
              <View
                key={item.position}
                style={[
                  styles.rankingItem,
                  item.isCurrentUser && styles.currentUserRanking,
                ]}
              >
                <View style={styles.positionContainer}>
                  <Text style={[
                    styles.positionText,
                    { color: getMedalColor(item.position) }
                  ]}>
                    {item.position}
                  </Text>
                  {getMedalEmoji(item.position) && (
                    <Text style={styles.medalEmoji}>
                      {getMedalEmoji(item.position)}
                    </Text>
                  )}
                </View>
                <Text style={[
                  styles.rankingName,
                  item.isCurrentUser && styles.currentUserName,
                ]}>
                  {item.name}
                </Text>
                <Text style={[
                  styles.rankingScore,
                  item.isCurrentUser && styles.currentUserScore,
                ]}>
                  {item.score}
                </Text>
                {item.isCurrentUser && (
                  <Ionicons name="person-circle" size={20} color="#FF6B6B" />
                )}
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Achievements Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Достижения</Text>
            <View style={styles.achievementsCount}>
              <Text style={styles.achievementsCountText}>
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </Text>
            </View>
          </View>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <Animated.View
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.lockedAchievement,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [30 + index * 5, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={[
                  styles.achievementIcon,
                  achievement.unlocked && {
                    backgroundColor: `${achievement.color}20`,
                  },
                ]}>
                  <Ionicons
                    name={achievement.icon as any}
                    size={28}
                    color={achievement.unlocked ? achievement.color : '#B8B8D0'}
                  />
                </View>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.lockedText,
                ]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                          backgroundColor: achievement.unlocked ? achievement.color : '#E0E6ED',
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {achievement.progress}/{achievement.maxProgress}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Insights Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Инсайты и рекомендации</Text>
          <View style={styles.insightsList}>
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <Ionicons name="trending-up-outline" size={20} color="#4ECDC4" />
              </View>
              <Text style={styles.insightText}>
                Вы показываете отличные результаты в спортивных категориях!
              </Text>
            </View>
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <Ionicons name="people-outline" size={20} color="#FF6B6B" />
              </View>
              <Text style={styles.insightText}>
                Попробуйте участвовать в творческих голосованиях для разнообразия
              </Text>
            </View>
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <Ionicons name="star-outline" size={20} color="#FFD700" />
              </Text>
              <Text style={styles.insightText}>
                Создайте свой опрос, чтобы узнать мнение одноклассников
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          style={[
            styles.actionsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Button
            title="Создать новый опрос"
            onPress={() => router.push('/polls/create')}
            variant="primary"
            size="large"
            style={styles.createButton}
          />
          <Button
            title="Найти голосования"
            onPress={() => router.push('/polls/main')}
            variant="outline"
            size="large"
            style={styles.findButton}
          />
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  periodItem: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
  },
  activePeriodItem: {
    backgroundColor: '#FF6B6B',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636E72',
  },
  activePeriodText: {
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
    textAlign: 'center',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '500',
    marginRight: 4,
  },
  rankingList: {
    gap: 8,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  currentUserRanking: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  positionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
  },
  positionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  medalEmoji: {
    fontSize: 16,
  },
  rankingName: {
    flex: 1,
    fontSize: 16,
    color: '#2D3436',
    fontWeight: '500',
  },
  currentUserName: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  rankingScore: {
    fontSize: 16,
    fontWeight: '600',
    color: '#636E72',
    width: 50,
    textAlign: 'right',
  },
  currentUserScore: {
    color: '#FF6B6B',
  },
  achievementsCount: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  achievementsCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  achievementsGrid: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    alignSelf: 'center',
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    textAlign: 'center',
    marginBottom: 8,
  },
  lockedText: {
    color: '#B8B8D0',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#636E72',
    textAlign: 'center',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E6ED',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 12,
    color: '#636E72',
    fontWeight: '500',
  },
  insightsList: {
    gap: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  insightIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: '#2D3436',
    lineHeight: 20,
  },
  actionsContainer: {
    gap: 12,
    marginTop: 8,
  },
  createButton: {
    // Button style
  },
  findButton: {
    // Outline button style
  },
});