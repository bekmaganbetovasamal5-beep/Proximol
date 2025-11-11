import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import Button from '@/components/common/Button';

interface VoteResult {
  name: string;
  votes: number;
  percentage: number;
  position: number;
}

interface QuestionResult {
  id: string;
  question: string;
  type: 'single' | 'multiple';
  totalVotes: number;
  results: VoteResult[];
}

interface PollResult {
  id: string;
  title: string;
  description: string;
  category: string;
  completedAt: string;
  participants: number;
  totalQuestions: number;
  myRank: number | null;
  myVotes: { [questionId: string]: string[] };
  hasCompliments: boolean;
  questions: QuestionResult[];
}

export default function ResultsDetailScreen() {
  const { resultId } = useLocalSearchParams<{ resultId: string }>();
  const [result, setResult] = useState<PollResult | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'questions' | 'compliments'>('overview');

  useEffect(() => {
    loadResult();
  }, [resultId]);

  const loadResult = () => {
    // Симуляция загрузки детальных результатов
    const mockResult: PollResult = {
      id: resultId as string,
      title: 'Кто самый спортивный в классе?',
      description: 'Голосование за самого спортивного одноклассника',
      category: 'sports',
      completedAt: '2 часа назад',
      participants: 45,
      totalQuestions: 10,
      myRank: 3,
      myVotes: {
        '1': ['Александр'],
        '2': ['Иван'],
        '3': ['Максим'],
      },
      hasCompliments: true,
      questions: [
        {
          id: '1',
          question: 'Кто лучший бегун?',
          type: 'single',
          totalVotes: 45,
          results: [
            { name: 'Александр', votes: 28, percentage: 62, position: 1 },
            { name: 'Дмитрий', votes: 12, percentage: 27, position: 2 },
            { name: 'Елена', votes: 5, percentage: 11, position: 3 },
          ],
        },
        {
          id: '2',
          question: 'Кто лучше играет в футбол?',
          type: 'single',
          totalVotes: 45,
          results: [
            { name: 'Иван', votes: 35, percentage: 78, position: 1 },
            { name: 'Павел', votes: 8, percentage: 18, position: 2 },
            { name: 'Андрей', votes: 2, percentage: 4, position: 3 },
          ],
        },
        {
          id: '3',
          question: 'Кто самый сильный?',
          type: 'single',
          totalVotes: 45,
          results: [
            { name: 'Максим', votes: 30, percentage: 67, position: 1 },
            { name: 'Николай', votes: 10, percentage: 22, position: 2 },
            { name: 'Алексей', votes: 5, percentage: 11, position: 3 },
          ],
        },
      ],
    };

    setResult(mockResult);
  };

  const handleShareResults = async () => {
    if (!result) return;
    try {
      await Share.share({
        message: `Результаты голосования "${result.title}":\n\nУчастников: ${result.participants}\nМое место: ${result.myRank || '—'}\n\nПосмотри все результаты в Proximol!`,
        url: `https://proximol.app/results/${result.id}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleViewCompliments = () => {
    setSelectedTab('compliments');
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

  const getRankEmoji = (rank: number | null) => {
    if (!rank) return '';
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  const getBarColor = (position: number) => {
    if (position === 1) return '#FFD700';
    if (position === 2) return '#C0C0C0';
    if (position === 3) return '#CD7F32';
    return '#4ECDC4';
  };

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      {/* Poll Stats */}
      <View style={styles.pollStats}>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Ionicons name="people-outline" size={20} color="#FF6B6B" />
            <Text style={styles.statText}>{result?.participants} участников</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="bar-chart-outline" size={20} color="#4ECDC4" />
            <Text style={styles.statText}>{result?.totalQuestions} вопросов</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={20} color="#636E72" />
            <Text style={styles.statText}>{result?.completedAt}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="trophy-outline" size={20} color="#FFA500" />
            <Text style={styles.statText}>
              {getRankEmoji(result?.myRank)} {result?.myRank} место
            </Text>
          </View>
        </View>
      </View>

      {/* Category Badge */}
      <View style={styles.categoryBadge}>
        <Ionicons
          name={getCategoryIcon(result?.category || '') as any}
          size={16}
          color="#636E72"
        />
        <Text style={styles.categoryText}>
          {getCategoryName(result?.category || '')}
        </Text>
      </View>

      {/* My Performance */}
      <View style={styles.performanceSection}>
        <Text style={styles.sectionTitle}>Мои результаты</Text>
        <View style={styles.performanceCard}>
          <View style={styles.rankDisplay}>
            <Text style={styles.rankEmoji}>{getRankEmoji(result?.myRank)}</Text>
            <Text style={styles.rankNumber}>{result?.myRank}</Text>
            <Text style={styles.rankLabel}>место из {result?.participants}</Text>
          </View>
          <Text style={styles.performanceText}>
            {result?.myRank && result.myRank <= 3
              ? 'Отличный результат! Вы в тройке лидеров!'
              : 'Хороший результат! Продолжайте участвовать в голосованиях.'}
          </Text>
        </View>
      </View>

      {/* Achievement Badges */}
      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Достижения</Text>
        <View style={styles.achievementsGrid}>
          <View style={styles.achievementBadge}>
            <Ionicons name="star-outline" size={24} color="#FFD700" />
            <Text style={styles.achievementTitle}>Участник</Text>
            <Text style={styles.achievementDesc}>Приняли участие</Text>
          </View>
          <View style={styles.achievementBadge}>
            <Ionicons name="podium-outline" size={24} color="#4ECDC4" />
            <Text style={styles.achievementTitle}>Топ-5</Text>
            <Text style={styles.achievementDesc}>Попали в пятерку</Text>
          </View>
          {result?.hasCompliments && (
            <View style={styles.achievementBadge}>
              <Ionicons name="heart-outline" size={24} color="#FD79A8" />
              <Text style={styles.achievementTitle}>Популярный</Text>
              <Text style={styles.achievementDesc}>Получили комплименты</Text>
            </View>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {result?.hasCompliments && (
          <TouchableOpacity
            style={styles.complimentsButton}
            onPress={handleViewCompliments}
          >
            <Ionicons name="heart-outline" size={20} color="#FD79A8" />
            <Text style={styles.complimentsButtonText}>Посмотреть комплименты</Text>
            <Ionicons name="chevron-forward" size={16} color="#FD79A8" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderQuestions = () => (
    <View style={styles.questionsContainer}>
      {result?.questions.map((question, index) => (
        <View key={question.id} style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <View style={styles.questionNumber}>
              <Text style={styles.questionNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.questionText}>{question.question}</Text>
            <Text style={styles.questionVotes}>{question.totalVotes} голосов</Text>
          </View>

          <View style={styles.resultsList}>
            {question.results.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.resultRow}>
                <View style={styles.resultInfo}>
                  <View style={styles.positionBadge}>
                    <Text style={[
                      styles.positionText,
                      { color: getBarColor(item.position) }
                    ]}>
                      {item.position}
                    </Text>
                  </View>
                  <Text style={styles.resultName}>{item.name}</Text>
                  {result.myVotes[question.id]?.includes(item.name) && (
                    <View style={styles.myVoteBadge}>
                      <Text style={styles.myVoteText}>Мой голос</Text>
                    </View>
                  )}
                </View>
                <View style={styles.resultStats}>
                  <Text style={styles.resultPercentage}>{item.percentage}%</Text>
                  <View style={styles.resultBar}>
                    <View
                      style={[
                        styles.resultBarFill,
                        {
                          width: `${item.percentage}%`,
                          backgroundColor: getBarColor(item.position),
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.resultVotes}>{item.votes}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  const renderCompliments = () => (
    <View style={styles.complimentsContainer}>
      <Text style={styles.sectionTitle}>Ваши комплименты</Text>

      {[
        {
          from: 'Анна',
          text: 'Ты всегда так хорошо поддерживаешь команду на уроках физкультуры!',
          category: 'спорт',
        },
        {
          from: 'Михаил',
          text: 'Твоя энергия и спортивный дух вдохновляют всех вокруг',
          category: 'личность',
        },
        {
          from: 'Елена',
          text: 'Ты отличный товарищ по команде, всегда готов помочь',
          category: 'дружба',
        },
      ].map((compliment, index) => (
        <View key={index} style={styles.complimentCard}>
          <View style={styles.complimentHeader}>
            <View style={styles.complimentAvatar}>
              <Ionicons name="person-outline" size={24} color="#636E72" />
            </View>
            <View style={styles.complimentInfo}>
              <Text style={styles.complimentAuthor}>{compliment.from}</Text>
              <Text style={styles.complimentCategory}>{compliment.category}</Text>
            </View>
            <Ionicons name="heart" size={20} color="#FD79A8" />
          </View>
          <Text style={styles.complimentText}>{compliment.text}</Text>
          <View style={styles.complimentActions}>
            <TouchableOpacity style={styles.complimentAction}>
              <Ionicons name="thumbs-up-outline" size={16} color="#4ECDC4" />
              <Text style={styles.complimentActionText">Спасибо</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.complimentAction}>
              <Ionicons name="share-outline" size={16} color="#636E72" />
              <Text style={styles.complimentActionText">Поделиться</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.loadMoreButton}>
        <Text style={styles.loadMoreText}>Загрузить еще комплименты</Text>
      </TouchableOpacity>
    </View>
  );

  if (!result) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Загрузка...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Результаты</Text>
        </View>
        <TouchableOpacity onPress={handleShareResults} style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#2D3436" />
        </TouchableOpacity>
      </View>

      {/* Poll Title */}
      <View style={styles.titleSection}>
        <Text style={styles.pollTitle}>{result.title}</Text>
        <Text style={styles.pollDescription}>{result.description}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'overview' && styles.activeTab]}
          onPress={() => setSelectedTab('overview')}
        >
          <Text style={[styles.tabText, selectedTab === 'overview' && styles.activeTabText]}>
            Обзор
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'questions' && styles.activeTab]}
          onPress={() => setSelectedTab('questions')}
        >
          <Text style={[styles.tabText, selectedTab === 'questions' && styles.activeTabText]}>
            Вопросы
          </Text>
        </TouchableOpacity>
        {result.hasCompliments && (
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'compliments' && styles.activeTab]}
            onPress={() => setSelectedTab('compliments')}
          >
            <Text style={[styles.tabText, selectedTab === 'compliments' && styles.activeTabText]}>
              Комплименты
            </Text>
            <View style={styles.complimentsDot} />
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'questions' && renderQuestions()}
        {selectedTab === 'compliments' && renderCompliments()}
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
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
  },
  shareButton: {
    padding: 8,
  },
  titleSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 8,
  },
  pollTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3436',
    textAlign: 'center',
    marginBottom: 8,
  },
  pollDescription: {
    fontSize: 14,
    color: '#636E72',
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B6B',
  },
  tabText: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  complimentsDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FD79A8',
  },
  content: {
    flex: 1,
  },
  overviewContainer: {
    padding: 20,
  },
  pollStats: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 16,
    color: '#2D3436',
    marginLeft: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 14,
    color: '#636E72',
    marginLeft: 6,
    fontWeight: '500',
  },
  performanceSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 12,
  },
  performanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  rankDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  rankEmoji: {
    fontSize: 32,
    marginRight: 8,
  },
  rankNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginRight: 8,
  },
  rankLabel: {
    fontSize: 16,
    color: '#636E72',
  },
  performanceText: {
    fontSize: 16,
    color: '#2D3436',
    textAlign: 'center',
    lineHeight: 24,
  },
  achievementsSection: {
    marginBottom: 20,
  },
  achievementsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  achievementBadge: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
    marginTop: 8,
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 12,
    color: '#636E72',
    textAlign: 'center',
  },
  actionButtons: {
    gap: 12,
  },
  complimentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF0F5',
    borderRadius: 12,
    padding: 16,
  },
  complimentsButtonText: {
    fontSize: 16,
    color: '#FD79A8',
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
  questionsContainer: {
    padding: 20,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  questionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  questionNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginRight: 12,
  },
  questionVotes: {
    fontSize: 14,
    color: '#636E72',
  },
  resultsList: {
    gap: 12,
  },
  resultRow: {
    gap: 12,
  },
  resultInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  positionBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  positionText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  resultName: {
    flex: 1,
    fontSize: 16,
    color: '#2D3436',
    fontWeight: '500',
  },
  myVoteBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  myVoteText: {
    fontSize: 10,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  resultStats: {
    flex: 2,
    alignItems: 'flex-end',
  },
  resultPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  resultBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E6ED',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  resultBarFill: {
    height: '100%',
  },
  resultVotes: {
    fontSize: 12,
    color: '#636E72',
  },
  complimentsContainer: {
    padding: 20,
  },
  complimentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  complimentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  complimentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  complimentInfo: {
    flex: 1,
  },
  complimentAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 2,
  },
  complimentCategory: {
    fontSize: 12,
    color: '#636E72',
  },
  complimentText: {
    fontSize: 16,
    color: '#2D3436',
    lineHeight: 24,
    marginBottom: 16,
  },
  complimentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  complimentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  complimentActionText: {
    fontSize: 14,
    color: '#636E72',
    marginLeft: 6,
  },
  loadMoreButton: {
    alignItems: 'center',
    padding: 16,
    marginTop: 8,
  },
  loadMoreText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
});