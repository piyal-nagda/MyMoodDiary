import React, { useState } from 'react';
import { DiaryEntry } from '../types';
import { getContributionData, formatDate, isSameDay } from '../utils/dateUtils';
import { BarChart3 } from 'lucide-react';
import DayEntriesModal from './DayEntriesModal';

const moodIntensity = {
  empty: 'bg-gray-800',
  happy: 'bg-amber-500',
  average: 'bg-sky-500',
  sad: 'bg-violet-500',
  worst: 'bg-rose-500'
};

interface MoodDashboardProps {
  entries: DiaryEntry[];
}

export default function MoodDashboard({ entries }: MoodDashboardProps) {
  const [year] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const weeks = getContributionData(year);
  
  const getEntriesForDate = (date: Date) => {
    return entries.filter(entry => 
      isSameDay(new Date(entry.date), date)
    );
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 p-8 bg-gray-900 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-800">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-3">
          <BarChart3 className="w-7 h-7 text-gray-300" />
          <span>{year} Mood Journey</span>
        </h2>
      </div>

      <div className="flex flex-col gap-3 bg-gray-950 p-6 rounded-lg shadow-inner border border-gray-800">
        <div className="flex gap-2">
          <div className="grid grid-rows-7 text-xs text-gray-400 font-medium pt-2 leading-[16px]">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
          </div>

          <div className="flex-1 grid grid-cols-[repeat(53,_minmax(0,_1fr))] gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
                {week.map((date, dayIndex) => {
                  const dayEntries = getEntriesForDate(date);
                  const entry = dayEntries[0];
                  return (
                    <button
                      key={dayIndex}
                      onClick={() => handleDayClick(date)}
                      className={`w-[16px] h-[16px] rounded-full ${entry ? moodIntensity[entry.mood] : moodIntensity.empty}
                        hover:ring-2 hover:ring-gray-500 transition-all cursor-pointer transform hover:scale-125
                        shadow-lg`}
                      title={`${formatDate(date)}${dayEntries.length > 0 ? `\n${dayEntries.length} entries` : '\n✨ No entries yet'}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4 p-3 bg-gray-900 rounded-lg border border-gray-800">
          <span className="text-gray-300 font-medium">Mood Scale</span>
          <div className="flex gap-2">
            {Object.entries(moodIntensity).filter(([key]) => key !== 'empty').map(([mood, color]) => (
              <div key={mood} className="flex items-center gap-1.5">
                <div className={`w-4 h-4 rounded-full ${color} shadow-lg`} />
                <span className="text-xs text-gray-400 capitalize">{mood}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedDate && (
        <DayEntriesModal
          isOpen={true}
          onClose={() => setSelectedDate(null)}
          entries={getEntriesForDate(selectedDate)}
          date={selectedDate}
        />
      )}
    </div>
  );
}