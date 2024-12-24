import React, { useState } from 'react';
import { PenLine, Sparkles } from 'lucide-react';
import { DiaryEntry } from '../types';
import { extractKeywords, analyzeMood } from '../utils/storage';
import { MoodIndicator } from './MoodIndicator';

interface DiaryFormProps {
  onSave: (entry: DiaryEntry) => void;
}

export default function DiaryForm({ onSave }: DiaryFormProps) {
  const [content, setContent] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const keywords = extractKeywords(content);
    const mood = analyzeMood(keywords);
    
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: content.trim(),
      keywords,
      mood,
    };

    setIsAnimating(true);
    onSave(newEntry);
    setContent('');
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 p-8 rounded-lg shadow-md border border-pink-100">
        <div className="flex items-center mb-6">
          <PenLine className="w-6 h-6 text-pink-500 mr-2" />
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Write Your Story
          </h2>
          <Sparkles className="w-5 h-5 text-yellow-500 ml-2" />
        </div>
        
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-40 p-4 border border-pink-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent resize-none bg-white/70 backdrop-blur-sm"
            placeholder="How are you feeling right now? Share your thoughts and emotions..."
          />
          <MoodIndicator content={content} />
        </div>

        <button
          type="submit"
          className={`mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg 
            hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 
            focus:outline-none focus:ring-2 focus:ring-purple-300 flex items-center justify-center
            ${isAnimating ? 'animate-bounce' : ''}`}
        >
          <span className="mr-2">Save Entry</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}