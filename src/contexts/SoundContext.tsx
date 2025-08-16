import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SOUNDS, SoundContextType } from '../lib/sounds';

const SoundContext = createContext<SoundContextType | undefined>(undefined);

interface SoundProviderProps {
  children: ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [audioElements, setAudioElements] = useState<Record<string, HTMLAudioElement>>({});

  // Initialize audio elements
  useEffect(() => {
    const elements: Record<string, HTMLAudioElement> = {};
    
    Object.entries(SOUNDS).forEach(([key, sound]) => {
      const audio = new Audio(sound.url);
      audio.volume = sound.volume * volume;
      audio.preload = sound.preload ? 'auto' : 'none';
      elements[key] = audio;
      console.log(`Initialized audio for: ${key}`); // Debug log
    });
    
    console.log('All audio elements created:', Object.keys(elements)); // Debug log
    setAudioElements(elements);
  }, []);

  // Update volume for all audio elements
  useEffect(() => {
    Object.values(audioElements).forEach(audio => {
      audio.volume = volume;
    });
  }, [volume, audioElements]);

  const playSound = (soundKey: keyof typeof SOUNDS) => {
    if (isMuted) return;
    
    const audio = audioElements[soundKey];
    if (audio) {
      console.log(`Playing sound: ${soundKey}`); // Debug log
      // Reset audio to beginning and play
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.warn(`Failed to play sound ${soundKey}:`, error);
      });
    } else {
      console.warn(`Sound ${soundKey} not found in audioElements`); // Debug log
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  };

  const value: SoundContextType = {
    playSound,
    isMuted,
    toggleMute,
    volume,
    setVolume: handleVolumeChange,
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
