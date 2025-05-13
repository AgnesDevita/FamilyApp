import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, SquareCheck as CheckSquare, MessageCircle, Award, Clock, Users } from 'lucide-react-native';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import FamilyMembers from '@/components/home/FamilyMembers';
import UpcomingEvents from '@/components/home/UpcomingEvents';
import PendingTasks from '@/components/home/PendingTasks';

export default function HomeScreen() {
  const router = useRouter();
  const [isInteractiveModeActive, setIsInteractiveModeActive] = useState(false);

  const navigateTo = (route: string) => {
    router.push(route);
  };

  const startInteractiveMode = () => {
    setIsInteractiveModeActive(true);
    // In a real app, this would trigger the interactive mode logic
    setTimeout(() => {
      router.push('/interactive-mode');
    }, 500);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={[Colors.light.primary, Colors.light.secondary]}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <Text style={styles.headerTitle}>Welcome to FamiliaConnect</Text>
          <Text style={styles.headerSubtitle}>Your family's digital sanctuary</Text>
        </LinearGradient>
      </View>

      <FamilyMembers />

      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigateTo('/calendar')}>
            <View style={[styles.iconBackground, { backgroundColor: '#E3F2FD' }]}>
              <Calendar size={24} color="#42A5F5" />
            </View>
            <Text style={styles.actionText}>Family Calendar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigateTo('/tasks')}>
            <View style={[styles.iconBackground, { backgroundColor: '#E8F5E9' }]}>
              <CheckSquare size={24} color="#66BB6A" />
            </View>
            <Text style={styles.actionText}>Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigateTo('/chat')}>
            <View style={[styles.iconBackground, { backgroundColor: '#E0F7FA' }]}>
              <MessageCircle size={24} color="#26C6DA" />
            </View>
            <Text style={styles.actionText}>Family Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={startInteractiveMode}>
            <View style={[styles.iconBackground, { backgroundColor: '#FFF3E0' }]}>
              <Users size={24} color="#FFA726" />
            </View>
            <Text style={styles.actionText}>Interactive Mode</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.familyUpdatesContainer}>
        <UpcomingEvents />
        <PendingTasks />
      </View>

      <TouchableOpacity 
        style={styles.interactiveModeButton}
        onPress={startInteractiveMode}>
        <LinearGradient
          colors={[Colors.light.accent, '#FFA726']}
          style={styles.interactiveModeGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <Clock size={24} color="#FFFFFF" />
          <Text style={styles.interactiveModeText}>Start Family Time</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.achievementsContainer}>
        <View style={styles.achievementsHeader}>
          <Text style={styles.sectionTitle}>Family Achievements</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.achievementsList}>
          <View style={styles.achievementItem}>
            <View style={styles.achievementIconContainer}>
              <Award size={24} color="#FFA726" />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Perfect Week</Text>
              <Text style={styles.achievementDescription}>
                All family tasks completed on time this week!
              </Text>
            </View>
          </View>
          <View style={styles.achievementItem}>
            <View style={styles.achievementIconContainer}>
              <Award size={24} color="#FFA726" />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Communication Stars</Text>
              <Text style={styles.achievementDescription}>
                Family chat activity reached new heights!
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
  },
  headerGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
  },
  familyUpdatesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  interactiveModeButton: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  interactiveModeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  interactiveModeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  achievementsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.primary,
  },
  achievementsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  achievementIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
});