import { create } from 'zustand';

const useBrandingStore = create((set) => ({
  moodboards: [],
  colorPalettes: [],
  logos: [],
  currentMoodboard: null,
  isGenerating: false,
  generationProgress: 0,
  error: null,

  setMoodboards: (moodboards) => set({ moodboards }),
  
  setColorPalettes: (palettes) => set({ colorPalettes: palettes }),
  
  setLogos: (logos) => set({ logos }),
  
  setCurrentMoodboard: (moodboard) => set({ currentMoodboard: moodboard }),

  addMoodboard: (moodboard) =>
    set((state) => ({
      moodboards: [...state.moodboards, moodboard],
      currentMoodboard: moodboard,
    })),

  updateMoodboard: (id, updatedData) =>
    set((state) => ({
      moodboards: state.moodboards.map((m) =>
        m.id === id ? { ...m, ...updatedData } : m
      ),
      currentMoodboard: state.currentMoodboard?.id === id
        ? { ...state.currentMoodboard, ...updatedData }
        : state.currentMoodboard,
    })),

  removeMoodboard: (id) =>
    set((state) => ({
      moodboards: state.moodboards.filter((m) => m.id !== id),
      currentMoodboard: state.currentMoodboard?.id === id
        ? null
        : state.currentMoodboard,
    })),

  setGenerating: (isGenerating) => set({ isGenerating }),

  setGenerationProgress: (progress) => set({ generationProgress: progress }),

  clearError: () => set({ error: null }),
}));

export default useBrandingStore;
