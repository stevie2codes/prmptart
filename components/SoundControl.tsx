import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Volume1, Volume } from 'lucide-react';
import { useSound } from '../src/contexts/SoundContext';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

export function SoundControl() {
  const { isMuted, toggleMute, volume, setVolume } = useSound();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const getVolumeIcon = () => {
    if (isMuted) return VolumeX;
    if (volume > 0.7) return Volume2;
    if (volume > 0.3) return Volume1;
    return Volume;
  };

  const VolumeIcon = getVolumeIcon();

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleToggleMute = () => {
    toggleMute();
  };

  return (
    <div className="relative">
      <motion.div
        className="flex items-center gap-2"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        {/* Volume Icon Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleMute}
          className="p-2 h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          <VolumeIcon className="h-4 w-4" />
        </Button>

        {/* Volume Slider */}
        {showVolumeSlider && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute right-0 top-full mt-2 p-3 bg-background border border-border rounded-lg shadow-lg z-50 min-w-[200px]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Volume</span>
                <span className="text-xs text-muted-foreground">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={handleVolumeChange}
                max={1}
                min={0}
                step={0.01}
                className="w-full"
              />
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
