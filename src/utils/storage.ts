import { DiaryEntry } from '../types';

const STORAGE_KEY = 'diary_entries';

export const saveEntries = (entries: DiaryEntry[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    console.log('Entries saved successfully:', entries);
  } catch (error) {
    console.error('Error saving entries:', error);
  }
};

export const loadEntries = (): DiaryEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const entries = JSON.parse(stored);
    console.log('Entries loaded successfully:', entries);
    return entries;
  } catch (error) {
    console.error('Error loading entries:', error);
    return [];
  }
};

export const extractKeywords = (content: string): string[] => {
  const words = content.toLowerCase().split(/\s+/);
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
  return [...new Set(words.filter(word => word.length > 3 && !commonWords.has(word)))].slice(0, 5);
};

export const analyzeMood = (keywords: string[]): DiaryEntry['mood'] => {
  const positiveWords = new Set(['happy', 'joy', 'excited', 'wonderful', 'great', 'amazing', 'love', 'fantastic']);
  const negativeWords = new Set(['sad', 'angry', 'upset', 'terrible', 'horrible', 'hate', 'worst', 'bad']);
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  keywords.forEach(word => {
    if (positiveWords.has(word)) positiveCount++;
    if (negativeWords.has(word)) negativeCount++;
  });
  
  if (negativeCount >= 2) return 'worst';
  if (negativeCount > positiveCount) return 'sad';
  if (positiveCount > negativeCount) return 'happy';
  return 'average';
};