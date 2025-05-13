import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface FilterMenuProps {
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
  onClose: () => void;
}

export default function FilterMenu({ selectedFilter, onSelectFilter, onClose }: FilterMenuProps) {
  const filters = ['All Tasks', 'Pending', 'Completed', 'High Priority', 'My Tasks', 'Assigned by Me'];
  
  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Filter Tasks</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.filterList}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              style={styles.filterItem}
              onPress={() => {
                onSelectFilter(filter);
              }}>
              <Text style={[
                styles.filterText,
                filter === selectedFilter && styles.selectedFilterText
              ]}>
                {filter}
              </Text>
              {filter === selectedFilter && (
                <Check size={16} color={Colors.light.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 100,
  },
  menu: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    fontSize: 14,
    color: Colors.light.primary,
  },
  filterList: {
    paddingTop: 8,
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  selectedFilterText: {
    color: Colors.light.primary,
    fontWeight: '500',
  },
});