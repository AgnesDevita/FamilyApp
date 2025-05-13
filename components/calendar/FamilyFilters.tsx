import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';

const FAMILY_MEMBERS = [
  { id: 1, name: 'Dad', color: '#42A5F5' },
  { id: 2, name: 'Mom', color: '#EC407A' },
  { id: 3, name: 'Sarah', color: '#66BB6A' },
  { id: 4, name: 'Max', color: '#FFA726' },
];

export default function FamilyFilters() {
  const [selectedMembers, setSelectedMembers] = useState(
    FAMILY_MEMBERS.map(member => member.id)
  );

  const toggleMember = (memberId: number) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const toggleAll = () => {
    if (selectedMembers.length === FAMILY_MEMBERS.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(FAMILY_MEMBERS.map(member => member.id));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>Show events for:</Text>
        <TouchableOpacity onPress={toggleAll}>
          <Text style={styles.toggleAllText}>
            {selectedMembers.length === FAMILY_MEMBERS.length 
              ? 'Deselect All' 
              : 'Select All'
            }
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterOptions}>
        {FAMILY_MEMBERS.map(member => (
          <TouchableOpacity
            key={member.id}
            style={[
              styles.filterOption,
              selectedMembers.includes(member.id) && styles.selectedOption,
              { borderColor: member.color }
            ]}
            onPress={() => toggleMember(member.id)}>
            <View style={[styles.colorIndicator, { backgroundColor: member.color }]} />
            <Text style={styles.optionText}>{member.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  toggleAllText: {
    fontSize: 14,
    color: Colors.light.primary,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#F5F9FF',
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  optionText: {
    fontSize: 13,
    color: Colors.light.text,
  },
});