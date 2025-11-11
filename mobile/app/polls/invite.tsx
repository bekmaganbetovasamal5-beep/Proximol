import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, TextInput, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '@/components/common/Button';

export default function PollInviteScreen() {
  const { pollId } = useLocalSearchParams<{ pollId: string }>();
  const [inviteLink, setInviteLink] = useState('https://proximol.app/poll/12345');
  const [customMessage, setCustomMessage] = useState(
    'Привет! Присоединяйся к голосованию в Proximol и узнай, что о тебе думают!'
  );
  const [copiedLink, setCopiedLink] = useState(false);

  const mockPoll = {
    id: pollId,
    title: 'Кто самый спортивный в классе?',
    participants: 45,
    maxParticipants: 100,
  };

  const inviteOptions = [
    {
      id: 'share',
      title: 'Поделиться ссылкой',
      description: 'Отправить ссылку в мессенджер',
      icon: 'share-outline',
      color: '#4ECDC4',
    },
    {
      id: 'copy',
      title: 'Копировать ссылку',
      description: 'Скопировать для отправки друзьям',
      icon: 'copy-outline',
      color: '#FF6B6B',
    },
    {
      id: 'qr',
      title: 'QR-код',
      description: 'Показать QR-код для сканирования',
      icon: 'qr-code-outline',
      color: '#6C5CE7',
    },
    {
      id: 'classmates',
      title: 'Пригласить одноклассников',
      description: 'Найти и пригласить из списка',
      icon: 'people-outline',
      color: '#FFA500',
    },
  ];

  const handleShareLink = async () => {
    try {
      await Share.share({
        message: `${customMessage}\n\nСсылка на голосование: ${inviteLink}`,
        url: inviteLink,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopyLink = () => {
    // В реальном приложении здесь будет копирование в буфер обмена
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShowQR = () => {
    Alert.alert(
      'QR-код',
      'Покажите QR-код друзьям для быстрого присоединения к голосованию',
      [
        { text: 'Ок', onPress: () => {} },
      ]
    );
  };

  const handleInviteClassmates = () => {
    Alert.alert(
      'Поиск одноклассников',
      'Здесь будет список ваших одноклассников для приглашения',
      [
        { text: 'Ок', onPress: () => {} },
      ]
    );
  };

  const handleInviteOption = (optionId: string) => {
    switch (optionId) {
      case 'share':
        handleShareLink();
        break;
      case 'copy':
        handleCopyLink();
        break;
      case 'qr':
        handleShowQR();
        break;
      case 'classmates':
        handleInviteClassmates();
        break;
    }
  };

  const handleInviteSpecific = (method: string) => {
    const messages = {
      whatsapp: 'Открыть WhatsApp для отправки приглашения',
      telegram: 'Открыть Telegram для отправки приглашения',
      sms: 'Открыть сообщения для отправки SMS',
    };

    Alert.alert(
      `Приглашение через ${method}`,
      messages[method as keyof typeof messages] || 'Отправить приглашение',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Отправить', onPress: () => {} },
      ]
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
        <Text style={styles.headerTitle}>Пригласить друзей</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close-outline" size={24} color="#2D3436" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Poll Info */}
        <View style={styles.pollInfo}>
          <View style={styles.pollCard}>
            <Text style={styles.pollTitle}>{mockPoll.title}</Text>
            <View style={styles.pollStats}>
              <View style={styles.statItem}>
                <Ionicons name="people-outline" size={16} color="#FF6B6B" />
                <Text style={styles.statText}>
                  {mockPoll.participants}/{mockPoll.maxParticipants} участников
                </Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={16} color="#FF6B6B" />
                <Text style={styles.statText}>2 дня осталось</Text>
              </View>
            </View>
            <View style={styles.participantsBar}>
              <View
                style={[
                  styles.participantsFill,
                  { width: `${(mockPoll.participants / mockPoll.maxParticipants) * 100}%` },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Invite Message */}
        <View style={styles.messageSection}>
          <Text style={styles.sectionTitle}>Сообщение для приглашения</Text>
          <View style={styles.messageContainer}>
            <TextInput
              style={styles.messageInput}
              value={customMessage}
              onChangeText={setCustomMessage}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              placeholder="Добавьте личное сообщение..."
            />
            <Text style={styles.charCount}>{customMessage.length}/200</Text>
          </View>
        </View>

        {/* Invite Options */}
        <View style={styles.optionsSection}>
          <Text style={styles.sectionTitle}>Способы приглашения</Text>
          <View style={styles.optionsGrid}>
            {inviteOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionCard}
                onPress={() => handleInviteOption(option.id)}
              >
                <View style={[styles.optionIcon, { backgroundColor: `${option.color}20` }]}>
                  <Ionicons name={option.icon as any} size={28} color={option.color} />
                </View>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Share */}
        <View style={styles.quickShareSection}>
          <Text style={styles.sectionTitle}>Быстрая отправка</Text>
          <View style={styles.quickShareButtons}>
            <TouchableOpacity
              style={styles.quickShareButton}
              onPress={() => handleInviteSpecific('whatsapp')}
            >
              <View style={[styles.quickShareIcon, { backgroundColor: '#25D366' }]}>
                <Ionicons name="logo-whatsapp" size={20} color="white" />
              </View>
              <Text style={styles.quickShareText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickShareButton}
              onPress={() => handleInviteSpecific('telegram')}
            >
              <View style={[styles.quickShareIcon, { backgroundColor: '#0088CC' }]}>
                <Ionicons name="send-outline" size={20} color="white" />
              </View>
              <Text style={styles.quickShareText}>Telegram</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickShareButton}
              onPress={() => handleInviteSpecific('sms')}
            >
              <View style={[styles.quickShareIcon, { backgroundColor: '#6C5CE7' }]}>
                <Ionicons name="chatbubble-outline" size={20} color="white" />
              </View>
              <Text style={styles.quickShareText}>SMS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickShareButton}
              onPress={handleShareLink}
            >
              <View style={[styles.quickShareIcon, { backgroundColor: '#FF6B6B' }]}>
                <Ionicons name="share-social-outline" size={20} color="white" />
              </View>
              <Text style={styles.quickShareText}>Другое</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Link Preview */}
        <View style={styles.linkSection}>
          <Text style={styles.sectionTitle}>Ссылка на голосование</Text>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText} numberOfLines={1}>
              {inviteLink}
            </Text>
            <TouchableOpacity
              style={styles.copyLinkButton}
              onPress={handleCopyLink}
            >
              <Ionicons
                name={copiedLink ? "checkmark" : "copy-outline"}
                size={18}
                color={copiedLink ? "#4ECDC4" : "#FF6B6B"}
              />
            </TouchableOpacity>
          </View>
          {copiedLink && (
            <Text style={styles.copiedText}>Ссылка скопирована!</Text>
          )}
        </View>

        {/* Invite Benefits */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Почему приглашать друзей?</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Ionicons name="people-outline" size={20} color="#4ECDC4" />
              <Text style={styles.benefitText}>
                Больше участников — интереснее результаты
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="trophy-outline" size={20} color="#FFD700" />
              <Text style={styles.benefitText}>
                Получайте бонусы за приглашения
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="happy-outline" size={20} color="#FF6B6B" />
              <Text style={styles.benefitText}>
                Узнайте мнение всех одноклассников
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Button
          title="Отправить приглашения"
          onPress={handleShareLink}
          variant="primary"
          size="large"
          style={styles.inviteButton}
        />
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.push('/polls/main')}
        >
          <Text style={styles.skipText}>Пропустить</Text>
        </TouchableOpacity>
      </View>
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
  pollInfo: {
    marginBottom: 24,
  },
  pollCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pollTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 12,
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
  participantsBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E6ED',
    borderRadius: 4,
    overflow: 'hidden',
  },
  participantsFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
  },
  messageSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  messageInput: {
    fontSize: 16,
    color: '#2D3436',
    minHeight: 80,
  },
  charCount: {
    fontSize: 12,
    color: '#636E72',
    textAlign: 'right',
    marginTop: 8,
  },
  optionsSection: {
    marginBottom: 24,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  optionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
    textAlign: 'center',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: '#636E72',
    textAlign: 'center',
  },
  quickShareSection: {
    marginBottom: 24,
  },
  quickShareButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickShareButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  quickShareIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickShareText: {
    fontSize: 12,
    color: '#2D3436',
    fontWeight: '500',
  },
  linkSection: {
    marginBottom: 24,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    color: '#636E72',
    marginRight: 12,
  },
  copyLinkButton: {
    padding: 8,
  },
  copiedText: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  benefitsSection: {
    marginBottom: 24,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#2D3436',
    marginLeft: 12,
    lineHeight: 20,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  inviteButton: {
    marginBottom: 12,
  },
  skipButton: {
    alignItems: 'center',
    padding: 16,
  },
  skipText: {
    fontSize: 14,
    color: '#636E72',
    textDecorationLine: 'underline',
  },
});