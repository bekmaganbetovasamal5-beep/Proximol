// API клиент для связи с backend

const API_BASE_URL = 'http://localhost:3003/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || `HTTP error! status: ${response.status}`,
        };
      }

      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();

// Specific API methods
export const pollsApi = {
  // Get all polls
  getPolls: () => apiClient.get('/polls'),

  // Get single poll by ID
  getPoll: (id: string) => apiClient.get(`/polls/${id}`),

  // Create new poll
  createPoll: (pollData: {
    question: string;
    options: string[];
    multiple_selection?: boolean;
    anonymous_voting?: boolean;
  }) => apiClient.post('/polls', pollData),

  // Vote in poll
  vote: (pollId: string, optionIds: string[]) =>
    apiClient.post(`/polls/${pollId}/vote`, { option_ids: optionIds }),

  // Get poll results
  getResults: (pollId: string) => apiClient.get(`/polls/${pollId}/results`),
};