import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import Button from '@/components/common/Button';

interface Notification {
  id: string;
  type: 'poll' | 'result' | 'compliment' | 'achievement' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: {
    pollId?: string;
    resultId?: string;
    fromUser?: string;
  };
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'polls' | 'compliments'>('all');
  const [refreshing, setRefreshing] = useState(false);

  const filters = [
    { id: 'all', name: 'Все', icon: 'grid-outline' },
    { id: 'unread', name: 'Непрочитанные', icon: 'mail-unread-outline' },
    { id: 'polls', name: 'Голосования', icon: 'bar-chart-outline' },
    { id: 'compliments', name: 'Комплименты', icon: 'heart-outline' },
  ];

  useEffect(() => {
    loadNotifications();
  }, [selectedFilter]);

  const loadNotifications = async () => {
    // Симуляция загрузки уведомлений
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'result',
        title: 'Результаты готовы!',
        message: 'Голосование "Кто самый спортивный в классе?" завершено. Вы заняли 3 место!',
        timestamp: '2 часа назад',
        read: false,
        data: { resultId: '1' },
      },
      {
        id: '2',
        type: 'compliment',
        title: 'Новый комплимент',
        message: 'Анна Петрова написала вам: "Ты отличный товарищ по команде!"',
        timestamp: '3 часа назад',
        read: false,
        data: { fromUser: 'Анна Петрова' },
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Новое достижение!',
        message: 'Вы разблокировали достижение "Активный участник" за участие в 10 голосованиях',
        timestamp: '5 часов назад',
        read: true,
      },
      {
        id: '4',
        type: 'poll',
        title: 'Новое голосование',
        message: 'Голосование "Лучший математик класса" началось. Примите участие!',
        timestamp: '1 день назад',
        read: true,
        data: { pollId: '2' },
      },
      {
        id: '5',
        type: 'system',
        title: 'Обновление приложения',
        message: 'Новые функции теперь доступны! Попробуйте создавать свои голосования',
        timestamp: '2 дня назад',
        read: true,
      },
      {
        id: '6',
        type: 'compliment',
        title: 'Получен комплимент',
        message: 'Михаил Иванов: "Твои шутки всегда поднимают настроение!"',
        timestamp: '3 дня назад',
        read: true,
        data: { fromUser: 'Михаил Иванов' },
      },
    ];

    let filteredNotifications = mockNotifications;

    switch (selectedFilter) {
      case 'unread':
        filteredNotifications = filteredNotifications.filter(n => !n.read);
        break;
      case 'polls':
        filteredNotifications = filteredNotifications.filter(n => n.type === 'poll' || n.type === 'result');
        break;
      case 'compliments':
        filteredNotifications = filteredNotifications.filter(n => n.type === 'compliment');
        break;
    }

    setNotifications(filteredNotifications);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  };

  const handleNotificationPress = (notification: Notification) => {
    // Помечаем как прочитанное
    setNotifications(notifications.map(n =>
      n.id === notification.id ? { ...n, read: true } : n
    ));

    // Навигация на основе типа уведомления
    switch (notification.type) {
      case 'poll':
        if (notification.data?.pollId) {
          router.push({
            pathname: '/polls/detail',
            params: { pollId: notification.data.pollId }
          });
        }
        break;
      case 'result':
        if (notification.data?.resultId) {
          router.push({
            pathname: '/results/detail',
            params: { resultId: notification.data.resultId }
          });
        }
        break;
      case 'compliment':
        router.push('/results/compliments');
        break;
      case 'achievement':
        router.push('/results/stats');
        break;
      case 'system':
        // Показать детали системного уведомления
        break;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    const icons = {
      poll: 'bar-chart-outline',
      result: 'trophy-outline',
      compliment: 'heart-outline',
      achievement: 'star-outline',
      system: 'notifications-outline',
    };
    return icons[type as keyof typeof icons] || 'notifications-outline';
  };

  const getNotificationColor = (type: string) => {
    const colors = {
      poll: '#4ECDC4',
      result: '#FFD700',
      compliment: '#FD79A8',
      achievement: '#FFA500',
      system: '#636E72',
    };
    return colors[type as keyof typeof colors] || '#636E72';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Уведомления</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#2D3436" />
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
              selectedFilter === filter.id && styles.activeFilterItem,
            ]}
            onPress={() => setSelectedFilter(filter.id as any)}
          >
            <Ionicons
              name={filter.icon as any}
              size={20}
              color={selectedFilter === filter.id ? '#FF6B6B' : '#636E72'}
            />
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.activeFilterText,
            ]}>
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Mark All as Read */}
      {notifications.some(n => !n.read) && (
        <View style={styles.markAllContainer}>
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={handleMarkAllAsRead}
          >
            <Ionicons name="checkmark-done-outline" size={20} color="#FF6B6B" />
            <Text style={styles.markAllText}>Отметить все как прочитанные</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Notifications List */}
      <ScrollView
        style={styles.notificationsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={60} color="#B8B8D0" />
            <Text style={styles.emptyTitle}>
              {selectedFilter === 'unread' ? 'Нет непрочитанных' : 'Нет уведомлений'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {selectedFilter === 'unread'
                ? 'Все уведомления прочитаны'
                : 'Ваши уведомления появятся здесь'}
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
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationItem,
                !notification.read && styles.unreadNotification,
              ]}
              onPress={() => handleNotificationPress(notification)}
            >
              <View style={styles.notificationContent}>
                {/* Left Icon */}
                <View style={[
                  styles.notificationIcon,
                  { backgroundColor: `${getNotificationColor(notification.type)}20` }
                ]}>
                  <Ionicons
                    name={getNotificationIcon(notification.type) as any}
                    size={24}
                    color={getNotificationColor(notification.type)}
                  />
                </View>

                {/* Content */}
                <View style={styles.notificationInfo}>
                  <View style={styles.notificationHeader}>
                    <Text style={[
                      styles.notificationTitle,
                      !notification.read && styles.unreadTitle,
                    ]}>
                      {notification.title}
                    </Text>
                    <View style={styles.notificationActions}>
                      {!notification.read && (
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleMarkAsRead(notification.id)}
                        >
                          <Ionicons name="checkmark-outline" size={16} color="#636E72" />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleDeleteNotification(notification.id)}
                      >
                        <Ionicons name="trash-outline" size={16} color="#FF6B6B" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>
                  <Text style={styles.notificationTimestamp}>
                    {notification.timestamp}
                  </Text>
                </View>
              </View>

              {/* Unread Indicator */}
              {!notification.read && (
                <View style={styles.unreadIndicator} />
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Settings Link */}
      {notifications.length > 0 && (
        <TouchableOpacity style={styles.settingsLink}>
          <Ionicons name="settings-outline" size={20} color="#636E72" />
          <Text style={styles.settingsLinkText}>Настройки уведомлений</Text>
          <Ionicons name="chevron-forward" size={16} color="#636E72" />
        </TouchableOpacity>
      )}
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  unreadBadge: {
    marginLeft: 12,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  unreadCount: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  settingsButton: {
    padding: 8,
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeFilterItem: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FF6B6B',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636E72',
    marginLeft: 8,
  },
  activeFilterText: {
    color: '#FF6B6B',
  },
  markAllContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E6ED',
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  markAllText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 8,
  },
  notificationsList: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    marginBottom: 24,
  },
  findButton: {
    // Button style
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 4,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    backgroundColor: '#FFFEF0',
    borderLeftWidth: 3,
    borderLeftColor: '#FFA500',
  },
  notificationContent: {
    flexDirection: 'row',
    flex: 1,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    flex: 1,
    marginRight: 12,
  },
  unreadTitle: {
    color: '#2D3436',
  },
  notificationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#636E72',
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTimestamp: {
    fontSize: 12,
    color: '#B8B8D0',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFA500',
    marginLeft: 12,
    marginTop: 8,
  },
  settingsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingsLinkText: {
    fontSize: 16,
    color: '#2D3436',
    fontWeight: '500',
    flex: 1,
    marginLeft: 12,
  },
});