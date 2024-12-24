export type Mood = 'happy' | 'sad' | 'worst' | 'average';

export interface DiaryEntry {
  id: string;
  date: string;
  content: string;
  mood: Mood;
  keywords: string[];
}