import { create } from 'zustand';
import { Poll, PollOption, PollResponse } from '../lib/supabase';

interface PollsState {
  polls: Poll[];
  currentPoll: Poll | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchPolls: () => Promise<void>;
  fetchPoll: (id: string) => Promise<void>;
  createPoll: (pollData: {
    question: string;
    options: string[];
    multiple_selection?: boolean;
    anonymous_voting?: boolean;
  }) => Promise<{ success: boolean; error?: string }>;
  vote: (pollId: string, optionIds: string[]) => Promise<{ success: boolean; error?: string }>;
  clearError: () => void;
}

export const usePollsStore = create<PollsState>((set, get) => ({
  polls: [],
  currentPoll: null,
  isLoading: false,
  error: null,

  fetchPolls: async () => {
    set({ isLoading: true, error: null });

    try {
      // Mock data для демонстрации
      const mockPolls: Poll[] = [
        {
          id: '1',
          question: "What's your favorite programming language?",
          author_id: 'user1',
          is_active: true,
          multiple_selection: false,
          anonymous_voting: true,
          created_at: '2025-11-10T10:00:00Z',
          updated_at: '2025-11-10T10:00:00Z',
          author: {
            name: 'John Doe',
          },
          _count: {
            responses: 245,
          },
        },
        {
          id: '2',
          question: "Preferred mobile development framework?",
          author_id: 'user2',
          is_active: true,
          multiple_selection: true,
          anonymous_voting: false,
          created_at: '2025-11-09T15:30:00Z',
          updated_at: '2025-11-09T15:30:00Z',
          author: {
            name: 'Jane Smith',
          },
          _count: {
            responses: 189,
          },
        },
      ];

      // В реальном приложении здесь будет запрос к API:
      // const response = await pollsApi.getPolls();
      // if (response.error) throw new Error(response.error);
      // set({ polls: response.data });

      set({ polls: mockPolls, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch polls',
        isLoading: false
      });
    }
  },

  fetchPoll: async (id: string) => {
    set({ isLoading: true, error: null, currentPoll: null });

    try {
      // Mock data для демонстрации
      const mockPoll: Poll = {
        id,
        question: "What's your favorite programming language?",
        author_id: 'user1',
        is_active: true,
        multiple_selection: false,
        anonymous_voting: true,
        created_at: '2025-11-10T10:00:00Z',
        updated_at: '2025-11-10T10:00:00Z',
        author: {
          name: 'John Doe',
        },
        options: [
          { id: '1', poll_id: id, text: 'JavaScript', order_index: 0, created_at: '2025-11-10T10:00:00Z' },
          { id: '2', poll_id: id, text: 'Python', order_index: 1, created_at: '2025-11-10T10:00:00Z' },
          { id: '3', poll_id: id, text: 'TypeScript', order_index: 2, created_at: '2025-11-10T10:00:00Z' },
          { id: '4', poll_id: id, text: 'Java', order_index: 3, created_at: '2025-11-10T10:00:00Z' },
        ],
        _count: {
          responses: 245,
        },
      };

      set({ currentPoll: mockPoll, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch poll',
        isLoading: false
      });
    }
  },

  createPoll: async (pollData) => {
    set({ isLoading: true, error: null });

    try {
      // В реальном приложении здесь будет запрос к API:
      // const response = await pollsApi.createPoll(pollData);
      // if (response.error) throw new Error(response.error);

      // Mock успешного создания
      const newPoll: Poll = {
        id: Date.now().toString(),
        question: pollData.question,
        author_id: 'current-user',
        is_active: true,
        multiple_selection: pollData.multiple_selection || false,
        anonymous_voting: pollData.anonymous_voting || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        author: {
          name: 'Current User',
        },
        _count: {
          responses: 0,
        },
      };

      set(state => ({
        polls: [newPoll, ...state.polls],
        isLoading: false,
      }));

      return { success: true };
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create poll',
        isLoading: false
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create poll'
      };
    }
  },

  vote: async (pollId: string, optionIds: string[]) => {
    set({ isLoading: true, error: null });

    try {
      // В реальном приложении здесь будет запрос к API:
      // const response = await pollsApi.vote(pollId, optionIds);
      // if (response.error) throw new Error(response.error);

      // Mock успешного голосования
      set({ isLoading: false });
      return { success: true };
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to submit vote',
        isLoading: false
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit vote'
      };
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));