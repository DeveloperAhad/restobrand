import { create } from 'zustand';
import { authAPI } from '../api';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  // Initialize auth state from localStorage
  initialize: () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      set({ isAuthenticated: true });
      get().fetchUser();
    } else {
      set({ isLoading: false });
    }
  },

  // Login
  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authAPI.login(credentials);
      const { access, refresh, user } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Login failed';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Register
  register: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authAPI.register(userData);
      const { access, refresh, user } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data || 'Registration failed';
      set({ error: typeof errorMessage === 'object' ? JSON.stringify(errorMessage) : errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Logout
  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      set({ user: null, isAuthenticated: false, error: null });
    }
  },

  // Fetch current user
  fetchUser: async () => {
    try {
      const response = await authAPI.getMe();
      set({ user: response.data, isLoading: false });
    } catch (error) {
      console.error('Fetch user error:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  // Update user
  updateUser: (userData) => {
    set((state) => ({
      user: { ...state.user, ...userData },
    }));
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
