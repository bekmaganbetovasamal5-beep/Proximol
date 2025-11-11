import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/common/Button';

interface ShareResult {
  id: string;
  title: string;
  myRank: number;
  participants: number;
  category: string;
  completedAt: string;
  achievements: string[];
}

export default function ResultsShareScreen() {
  const { resultId } = useLocalSearchParams<{ resultId: string }>();
  const [selectedTemplate, setSelectedTemplate] = useState<'achievement' | 'ranking' | 'compliments'>('achievement');
  const [customMessage, setCustomMessage] = useState('');
  const [includeStats, setIncludeStats] = useState(true);
  const [includeRanking, setIncludeRanking] = useState(true);
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const mockResult: ShareResult = {
    id: resultId as string,
    title: 'Кто самый спортивный в классе?',
    myRank: 3,
    participants: 45,
    category: 'Спорт',
    completedAt: '2 часа назад',
    achievements: ['🥇 3 место', '❤️ 5 комплиментов', '⭐ 15 очков'],
  };

  const shareTemplates = [
    {
      id: 'achievement',
      name: 'Достижение',
      icon: 'trophy-outline',
      preview: 'Я занял(а) 3 место в голосовании!',
    },
    {
      id: 'ranking',
      name: 'Рейтинг',
      icon: 'podium-outline',
      preview: 'Результаты голосования в нашем классе',
    },
    {
      id: 'compliments',
      name: 'Комплименты',
      icon: 'heart-outline',
      preview: 'Получил(а) 5 классных комплиментов',
    },
  ];

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: 'logo-whatsapp',
      color: '#25D366',
    },
    {
      name: 'Telegram',
      icon: 'send-outline',
      color: '#0088CC',
    },
    {
      name: 'Instagram',
      icon: 'logo-instagram',
      color: '#E4405F',
    },
    {
      name: 'Скопировать',
      icon: 'copy-outline',
      color: '#636E72',
    },
  ];

  useEffect(() => {
    animateIn();
  }, []);

  const animateIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getShareMessage = () => {
    let message = '';

    switch (selectedTemplate) {
      case 'achievement':
        message = `🎉 Я занял(а) ${mockResult.myRank} место в голосовании "${mockResult.title}" среди ${mockResult.participants} участников!`;
        if (includeStats) {
          message += `\n\n📊 ${mockResult.achievements.join(' • ')}`;
        }
        break;
      case 'ranking':
        message = `📊 Результаты голосования "${mockResult.title}" в нашем классе!`;
        if (includeRanking) {
          message += `\n\nУчастников: ${mockResult.participants}\nКатегория: ${mockResult.category}\nЗавершено: ${mockResult.completedAt}`;
        }
        break;
      case 'compliments':
        message = `💕 Получил(а) ${mockResult.achievements[1]} в голосовании "${mockResult.title}"!`;
        break;
    }

    if (customMessage) {
      message += `\n\n${customMessage}`;
    }

    message += '\n\n🔗 Присоединяйся к Proximol и узнай, что о тебе думают!';
    message += '\n📱 https://proximol.app';

    return message;
  };

  const handleShare = async (platform?: string) => {
    const message = getShareMessage();

    try {
      if (platform === 'Скопировать') {
        // В реальном приложении здесь будет копирование в буфер обмена
        alert('Ссылка скопирована в буфер обмена!');
        return;
      }

      await Share.share({
        message,
        title: 'Результаты голосования Proximol',
        url: 'https://proximol.app',
      });
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Ошибка при попытке поделиться');
    }
  };

  const getPreviewCard = () => {
    const backgroundColors = {
      achievement: 'linear-gradient(135deg, #FFD700, #FFA500)',
      ranking: 'linear-gradient(135deg, #4ECDC4, #6C5CE7)',
      compliments: 'linear-gradient(135deg, #FD79A8, #FF6B6B)',
    };

    return (
      <Animated.View
        style={[
          styles.previewCard,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.previewHeader}>
          <View style={styles.previewLogo}>
            <Ionicons name="people-circle-outline" size={32} color="white" />
            <Text style={styles.previewLogoText}>Proximol</Text>
          </View>
          <View style={styles.previewBadge}>
            <Text style={styles.previewBadgeText}>
              {mockResult.completedAt}
            </Text>
          </View>
        </View>

        <View style={styles.previewContent}>
          <Text style={styles.previewTitle}>{mockResult.title}</Text>

          {selectedTemplate === 'achievement' && (
            <View style={styles.previewAchievement}>
              <Text style={styles.previewRank}>🥇 {mockResult.myRank} место</Text>
              <View style={styles.previewStats}>
                {mockResult.achievements.map((achievement, index) => (
                  <Text key={index} style={styles.previewAchievementItem}>
                    {achievement}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {selectedTemplate === 'ranking' && (
            <View style={styles.previewRanking}>
              <Text style={styles.previewRankText}>
                Участников: {mockResult.participants}
              </Text>
              <Text style={styles.previewRankText}>
                Категория: {mockResult.category}
              </Text>
            </View>
          )}

          {selectedTemplate === 'compliments' && (
            <View style={styles.previewCompliments}>
              <Ionicons name="heart" size={40} color="#FD79A8" />
              <Text style={styles.previewComplimentsText}>
                {mockResult.achievements[1]}
              </Text>
            </View>
          )}

          {customMessage && (
            <View style={styles.previewCustomMessage}>
              <Text style={styles.previewCustomMessageText}>"{customMessage}"</Text>
            </View>
          )}
        </View>

        <View style={styles.previewFooter}>
          <Text style={styles.previewFooterText}>
            Присоединяйся и узнай, что о тебе думают!
          </Text>
        </View>
      </Animated.View>
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
        <Text style={styles.headerTitle}>Поделиться результатами</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close-outline" size={24} color="#2D3436" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Preview Card */}
        <View style={styles.previewSection}>
          <Text style={styles.sectionTitle}>Предпросмотр</Text>
          {getPreviewCard()}
        </View>

        {/* Template Selection */}
        <View style={styles.templateSection}>
          <Text style={styles.sectionTitle}>Шаблон</Text>
          <View style={styles.templateGrid}>
            {shareTemplates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[
                  styles.templateCard,
                  selectedTemplate === template.id && styles.selectedTemplateCard,
                ]}
                onPress={() => setSelectedTemplate(template.id as any)}
              >
                <View style={styles.templateIcon}>
                  <Ionicons
                    name={template.icon as any}
                    size={24}
                    color={selectedTemplate === template.id ? '#FF6B6B' : '#636E72'}
                  />
                </View>
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templatePreview}>{template.preview}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Custom Message */}
        <View style={styles.messageSection}>
          <Text style={styles.sectionTitle}>Личное сообщение</Text>
          <Text style={styles.sectionSubtitle}>
            Добавьте собственное сообщение (необязательно)
          </Text>
          <TextInput
            style={styles.messageInput}
            placeholder="Расскажите о своих впечатлениях..."
            value={customMessage}
            onChangeText={setCustomMessage}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            maxLength={200}
          />
          <Text style={styles.charCount}>{customMessage.length}/200</Text>
        </View>

        {/* Additional Options */}
        <View style={styles.optionsSection}>
          <Text style={styles.sectionTitle}>Дополнительные настройки</Text>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => setIncludeStats(!includeStats)}
          >
            <View style={styles.optionLeft}>
              <View style={styles.checkbox}>
                <View style={[styles.checkboxInner, includeStats && styles.checkboxChecked]}>
                  {includeStats && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
              </View>
              <View>
                <Text style={styles.optionTitle}>Включить статистику</Text>
                <Text style={styles.optionDescription}>
                  Показать достижения и баллы
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => setIncludeRanking(!includeRanking)}
          >
            <View style={styles.optionLeft}>
              <View style={styles.checkbox}>
                <View style={[styles.checkboxInner, includeRanking && styles.checkboxChecked]}>
                  {includeRanking && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
              </View>
              <View>
                <Text style={styles.optionTitle}>Включить рейтинг</Text>
                <Text style={styles.optionDescription}>
                  Показать место и количество участников
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Share Options */}
        <View style={styles.shareSection}>
          <Text style={styles.sectionTitle">Отправить в</Text>
          <View style={styles.shareGrid}>
            {shareOptions.map((option) => (
              <TouchableOpacity
                key={option.name}
                style={styles.shareOption}
                onPress={() => handleShare(option.name)}
              >
                <View style={[styles.shareIcon, { backgroundColor: `${option.color}20` }]}>
                  <Ionicons
                    name={option.icon as any}
                    size={24}
                    color={option.color}
                  />
                </View>
                <Text style={styles.shareOptionText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Main Action Button */}
        <View style={styles.actionContainer}>
          <Button
            title="Поделиться результатами"
            onPress={() => handleShare()}
            variant="primary"
            size="large"
            style={styles.shareButton}
          />
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
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 16,
  },
  previewSection: {
    marginBottom: 24,
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    padding: 16,
  },
  previewLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewLogoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  previewBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  previewBadgeText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  previewContent: {
    padding: 20,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    textAlign: 'center',
    marginBottom: 16,
  },
  previewAchievement: {
    alignItems: 'center',
    marginBottom: 16,
  },
  previewRank: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 12,
  },
  previewStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  previewAchievementItem: {
    fontSize: 14,
    color: '#636E72',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  previewRanking: {
    alignItems: 'center',
    gap: 8,
  },
  previewRankText: {
    fontSize: 16,
    color: '#2D3436',
  },
  previewCompliments: {
    alignItems: 'center',
    gap: 8,
  },
  previewComplimentsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FD79A8',
    textAlign: 'center',
  },
  previewCustomMessage: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  previewCustomMessageText: {
    fontSize: 14,
    color: '#636E72',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  previewFooter: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    alignItems: 'center',
  },
  previewFooterText: {
    fontSize: 12,
    color: '#636E72',
    textAlign: 'center',
  },
  templateSection: {
    marginBottom: 24,
  },
  templateGrid: {
    gap: 12,
  },
  templateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTemplateCard: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FF6B6B',
  },
  templateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  templatePreview: {
    fontSize: 14,
    color: '#636E72',
  },
  messageSection: {
    marginBottom: 24,
  },
  messageInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2D3436',
    borderWidth: 1,
    borderColor: '#E0E6ED',
    minHeight: 80,
    marginBottom: 8,
  },
  charCount: {
    fontSize: 12,
    color: '#636E72',
    textAlign: 'right',
  },
  optionsSection: {
    marginBottom: 24,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    marginRight: 16,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#B8B8D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#636E72',
  },
  shareSection: {
    marginBottom: 24,
  },
  shareGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  shareOption: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  shareIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  shareOptionText: {
    fontSize: 14,
    color: '#2D3436',
    fontWeight: '500',
  },
  actionContainer: {
    marginBottom: 32,
  },
  shareButton: {
    // Button style
  },
});