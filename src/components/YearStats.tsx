import React from 'react';
import { DiaryEntry } from '../types';
import { BarChart3, Sparkles, Star, Zap, Calendar } from 'lucide-react';

const moodEmojis = {
  happy: '🌟',
  average: '😊',
  sad: '🌧️',
  worst: '⛈️'
};

interface YearStatsProps {
  entries: DiaryEntry[];
  year: number;
}

export default function YearStats({ entries, year }: YearStatsProps) {
  const yearEntries = entries.filter(entry => 
    new Date(entry.date).getFullYear() === year
  );

  const moodCounts = yearEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const longestStreak = yearEntries.reduce((acc, entry, index, arr) => {
    let currentStreak = 1;
    let i = index;
    
    while (i < arr.length - 1) {
      const current = new Date(arr[i].date);
      const next = new Date(arr[i + 1].date);
      const diffDays = Math.floor((next.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
        i++;
      } else {
        break;
      }
    }
    
    return Math.max(acc, currentStreak);
  }, 0);

  const statCards = [
    {
      title: 'Total Entries',
      value: yearEntries.length,
      icon: Calendar,
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50'
    },
    {
      title: 'Longest Streak',
      value: `${longestStreak} days`,
      icon: Zap,
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50'
    },
    {
      title: 'Happiest Month',
      value: Object.entries(yearEntries.reduce((acc, entry) => {
        const month = new Date(entry.date).toLocaleString('default', { month: 'short' });
        if (entry.mood === 'happy') {
          acc[month] = (acc[month] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>))
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A',
      icon: Star,
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50'
    },
    {
      title: 'Most Common Mood',
      value: Object.entries(moodCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A',
      emoji: moodEmojis[Object.entries(moodCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] as keyof typeof moodEmojis],
      icon: Sparkles,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-4 p-6 bg-gradient-to-br from-pink-50 to-blue-50 rounded-lg shadow-md border border-pink-100">
      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-6 flex items-center">
        <BarChart3 className="w-6 h-6 text-pink-500 mr-2" />
        Year Highlights
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <div key={index} 
            className={`p-4 bg-gradient-to-br ${card.bgGradient} rounded-lg border border-pink-100
              transform hover:scale-105 transition-all cursor-pointer`}>
            <div className="flex items-center justify-between mb-2">
              <card.icon className={`w-5 h-5 bg-clip-text text-transparent bg-gradient-to-r ${card.gradient}`} />
              {card.emoji && <span className="text-xl">{card.emoji}</span>}
            </div>
            <div className="text-sm text-gray-600">{card.title}</div>
            <div className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${card.gradient} capitalize`}>
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}