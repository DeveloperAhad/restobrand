import { create } from 'zustand';

const useRestaurantStore = create((set) => ({
  restaurants: [],
  currentRestaurant: null,
  isLoading: false,
  error: null,

  setRestaurants: (restaurants) => set({ restaurants }),
  
  setCurrentRestaurant: (restaurant) => set({ currentRestaurant: restaurant }),
  
  addRestaurant: (restaurant) =>
    set((state) => ({
      restaurants: [...state.restaurants, restaurant],
      currentRestaurant: restaurant,
    })),

  updateRestaurant: (id, updatedData) =>
    set((state) => ({
      restaurants: state.restaurants.map((r) =>
        r.id === id ? { ...r, ...updatedData } : r
      ),
      currentRestaurant: state.currentRestaurant?.id === id 
        ? { ...state.currentRestaurant, ...updatedData } 
        : state.currentRestaurant,
    })),

  removeRestaurant: (id) =>
    set((state) => ({
      restaurants: state.restaurants.filter((r) => r.id !== id),
      currentRestaurant: state.currentRestaurant?.id === id 
        ? null 
        : state.currentRestaurant,
    })),

  clearError: () => set({ error: null }),
}));

export default useRestaurantStore;
