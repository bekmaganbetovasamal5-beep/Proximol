import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '@/components/common/Button';

const schools = [
  {
    id: 1,
    name: 'Школа-лицей № 54',
    type: 'Школа',
    rating: 4.8,
    students: 1250,
  },
  {
    id: 2,
    name: 'Нazarbayev Intellectual School',
    type: 'Колледж',
    rating: 4.9,
    students: 980,
  },
  {
    id: 3,
    name: 'KIMEP University',
    type: 'Университет',
    rating: 4.7,
    students: 3200,
  },
  {
    id: 4,
    name: 'Gymnasium № 89',
    type: 'Гимназия',
    rating: 4.6,
    students: 1450,
  },
  {
    id: 5,
    name: 'Astana IT University',
    type: 'Университет',
    rating: 4.5,
    students: 2100,
  },
  {
    id: 6,
    name: 'Bilim Innovation School',
    type: 'Школа',
    rating: 4.8,
    students: 890,
  },
];

export default function SchoolScreen() {
  const { city } = useLocalSearchParams<{ city: string }>();
  const [selectedSchool, setSelectedSchool] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (!selectedSchool) {
      alert('Пожалуйста, выберите учебное заведение');
      return;
    }
    // Переходим к выбору класса
    router.push({
      pathname: '/profile/class',
      params: { city, school: selectedSchool }
    });
  };

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchText.toLowerCase()) ||
    school.type.toLowerCase().includes(searchText.toLowerCase())
  );

  const getSchoolTypeColor = (type: string) => {
    switch (type) {
      case 'Университет': return '#FF6B6B';
      case 'Колледж': return '#FFA500';
      case 'Гимназия': return '#4ECDC4';
      default: return '#6C5CE7';
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Ionicons key={i} name="star" size={12} color="#FFD700" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Ionicons key={i} name="star-half" size={12} color="#FFD700" />
        );
      } else {
        stars.push(
          <Ionicons key={i} name="star-outline" size={12} color="#B8B8D0" />
        );
      }
    }

    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Учебное заведение</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* City Info */}
        <View style={styles.cityInfo}>
          <Ionicons name="location-outline" size={16} color="#FF6B6B" />
          <Text style={styles.cityText}>{city}</Text>
        </View>

        {/* Icon Section */}
        <View style={styles.iconSection}>
          <Ionicons name="school-outline" size={60} color="#FF6B6B" />
          <Text style={styles.title}>Где вы учитесь?</Text>
          <Text style={styles.subtitle}>
            Выберите ваше учебное заведение для доступа к голосованиям
          </Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#B8B8D0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск учебного заведения..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#B8B8D0"
          />
        </View>

        {/* Schools List */}
        <View style={styles.schoolsContainer}>
          <Text style={styles.sectionTitle}>Учебные заведения</Text>
          {filteredSchools.length > 0 ? (
            filteredSchools.map((school) => (
              <TouchableOpacity
                key={school.id}
                style={[
                  styles.schoolItem,
                  selectedSchool === school.name && styles.selectedSchoolItem
                ]}
                onPress={() => setSelectedSchool(school.name)}
              >
                <View style={styles.schoolInfo}>
                  <View style={styles.schoolHeader}>
                    <Text style={[
                      styles.schoolName,
                      selectedSchool === school.name && styles.selectedSchoolName
                    ]}>
                      {school.name}
                    </Text>
                    <View style={[styles.typeBadge, { backgroundColor: getSchoolTypeColor(school.type) }]}>
                      <Text style={styles.typeText}>{school.type}</Text>
                    </View>
                  </View>
                  <View style={styles.schoolDetails}>
                    <View style={styles.ratingContainer}>
                      {renderStars(school.rating)}
                      <Text style={styles.ratingText}>{school.rating}</Text>
                    </View>
                    <View style={styles.studentsContainer}>
                      <Ionicons name="people-outline" size={14} color="#636E72" />
                      <Text style={styles.studentsText}>{school.students} учеников</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.selectionIndicator}>
                  {selectedSchool === school.name ? (
                    <Ionicons name="checkmark-circle" size={24} color="#4ECDC4" />
                  ) : (
                    <View style={styles.unselectedCircle} />
                  )}
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultsText}>Учебные заведения не найдены</Text>
          )}
        </View>

        {/* Continue Button */}
        <Button
          title="Продолжить"
          onPress={handleContinue}
          variant="primary"
          size="large"
          style={styles.continueButton}
          disabled={!selectedSchool}
        />

        {/* Not Found */}
        <TouchableOpacity style={styles.notFoundButton}>
          <Text style={styles.notFoundText}>Не нашли ваше учебное заведение?</Text>
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
  cityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 24,
  },
  cityText: {
    fontSize: 14,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2D3436',
  },
  schoolsContainer: {
    flex: 1,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  schoolItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedSchoolItem: {
    backgroundColor: '#F0F9FF',
    borderColor: '#4ECDC4',
  },
  schoolInfo: {
    flex: 1,
  },
  schoolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  schoolName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginRight: 12,
  },
  selectedSchoolName: {
    color: '#2D3436',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  schoolDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#636E72',
    marginLeft: 4,
  },
  studentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentsText: {
    fontSize: 12,
    color: '#636E72',
    marginLeft: 4,
  },
  selectionIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B8B8D0',
  },
  noResultsText: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    marginTop: 32,
  },
  continueButton: {
    marginBottom: 16,
  },
  notFoundButton: {
    alignItems: 'center',
    padding: 16,
  },
  notFoundText: {
    fontSize: 14,
    color: '#FF6B6B',
    textDecorationLine: 'underline',
  },
});