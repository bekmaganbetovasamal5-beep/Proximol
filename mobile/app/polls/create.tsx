import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '@/components/common/Button';

interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: string[];
  required: boolean;
}

interface PollData {
  title: string;
  description: string;
  category: string;
  duration: string;
  questions: Question[];
}

export default function PollCreateScreen() {
  const [pollData, setPollData] = useState<PollData>({
    title: '',
    description: '',
    category: '',
    duration: '1day',
    questions: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState<'single' | 'multiple'>('single');
  const [options, setOptions] = useState(['', '']);
  const [isQuestionRequired, setIsQuestionRequired] = useState(false);

  const categories = [
    { id: 'sports', name: 'Спорт', icon: 'football-outline', color: '#4ECDC4' },
    { id: 'study', name: 'Учеба', icon: 'book-outline', color: '#6C5CE7' },
    { id: 'entertainment', name: 'Развлечения', icon: 'game-controller-outline', color: '#FFA500' },
    { id: 'personality', name: 'Личность', icon: 'person-outline', color: '#FD79A8' },
    { id: 'hobby', name: 'Хобби', icon: 'color-palette-outline', color: '#FF6B6B' },
  ];

  const durations = [
    { id: '1hour', name: '1 час' },
    { id: '6hours', name: '6 часов' },
    { id: '1day', name: '1 день' },
    { id: '3days', name: '3 дня' },
    { id: '1week', name: '1 неделя' },
  ];

  const handleCategorySelect = (categoryId: string) => {
    setPollData({ ...pollData, category: categoryId });
    setCurrentStep(2);
  };

  const handleAddOption = () => {
    if (options.length < 10) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = () => {
    const validOptions = options.filter(option => option.trim() !== '');

    if (questionText.trim() === '') {
      Alert.alert('Ошибка', 'Введите текст вопроса');
      return;
    }

    if (validOptions.length < 2) {
      Alert.alert('Ошибка', 'Добавьте хотя бы 2 варианта ответа');
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      text: questionText.trim(),
      type: questionType,
      options: validOptions,
      required: isQuestionRequired,
    };

    setPollData({
      ...pollData,
      questions: [...pollData.questions, newQuestion],
    });

    // Сброс формы вопроса
    setQuestionText('');
    setQuestionType('single');
    setOptions(['', '']);
    setIsQuestionRequired(false);
  };

  const handleRemoveQuestion = (questionId: string) => {
    setPollData({
      ...pollData,
      questions: pollData.questions.filter(q => q.id !== questionId),
    });
  };

  const handleCreatePoll = () => {
    if (pollData.title.trim() === '') {
      Alert.alert('Ошибка', 'Введите название опроса');
      setCurrentStep(2);
      return;
    }

    if (pollData.questions.length === 0) {
      Alert.alert('Ошибка', 'Добавьте хотя бы один вопрос');
      setCurrentStep(3);
      return;
    }

    // Создаем опрос
    Alert.alert(
      'Опрос создан!',
      'Ваш опрос успешно создан и готов к голосованию',
      [
        {
          text: 'Ок',
          onPress: () => router.push('/polls/main'),
        },
      ]
    );
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Выберите категорию</Text>
      <Text style={styles.stepSubtitle}>
        Это поможет пользователям найти ваш опрос
      </Text>

      <View style={styles.categoriesGrid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryCard,
              pollData.category === category.id && {
                backgroundColor: category.color,
                borderWidth: 2,
                borderColor: category.color,
              },
            ]}
            onPress={() => handleCategorySelect(category.id)}
          >
            <View style={[
              styles.categoryIcon,
              pollData.category === category.id && {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            ]}>
              <Ionicons
                name={category.icon as any}
                size={32}
                color={pollData.category === category.id ? 'white' : category.color}
              />
            </View>
            <Text style={[
              styles.categoryName,
              pollData.category === category.id && styles.selectedCategoryName,
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <ScrollView style={styles.stepContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Основная информация</Text>
      <Text style={styles.stepSubtitle}>
        Название и описание вашего опроса
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Название опроса *</Text>
        <TextInput
          style={styles.input}
          placeholder="Например: Лучший спортсмен класса"
          value={pollData.title}
          onChangeText={(text) => setPollData({ ...pollData, title: text })}
          multiline
          maxLength={100}
        />
        <Text style={styles.helperText}>
          {pollData.title.length}/100 символов
        </Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Описание</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Расскажите подробнее о вашем опросе..."
          value={pollData.description}
          onChangeText={(text) => setPollData({ ...pollData, description: text })}
          multiline
          numberOfLines={3}
          maxLength={300}
        />
        <Text style={styles.helperText}>
          {pollData.description.length}/300 символов
        </Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Длительность голосования</Text>
        <View style={styles.durationGrid}>
          {durations.map((duration) => (
            <TouchableOpacity
              key={duration.id}
              style={[
                styles.durationItem,
                pollData.duration === duration.id && styles.selectedDurationItem,
              ]}
              onPress={() => setPollData({ ...pollData, duration: duration.id })}
            >
              <Text style={[
                styles.durationText,
                pollData.duration === duration.id && styles.selectedDurationText,
              ]}>
                {duration.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderStep3 = () => (
    <ScrollView style={styles.stepContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Добавление вопросов</Text>
      <Text style={styles.stepSubtitle}>
        Создайте вопросы для вашего опроса
      </Text>

      {/* Новая форма вопроса */}
      <View style={styles.questionForm}>
        <Text style={styles.formTitle}>Новый вопрос</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Текст вопроса *</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите ваш вопрос..."
            value={questionText}
            onChangeText={setQuestionText}
            multiline
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Тип ответа</Text>
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeOption,
                questionType === 'single' && styles.selectedTypeOption,
              ]}
              onPress={() => setQuestionType('single')}
            >
              <Ionicons
                name="radio-button-on-outline"
                size={20}
                color={questionType === 'single' ? '#FF6B6B' : '#636E72'}
              />
              <Text style={[
                styles.typeText,
                questionType === 'single' && styles.selectedTypeText,
              ]}>
                Один ответ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeOption,
                questionType === 'multiple' && styles.selectedTypeOption,
              ]}
              onPress={() => setQuestionType('multiple')}
            >
              <Ionicons
                name="checkbox-outline"
                size={20}
                color={questionType === 'multiple' ? '#FF6B6B' : '#636E72'}
              />
              <Text style={[
                styles.typeText,
                questionType === 'multiple' && styles.selectedTypeText,
              ]}>
                Несколько ответов
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.optionsHeader}>
            <Text style={styles.label}>Варианты ответа *</Text>
            <TouchableOpacity onPress={handleAddOption} style={styles.addOptionButton}>
              <Ionicons name="add-circle-outline" size={20} color="#FF6B6B" />
              <Text style={styles.addOptionText}>Добавить</Text>
            </TouchableOpacity>
          </View>

          {options.map((option, index) => (
            <View key={index} style={styles.optionRow}>
              <Text style={styles.optionNumber}>{index + 1}.</Text>
              <TextInput
                style={[styles.input, styles.optionInput]}
                placeholder={`Вариант ${index + 1}`}
                value={option}
                onChangeText={(value) => handleOptionChange(index, value)}
              />
              {options.length > 2 && (
                <TouchableOpacity
                  onPress={() => handleRemoveOption(index)}
                  style={styles.removeOptionButton}
                >
                  <Ionicons name="remove-circle-outline" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setIsQuestionRequired(!isQuestionRequired)}
          >
            <View style={[styles.checkboxInner, isQuestionRequired && styles.checkboxChecked]}>
              {isQuestionRequired && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.checkboxText}>Обязательный вопрос</Text>
        </View>

        <Button
          title="Добавить вопрос"
          onPress={handleAddQuestion}
          variant="outline"
          size="medium"
          style={styles.addQuestionButton}
        />
      </View>

      {/* Список добавленных вопросов */}
      {pollData.questions.length > 0 && (
        <View style={styles.questionsList}>
          <Text style={styles.formTitle}>
            Добавленные вопросы ({pollData.questions.length})
          </Text>
          {pollData.questions.map((question, index) => (
            <View key={question.id} style={styles.questionItem}>
              <View style={styles.questionHeader}>
                <Text style={styles.questionItemNumber}>Вопрос {index + 1}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveQuestion(question.id)}
                  style={styles.removeQuestionButton}
                >
                  <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
              <Text style={styles.questionItemText}>{question.text}</Text>
              <View style={styles.questionMeta}>
                <Text style={styles.questionType}>
                  {question.type === 'single' ? 'Один ответ' : 'Несколько ответов'}
                </Text>
                <Text style={styles.questionOptions}>
                  {question.options.length} вариантов
                </Text>
                {question.required && (
                  <Text style={styles.questionRequired}>Обязательный</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Создать опрос</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Steps */}
      <View style={styles.progressSteps}>
        <View style={styles.step}>
          <View style={[
            styles.stepNumber,
            currentStep >= 1 && styles.activeStep,
            currentStep > 1 && styles.completedStep,
          ]}>
            {currentStep > 1 ? (
              <Ionicons name="checkmark" size={16} color="white" />
            ) : (
              <Text style={styles.stepNumberText}>1</Text>
            )}
          </View>
          <Text style={[
            styles.stepLabel,
            currentStep >= 1 && styles.activeStepLabel,
          ]}>
            Категория
          </Text>
        </View>

        <View style={[styles.stepLine, currentStep > 1 && styles.activeStepLine]} />

        <View style={styles.step}>
          <View style={[
            styles.stepNumber,
            currentStep >= 2 && styles.activeStep,
            currentStep > 2 && styles.completedStep,
          ]}>
            {currentStep > 2 ? (
              <Ionicons name="checkmark" size={16} color="white" />
            ) : (
              <Text style={styles.stepNumberText}>2</Text>
            )}
          </View>
          <Text style={[
            styles.stepLabel,
            currentStep >= 2 && styles.activeStepLabel,
          ]}>
            Информация
          </Text>
        </View>

        <View style={[styles.stepLine, currentStep > 2 && styles.activeStepLine]} />

        <View style={styles.step}>
          <View style={[
            styles.stepNumber,
            currentStep >= 3 && styles.activeStep,
          ]}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <Text style={[
            styles.stepLabel,
            currentStep >= 3 && styles.activeStepLabel,
          ]}>
            Вопросы
          </Text>
        </View>
      </View>

      {/* Content */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        {currentStep > 1 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Ionicons name="chevron-back" size={20} color="#636E72" />
            <Text style={styles.backButtonText}>Назад</Text>
          </TouchableOpacity>
        )}

        {currentStep < 3 ? (
          <Button
            title={currentStep === 1 ? 'Далее' : 'Перейти к вопросам'}
            onPress={() => setCurrentStep(currentStep + 1)}
            variant="primary"
            size="large"
            style={styles.nextButton}
            disabled={currentStep === 1 && !pollData.category}
          />
        ) : (
          <Button
            title="Создать опрос"
            onPress={handleCreatePoll}
            variant="primary"
            size="large"
            style={styles.createButton}
            disabled={!pollData.title || pollData.questions.length === 0}
          />
        )}
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
  placeholder: {
    width: 40,
  },
  progressSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  step: {
    alignItems: 'center',
    flex: 1,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E6ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  activeStep: {
    backgroundColor: '#FF6B6B',
  },
  completedStep: {
    backgroundColor: '#4ECDC4',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636E72',
  },
  stepLabel: {
    fontSize: 12,
    color: '#636E72',
  },
  activeStepLabel: {
    color: '#2D3436',
    fontWeight: '600',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E0E6ED',
    marginHorizontal: 8,
  },
  activeStepLine: {
    backgroundColor: '#FF6B6B',
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#636E72',
    marginBottom: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E6ED',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
    textAlign: 'center',
  },
  selectedCategoryName: {
    color: 'white',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
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
  helperText: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 4,
  },
  durationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  durationItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E6ED',
  },
  selectedDurationItem: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  durationText: {
    fontSize: 14,
    color: '#636E72',
  },
  selectedDurationText: {
    color: 'white',
  },
  questionForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  typeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E6ED',
  },
  selectedTypeOption: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FF6B6B',
  },
  typeText: {
    fontSize: 14,
    color: '#636E72',
    marginLeft: 8,
  },
  selectedTypeText: {
    color: '#2D3436',
    fontWeight: '600',
  },
  optionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addOptionText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 4,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionNumber: {
    fontSize: 16,
    color: '#636E72',
    marginRight: 12,
    width: 24,
  },
  optionInput: {
    flex: 1,
    marginRight: 12,
  },
  removeOptionButton: {
    padding: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 12,
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
  checkboxText: {
    fontSize: 16,
    color: '#2D3436',
  },
  addQuestionButton: {
    width: '100%',
  },
  questionsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  questionItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionItemNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  questionItemText: {
    fontSize: 16,
    color: '#2D3436',
    marginBottom: 8,
  },
  questionMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  questionType: {
    fontSize: 12,
    color: '#636E72',
  },
  questionOptions: {
    fontSize: 12,
    color: '#636E72',
  },
  questionRequired: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  removeQuestionButton: {
    padding: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  backButtonText: {
    fontSize: 16,
    color: '#636E72',
    fontWeight: '600',
    marginLeft: 8,
  },
  nextButton: {
    flex: 1,
  },
  createButton: {
    flex: 1,
  },
});