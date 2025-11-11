import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function CreatePollScreen() {
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const addOption = () => {
    if (options.length < 10) {
      setOptions([...options, '']);
    } else {
      Alert.alert('Maximum Options', 'You can add up to 10 options only.');
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!question.trim()) {
      newErrors.question = 'Question is required';
    }

    const validOptions = options.filter(option => option.trim());
    if (validOptions.length < 2) {
      newErrors.options = 'At least 2 options are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const validOptions = options.filter(option => option.trim());

      // Here you would normally send the data to your backend
      console.log('Creating poll:', {
        question,
        options: validOptions,
      });

      Alert.alert(
        'Success!',
        'Your poll has been created successfully.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Create Poll</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Question</Text>
          <TextInput
            style={[styles.input, errors.question && styles.inputError]}
            value={question}
            onChangeText={(text) => {
              setQuestion(text);
              if (errors.question) {
                setErrors(prev => ({ ...prev, question: '' }));
              }
            }}
            placeholder="What would you like to ask?"
            multiline
            numberOfLines={3}
          />
          {errors.question && <Text style={styles.errorText}>{errors.question}</Text>}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Options</Text>
            <Text style={styles.helperText}>Add 2-10 options</Text>
          </View>

          {options.map((option, index) => (
            <View key={index} style={styles.optionRow}>
              <TextInput
                style={[styles.optionInput, errors.options && !option.trim() && styles.inputError]}
                value={option}
                onChangeText={(text) => updateOption(index, text)}
                placeholder={`Option ${index + 1}`}
              />
              {options.length > 2 && (
                <TouchableOpacity
                  onPress={() => removeOption(index)}
                  style={styles.removeButton}
                >
                  <Ionicons name="remove-circle" size={24} color="#FF3B30" />
                </TouchableOpacity>
              )}
            </View>
          ))}

          {errors.options && <Text style={styles.errorText}>{errors.options}</Text>}

          <TouchableOpacity onPress={addOption} style={styles.addButton}>
            <Ionicons name="add-circle" size={24} color="#007AFF" />
            <Text style={styles.addButtonText}>Add Option</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Settings</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Allow multiple selection</Text>
            <TouchableOpacity style={styles.toggle}>
              <View style={[styles.toggleDot, styles.toggleInactive]} />
            </TouchableOpacity>
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Anonymous voting</Text>
            <TouchableOpacity style={styles.toggle}>
              <View style={[styles.toggleDot, styles.toggleActive]} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Poll</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
  },
  headerRight: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1D1D1F',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  helperText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1D1D1F',
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    marginTop: 8,
  },
  addButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#1D1D1F',
  },
  toggle: {
    width: 44,
    height: 26,
    backgroundColor: '#E5E5E7',
    borderRadius: 13,
    padding: 2,
  },
  toggleDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
  },
  toggleActive: {
    backgroundColor: '#34C759',
    alignSelf: 'flex-end',
  },
  toggleInactive: {
    alignSelf: 'flex-start',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
  },
  createButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});