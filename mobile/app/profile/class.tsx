import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '@/components/common/Button';

const grades = [
  '1 класс', '2 класс', '3 класс', '4 класс',
  '5 класс', '6 класс', '7 класс', '8 класс', '9 класс', '10 класс', '11 класс',
];

const universityYears = [
  '1 курс', '2 курс', '3 курс', '4 курс',
  '5 курс', 'Магистратура 1', 'Магистратура 2',
  'Докторантура 1', 'Докторантура 2', 'Докторантура 3',
];

const collegeYears = [
  '1 курс', '2 курс', '3 курс', '4 курс',
];

export default function ClassScreen() {
  const { city, school } = useLocalSearchParams<{ city: string; school: string }>();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');

  const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (!selectedClass) {
      alert('Пожалуйста, выберите ваш класс/курс');
      return;
    }

    const fullClassInfo = selectedLetter ? `${selectedClass} ${selectedLetter}` : selectedClass;

    // Переходим к загрузке фото
    router.push({
      pathname: '/profile/photo-upload',
      params: { city, school, class: fullClassInfo }
    });
  };

  const getYearsForSchoolType = () => {
    if (school.toLowerCase().includes('университет') || school.toLowerCase().includes('university')) {
      return universityYears;
    } else if (school.toLowerCase().includes('колледж') || school.toLowerCase().includes('college')) {
      return collegeYears;
    }
    return grades;
  };

  const availableYears = getYearsForSchoolType();
  const isSchoolType = !school.toLowerCase().includes('университет') &&
                      !school.toLowerCase().includes('university') &&
                      !school.toLowerCase().includes('колледж') &&
                      !school.toLowerCase().includes('college');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ваш класс</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* School Info */}
        <View style={styles.schoolInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={14} color="#FF6B6B" />
            <Text style={styles.infoText}>{city}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="school-outline" size={14} color="#FF6B6B" />
            <Text style={styles.infoText}>{school}</Text>
          </View>
        </View>

        {/* Icon Section */}
        <View style={styles.iconSection}>
          <Ionicons name="people-outline" size={60} color="#FF6B6B" />
          <Text style={styles.title}>Ваш класс</Text>
          <Text style={styles.subtitle}>
            Выберите ваш класс для точной группировки голосований
          </Text>
        </View>

        {/* Grade/Course Selection */}
        <View style={styles.gradeContainer}>
          <Text style={styles.sectionTitle}>
            {isSchoolType ? 'Выберите класс' : 'Выберите курс'}
          </Text>
          <View style={styles.gridContainer}>
            {availableYears.map((year, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.gradeItem,
                  selectedClass === year && styles.selectedGradeItem
                ]}
                onPress={() => setSelectedClass(year)}
              >
                <Text style={[
                  styles.gradeText,
                  selectedClass === year && styles.selectedGradeText
                ]}>
                  {year}
                </Text>
                {selectedClass === year && (
                  <Ionicons name="checkmark-circle" size={20} color="#4ECDC4" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Letter Selection (only for schools) */}
        {isSchoolType && (
          <View style={styles.letterContainer}>
            <Text style={styles.sectionTitle}>Буква класса</Text>
            <View style={styles.letterGrid}>
              {letters.map((letter, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.letterItem,
                    selectedLetter === letter && styles.selectedLetterItem
                  ]}
                  onPress={() => setSelectedLetter(letter)}
                >
                  <Text style={[
                    styles.letterText,
                    selectedLetter === letter && styles.selectedLetterText
                  ]}>
                    {letter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Continue Button */}
        <Button
          title="Продолжить"
          onPress={handleContinue}
          variant="primary"
          size="large"
          style={styles.continueButton}
          disabled={!selectedClass || (isSchoolType && !selectedLetter)}
        />

        {/* Skip Option */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.push('/profile/photo-upload')}
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
  schoolInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  infoItem: {
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
  gradeContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  gradeItem: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedGradeItem: {
    backgroundColor: '#F0F9FF',
    borderColor: '#4ECDC4',
  },
  gradeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    textAlign: 'center',
  },
  selectedGradeText: {
    color: '#2D3436',
  },
  letterContainer: {
    marginBottom: 24,
  },
  letterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  letterItem: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedLetterItem: {
    backgroundColor: '#F0F9FF',
    borderColor: '#4ECDC4',
  },
  letterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  selectedLetterText: {
    color: '#2D3436',
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