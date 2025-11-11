import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';

interface ProfileStats {
  polls: number;
  votes: number;
  compliments: number;
  rank: string;
}

export default function ProfileMainScreen() {
  const { city, school, class: className, hasPhoto } = useLocalSearchParams<{
    city: string;
    school: string;
    class: string;
    hasPhoto: string;
  }>();

  const [profileStats, setProfileStats] = useState<ProfileStats>({
    polls: 0,
    votes: 0,
    compliments: 0,
    rank: 'Новичок'
  });

  useEffect(() => {
    // Симуляция загрузки данных профиля
    setProfileStats({
      polls: 12,
      votes: 48,
      compliments: 23,
      rank: 'Популярный'
    });
  }, []);

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  const handleNotifications = () => {
    router.push('/notifications');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const handleStartVoting = () => {
    router.push('/polls/main');
  };

  const handleViewResults = () => {
    router.push('/results/main');
  };

  const handleAbout = () => {
    router.push('/about');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Профиль</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleNotifications} style={styles.headerButton}>
            <Ionicons name="notifications-outline" size={24} color="#2D3436" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSettings} style={styles.headerButton}>
            <Ionicons name="settings-outline" size={24} color="#2D3436" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          {/* Profile Photo */}
          <View style={styles.photoContainer}>
            {hasPhoto === 'true' ? (
              <View style={styles.profilePhoto}>
                <Ionicons name="person" size={40} color="#636E72" />
              </View>
            ) : (
              <View style={styles.profilePhotoPlaceholder}>
                <Ionicons name="camera-outline" size="30" color="#B8B8D0" />
              </View>
            )}
            <TouchableOpacity style={styles.editPhotoButton}>
              <Ionicons name="pencil-outline" size={16} color="white" />
            </TouchableOpacity>
          </View>

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Александр Иванов</Text>
            <View style={styles.profileBadges}>
              <View style={styles.rankBadge}>
                <Ionicons name="trophy-outline" size={12} color="#FFD700" />
                <Text style={styles.rankText}>{profileStats.rank}</Text>
              </View>
            </View>
          </View>

          {/* Profile Details */}
          <View style={styles.profileDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="location-outline" size={16} color="#FF6B6B" />
              <Text style={styles.detailText}>{city}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="school-outline" size={16} color="#FF6B6B" />
              <Text style={styles.detailText}>{school}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="people-outline" size={16} color="#FF6B6B" />
              <Text style={styles.detailText}>{className}</Text>
            </View>
          </View>

          {/* Edit Profile Button */}
          <Button
            title="Редактировать профиль"
            onPress={handleEditProfile}
            variant="outline"
            size="medium"
            style={styles.editButton}
          />
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>Ваши достижения</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="bar-chart-outline" size={24} color="#FF6B6B" />
              </View>
              <Text style={styles.statNumber}>{profileStats.polls}</Text>
              <Text style={styles.statLabel}>Опросов</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#4ECDC4" />
              </View>
              <Text style={styles.statNumber}>{profileStats.votes}</Text>
              <Text style={styles.statLabel}>Голосов</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="heart-outline" size={24} color="#FFA500" />
              </View>
              <Text style={styles.statNumber}>{profileStats.compliments}</Text>
              <Text style={styles.statLabel}>Комплиментов</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.actionsTitle}>Быстрые действия</Text>

          <TouchableOpacity style={styles.actionItem} onPress={handleStartVoting}>
            <View style={styles.actionIcon}>
              <Ionicons name="how-to-regulation-outline" size={24} color="#FF6B6B" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Начать голосование</Text>
              <Text style={styles.actionSubtitle}>Ответьте на новые вопросы</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#B8B8D0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleViewResults}>
            <View style={styles.actionIcon}>
              <Ionicons name="podium-outline" size={24} color="#4ECDC4" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Результаты</Text>
              <Text style={styles.actionSubtitle}>Узнайте итоги голосования</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#B8B8D0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleAbout}>
            <View style={styles.actionIcon}>
              <Ionicons name="information-circle-outline" size={24} color="#636E72" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>О приложении</Text>
              <Text style={styles.actionSubtitle}>Узнайте больше о Proximol</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#B8B8D0" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
            <Text style={styles.logoutText}>Выйти из аккаунта</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhotoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#E0E6ED',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  profileBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8DC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  rankText: {
    fontSize: 12,
    color: '#2D3436',
    fontWeight: '600',
    marginLeft: 4,
  },
  profileDetails: {
    width: '100%',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#636E72',
    marginLeft: 8,
  },
  editButton: {
    width: '100%',
  },
  statsContainer: {
    marginTop: 24,
  },
  statsHeader: {
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
  },
  actionsContainer: {
    marginTop: 24,
    marginBottom: 20,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#636E72',
  },
  logoutContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 8,
  },
});