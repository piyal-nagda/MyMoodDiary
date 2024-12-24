import React from 'react';
import { DiaryEntry } from '../types';
import { Calendar } from 'lucide-react';

interface EntryListProps {
  entries: DiaryEntry[];
}

export default function EntryList({ entries }: EntryListProps) {
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Calendar className="w-6 h-6 mr-2" />
        Previous Entries
      </h2>
      <div className="space-y-4">
        {sortedEntries.map(entry => (
          <div key={entry.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-600">
                {new Date(entry.date).toLocaleDateString()}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium capitalize"
                style={{
                  backgroundColor: entry.mood === 'happy' ? '#86efac' :
                    entry.mood === 'sad' ? '#bfdbfe' :
                    entry.mood === 'worst' ? '#fecaca' : '#fef08a'
                }}>
                {entry.mood}
              </span>
            </div>
            <p className="text-gray-800 mb-3">{entry.content}</p>
            <div className="flex flex-wrap gap-2">
              {entry.keywords.map(keyword => (
                <span key={keyword} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  #{keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}