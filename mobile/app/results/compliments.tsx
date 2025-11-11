import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/common/Button';

interface Compliment {
  id: string;
  from: string;
  fromAvatar?: string;
  text: string;
  category: string;
  timestamp: string;
  isLiked: boolean;
  pollTitle: string;
}

export default function ResultsComplimentsScreen() {
  const [compliments, setCompliments] = useState<Compliment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filter, setFilter] = useState<'newest' | 'oldest' | 'liked'>('newest');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const categories = [
    { id: 'all', name: 'Все', color: '#FF6B6B' },
    { id: 'спорт', name: 'Спорт', color: '#4ECDC4' },
    { id: 'учеба', name: 'Учеба', color: '#6C5CE7' },
    { id: 'личность', name: 'Личность', color: '#FD79A8' },
    { id: 'дружба', name: 'Дружба', color: '#FFA500' },
    { id: 'юмор', name: 'Юмор', color: '#2ECC71' },
  ];

  const filters = [
    { id: 'newest', name: 'Новые', icon: 'time-outline' },
    { id: 'oldest', name: 'Старые', icon: 'calendar-outline' },
    { id: 'liked', name: 'Понравившиеся', icon: 'heart-outline' },
  ];

  useEffect(() => {
    loadCompliments();
    animateIn();
  }, [selectedCategory, filter]);

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const loadCompliments = () => {
    // Симуляция загрузки комплиментов
    const mockCompliments: Compliment[] = [
      {
        id: '1',
        from: 'Анна Петрова',
        text: 'Ты всегда так хорошо поддерживаешь команду на уроках физкультуры! Настоящий лидер!',
        category: 'спорт',
        timestamp: '2 часа назад',
        isLiked: true,
        pollTitle: 'Кто самый спортивный в классе?',
      },
      {
        id: '2',
        from: 'Михаил Иванов',
        text: 'Твоя энергия и спортивный дух вдохновляют всех вокруг. Продолжай в том же духе!',
        category: 'личность',
        timestamp: '3 часа назад',
        isLiked: false,
        pollTitle: 'Кто самый спортивный в классе?',
      },
      {
        id: '3',
        from: 'Елена Смирнова',
        text: 'Ты отличный товарищ по команде, всегда готов помочь и поддержать. Надежный друг!',
        category: 'дружба',
        timestamp: '5 часов назад',
        isLiked: true,
        pollTitle: 'Лучший друг класса',
      },
      {
        id: '4',
        from: 'Дмитрий Козлов',
        text: 'Твои шутки всегда поднимают настроение! У тебя отличное чувство юмора',
        category: 'юмор',
        timestamp: '1 день назад',
        isLiked: false,
        pollTitle: 'Кто самый смешной в классе?',
      },
      {
        id: '5',
        from: 'Мария Волкова',
        text: 'Ты так разбираешься в математике, всегда готов помочь с задачами. Молодец!',
        category: 'учеба',
        timestamp: '2 дня назад',
        isLiked: true,
        pollTitle: 'Лучший математик класса',
      },
    ];

    let filteredCompliments = mockCompliments;

    // Фильтр по категории
    if (selectedCategory !== 'all') {
      filteredCompliments = filteredCompliments.filter(c => c.category === selectedCategory);
    }

    // Фильтр по времени/популярности
    switch (filter) {
      case 'oldest':
        filteredCompliments = filteredCompliments.reverse();
        break;
      case 'liked':
        filteredCompliments = filteredCompliments.filter(c => c.isLiked);
        break;
    }

    setCompliments(filteredCompliments);
  };

  const handleLikeCompliment = (id: string) => {
    setCompliments(compliments.map(compliment =>
      compliment.id === id
        ? { ...compliment, isLiked: !compliment.isLiked }
        : compliment
    ));
  };

  const handleShareCompliment = async (compliment: Compliment) => {
    try {
      // В реальном приложении здесь будет Share API
      alert(`Поделиться комплиментом от ${compliment.from}`);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleReplyToCompliment = (compliment: Compliment) => {
    // В реальном приложении здесь будет открытие чата
    alert(`Ответить ${compliment.from}`);
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : '#636E72';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Комплименты</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#2D3436" />
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <Animated.View
        style={[
          styles.heroSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.heroIcon}>
          <Ionicons name="heart" size={40} color="#FD79A8" />
        </View>
        <Text style={styles.heroTitle}>Ваши комплименты</Text>
        <Text style={styles.heroSubtitle}>
          То, что о вас думают ваши одноклассники
        </Text>
        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNumber}>{compliments.length}</Text>
            <Text style={styles.heroStatLabel}>Всего</Text>
          </View>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNumber}>
              {compliments.filter(c => c.isLiked).length}
            </Text>
            <Text style={styles.heroStatLabel}>Понравились</Text>
          </View>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNumber}>
              {categories.length - 1}
            </Text>
            <Text style={styles.heroStatLabel}>Категорий</Text>
          </View>
        </View>
      </Animated.View>

      {/* Category Filter */}
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
                borderColor: category.color,
              },
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.selectedCategoryText,
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter Options */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filterOption) => (
            <TouchableOpacity
              key={filterOption.id}
              style={[
                styles.filterItem,
                filter === filterOption.id && styles.activeFilterItem,
              ]}
              onPress={() => setFilter(filterOption.id as any)}
            >
              <Ionicons
                name={filterOption.icon as any}
                size={16}
                color={filter === filterOption.id ? '#FF6B6B' : '#636E72'}
              />
              <Text style={[
                styles.filterText,
                filter === filterOption.id && styles.activeFilterText,
              ]}>
                {filterOption.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Compliments List */}
      <ScrollView
        style={styles.complimentsList}
        showsVerticalScrollIndicator={false}
      >
        {compliments.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-dislike-outline" size={60} color="#B8B8D0" />
            <Text style={styles.emptyTitle}>Нет комплиментов</Text>
            <Text style={styles.emptySubtitle}>
              Принимайте участие в голосованиях, чтобы получать комплименты
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
          compliments.map((compliment, index) => (
            <Animated.View
              key={compliment.id}
              style={[
                styles.complimentCard,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30 + index * 10, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              {/* Header */}
              <View style={styles.complimentHeader}>
                <View style={styles.authorInfo}>
                  <View style={styles.authorAvatar}>
                    <Ionicons name="person-outline" size={24} color="#636E72" />
                  </View>
                  <View style={styles.authorDetails}>
                    <Text style={styles.authorName}>{compliment.from}</Text>
                    <Text style={styles.timestamp}>{compliment.timestamp}</Text>
                  </View>
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={[
                    styles.categoryBadgeText,
                    { color: getCategoryColor(compliment.category) }
                  ]}>
                    {compliment.category}
                  </Text>
                </View>
              </View>

              {/* Poll Reference */}
              <View style={styles.pollReference}>
                <Ionicons name="bar-chart-outline" size={14} color="#636E72" />
                <Text style={styles.pollText}>{compliment.pollTitle}</Text>
              </View>

              {/* Compliment Text */}
              <Text style={styles.complimentText}>{compliment.text}</Text>

              {/* Actions */}
              <View style={styles.complimentActions}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    compliment.isLiked && styles.likedActionButton,
                  ]}
                  onPress={() => handleLikeCompliment(compliment.id)}
                >
                  <Ionicons
                    name={compliment.isLiked ? 'heart' : 'heart-outline'}
                    size={20}
                    color={compliment.isLiked ? '#FD79A8' : '#636E72'}
                  />
                  <Text style={[
                    styles.actionText,
                    compliment.isLiked && styles.likedActionText,
                  ]}>
                    {compliment.isLiked ? 'Нравится' : 'Понравилось'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleShareCompliment(compliment)}
                >
                  <Ionicons name="share-outline" size={20} color="#636E72" />
                  <Text style={styles.actionText}>Поделиться</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleReplyToCompliment(compliment)}
                >
                  <Ionicons name="chatbubble-outline" size={20} color="#636E72" />
                  <Text style={styles.actionText}>Ответить</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="gift-outline" size={24} color="white" />
      </TouchableOpacity>
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
  settingsButton: {
    padding: 8,
  },
  heroSection: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 8,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF0F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    marginBottom: 24,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  heroStat: {
    alignItems: 'center',
  },
  heroStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FD79A8',
    marginBottom: 4,
  },
  heroStatLabel: {
    fontSize: 12,
    color: '#636E72',
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636E72',
  },
  selectedCategoryText: {
    color: 'white',
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E6ED',
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
  },
  activeFilterItem: {
    backgroundColor: '#FFF5F5',
  },
  filterText: {
    fontSize: 14,
    color: '#636E72',
    marginLeft: 6,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FF6B6B',
  },
  complimentsList: {
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
    // Button style
  },
  complimentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  complimentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#636E72',
  },
  categoryBadge: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  pollReference: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  pollText: {
    fontSize: 12,
    color: '#4ECDC4',
    marginLeft: 4,
    fontWeight: '500',
  },
  complimentText: {
    fontSize: 16,
    color: '#2D3436',
    lineHeight: 24,
    marginBottom: 16,
  },
  complimentActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    flex: 1,
    justifyContent: 'center',
  },
  likedActionButton: {
    backgroundColor: '#FFF0F5',
  },
  actionText: {
    fontSize: 14,
    color: '#636E72',
    marginLeft: 6,
    fontWeight: '500',
  },
  likedActionText: {
    color: '#FD79A8',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});