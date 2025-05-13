import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Clock, MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';

// This would be fetched from a real API in a production app
const sampleEvents = [
  {
    id: 1,
    title: 'Sarah\'s Soccer Practice',
    time: '3:30 PM - 5:00 PM',
    location: 'Community Field',
    color: '#42A5F5',
    members: ['Mom', 'Sarah']
  },
  {
    id: 2,
    title: 'Family Dinner',
    time: '6:00 PM - 7:30 PM',
    location: 'Home',
    color: '#FFA726',
    members: ['Dad', 'Mom', 'Sarah', 'Max']
  },
  {
    id: 3,
    title: 'Movie Night',
    time: '8:00 PM - 10:00 PM',
    location: 'Living Room',
    color: '#66BB6A',
    members: ['Dad', 'Mom', 'Sarah', 'Max']
  },
];

interface EventListProps {
  selectedDate: Date;
}

export default function EventList({ selectedDate }: EventListProps) {
  // For demo purposes, we'll display all sample events
  // In a real app, you would filter events based on the selected date
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };
  
  const renderNoEvents = () => {
    return (
      <View style={styles.noEventsContainer}>
        <Text style={styles.noEventsText}>No events scheduled for this day.</Text>
        <TouchableOpacity style={styles.addEventButton}>
          <Text style={styles.addEventText}>+ Add New Event</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      {sampleEvents.length === 0 ? (
        renderNoEvents()
      ) : (
        <>
          {sampleEvents.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <View style={[styles.eventColorBar, { backgroundColor: event.color }]} />
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                
                <View style={styles.eventDetailsRow}>
                  <Clock size={16} color={Colors.light.textSecondary} style={styles.eventIcon} />
                  <Text style={styles.eventDetailsText}>{event.time}</Text>
                </View>
                
                <View style={styles.eventDetailsRow}>
                  <MapPin size={16} color={Colors.light.textSecondary} style={styles.eventIcon} />
                  <Text style={styles.eventDetailsText}>{event.location}</Text>
                </View>
                
                <View style={styles.membersContainer}>
                  {event.members.map((member, index) => (
                    <View key={index} style={styles.memberBadge}>
                      <Text style={styles.memberText}>{member}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.addEventButton}>
            <Text style={styles.addEventText}>+ Add New Event</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noEventsText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginBottom: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
    overflow: 'hidden',
  },
  eventColorBar: {
    width: 8,
    backgroundColor: Colors.light.primary,
  },
  eventContent: {
    flex: 1,
    padding: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  eventDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventIcon: {
    marginRight: 8,
  },
  eventDetailsText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  membersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  memberBadge: {
    backgroundColor: '#F5F9FF',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  memberText: {
    fontSize: 12,
    color: Colors.light.primary,
  },
  addEventButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 20,
    marginTop: 8,
  },
  addEventText: {
    fontSize: 14,
    color: Colors.light.primary,
  },
});