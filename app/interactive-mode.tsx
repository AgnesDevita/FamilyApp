import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { X, Users, Clock, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';

export default function InteractiveModeScreen() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30); // minutes
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [familyPresent, setFamilyPresent] = useState({
    'Dad': true,
    'Mom': true,
    'Sarah': false,
    'Max': true
  });

  useEffect(() => {
    // Simulate checking if family members are present
    setTimeout(() => {
      setFamilyPresent({
        'Dad': true,
        'Mom': true,
        'Sarah': true,
        'Max': true
      });
    }, 3000);
  }, []);

  const startInteractiveMode = () => {
    setIsActive(true);
  };

  const exitInteractiveMode = () => {
    router.back();
  };

  const renderFamilyStatus = () => {
    return (
      <View style={styles.familyStatusContainer}>
        <Text style={styles.sectionTitle}>Family Presence</Text>
        {Object.entries(familyPresent).map(([member, present]) => (
          <View key={member} style={styles.memberStatus}>
            <View style={[
              styles.statusIndicator, 
              present ? styles.presentIndicator : styles.absentIndicator
            ]} />
            <Text style={styles.memberName}>{member}</Text>
            <Text style={[
              styles.statusText,
              present ? styles.presentText : styles.absentText
            ]}>
              {present ? 'Present' : 'Connecting...'}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const activities = [
    {
      id: 1,
      title: 'Family Quiz Night',
      description: 'Test your knowledge with fun family questions!',
      duration: 30,
      icon: 'brain'
    },
    {
      id: 2,
      title: 'Photo Scavenger Hunt',
      description: 'Race to find and photograph items around the house!',
      duration: 45,
      icon: 'camera'
    },
    {
      id: 3,
      title: 'Story Creator',
      description: 'Work together to craft an original family story!',
      duration: 30,
      icon: 'book'
    }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.light.primary, Colors.light.secondary]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Interactive Family Time</Text>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={exitInteractiveMode}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.timeContainer}>
          <Users size={24} color={Colors.light.primary} />
          <Text style={styles.timeText}>
            Family togetherness builds lasting memories and stronger bonds.
          </Text>
        </View>

        {!isActive ? (
          <>
            {renderFamilyStatus()}

            <View style={styles.activitiesContainer}>
              <Text style={styles.sectionTitle}>Choose an Activity</Text>
              {activities.map(activity => (
                <TouchableOpacity 
                  key={activity.id}
                  style={[
                    styles.activityCard,
                    selectedActivity === activity.id && styles.selectedActivity
                  ]}
                  onPress={() => setSelectedActivity(activity.id)}>
                  <View style={styles.activityHeader}>
                    <Text style={styles.activityTitle}>{activity.title}</Text>
                    <View style={styles.durationContainer}>
                      <Clock size={14} color={Colors.light.textSecondary} />
                      <Text style={styles.durationText}>{activity.duration} min</Text>
                    </View>
                  </View>
                  <Text style={styles.activityDescription}>
                    {activity.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={[
                styles.startButton,
                (!selectedActivity || Object.values(familyPresent).includes(false)) && styles.disabledButton
              ]}
              disabled={!selectedActivity || Object.values(familyPresent).includes(false)}
              onPress={startInteractiveMode}>
              <Text style={styles.startButtonText}>Start Family Time</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.activeContainer}>
            <View style={styles.timerContainer}>
              <Clock size={24} color={Colors.light.primary} />
              <Text style={styles.timerText}>{timeRemaining} minutes remaining</Text>
            </View>
            
            <View style={styles.activityInProgress}>
              <Text style={styles.activeTitle}>
                {activities.find(a => a.id === selectedActivity)?.title}
              </Text>
              <Text style={styles.activeDescription}>
                {activities.find(a => a.id === selectedActivity)?.description}
              </Text>
            </View>

            <View style={styles.participantsContainer}>
              <Text style={styles.participantsTitle}>Participants</Text>
              <View style={styles.participantsList}>
                {Object.entries(familyPresent)
                  .filter(([_, present]) => present)
                  .map(([member]) => (
                    <View key={member} style={styles.participantBadge}>
                      <Text style={styles.participantName}>{member}</Text>
                    </View>
                  ))
                }
              </View>
            </View>

            <View style={styles.rewardContainer}>
              <Award size={24} color="#FFA726" />
              <Text style={styles.rewardText}>
                Complete this activity to earn 50 family points!
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F9FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  timeText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
  },
  familyStatusContainer: {
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  memberStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  presentIndicator: {
    backgroundColor: Colors.light.success,
  },
  absentIndicator: {
    backgroundColor: Colors.light.warning,
  },
  memberName: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.text,
  },
  statusText: {
    fontSize: 12,
  },
  presentText: {
    color: Colors.light.success,
  },
  absentText: {
    color: Colors.light.warning,
  },
  activitiesContainer: {
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
  activityCard: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedActivity: {
    borderColor: Colors.light.primary,
    backgroundColor: '#F5F9FF',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginLeft: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#D1D1D6',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activeContainer: {
    flex: 1,
  },
  timerContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F9FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  timerText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  activityInProgress: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  activeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  activeDescription: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    lineHeight: 24,
  },
  participantsContainer: {
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
  participantsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 12,
  },
  participantsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  participantBadge: {
    backgroundColor: '#F5F9FF',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  participantName: {
    fontSize: 14,
    color: Colors.light.primary,
  },
  rewardContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 40,
    alignItems: 'center',
  },
  rewardText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#F57C00',
    lineHeight: 20,
  },
});