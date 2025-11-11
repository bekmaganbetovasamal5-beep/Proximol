import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '@/components/common/Button';

const cities = [
  'Алматы',
  'Астана',
  'Шымкент',
  'Караганда',
  'Актобе',
  'Тараз',
  'Павлодар',
  'Усть-Каменогорск',
  'Семей',
  'Атырау',
  'Кызылорда',
  'Актау',
  'Петропавловск',
  'Кокшетау',
  'Талдыкорган',
  'Экибастуз',
  'Риддер',
];

export default function LocationScreen() {
  const [selectedCity, setSelectedCity] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (!selectedCity) {
      alert('Пожалуйста, выберите ваш город');
      return;
    }
    // Переходим к выбору школы
    router.push({
      pathname: '/profile/school',
      params: { city: selectedCity }
    });
  };

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ваш город</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Icon Section */}
        <View style={styles.iconSection}>
          <Ionicons name="location-outline" size={60} color="#FF6B6B" />
          <Text style={styles.title}>Где вы учитесь?</Text>
          <Text style={styles.subtitle}>
            Выберите ваш город для поиска учебных заведений
          </Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#B8B8D0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск города..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#B8B8D0"
          />
        </View>

        {/* Cities List */}
        <View style={styles.citiesContainer}>
          <Text style={styles.sectionTitle}>Популярные города</Text>
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.cityItem,
                  selectedCity === city && styles.selectedCityItem
                ]}
                onPress={() => setSelectedCity(city)}
              >
                <View style={styles.cityIcon}>
                  <Ionicons
                    name={selectedCity === city ? "checkmark-circle" : "location-outline"}
                    size={20}
                    color={selectedCity === city ? "#4ECDC4" : "#B8B8D0"}
                  />
                </View>
                <Text style={[
                  styles.cityName,
                  selectedCity === city && styles.selectedCityName
                ]}>
                  {city}
                </Text>
                {selectedCity === city && (
                  <Ionicons name="checkmark" size={20} color="#4ECDC4" />
                )}
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultsText}>Города не найдены</Text>
          )}
        </View>

        {/* Continue Button */}
        <Button
          title="Продолжить"
          onPress={handleContinue}
          variant="primary"
          size="large"
          style={styles.continueButton}
          disabled={!selectedCity}
        />

        {/* Current Location */}
        <TouchableOpacity style={styles.currentLocationButton}>
          <Ionicons name="navigate-outline" size={20} color="#FF6B6B" />
          <Text style={styles.currentLocationText}>Определить местоположение</Text>
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
  citiesContainer: {
    flex: 1,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
  },
  selectedCityItem: {
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  cityIcon: {
    marginRight: 16,
  },
  cityName: {
    flex: 1,
    fontSize: 16,
    color: '#2D3436',
  },
  selectedCityName: {
    color: '#2D3436',
    fontWeight: '600',
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
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  currentLocationText: {
    fontSize: 14,
    color: '#FF6B6B',
    marginLeft: 8,
    fontWeight: '500',
  },
});