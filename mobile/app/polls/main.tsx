import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import Button from '@/components/common/Button';

interface Poll {
  id: string;
  title: string;
  category: string;
  totalVotes: number;
  isActive: boolean;
  timeLeft: string;
  participants: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function PollsMainScreen() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    { id: 'all', name: 'Все', icon: 'grid-outline', color: '#FF6B6B' },
    { id: 'sports', name: 'Спорт', icon: 'football-outline', color: '#4ECDC4' },
    { id: 'study', name: 'Учеба', icon: 'book-outline', color: '#6C5CE7' },
    { id: 'entertainment', name: 'Развлечения', icon: 'game-controller-outline', color: '#FFA500' },
    { id: 'personality', name: 'Личность', icon: 'person-outline', color: '#FD79A8' },
  ];

  useEffect(() => {
    loadPolls();
  }, [selectedCategory]);

  const loadPolls = async () => {
    // Симуляция загрузки опросов
    const mockPolls: Poll[] = [
      {
        id: '1',
        title: 'Кто самый спортивный в классе?',
        category: 'sports',
        totalVotes: 45,
        isActive: true,
        timeLeft: '2 дня',
        participants: 45,
        difficulty: 'easy'
      },
      {
        id: '2',
        title: 'Лучший математик',
        category: 'study',
        totalVotes: 38,
        isActive: true,
        timeLeft: '1 день',
        participants: 38,
        difficulty: 'medium'
      },
      {
        id: '3',
        title: 'Кто самый смешной?',
        category: 'personality',
        totalVotes: 67,
        isActive: true,
        timeLeft: '3 дня',
        participants: 67,
        difficulty: 'easy'
      },
      {
        id: '4',
        title: 'Лучший друг',
        category: 'personality',
        totalVotes: 52,
        isActive: false,
        timeLeft: 'Завершен',
        participants: 52,
        difficulty: 'easy'
      },
      {
        id: '5',
        title: 'Королева бала',
        category: 'entertainment',
        totalVotes: 41,
        isActive: true,
        timeLeft: '5 часов',
        participants: 41,
        difficulty: 'medium'
      },
    ];

    const filteredPolls = selectedCategory === 'all'
      ? mockPolls
      : mockPolls.filter(poll => poll.category === selectedCategory);

    setPolls(filteredPolls);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPolls();
    setRefreshing(false);
  };

  const handlePollPress = (poll: Poll) => {
    if (poll.isActive) {
      router.push({
        pathname: '/polls/detail',
        params: { pollId: poll.id }
      });
    } else {
      router.push({
        pathname: '/results/detail',
        params: { pollId: poll.id }
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#4ECDC4';
      case 'medium': return '#FFA500';
      case 'hard': return '#FF6B6B';
      default: return '#636E72';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легкий';
      case 'medium': return 'Средний';
      case 'hard': return 'Сложный';
      default: return '';
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : 'help-outline';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Голосования</Text>
          <Text style={styles.headerSubtitle}>Узнай, что о тебе думают</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#2D3436" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push('/polls/create')}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategory === category.id && {
                backgroundColor: category.color,
                borderColor: category.color
              }
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Ionicons
              name={category.icon as any}
              size={20}
              color={selectedCategory === category.id ? 'white' : category.color}
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.selectedCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{polls.filter(p => p.isActive).length}</Text>
          <Text style={styles.statLabel}>Активных</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {polls.reduce((sum, p) => sum + p.participants, 0)}
          </Text>
          <Text style={styles.statLabel}>Участников</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {polls.filter(p => !p.isActive).length}
          </Text>
          <Text style={styles.statLabel}>Завершено</Text>
        </View>
      </View>

      {/* Polls List */}
      <ScrollView
        style={styles.pollsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {polls.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="chatbox-outline" size={60} color="#B8B8D0" />
            <Text style={styles.emptyTitle}>Нет активных голосований</Text>
            <Text style={styles.emptySubtitle}>
              Создайте новое голосование или приходите позже
            </Text>
            <Button
              title="Создать голосование"
              onPress={() => router.push('/polls/create')}
              variant="primary"
              size="medium"
              style={styles.createButton}
            />
          </View>
        ) : (
          polls.map((poll) => (
            <TouchableOpacity
              key={poll.id}
              style={styles.pollItem}
              onPress={() => handlePollPress(poll)}
            >
              <View style={styles.pollHeader}>
                <View style={styles.pollInfo}>
                  <Text style={styles.pollTitle}>{poll.title}</Text>
                  <View style={styles.pollMeta}>
                    <View style={styles.categoryBadge}>
                      <Ionicons
                        name={getCategoryIcon(poll.category) as any}
                        size={12}
                        color="#636E72"
                      />
                      <Text style={styles.categoryText}>
                        {categories.find(c => c.id === poll.category)?.name}
                      </Text>
                    </View>
                    <View style={[
                      styles.difficultyBadge,
                      { backgroundColor: getDifficultyColor(poll.difficulty) }
                    ]}>
                      <Text style={styles.difficultyText}>
                        {getDifficultyText(poll.difficulty)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.statusIndicator}>
                  {poll.isActive ? (
                    <View style={styles.activeIndicator}>
                      <View style={styles.activeDot} />
                      <Text style={styles.activeText}>Активно</Text>
                    </View>
                  ) : (
                    <View style={styles.completedIndicator}>
                      <Ionicons name="checkmark-circle" size={16} color="#4ECDC4" />
                      <Text style={styles.completedText}>Завершено</Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.pollStats}>
                <View style={styles.statItem}>
                  <Ionicons name="people-outline" size={16} color="#636E72" />
                  <Text style={styles.statText}>{poll.participants} участников</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="time-outline" size={16} color="#636E72" />
                  <Text style={styles.statText}>{poll.timeLeft}</Text>
                </View>
              </View>

              <View style={styles.pollProgress}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${Math.min((poll.participants / 100) * 100, 100)}%` }
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{poll.totalVotes} голосов</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 4,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
  },
  createButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636E72',
    marginLeft: 8,
  },
  selectedCategoryText: {
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 4,
  },
  pollsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  pollItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pollHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  pollInfo: {
    flex: 1,
  },
  pollTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  pollMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#636E72',
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  statusIndicator: {
    alignItems: 'flex-end',
  },
  activeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ECDC4',
    marginRight: 4,
  },
  activeText: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  completedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
    marginLeft: 4,
  },
  pollStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#636E72',
    marginLeft: 4,
  },
  pollProgress: {
    alignItems: 'flex-end',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E0E6ED',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
  },
  progressText: {
    fontSize: 12,
    color: '#636E72',
  },
});