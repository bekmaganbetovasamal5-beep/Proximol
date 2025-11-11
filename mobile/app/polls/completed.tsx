import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import Button from '@/components/common/Button';

export default function PollCompletedScreen() {
  const { pollId, answersCount } = useLocalSearchParams<{ pollId: string; answersCount: string }>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleShareResults = async () => {
    try {
      await Share.share({
        message: 'Я только что прошел(ла) голосование в Proximol! Присоединяйтесь!',
        url: 'https://proximol.app',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleViewResults = () => {
    router.push({
      pathname: '/results/detail',
      params: { pollId }
    });
  };

  const handleBackToPolls = () => {
    router.push('/polls/main');
  };

  const handleInviteFriends = () => {
    router.push({
      pathname: '/polls/invite',
      params: { pollId }
    });
  };

  const achievements = [
    {
      id: 1,
      icon: 'star-outline',
      title: 'Первая попытка',
      description: 'Вы прошли свой первый опрос',
      unlocked: true,
    },
    {
      id: 2,
      icon: 'people-outline',
      title: 'Участник сообщества',
      description: 'Приняли участие в голосовании',
      unlocked: true,
    },
    {
      id: 3,
      icon: 'trophy-outline',
      title: 'Опытный голосующий',
      description: 'Пройдите 10 опросов для разблокировки',
      unlocked: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Голосование завершено</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Success Animation */}
      <Animated.View
        style={[
          styles.successContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.successCircle}>
          <Ionicons name="checkmark" size={60} color="white" />
        </View>
        <Text style={styles.successTitle}>Отлично!</Text>
        <Text style={styles.successSubtitle}>
          Вы успешно завершили голосование
        </Text>
      </Animated.View>

      {/* Stats */}
      <Animated.View
        style={[
          styles.statsContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{answersCount}</Text>
          <Text style={styles.statLabel}>Ответов</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>15</Text>
          <Text style={styles.statLabel}>Баллов</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Достижения</Text>
        </View>
      </Animated.View>

      {/* Achievements */}
      <Animated.View
        style={[
          styles.achievementsContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.achievementsTitle}>Ваши достижения</Text>
        <View style={styles.achievementsList}>
          {achievements.map((achievement, index) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementItem,
                !achievement.unlocked && styles.lockedAchievement,
              ]}
            >
              <View style={[
                styles.achievementIcon,
                !achievement.unlocked && styles.lockedAchievementIcon
              ]}>
                <Ionicons
                  name={achievement.icon as any}
                  size={24}
                  color={achievement.unlocked ? '#FFD700' : '#B8B8D0'}
                />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.lockedAchievementText
                ]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
              </View>
              {!achievement.unlocked && (
                <Ionicons name="lock-closed-outline" size={16} color="#B8B8D0" />
              )}
            </View>
          ))}
        </View>
      </Animated.View>

      {/* What's Next */}
      <Animated.View
        style={[
          styles.nextContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.nextTitle}>Что дальше?</Text>
        <View style={styles.nextOptions}>
          <TouchableOpacity
            style={styles.nextOption}
            onPress={handleViewResults}
          >
            <View style={styles.nextOptionIcon}>
              <Ionicons name="bar-chart-outline" size={24} color="#4ECDC4" />
            </View>
            <View style={styles.nextOptionContent}>
              <Text style={styles.nextOptionTitle}>Посмотреть результаты</Text>
              <Text style={styles.nextOptionSubtitle}>
                Узнайте итоги голосования
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#B8B8D0" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextOption}
            onPress={handleInviteFriends}
          >
            <View style={styles.nextOptionIcon}>
              <Ionicons name="person-add-outline" size={24} color="#FF6B6B" />
            </View>
            <View style={styles.nextOptionContent}>
              <Text style={styles.nextOptionTitle}>Пригласить друзей</Text>
              <Text style={styles.nextOptionSubtitle}>
                Больше участников — интереснее
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#B8B8D0" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextOption}
            onPress={handleBackToPolls}
          >
            <View style={styles.nextOptionIcon}>
              <Ionicons name="list-outline" size={24} color="#6C5CE7" />
            </View>
            <View style={styles.nextOptionContent}>
              <Text style={styles.nextOptionTitle}>Другие голосования</Text>
              <Text style={styles.nextOptionSubtitle}>
                Найдите новые опросы
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#B8B8D0" />
          </TouchableOpacity>
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
          title="Поделиться результатами"
          onPress={handleShareResults}
          variant="outline"
          size="large"
          style={styles.shareButton}
        />
        <Button
          title="Посмотреть результаты"
          onPress={handleViewResults}
          variant="primary"
          size="large"
          style={styles.resultsButton}
        />
      </Animated.View>
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
  successContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 20,
    marginBottom: 32,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#636E72',
  },
  achievementsContainer: {
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF8DC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  lockedAchievementIcon: {
    backgroundColor: '#F0F0F0',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  lockedAchievementText: {
    color: '#B8B8D0',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#636E72',
  },
  nextContainer: {
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  nextTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  nextOptions: {
    gap: 12,
  },
  nextOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  nextOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  nextOptionContent: {
    flex: 1,
  },
  nextOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  nextOptionSubtitle: {
    fontSize: 14,
    color: '#636E72',
  },
  actionsContainer: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    marginTop: 'auto',
  },
  shareButton: {
    marginBottom: 12,
  },
  resultsButton: {
    // Primary button style
  },
});