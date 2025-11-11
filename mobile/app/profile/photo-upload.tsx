import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/common/Button';

export default function PhotoUploadScreen() {
  const { city, school, class: className } = useLocalSearchParams<{ city: string; school: string; class: string }>();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleChoosePhoto = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Необходимо разрешение для доступа к галерее');
      return;
    }

    // Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
      simulateUpload();
    }
  };

  const handleTakePhoto = async () => {
    // Request permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Необходимо разрешение для доступа к камере');
      return;
    }

    // Take photo
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleContinue = () => {
    // Переходим к главному профилю
    router.push({
      pathname: '/profile/main',
      params: { city, school, class: className, hasPhoto: profileImage ? 'true' : 'false' }
    });
  };

  const handleSkip = () => {
    // Пропускаем загрузку фото
    router.push({
      pathname: '/profile/main',
      params: { city, school, class: className, hasPhoto: 'false' }
    });
  };

  const removePhoto = () => {
    setProfileImage(null);
    setUploadProgress(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ваше фото</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={14} color="#FF6B6B" />
            <Text style={styles.infoText}>{city}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="school-outline" size={14} color="#FF6B6B" />
            <Text style={styles.infoText}>{school}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="people-outline" size={14} color="#FF6B6B" />
            <Text style={styles.infoText}>{className}</Text>
          </View>
        </View>

        {/* Icon Section */}
        <View style={styles.iconSection}>
          <Ionicons name="camera-outline" size={60} color="#FF6B6B" />
          <Text style={styles.title}>Добавьте фото профиля</Text>
          <Text style={styles.subtitle}>
            Фото поможет вашим одноклассникам узнать вас
          </Text>
        </View>

        {/* Photo Upload Area */}
        <View style={styles.photoContainer}>
          {profileImage ? (
            <View style={styles.photoWrapper}>
              <Image source={{ uri: profileImage }} style={styles.profileImage} />

              {/* Upload Progress */}
              {uploadProgress < 100 && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${uploadProgress}%` }
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>{uploadProgress}%</Text>
                </View>
              )}

              {/* Photo Actions */}
              <View style={styles.photoActions}>
                <TouchableOpacity
                  style={styles.photoAction}
                  onPress={handleChoosePhoto}
                >
                  <Ionicons name="image-outline" size={20} color="#4ECDC4" />
                  <Text style={styles.photoActionText}>Изменить</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.photoAction}
                  onPress={removePhoto}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                  <Text style={styles.photoActionText}>Удалить</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.uploadArea}>
              <TouchableOpacity
                style={styles.uploadPlaceholder}
                onPress={handleChoosePhoto}
              >
                <Ionicons name="cloud-upload-outline" size={40} color="#B8B8D0" />
                <Text style={styles.uploadPlaceholderText}>Нажмите для загрузки фото</Text>
                <Text style={styles.uploadSubtext}>или выберите источник</Text>
              </TouchableOpacity>

              {/* Photo Source Buttons */}
              <View style={styles.photoSourceButtons}>
                <TouchableOpacity
                  style={styles.sourceButton}
                  onPress={handleChoosePhoto}
                >
                  <Ionicons name="image-outline" size={24} color="#FF6B6B" />
                  <Text style={styles.sourceButtonText}>Галерея</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sourceButton}
                  onPress={handleTakePhoto}
                >
                  <Ionicons name="camera-outline" size={24} color="#FF6B6B" />
                  <Text style={styles.sourceButtonText}>Камера</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Photo Requirements */}
        <View style={styles.requirementsContainer}>
          <Text style={styles.requirementsTitle}>Требования к фото:</Text>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4ECDC4" />
            <Text style={styles.requirementText}>Четкое фото вашего лица</Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4ECDC4" />
            <Text style={styles.requirementText}>Хорошее освещение</Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4ECDC4" />
            <Text style={styles.requirementText}>Без других людей</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Продолжить"
            onPress={handleContinue}
            variant="primary"
            size="large"
            style={styles.continueButton}
          />

          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Пропустить этот шаг</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
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
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  infoText: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '500',
    marginLeft: 4,
  },
  iconSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photoWrapper: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  progressContainer: {
    width: 150,
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E0E6ED',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
  },
  progressText: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 4,
  },
  photoActions: {
    flexDirection: 'row',
    gap: 16,
  },
  photoAction: {
    alignItems: 'center',
    padding: 8,
  },
  photoActionText: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 4,
  },
  uploadArea: {
    alignItems: 'center',
  },
  uploadPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E0E6ED',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  uploadPlaceholderText: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
    marginTop: 8,
  },
  uploadSubtext: {
    fontSize: 12,
    color: '#B8B8D0',
    marginTop: 4,
  },
  photoSourceButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  sourceButton: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    minWidth: 80,
  },
  sourceButtonText: {
    fontSize: 12,
    color: '#2D3436',
    fontWeight: '500',
    marginTop: 8,
  },
  requirementsContainer: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: '#636E72',
    marginLeft: 8,
  },
  actionButtons: {
    marginTop: 'auto',
  },
  continueButton: {
    marginBottom: 16,
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