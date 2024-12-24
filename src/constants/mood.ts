import { Smile, Frown, Meh, CloudRain } from 'lucide-react';
import type { Mood } from '../types';

export const moodIcons = {
  happy: Smile,
  sad: Frown,
  average: Meh,
  worst: CloudRain
} as const;

export const moodColors = {
  happy: 'bg-yellow-100 border-yellow-200 hover:bg-yellow-200',
  sad: 'bg-blue-100 border-blue-200 hover:bg-blue-200',
  average: 'bg-purple-100 border-purple-200 hover:bg-purple-200',
  worst: 'bg-red-100 border-red-200 hover:bg-red-200'
} as const;

export const moodEmojis = {
  happy: '🌟',
  sad: '🌧️',
  average: '😊',
  worst: '⛈️'
} as const;

export const moodTitles = {
  happy: 'Happy Days',
  sad: 'Blue Days',
  average: 'Normal Days',
  worst: 'Stormy Days'
} as const;