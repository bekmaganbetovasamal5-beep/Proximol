import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  const pollOptions = [
    {
      id: 1,
      question: "What's your favorite programming language?",
      options: ["JavaScript", "Python", "TypeScript", "Java"],
      votes: 245,
      isActive: true,
    },
    {
      id: 2,
      question: "Preferred mobile development framework?",
      options: ["React Native", "Flutter", "Expo", "Native"],
      votes: 189,
      isActive: true,
    },
    {
      id: 3,
      question: "Best database for mobile apps?",
      options: ["PostgreSQL", "MongoDB", "SQLite", "Supabase"],
      votes: 156,
      isActive: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Proximol</Text>
        <Text style={styles.subtitle}>Create and Share Polls</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Polls</Text>
          <TouchableOpacity onPress={() => router.push('/create')}>
            <Ionicons name="add-circle" size={32} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {pollOptions.map((poll) => (
          <TouchableOpacity
            key={poll.id}
            style={styles.pollCard}
            onPress={() => router.push(`/poll/${poll.id}`)}
          >
            <View style={styles.pollHeader}>
              <Text style={styles.pollQuestion}>{poll.question}</Text>
              <View style={[styles.statusBadge, poll.isActive ? styles.active : styles.inactive]}>
                <Text style={styles.statusText}>
                  {poll.isActive ? 'Active' : 'Closed'}
                </Text>
              </View>
            </View>
            <Text style={styles.pollVotes}>{poll.votes} votes</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: '70%' }]} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#007AFF" />
          <Text style={[styles.navText, { color: '#007AFF' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/polls')}>
          <Ionicons name="bar-chart" size={24} color="#8E8E93" />
          <Text style={styles.navText}>Polls</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/create')}>
          <Ionicons name="add-circle" size={24} color="#8E8E93" />
          <Text style={styles.navText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <Ionicons name="person" size={24} color="#8E8E93" />
          <Text style={styles.navText}>Profile</Text>
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
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1D1D1F',
  },
  pollCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pollHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  pollQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1D1D1F',
    flex: 1,
    marginRight: 12,
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
  },
  pollVotes: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5E7',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
    paddingBottom: 8,
    paddingTop: 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#8E8E93',
  },
});