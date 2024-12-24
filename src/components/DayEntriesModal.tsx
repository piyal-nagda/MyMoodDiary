import React from 'react';
import { X } from 'lucide-react';
import { DiaryEntry } from '../types';
import { formatDate } from '../utils/dateUtils';
import { moodEmojis } from '../constants/mood';

interface DayEntriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: DiaryEntry[];
  date: Date;
}

export default function DayEntriesModal({ isOpen, onClose, entries, date }: DayEntriesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Entries for {formatDate(date)}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
          {entries.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No entries for this day</p>
          ) : (
            <div className="space-y-4">
              {entries.map(entry => (
                <div
                  key={entry.id}
                  className="p-4 rounded-lg border bg-gradient-to-r from-gray-50 to-white"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      {new Date(entry.date).toLocaleTimeString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>{moodEmojis[entry.mood]}</span>
                    </span>
                  </div>
                  <p className="text-gray-800 whitespace-pre-wrap">{entry.content}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {entry.keywords.map(keyword => (
                      <span
                        key={keyword}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}