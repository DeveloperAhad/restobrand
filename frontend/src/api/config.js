const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const api = {
  // Auth endpoints
  auth: {
    login: '/auth/login/',
    register: '/auth/register/',
    logout: '/auth/logout/',
    refreshToken: '/auth/token/refresh/',
    me: '/auth/me/',
  },
  
  // Restaurant endpoints
  restaurants: '/restaurants/',
  
  // Branding endpoints
  branding: {
    moodboards: '/branding/moodboards/',
    colorPalettes: '/branding/color-palettes/',
    logos: '/branding/logos/',
  },
  
  // Content endpoints
  content: {
    posts: '/content/posts/',
    captions: '/content/captions/',
    hashtags: '/content/hashtags/',
    schedule: '/content/schedule/',
  },
  
  // Subscription endpoints
  subscription: {
    plans: '/subscription/plans/',
    current: '/subscription/current/',
    checkout: '/subscription/checkout/',
  },
};

export default API_BASE_URL;
