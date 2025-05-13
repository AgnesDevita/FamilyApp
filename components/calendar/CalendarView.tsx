import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';

interface CalendarViewProps {
  currentDate: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function CalendarView({ currentDate, selectedDate, onSelectDate }: CalendarViewProps) {
  const [calendarDays, setCalendarDays] = useState<Array<{ date: Date | null; isCurrentMonth: boolean }>>([]);
  
  useEffect(() => {
    generateCalendarDays();
  }, [currentDate]);

  const generateCalendarDays = () => {
    const days: Array<{ date: Date | null; isCurrentMonth: boolean }> = [];
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week of the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Add days from the previous month to fill the first week
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -i);
      days.unshift({ date: prevMonthDay, isCurrentMonth: false });
    }
    
    // Add days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    // Add days from the next month to complete the calendar grid
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    setCalendarDays(days);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelectedDate = (date: Date) => {
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const renderDayNames = () => {
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return dayNames.map((day, index) => (
      <View key={index} style={styles.dayNameCell}>
        <Text style={styles.dayNameText}>{day}</Text>
      </View>
    ));
  };

  // Example function to check if a date has events (replace with actual implementation)
  const hasEvents = (date: Date) => {
    // For demo purposes, we'll say some random dates have events
    return date.getDate() % 3 === 0 || date.getDate() % 7 === 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.dayNames}>{renderDayNames()}</View>
      <View style={styles.daysGrid}>
        {calendarDays.map((day, index) => {
          if (!day.date) return <View key={index} style={styles.dayCell} />;
          
          const isCurrentDay = isToday(day.date);
          const isSelected = isSelectedDate(day.date);
          const dateHasEvents = hasEvents(day.date);
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCell,
                !day.isCurrentMonth && styles.inactiveDay,
                isSelected && styles.selectedDay,
              ]}
              onPress={() => onSelectDate(day.date)}>
              <Text
                style={[
                  styles.dayText,
                  !day.isCurrentMonth && styles.inactiveDayText,
                  isCurrentDay && styles.currentDayText,
                  isSelected && styles.selectedDayText,
                ]}>
                {day.date.getDate()}
              </Text>
              {dateHasEvents && <View style={styles.eventIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  dayNames: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 10,
  },
  dayNameCell: {
    flex: 1,
    alignItems: 'center',
  },
  dayNameText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.textSecondary,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  inactiveDay: {
    opacity: 0.4,
  },
  inactiveDayText: {
    color: Colors.light.textSecondary,
  },
  currentDayText: {
    color: Colors.light.primary,
    fontWeight: '700',
  },
  selectedDay: {
    backgroundColor: Colors.light.primary,
    borderRadius: 20,
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  eventIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.light.primary,
    position: 'absolute',
    bottom: 8,
  },
});