import { create } from 'zustand';

const useSubscriptionStore = create((set) => ({
  currentPlan: null,
  availablePlans: [],
  credits: {
    total: 0,
    used: 0,
    remaining: 0,
  },
  isLoading: false,
  error: null,

  setCurrentPlan: (plan) => set({ currentPlan: plan }),
  
  setAvailablePlans: (plans) => set({ availablePlans: plans }),
  
  setCredits: (credits) => set({ credits }),

  updateCredits: (used) =>
    set((state) => ({
      credits: {
        ...state.credits,
        used: state.credits.used + used,
        remaining: Math.max(0, state.credits.total - state.credits.used - used),
      },
    })),

  clearError: () => set({ error: null }),
}));

export default useSubscriptionStore;
