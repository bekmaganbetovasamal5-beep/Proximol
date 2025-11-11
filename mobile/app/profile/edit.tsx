import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/common/Button';

interface ProfileData {
  name: string;
  bio: string;
  email: string;
  phone: string;
  city: string;
  school: string;
  classInfo: string;
  interests: string[];
}

export default function ProfileEditScreen() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Александр Иванов',
    bio: 'Студент, спортсмен и просто хороший человек',
    email: 'alex.ivanov@example.com',
    phone: '+7 (777) 123-45-67',
    city: 'Алматы',
    school: 'Школа-лицей № 54',
    classInfo: '11 класс А',
    interests: ['Спорт', 'Музыка', 'Программирование'],
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Здесь будет загрузка текущих данных профиля
    checkForChanges();
  }, []);

  const checkForChanges = () => {
    // Здесь будет логика проверки изменений
    setHasChanges(true);
  };

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Необходимо разрешение', 'Разрешите доступ к галерее для изменения фото');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
      setHasChanges(true);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Необходимо разрешение', 'Разрешите доступ к камере для смены фото');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
      setHasChanges(true);
    }
  };

  const handleRemovePhoto = () => {
    setProfileImage(null);
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!profileData.name.trim()) {
      Alert.alert('Ошибка', 'Имя не может быть пустым');
      return;
    }

    if (profileData.email && !validateEmail(profileData.email)) {
      Alert.alert('Ошибка', 'Введите корректный email');
      return;
    }

    setIsLoading(true);

    try {
      // Здесь будет логика сохранения данных на сервер
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Успеш!',
        'Ваш профиль успешно обновлен',
        [
          {
            text: 'Ок',
            onPress: () => router.push('/profile/main'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить изменения');
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        'Есть несохраненные изменения',
        'Вы уверены, что хотите выйти без сохранения?',
        [
          { text: 'Отмена', style: 'cancel' },
          { text: 'Выйти', onPress: () => router.push('/profile/main') },
        ]
      );
    } else {
      router.push('/profile/main');
    }
  };

  const addInterest = () => {
    Alert.prompt(
      'Добавить интерес',
      'Введите новый интерес:',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Добавить',
          onPress: (interest) => {
            if (interest && interest.trim()) {
              setProfileData(prev => ({
                ...prev,
                interests: [...prev.interests, interest.trim().slice(0, 20)],
              }));
            }
          },
        },
      ]
    );
  };

  const removeInterest = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index),
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Редактировать профиль</Text>
        <TouchableOpacity style={styles.doneButton} onPress={handleSave}>
          <Text style={styles.doneButtonText}>Готово</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Photo */}
        <View style={styles.photoSection}>
          <Text style={styles.sectionTitle}>Фото профиля</Text>
          <View style={styles.photoContainer}>
            {profileImage ? (
              <View style={styles.currentPhoto}>
                {/* В реальном приложении здесь будет компонент Image */}
                <View style={styles.photoPlaceholder}>
                  <Ionicons name="person" size={40} color="#636E72" />
                </View>
                <TouchableOpacity style={styles.editPhotoButton} onPress={handleChoosePhoto}>
                  <Ionicons name="camera-outline" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.noPhoto}>
                <Ionicons name="camera-outline" size={40} color="#B8B8D0" />
              </View>
            )}
          </View>
          <View style={styles.photoActions}>
            <TouchableOpacity style={styles.photoActionButton} onPress={handleChoosePhoto}>
              <Ionicons name="image-outline" size={20} color="#636E72" />
              <Text style={styles.photoActionText}>Галерея</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoActionButton} onPress={handleTakePhoto}>
              <Ionicons name="camera-outline" size={20} color="#636E72" />
              <Text style={styles.photoActionText}>Камера</Text>
            </TouchableOpacity>
            {profileImage && (
              <TouchableOpacity style={styles.photoActionButton} onPress={handleRemovePhoto}>
                <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                <Text style={styles.photoActionText}>Удалить</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Основная информация</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Имя *</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите ваше имя"
              value={profileData.name}
              onChangeText={(text) => {
                setProfileData({ ...profileData, name: text });
                setHasChanges(true);
              }}
              maxLength={50}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>О себе</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Расскажите немного о себе..."
              value={profileData.bio}
              onChangeText={(text) => {
                setProfileData({ ...profileData, bio: text });
                setHasChanges(true);
              }}
              multiline
              numberOfLines={3}
              maxLength={200}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Контактная информация</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your.email@example.com"
              value={profileData.email}
              onChangeText={(text) => {
                setProfileData({ ...profileData, email: text });
                setHasChanges(true);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Телефон</Text>
            <TextInput
              style={styles.input}
              placeholder="+7 (777) 123-45-67"
              value={profileData.phone}
              onChangeText={(text) => {
                setProfileData({ ...profileData, phone: text });
                setHasChanges(true);
              }}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Educational Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Образовательная информация</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Город</Text>
            <TextInput
              style={styles.input}
              placeholder="Ваш город"
              value={profileData.city}
              onChangeText={(text) => {
                setProfileData({ ...profileData, city: text });
                setHasChanges(true);
              }}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Учебное заведение</Text>
            <TextInput
              style={styles.input}
              placeholder="Название школы"
              value={profileData.school}
              onChangeText={(text) => {
                setProfileData({ ...profileData, school: text });
                setHasChanges(true);
              }}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Класс</Text>
            <TextInput
              style={styles.input}
              placeholder="11 класс А"
              value={profileData.classInfo}
              onChangeText={(text) => {
                setProfileData({ ...profileData, classInfo: text });
                setHasChanges(true);
              }}
            />
          </View>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Интересы</Text>
          <Text style={styles.sectionDescription}>
            Добавьте ваши интересы, чтобы помочь другим узнать вас лучше
          </Text>

          <View style={styles.interestsList}>
            {profileData.interests.map((interest, index) => (
              <View key={index} style={styles.interestItem}>
                <Text style={styles.interestText}>{interest}</Text>
                <TouchableOpacity
                  style={styles.removeInterestButton}
                  onPress={() => removeInterest(index)}
                >
                  <Ionicons name="close-circle" size={16} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.addInterestButton} onPress={addInterest}>
            <Ionicons name="add-circle-outline" size={20} color="#FF6B6B" />
            <Text style={styles.addInterestText}>Добавить интерес</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <Button
            title="Сохранить изменения"
            onPress={handleSave}
            variant="primary"
            size="large"
            style={styles.saveButton}
            disabled={isLoading || !hasChanges}
            loading={isLoading}
          />

          <Button
            title="Отмена"
            onPress={handleCancel}
            variant="outline"
            size="large"
            style={styles.cancelButton}
          />
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerSection}>
          <Text style={styles.dangerTitle}>Опасные действия</Text>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={() => {
              Alert.alert(
                'Удалить аккаунт',
                'Это действие нельзя отменить. Все ваши данные будут безвозвратно удалены.',
                [
                  { text: 'Отмена', style: 'cancel' },
                  {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => {
                      Alert.alert('Аккаунт удален', 'Ваш аккаунт успешно удален');
                      router.push('/auth/start');
                    },
                  },
                ]
              );
            }}
          >
            <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
            <Text style={styles.dangerButtonText}>Удалить аккаунт</Text>
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
  doneButton: {
    padding: 8,
  },
  doneButtonText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 16,
  },
  photoSection: {
    alignItems: 'center',
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E0E6ED',
    borderStyle: 'dashed',
  },
  currentPhoto: {
    position: 'relative',
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noPhoto: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoActions: {
    flexDirection: 'row',
    gap: 12,
  },
  photoActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  photoActionText: {
    fontSize: 14,
    color: '#636E72',
    marginLeft: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2D3436',
    borderWidth: 1,
    borderColor: '#E0E6ED',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  interestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  interestText: {
    fontSize: 14,
    color: '#2D3436',
    marginRight: 8,
  },
  removeInterestButton: {
    padding: 4,
  },
  addInterestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#FF6B6B',
    borderRadius: 12,
    paddingVertical: 12,
    borderStyle: 'dashed',
  },
  addInterestText: {
    fontSize: 14,
    color: '#FF6B6B',
    marginLeft: 8,
    fontWeight: '600',
  },
  actionSection: {
    padding: 20,
    gap: 12,
  },
  saveButton: {
    // Button style
  },
  cancelButton: {
    // Outline button style
  },
  dangerSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 32,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 16,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F5',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  dangerButtonText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 8,
  },
});