import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import Button from '@/components/common/Button';

interface Result {
  id: string;
  title: string;
  category: string;
  totalVotes: number;
  participants: number;
  completedAt: string;
  myRank: number | null;
  hasCompliments: boolean;
  status: 'completed' | 'processing';
}

export default function ResultsMainScreen() {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const filters = [
    { id: 'all', name: 'Все', icon: 'grid-outline', color: '#FF6B6B' },
    { id: 'completed', name: 'Завершенные', icon: 'checkmark-circle-outline', color: '#4ECDC4' },
    { id: 'my', name: 'Мои результаты', icon: 'person-outline', color: '#6C5CE7' },
    { id: 'compliments', name: 'Комплименты', icon: 'heart-outline', color: '#FD79A8' },
  ];

  useEffect(() => {
    loadResults();
  }, [selectedFilter]);

  const loadResults = async () => {
    // Симуляция загрузки результатов
    const mockResults: Result[] = [
      {
        id: '1',
        title: 'Кто самый спортивный в классе?',
        category: 'sports',
        totalVotes: 225,
        participants: 45,
        completedAt: '2 часа назад',
        myRank: 3,
        hasCompliments: true,
        status: 'completed',
      },
      {
        id: '2',
        title: 'Лучший математик',
        category: 'study',
        totalVotes: 190,
        participants: 38,
        completedAt: '1 день назад',
        myRank: 1,
        hasCompliments: true,
        status: 'completed',
      },
      {
        id: '3',
        title: 'Кто самый смешной?',
        category: 'personality',
        totalVotes: 335,
        participants: 67,
        completedAt: '3 дня назад',
        myRank: 5,
        hasCompliments: true,
        status: 'completed',
      },
      {
        id: '4',
        title: 'Королева бала',
        category: 'entertainment',
        totalVotes: 205,
        participants: 41,
        completedAt: 'неделю назад',
        myRank: null,
        hasCompliments: false,
        status: 'completed',
      },
      {
        id: '5',
        title: 'Лучший друг',
        category: 'personality',
        totalVotes: 260,
        participants: 52,
        completedAt: 'Обрабатывается',
        myRank: null,
        hasCompliments: false,
        status: 'processing',
      },
    ];

    let filteredResults = mockResults;

    switch (selectedFilter) {
      case 'completed':
        filteredResults = mockResults.filter(r => r.status === 'completed');
        break;
      case 'my':
        filteredResults = mockResults.filter(r => r.myRank !== null);
        break;
      case 'compliments':
        filteredResults = mockResults.filter(r => r.hasCompliments);
        break;
    }

    setResults(filteredResults);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadResults();
    setRefreshing(false);
  };

  const handleResultPress = (result: Result) => {
    if (result.status === 'completed') {
      router.push({
        pathname: '/results/detail',
        params: { resultId: result.id }
      });
    } else {
      // Показать уведомление об обработке
      alert('Результаты обрабатываются. Подождите немного.');
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      sports: 'football-outline',
      study: 'book-outline',
      personality: 'person-outline',
      entertainment: 'game-controller-outline',
    };
    return icons[category as keyof typeof icons] || 'help-outline';
  };

  const getCategoryName = (category: string) => {
    const names = {
      sports: 'Спорт',
      study: 'Учеба',
      personality: 'Личность',
      entertainment: 'Развлечения',
    };
    return names[category as keyof typeof names] || 'Другое';
  };

  const getRankColor = (rank: number | null) => {
    if (!rank) return '#636E72';
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    if (rank <= 5) return '#4ECDC4';
    return '#636E72';
  };

  const getRankEmoji = (rank: number | null) => {
    if (!rank) return '';
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Результаты</Text>
          <Text style={styles.headerSubtitle}>Узнайте итоги голосований</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="funnel-outline" size={24} color="#2D3436" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search-outline" size={24} color="#2D3436" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterItem,
              selectedFilter === filter.id && {
                backgroundColor: filter.color,
                borderColor: filter.color
              }
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Ionicons
              name={filter.icon as any}
              size={20}
              color={selectedFilter === filter.id ? 'white' : filter.color}
            />
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.selectedFilterText
            ]}>
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{results.filter(r => r.status === 'completed').length}</Text>
          <Text style={styles.statLabel}>Завершено</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {results.reduce((sum, r) => sum + r.participants, 0)}
          </Text>
          <Text style={styles.statLabel}>Участников</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {results.filter(r => r.myRank && r.myRank <= 3).length}
          </Text>
          <Text style={styles.statLabel}>Топ-3</Text>
        </View>
      </View>

      {/* Results List */}
      <ScrollView
        style={styles.resultsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {results.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="bar-chart-outline" size={60} color="#B8B8D0" />
            <Text style={styles.emptyTitle}>Нет результатов</Text>
            <Text style={styles.emptySubtitle}>
              Завершенные голосования появятся здесь
            </Text>
            <Button
              title="Найти голосования"
              onPress={() => router.push('/polls/main')}
              variant="primary"
              size="medium"
              style={styles.findButton}
            />
          </View>
        ) : (
          results.map((result) => (
            <TouchableOpacity
              key={result.id}
              style={styles.resultItem}
              onPress={() => handleResultPress(result)}
            >
              <View style={styles.resultHeader}>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle}>{result.title}</Text>
                  <View style={styles.resultMeta}>
                    <View style={styles.categoryBadge}>
                      <Ionicons
                        name={getCategoryIcon(result.category) as any}
                        size={12}
                        color="#636E72"
                      />
                      <Text style={styles.categoryText}>
                        {getCategoryName(result.category)}
                      </Text>
                    </View>
                    {result.myRank && (
                      <View style={styles.rankBadge}>
                        <Text style={styles.rankText}>
                          {getRankEmoji(result.myRank)} {result.myRank} место
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.statusIndicator}>
                  {result.status === 'processing' ? (
                    <View style={styles.processingIndicator}>
                      <View style={styles.processingDot} />
                      <Text style={styles.processingText}>Обработка</Text>
                    </View>
                  ) : (
                    <View style={styles.completedIndicator}>
                      <Ionicons name="checkmark-circle" size={16} color="#4ECDC4" />
                      <Text style={styles.completedText}>Завершено</Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.resultStats}>
                <View style={styles.statItem}>
                  <Ionicons name="people-outline" size={16} color="#636E72" />
                  <Text style={styles.statItemText}>{result.participants} участников</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="bar-chart-outline" size={16} color="#636E72" />
                  <Text style={styles.statItemText}>{result.totalVotes} голосов</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="time-outline" size={16} color="#636E72" />
                  <Text style={styles.statItemText}>{result.completedAt}</Text>
                </View>
              </View>

              {result.hasCompliments && (
                <View style={styles.complimentsBadge}>
                  <Ionicons name="heart-outline" size={16} color="#FD79A8" />
                  <Text style={styles.complimentsText}>Есть комплименты</Text>
                </View>
              )}

              {result.myRank && (
                <View style={styles.myRankContainer}>
                  <Text style={styles.myRankLabel}>Ваш результат:</Text>
                  <View style={styles.myRankBadge}>
                    <Text style={[
                      styles.myRankText,
                      { color: getRankColor(result.myRank) }
                    ]}>
                      {getRankEmoji(result.myRank)} {result.myRank} место из {result.participants}
                    </Text>
                  </View>
                </View>
              )}
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
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636E72',
    marginLeft: 8,
  },
  selectedFilterText: {
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    color: '#FF6B6B',
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 4,
  },
  resultsList: {
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
  findButton: {
    // Button styles
  },
  resultItem: {
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
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  resultMeta: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
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
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8DC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rankText: {
    fontSize: 12,
    color: '#2D3436',
    fontWeight: '600',
  },
  statusIndicator: {
    alignItems: 'flex-end',
  },
  processingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  processingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFA500',
    marginRight: 4,
  },
  processingText: {
    fontSize: 12,
    color: '#FFA500',
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
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItemText: {
    fontSize: 14,
    color: '#636E72',
    marginLeft: 4,
  },
  complimentsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  complimentsText: {
    fontSize: 14,
    color: '#FD79A8',
    fontWeight: '500',
    marginLeft: 6,
  },
  myRankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myRankLabel: {
    fontSize: 14,
    color: '#636E72',
  },
  myRankBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  myRankText: {
    fontSize: 14,
    fontWeight: '600',
  },
});