import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Settings, Shield, Bell, BookOpen, Award, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import EmergencyInfo from '@/components/profile/EmergencyInfo';

export default function ProfileScreen() {
  const [showEmergencyInfo, setShowEmergencyInfo] = useState(false);
  const [parentalControlEnabled, setParentalControlEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleEmergencyInfo = () => {
    setShowEmergencyInfo(!showEmergencyInfo);
  };

  const profileImage = "https://images.pexels.com/photos/3814994/pexels-photo-3814994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={20} color={Colors.light.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.profileSection}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <Text style={styles.profileName}>Joshua Williams</Text>
          <Text style={styles.profileRole}>Parent (Admin)</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Shield size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Parental Controls</Text>
              <Text style={styles.settingDescription}>Manage app blocking and time limits</Text>
            </View>
            <Switch
              value={parentalControlEnabled}
              onValueChange={setParentalControlEnabled}
              trackColor={{ false: '#D1D1D6', true: Colors.light.success }}
              thumbColor={'#FFFFFF'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>Manage alert preferences</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#D1D1D6', true: Colors.light.success }}
              thumbColor={'#FFFFFF'}
            />
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={toggleEmergencyInfo}>
            <View style={styles.settingIconContainer}>
              <BookOpen size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Family Emergency Info</Text>
              <Text style={styles.settingDescription}>Important contact information</Text>
            </View>
            <Text style={styles.settingAction}>View</Text>
          </TouchableOpacity>
        </View>

        {showEmergencyInfo && <EmergencyInfo onClose={toggleEmergencyInfo} />}

        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Family Achievements</Text>
          <TouchableOpacity style={styles.achievementItem}>
            <View style={styles.settingIconContainer}>
              <Award size={20} color="#FFA726" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>View All Achievements</Text>
              <Text style={styles.settingDescription}>See what your family has accomplished</Text>
            </View>
            <Text style={styles.settingAction}>12</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.supportSection}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Help & Support</Text>
              <Text style={styles.settingDescription}>FAQs and contact information</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, styles.logoutItem]}>
            <View style={[styles.settingIconContainer, styles.logoutIcon]}>
              <LogOut size={20} color="#F44336" />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, styles.logoutText]}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
  },
  settingsButton: {
    padding: 8,
  },
  scrollContent: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 16,
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F5F9FF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  editProfileText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  settingsSection: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  settingAction: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  achievementsSection: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  supportSection: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 16,
  },
  logoutIcon: {
    backgroundColor: '#FFEBEE',
  },
  logoutText: {
    color: '#F44336',
  },
});