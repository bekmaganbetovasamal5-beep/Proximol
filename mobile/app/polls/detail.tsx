import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import Button from '@/components/common/Button';

interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: string[];
  required: boolean;
}

interface PollDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  timeLeft: string;
  totalQuestions: number;
  currentQuestion: number;
  participants: number;
  isAnonymous: boolean;
}

export default function PollDetailScreen() {
  const { pollId } = useLocalSearchParams<{ pollId: string }>();
  const [poll, setPoll] = useState<PollDetail | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [progress, setProgress] = useState(new Animated.Value(0));

  const mockPoll: PollDetail = {
    id: pollId as string,
    title: 'Кто самый спортивный в классе?',
    description: 'Голосуй за самого спортивного одноклассника! Результаты анонимные.',
    category: 'sports',
    timeLeft: '2 дня',
    totalQuestions: 10,
    currentQuestion: 1,
    participants: 45,
    isAnonymous: true,
  };

  const questions: Question[] = [
    {
      id: '1',
      text: 'Кто лучший бегун?',
      type: 'single',
      options: ['Александр', 'Мария', 'Дмитрий', 'Елена', 'Другой'],
      required: true,
    },
    {
      id: '2',
      text: 'Кто лучше всего играет в футбол?',
      type: 'single',
      options: ['Иван', 'Павел', 'Андрей', 'Сергей', 'Другой'],
      required: true,
    },
    {
      id: '3',
      text: 'Кто самый сильный?',
      type: 'single',
      options: ['Максим', 'Николай', 'Алексей', 'Виктор', 'Другой'],
      required: true,
    },
    // ... больше вопросов
  ];

  useEffect(() => {
    setPoll(mockPoll);
    animateProgress();
  }, []);

  const animateProgress = () => {
    Animated.timing(progress, {
      toValue: (currentQuestion + 1) / questions.length,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleOptionSelect = (option: string) => {
    const currentQ = questions[currentQuestion];
    if (currentQ.type === 'single') {
      setSelectedOptions([option]);
    } else {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(o => o !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) {
      alert('Пожалуйста, выберите хотя бы один вариант');
      return;
    }

    // Сохраняем ответ
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: selectedOptions,
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOptions([]);
      animateProgress();
    } else {
      // Завершаем опрос
      router.push({
        pathname: '/polls/completed',
        params: { pollId: pollId, answersCount: Object.keys(newAnswers).length }
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const prevAnswers = answers[questions[currentQuestion - 1].id] || [];
      setSelectedOptions(prevAnswers);
      animateProgress();
    }
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  if (!poll) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Загрузка...</Text>
      </SafeAreaView>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{poll.title}</Text>
          <Text style={styles.headerSubtitle}>
            Вопрос {currentQuestion + 1} из {questions.length}
          </Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close-outline" size={24} color="#2D3436" />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{Math.round(getProgressPercentage())}%</Text>
      </View>

      {/* Poll Info */}
      <View style={styles.pollInfo}>
        <View style={styles.pollMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#FF6B6B" />
            <Text style={styles.metaText}>{poll.timeLeft}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people-outline" size={16} color="#FF6B6B" />
            <Text style={styles.metaText}>{poll.participants} участников</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="eye-off-outline" size={16} color="#FF6B6B" />
            <Text style={styles.metaText}>Анонимно</Text>
          </View>
        </View>
      </View>

      {/* Question */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.questionContainer}>
          <View style={styles.questionHeader}>
            <View style={styles.questionNumber}>
              <Text style={styles.questionNumberText}>{currentQuestion + 1}</Text>
            </View>
            <Text style={styles.questionText}>{currentQ.text}</Text>
          </View>
          {currentQ.required && (
            <Text style={styles.requiredText}>* Обязательный вопрос</Text>
          )}
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQ.options.map((option, index) => {
            const isSelected = selectedOptions.includes(option);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionItem,
                  isSelected && styles.selectedOptionItem,
                ]}
                onPress={() => handleOptionSelect(option)}
              >
                <View style={[
                  styles.radioButton,
                  isSelected && styles.selectedRadioButton
                ]}>
                  {isSelected && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={[
                  styles.optionText,
                  isSelected && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={20} color="#FF6B6B" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {currentQuestion > 0 && (
            <TouchableOpacity
              style={styles.previousButton}
              onPress={handlePrevious}
            >
              <Ionicons name="chevron-back" size={20} color="#636E72" />
              <Text style={styles.previousButtonText}>Назад</Text>
            </TouchableOpacity>
          )}

          <Button
            title={currentQuestion < questions.length - 1 ? 'Далее' : 'Завершить'}
            onPress={handleNext}
            variant="primary"
            size="large"
            style={styles.nextButton}
            disabled={selectedOptions.length === 0}
          />
        </View>

        {/* Skip Button */}
        {!currentQ.required && (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => {
              if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedOptions([]);
                animateProgress();
              }
            }}
          >
            <Text style={styles.skipButtonText}>Пропустить вопрос</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
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
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#636E72',
  },
  closeButton: {
    padding: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E6ED',
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
    minWidth: 40,
  },
  pollInfo: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  pollMeta: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    padding: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '500',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionContainer: {
    marginBottom: 32,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  questionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  questionNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  questionText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
    lineHeight: 28,
  },
  requiredText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontStyle: 'italic',
  },
  optionsContainer: {
    marginBottom: 32,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOptionItem: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FF6B6B',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B8B8D0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  selectedRadioButton: {
    borderColor: '#FF6B6B',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B6B',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#2D3436',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#2D3436',
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  previousButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  previousButtonText: {
    fontSize: 16,
    color: '#636E72',
    fontWeight: '600',
    marginLeft: 8,
  },
  nextButton: {
    flex: 1,
  },
  skipButton: {
    alignItems: 'center',
    padding: 16,
  },
  skipButtonText: {
    fontSize: 14,
    color: '#636E72',
    textDecorationLine: 'underline',
  },
});