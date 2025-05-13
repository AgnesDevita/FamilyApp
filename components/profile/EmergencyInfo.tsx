import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { X, Phone, User, Clipboard, Hospital } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface EmergencyInfoProps {
  onClose: () => void;
}

export default function EmergencyInfo({ onClose }: EmergencyInfoProps) {
  const EMERGENCY_CONTACTS = [
    {
      id: 1,
      name: 'Dr. Smith (Family Doctor)',
      phone: '(555) 123-4567',
      relationship: 'Primary Care Physician',
    },
    {
      id: 2,
      name: 'Margaret Williams (Grandma)',
      phone: '(555) 987-6543',
      relationship: 'Maternal Grandmother',
    },
    {
      id: 3,
      name: 'John Taylor (Uncle)',
      phone: '(555) 456-7890',
      relationship: 'Paternal Uncle',
    },
  ];

  const MEDICAL_INFO = [
    {
      id: 1,
      member: 'Dad (Joshua)',
      allergies: 'None',
      medications: 'None',
      bloodType: 'O+',
      notes: 'None',
    },
    {
      id: 2,
      member: 'Mom (Emma)',
      allergies: 'Penicillin',
      medications: 'None',
      bloodType: 'A+',
      notes: 'None',
    },
    {
      id: 3,
      member: 'Sarah',
      allergies: 'Peanuts (severe)',
      medications: 'Asthma inhaler (as needed)',
      bloodType: 'A+',
      notes: 'Has EpiPen in school bag and at home',
    },
    {
      id: 4,
      member: 'Max',
      allergies: 'None',
      medications: 'None',
      bloodType: 'O+',
      notes: 'Wears glasses',
    },
  ];

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Family Emergency Information</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={20} color={Colors.light.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Phone size={20} color={Colors.light.primary} />
              <Text style={styles.sectionTitle}>Emergency Contacts</Text>
            </View>
            
            {EMERGENCY_CONTACTS.map(contact => (
              <View key={contact.id} style={styles.contactCard}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
                <Text style={styles.contactRelationship}>{contact.relationship}</Text>
                <TouchableOpacity style={styles.callButton}>
                  <Text style={styles.callButtonText}>Call</Text>
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add Emergency Contact</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Hospital size={20} color={Colors.light.primary} />
              <Text style={styles.sectionTitle}>Medical Information</Text>
            </View>
            
            {MEDICAL_INFO.map(info => (
              <View key={info.id} style={styles.medicalCard}>
                <View style={styles.medicalHeader}>
                  <User size={16} color={Colors.light.primary} />
                  <Text style={styles.memberName}>{info.member}</Text>
                </View>
                
                <View style={styles.medicalDetails}>
                  <View style={styles.medicalItem}>
                    <Text style={styles.medicalLabel}>Allergies:</Text>
                    <Text style={styles.medicalValue}>{info.allergies}</Text>
                  </View>
                  
                  <View style={styles.medicalItem}>
                    <Text style={styles.medicalLabel}>Medications:</Text>
                    <Text style={styles.medicalValue}>{info.medications}</Text>
                  </View>
                  
                  <View style={styles.medicalItem}>
                    <Text style={styles.medicalLabel}>Blood Type:</Text>
                    <Text style={styles.medicalValue}>{info.bloodType}</Text>
                  </View>
                  
                  {info.notes !== 'None' && (
                    <View style={styles.medicalItem}>
                      <Text style={styles.medicalLabel}>Important Notes:</Text>
                      <Text style={styles.medicalValue}>{info.notes}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
            
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Medical Information</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.exportButton}>
            <Clipboard size={16} color="#FFFFFF" />
            <Text style={styles.exportButtonText}>Export as PDF</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginLeft: 8,
  },
  contactCard: {
    backgroundColor: '#F5F9FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 4,
  },
  contactRelationship: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginBottom: 12,
  },
  callButton: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.light.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  callButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  addButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 20,
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 14,
    color: Colors.light.primary,
  },
  medicalCard: {
    backgroundColor: '#F5F9FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  medicalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E3F2FD',
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginLeft: 8,
  },
  medicalDetails: {},
  medicalItem: {
    marginBottom: 8,
  },
  medicalLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginBottom: 2,
  },
  medicalValue: {
    fontSize: 14,
    color: Colors.light.text,
  },
  editButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 20,
    marginTop: 8,
  },
  editButtonText: {
    fontSize: 14,
    color: Colors.light.primary,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 40,
    marginTop: 16,
    alignSelf: 'center',
  },
  exportButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});