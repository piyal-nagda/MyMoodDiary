import { useState, useEffect } from 'react';
import { DiaryEntry } from '../types';
import { saveEntries, loadEntries } from '../utils/storage';
import { isSameDay } from '../utils/dateUtils';

export function useDiaryEntries() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const getTodayEntries = () => {
    const today = new Date();
    return entries.filter(entry => isSameDay(new Date(entry.date), today));
  };

  const saveEntry = (entry: DiaryEntry) => {
    const updatedEntries = [entry, ...entries];
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
  };

  return {
    entries,
    getTodayEntries,
    saveEntry
  };
}