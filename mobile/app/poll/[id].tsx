import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function PollDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Mock data - в реальном приложении здесь будет запрос к API
  const pollData = {
    id: id || '1',
    question: "What's your favorite programming language?",
    options: [
      { id: 1, text: "JavaScript", votes: 89, percentage: 36.3 },
      { id: 2, text: "Python", votes: 67, percentage: 27.3 },
      { id: 3, text: "TypeScript", votes: 54, percentage: 22.0 },
      { id: 4, text: "Java", votes: 35, percentage: 14.3 },
    ],
    totalVotes: 245,
    isActive: true,
    createdAt: '2025-11-10T10:00:00Z',
    author: 'John Doe',
  };

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (selectedOption === null) {
      Alert.alert('Please select an option', 'You need to select an option before voting.');
      return;
    }

    // Здесь будет запрос к API для голосования
    Alert.alert(
      'Vote Submitted!',
      'Your vote has been recorded successfully.',
      [
        {
          text: 'OK',
          onPress: () => setHasVoted(true),
        },
      ]
    );
  };

  const handleShare = () => {
    Alert.alert('Share Poll', 'Sharing functionality will be implemented soon.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Poll</Text>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.pollCard}>
          <View style={styles.pollHeader}>
            <View style={styles.authorInfo}>
              <View style={styles.avatar} />
              <View>
                <Text style={styles.authorName}>{pollData.author}</Text>
                <Text style={styles.pollDate}>Nov 10, 2025</Text>
              </View>
            </View>
            <View style={[styles.statusBadge, pollData.isActive ? styles.active : styles.inactive]}>
              <Text style={styles.statusText}>{pollData.isActive ? 'Active' : 'Closed'}</Text>
            </View>
          </View>

          <Text style={styles.question}>{pollData.question}</Text>
          <Text style={styles.totalVotes}>{pollData.totalVotes} votes</Text>
        </View>

        {!hasVoted ? (
          <View style={styles.votingSection}>
            <Text style={styles.sectionTitle}>Select an option</Text>

            {pollData.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  selectedOption === option.id && styles.selectedOption
                ]}
                onPress={() => setSelectedOption(option.id)}
              >
                <View style={styles.radioButton}>
                  <View style={[
                    styles.radioDot,
                    selectedOption === option.id && styles.radioDotSelected
                  ]} />
                </View>
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={handleVote}
              style={[styles.voteButton, selectedOption === null && styles.voteButtonDisabled]}
              disabled={selectedOption === null}
            >
              <Text style={styles.voteButtonText}>Submit Vote</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultsSection}>
            <Text style={styles.sectionTitle}>Results</Text>

            {pollData.options.map((option, index) => (
              <View key={option.id} style={styles.resultRow}>
                <Text style={styles.resultText}>{option.text}</Text>
                <Text style={styles.resultVotes}>{option.votes} votes ({option.percentage}%)</Text>
                <View style={styles.resultBar}>
                  <View style={[styles.resultProgress, { width: `${option.percentage}%` }]} />
                </View>
              </View>
            ))}

            <Text style={styles.totalVotes}>Total: {pollData.totalVotes} votes</Text>
          </View>
        )}

        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="bookmark-outline" size={20} color="#8E8E93" />
            <Text style={styles.actionText}>Save Poll</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="flag-outline" size={20} color="#8E8E93" />
            <Text style={styles.actionText}>Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  shareButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  pollCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  pollHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E5E7',
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
  },
  pollDate: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  active: {
    backgroundColor: '#E3F2FD',
  },
  inactive: {
    backgroundColor: '#F5F5F5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#007AFF',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 8,
    lineHeight: 24,
  },
  totalVotes: {
    fontSize: 14,
    color: '#8E8E93',
  },
  votingSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  resultsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E7',
    marginBottom: 8,
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E5E7',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioDotSelected: {
    backgroundColor: '#007AFF',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#1D1D1F',
  },
  voteButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  voteButtonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  voteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultRow: {
    marginBottom: 16,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  resultVotes: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  resultBar: {
    height: 8,
    backgroundColor: '#E5E5E7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  resultProgress: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
});