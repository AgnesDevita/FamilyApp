import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Calendar, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'Sarah\'s Soccer Practice',
    time: '3:30 PM',
    date: 'Today',
    color: '#42A5F5',
  },
  {
    id: 2,
    title: 'Family Dinner',
    time: '6:00 PM',
    date: 'Today',
    color: '#FFA726',
  },
  {
    id: 3,
    title: 'Max\'s Dentist Appointment',
    time: '10:00 AM',
    date: 'Tomorrow',
    color: '#66BB6A',
  },
];

export default function UpcomingEvents() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming Events</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={16} color={Colors.light.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.eventsList}>
        {UPCOMING_EVENTS.map((event) => (
          <TouchableOpacity key={event.id} style={styles.eventItem}>
            <View style={[styles.eventColor, { backgroundColor: event.color }]} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventTimeContainer}>
                <Calendar size={12} color={Colors.light.textSecondary} />
                <Text style={styles.eventTime}>
                  {event.date} at {event.time}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.light.primary,
    marginRight: 4,
  },
  eventsList: {},
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  eventColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 4,
  },
  eventTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventTime: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginLeft: 4,
  },
});