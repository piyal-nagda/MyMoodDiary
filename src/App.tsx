import React from 'react';
import DiaryForm from './components/DiaryForm';
import MoodDashboard from './components/MoodDashboard';
import CategorizedEntries from './components/CategorizedEntries';
import { BookHeart } from 'lucide-react';
import { useDiaryEntries } from './hooks/useDiaryEntries';

export default function App() {
  const { entries, saveEntry } = useDiaryEntries();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center">
            <BookHeart className="w-10 h-10 text-indigo-600 mr-2" />
            My Mood Diary
          </h1>
          <p className="mt-2 text-gray-600">Track your daily thoughts and emotions</p>
        </div>
        
        <DiaryForm onSave={saveEntry} />
        <MoodDashboard entries={entries} />
        <CategorizedEntries entries={entries} />
      </div>
    </div>
  );
}