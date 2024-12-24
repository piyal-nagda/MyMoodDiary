import React from 'react';
import { DiaryEntry, Mood } from '../types';
import { Calendar } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import { moodIcons, moodColors, moodEmojis, moodTitles } from '../constants/mood';

interface CategorizedEntriesProps {
  entries: DiaryEntry[];
}

export default function CategorizedEntries({ entries }: CategorizedEntriesProps) {
  const categorizedEntries = entries.reduce((acc, entry) => {
    if (!acc[entry.mood]) {
      acc[entry.mood] = [];
    }
    acc[entry.mood].push(entry);
    return acc;
  }, {} as Record<Mood, DiaryEntry[]>);

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <div className="space-y-8">
        {(Object.keys(moodIcons) as Mood[]).map((mood) => {
          const Icon = moodIcons[mood];
          const moodEntries = categorizedEntries[mood] || [];
          
          if (moodEntries.length === 0) return null;

          return (
            <div key={mood} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon className={`w-6 h-6 ${mood === 'happy' ? 'text-yellow-500' : 
                  mood === 'sad' ? 'text-blue-500' : 
                  mood === 'worst' ? 'text-red-500' : 'text-purple-500'}`} />
                <h2 className="text-xl font-semibold">
                  {moodEmojis[mood]} {moodTitles[mood]} ({moodEntries.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {moodEntries
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map(entry => (
                    <div
                      key={entry.id}
                      className={`${moodColors[entry.mood]} p-4 rounded-lg border`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {formatDate(new Date(entry.date))}
                        </span>
                      </div>
                      <p className="text-gray-800 whitespace-pre-wrap">{entry.content}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {entry.keywords.map(keyword => (
                          <span
                            key={keyword}
                            className="px-2 py-1 bg-white/50 rounded-full text-xs text-gray-600"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}