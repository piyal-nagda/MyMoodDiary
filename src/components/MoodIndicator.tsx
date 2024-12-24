import React from 'react';
import { extractKeywords, analyzeMood } from '../utils/storage';

const moodStickers = {
  happy: '🌟',
  average: '😊',
  sad: '🌧️',
  worst: '⛈️'
};

interface MoodIndicatorProps {
  content: string;
}

export function MoodIndicator({ content }: MoodIndicatorProps) {
  if (!content) return null;
  
  const mood = analyzeMood(extractKeywords(content));
  
  return (
    <div className="absolute top-2 right-2 text-2xl">
      {moodStickers[mood]}
    </div>
  );
}