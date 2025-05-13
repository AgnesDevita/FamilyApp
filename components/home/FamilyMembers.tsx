import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';

const FAMILY_MEMBERS = [
  {
    id: 1,
    name: 'Joshua',
    role: 'Dad',
    avatar: 'https://images.pexels.com/photos/3814994/pexels-photo-3814994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    pendingTasks: 2,
  },
  {
    id: 2,
    name: 'Emma',
    role: 'Mom',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    pendingTasks: 1,
  },
  {
    id: 3,
    name: 'Sarah',
    role: 'Daughter',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    pendingTasks: 4,
  },
  {
    id: 4,
    name: 'Max',
    role: 'Son',
    avatar: 'https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    pendingTasks: 3,
  },
];

export default function FamilyMembers() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Family Members</Text>
        <TouchableOpacity>
          <Text style={styles.manageText}>Manage</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {FAMILY_MEMBERS.map((member) => (
          <TouchableOpacity key={member.id} style={styles.memberCard}>
            <Image source={{ uri: member.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.role}>{member.role}</Text>
            {member.pendingTasks > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{member.pendingTasks}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  manageText: {
    fontSize: 14,
    color: Colors.light.primary,
  },
  scroll: {
    paddingHorizontal: 16,
  },
  memberCard: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 80,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    textAlign: 'center',
  },
  role: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.light.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});