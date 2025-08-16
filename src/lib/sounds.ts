// Sound effects configuration for PromptArt
export const SOUNDS = {
  // UI Interactions
  CLICK: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    volume: 0.3,
    preload: true
  },
  
  HOVER: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
    volume: 0.2,
    preload: true
  },
  
  SUCCESS: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
    volume: 0.4,
    preload: true
  },
  
  ERROR: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3',
    volume: 0.3,
    preload: true
  },
  
  // Card Interactions
  CARD_OPEN: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3',
    volume: 0.35,
    preload: true
  },
  
  CARD_HOVER: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2575/2575-preview.mp3',
    volume: 0.15,
    preload: true
  },
  
  // Search & Filter
  SEARCH_TYPING: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2576/2576-preview.mp3',
    volume: 0.1,
    preload: true
  },
  
  FILTER_SELECT: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2577/2577-preview.mp3',
    volume: 0.25,
    preload: true
  },
  
  // Theme & Navigation
  THEME_SWITCH: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3',
    volume: 0.3,
    preload: true
  },
  
  SIDEBAR_TOGGLE: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2579/2579-preview.mp3',
    volume: 0.25,
    preload: true
  },
  
  // Modal & Forms
  MODAL_OPEN: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2580/2580-preview.mp3',
    volume: 0.3,
    preload: true
  },
  
  POP_CLOSE: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    volume: 0.25,
    preload: true
  },
  
  FORM_SUBMIT: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2582/2582-preview.mp3',
    volume: 0.4,
    preload: true
  },
  
  // Copy & Actions
  COPY_SUCCESS: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2583/2583-preview.mp3',
    volume: 0.35,
    preload: true
  },
  
  BUTTON_PRESS: {
    url: 'https://assets.mixkit.co/active_storage/sfx/2584/2584-preview.mp3',
    volume: 0.25,
    preload: true
  }
};

// Sound context for managing audio state
export interface SoundContextType {
  playSound: (soundKey: keyof typeof SOUNDS) => void;
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}
