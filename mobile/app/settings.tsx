import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import Button from '@/components/common/Button';

interface SettingItem {
  id: string;
  type: 'toggle' | 'action' | 'navigation';
  title: string;
  description?: string;
  icon: string;
  value?: boolean;
  onPress?: () => void;
  navigation?: string;
  badge?: string;
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState({
    polls: true,
    results: true,
    compliments: true,
    achievements: true,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState({
    anonymousVoting: true,
    showResults: true,
    allowCompliments: true,
    shareAchievements: true,
  });

  const [app, setApp] = useState({
    darkMode: false,
    autoPlay: false,
    soundEffects: true,
    hapticFeedback: true,
  });

  const handleLogout = () => {
    Alert.alert(
      'Выход из аккаунта',
      'Вы уверены, что хотите выйти из своего аккаунта?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: () => {
            // Здесь будет логика выхода
            router.push('/auth/start');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Удаление аккаунта',
      'Это действие нельзя отменить. Все ваши данные будут безвозвратно удалены.',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            // Здесь будет логика удаления аккаунта
            alert('Аккаунт успешно удален');
            router.push('/auth/start');
          },
        },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Очистка кэша',
      'Удалить все сохраненные данные приложения?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Очистить',
          onPress: () => {
            // Здесь будет логика очистки кэша
            alert('Кэш успешно очищен');
          },
        },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'Экспорт данных',
      'Сформируем архив со всеми вашими данными для скачивания.',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Экспортировать',
          onPress: () => {
            // Здесь будет логика экспорта данных
            alert('Запрос на экспорт данных отправлен');
          },
        },
      ]
    );
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const updatePrivacySetting = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const updateAppSetting = (key: string, value: boolean) => {
    setApp(prev => ({ ...prev, [key]: value }));
  };

  const notificationSettings: SettingItem[] = [
    {
      id: 'polls',
      type: 'toggle',
      title: 'Новые голосования',
      description: 'Уведомлять о новых голосованиях в вашей школе',
      icon: 'bar-chart-outline',
      value: notifications.polls,
    },
    {
      id: 'results',
      type: 'toggle',
      title: 'Результаты голосований',
      description: 'Сообщать, когда результаты будут готовы',
      icon: 'trophy-outline',
      value: notifications.results,
    },
    {
      id: 'compliments',
      type: 'toggle',
      title: 'Комплименты',
      description: 'Уведомлять о новых комплиментах',
      icon: 'heart-outline',
      value: notifications.compliments,
    },
    {
      id: 'achievements',
      type: 'toggle',
      title: 'Достижения',
      description: 'Сообщать о разблокировке новых достижений',
      icon: 'star-outline',
      value: notifications.achievements,
    },
    {
      id: 'marketing',
      type: 'toggle',
      title: 'Маркетинговые уведомления',
      description: 'Новости и обновления приложения',
      icon: 'megaphone-outline',
      value: notifications.marketing,
    },
  ];

  const privacySettings: SettingItem[] = [
    {
      id: 'anonymous',
      type: 'toggle',
      title: 'Анонимное голосование',
      description: 'Ваши голоса всегда остаются анонимными',
      icon: 'eye-off-outline',
      value: privacy.anonymousVoting,
    },
    {
      id: 'results',
      type: 'toggle',
      title: 'Показывать в результатах',
      description: 'Отображать ваше имя в итоговых результатах',
      icon: 'people-outline',
      value: privacy.showResults,
    },
    {
      id: 'compliments',
      type: 'toggle',
      title: 'Разрешить комплименты',
      description: 'Другие пользователи могут отправлять вам комплименты',
      icon: 'heart-outline',
      value: privacy.allowCompliments,
    },
    {
      id: 'achievements',
      type: 'toggle',
      title: 'Публичные достижения',
      description: 'Показывать достижения другим пользователям',
      icon: 'podium-outline',
      value: privacy.shareAchievements,
    },
  ];

  const appSettings: SettingItem[] = [
    {
      id: 'darkMode',
      type: 'toggle',
      title: 'Темная тема',
      description: 'Использовать темный интерфейс приложения',
      icon: 'moon-outline',
      value: app.darkMode,
    },
    {
      id: 'sound',
      type: 'toggle',
      title: 'Звуковые эффекты',
      description: 'Воспроизводить звуки при действиях',
      icon: 'volume-high-outline',
      value: app.soundEffects,
    },
    {
      id: 'haptic',
      type: 'toggle',
      title: 'Вибрация',
      description: 'Тактильная обратная связь',
      icon: 'phone-portrait-outline',
      value: app.hapticFeedback,
    },
    {
      id: 'autoPlay',
      type: 'toggle',
      title: 'Автовоспроизведение',
      description: 'Автоматически переходить к следующему вопросу',
      icon: 'play-circle-outline',
      value: app.autoPlay,
    },
  ];

  const generalSettings: SettingItem[] = [
    {
      id: 'editProfile',
      type: 'navigation',
      title: 'Редактировать профиль',
      description: 'Изменить имя, фото и другие данные',
      icon: 'person-outline',
      navigation: '/profile/main',
    },
    {
      id: 'notifications',
      type: 'navigation',
      title: 'Управление уведомлениями',
      description: 'Настроить тип и частоту уведомлений',
      icon: 'notifications-outline',
      navigation: '/notifications',
      badge: '3',
    },
    {
      id: 'language',
      type: 'action',
      title: 'Язык',
      description: 'Русский',
      icon: 'globe-outline',
      onPress: () => Alert.alert('Язык', 'В разработке: Русский, English, Қазақша'),
    },
    {
      id: 'theme',
      type: 'action',
      title: 'Тема оформления',
      description: 'Стандартная',
      icon: 'color-palette-outline',
      onPress: () => Alert.alert('Тема', 'В разработке: Стандартная, Темная, Кастомная'),
    },
  ];

  const dataSettings: SettingItem[] = [
    {
      id: 'export',
      type: 'action',
      title: 'Экспорт данных',
      description: 'Скачать копию ваших данных',
      icon: 'download-outline',
      onPress: handleExportData,
    },
    {
      id: 'cache',
      type: 'action',
      title: 'Очистить кэш',
      description: 'Удалить временные файлы',
      icon: 'trash-outline',
      onPress: handleClearCache,
    },
    {
      id: 'privacy',
      type: 'navigation',
      title: 'Политика конфиденциальности',
      description: 'Узнайте, как мы защищаем ваши данные',
      icon: 'shield-checkmark-outline',
      navigation: '/privacy',
    },
    {
      id: 'terms',
      type: 'navigation',
      title: 'Условия использования',
      description: 'Правила использования платформы',
      icon: 'document-text-outline',
      navigation: '/terms',
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    if (item.type === 'toggle') {
      return (
        <View key={item.id} style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <Ionicons name={item.icon as any} size={24} color="#636E72" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              {item.description && (
                <Text style={styles.settingDescription}>{item.description}</Text>
              )}
            </View>
          </View>
          <Switch
            value={item.value}
            onValueChange={(value) => {
              if (item.id in notifications) {
                updateNotificationSetting(item.id, value);
              } else if (item.id in privacy) {
                updatePrivacySetting(item.id, value);
              } else if (item.id in app) {
                updateAppSetting(item.id, value);
              }
            }}
            trackColor={{ false: '#E0E6ED', true: '#FF6B6B' }}
            thumbColor="#FFFFFF"
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={() => {
          if (item.type === 'action' && item.onPress) {
            item.onPress();
          } else if (item.type === 'navigation' && item.navigation) {
            router.push(item.navigation);
          }
        }}
      >
        <View style={styles.settingLeft}>
          <View style={styles.settingIcon}>
            <Ionicons name={item.icon as any} size={24} color="#636E72" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            {item.description && (
              <Text style={styles.settingDescription}>{item.description}</Text>
            )}
          </View>
        </View>
        <View style={styles.settingRight}>
          {item.badge && (
            <View style={styles.settingBadge}>
              <Text style={styles.settingBadgeText}>{item.badge}</Text>
            </View>
          )}
          <Ionicons name="chevron-forward" size={20} color="#B8B8D0" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Настройки</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Общие</Text>
          {generalSettings.map(renderSettingItem)}
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Уведомления</Text>
          {notificationSettings.map(renderSettingItem)}
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle">Конфиденциальность</Text>
          {privacySettings.map(renderSettingItem)}
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle">Приложение</Text>
          {appSettings.map(renderSettingItem)}
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle">Управление данными</Text>
          {dataSettings.map(renderSettingItem)}
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Аккаунт</Text>

          <TouchableOpacity style={styles.actionItem} onPress={handleLogout}>
            <View style={styles.actionLeft}>
              <View style={styles.actionIcon}>
                <Ionicons name="log-out-outline" size={24} color="#636E72" />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Выйти из аккаунта</Text>
                <Text style={styles.actionDescription}>Переключиться на другой аккаунт</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#B8B8D0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleDeleteAccount}>
            <View style={styles.actionLeft}>
              <View style={styles.actionIcon}>
                <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Удалить аккаунт</Text>
                <Text style={styles.actionDescriptionDanger}>
                  Безвозвратно удалить все данные
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#B8B8D0" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.footerSection}>
          <Text style={styles.appInfo}>Proximol</Text>
          <Text style={styles.versionInfo}>Версия 1.0.0</Text>
          <Text style={styles.buildInfo}>Сборка 2024.11.11</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>О приложении</Text>
            </TouchableOpacity>
            <Text style={styles.footerSeparator}>•</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Поддержка</Text>
            </TouchableOpacity>
          </View>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3436',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#636E72',
  },
  settingRight: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  settingBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  settingBadgeText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontWeight: '500',
    color: '#2D3436',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: '#636E72',
  },
  actionDescriptionDanger: {
    color: '#FF6B6B',
  },
  footerSection: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    alignItems: 'center',
  },
  appInfo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 4,
  },
  versionInfo: {
    fontSize: 16,
    color: '#636E72',
    marginBottom: 2,
  },
  buildInfo: {
    fontSize: 14,
    color: '#B8B8D0',
    marginBottom: 16,
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