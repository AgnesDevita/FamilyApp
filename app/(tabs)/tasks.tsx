import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Plus, Filter, User, ChevronDown } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import TaskList from '@/components/tasks/TaskList';
import FilterMenu from '@/components/tasks/FilterMenu';

export default function TasksScreen() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All Tasks');
  const [selectedFamilyMember, setSelectedFamilyMember] = useState('Everyone');
  const [familyMemberDropdownVisible, setFamilyMemberDropdownVisible] = useState(false);
  
  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const toggleFamilyMemberDropdown = () => {
    setFamilyMemberDropdownVisible(!familyMemberDropdownVisible);
  };

  const selectFamilyMember = (member: string) => {
    setSelectedFamilyMember(member);
    setFamilyMemberDropdownVisible(false);
  };

  const applyFilter = (filter: string) => {
    setSelectedFilter(filter);
    setFilterVisible(false);
  };

  const familyMembers = ['Everyone', 'Dad', 'Mom', 'Sarah', 'Max'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Family Tasks</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.filterButton} onPress={toggleFilter}>
            <Filter size={20} color={Colors.light.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {filterVisible && (
        <FilterMenu
          selectedFilter={selectedFilter}
          onSelectFilter={applyFilter}
          onClose={toggleFilter}
        />
      )}

      <View style={styles.familyMemberSelector}>
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={toggleFamilyMemberDropdown}
        >
          <User size={16} color={Colors.light.primary} />
          <Text style={styles.dropdownButtonText}>{selectedFamilyMember}</Text>
          <ChevronDown size={16} color={Colors.light.primary} />
        </TouchableOpacity>
        
        {familyMemberDropdownVisible && (
          <View style={styles.dropdown}>
            {familyMembers.map((member) => (
              <TouchableOpacity 
                key={member} 
                style={styles.dropdownItem}
                onPress={() => selectFamilyMember(member)}
              >
                <Text style={[
                  styles.dropdownItemText,
                  member === selectedFamilyMember && styles.selectedDropdownItem
                ]}>
                  {member}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          placeholderTextColor={Colors.light.textSecondary}
        />
      </View>

      <View style={styles.tasksContainer}>
        <View style={styles.filterTabs}>
          <TouchableOpacity 
            style={[
              styles.filterTab, 
              selectedFilter === 'All Tasks' && styles.activeFilterTab
            ]}
            onPress={() => applyFilter('All Tasks')}
          >
            <Text style={[
              styles.filterTabText,
              selectedFilter === 'All Tasks' && styles.activeFilterTabText
            ]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.filterTab, 
              selectedFilter === 'Pending' && styles.activeFilterTab
            ]}
            onPress={() => applyFilter('Pending')}
          >
            <Text style={[
              styles.filterTabText,
              selectedFilter === 'Pending' && styles.activeFilterTabText
            ]}>
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.filterTab, 
              selectedFilter === 'Completed' && styles.activeFilterTab
            ]}
            onPress={() => applyFilter('Completed')}
          >
            <Text style={[
              styles.filterTabText,
              selectedFilter === 'Completed' && styles.activeFilterTabText
            ]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.taskList}>
          <TaskList
            filter={selectedFilter}
            familyMember={selectedFamilyMember}
          />
        </ScrollView>
      </View>
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    padding: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: Colors.light.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  familyMemberSelector: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    zIndex: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F9FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.secondary,
  },
  dropdownButtonText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: Colors.light.text,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 20,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  selectedDropdownItem: {
    color: Colors.light.primary,
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 14,
    color: Colors.light.text,
  },
  tasksContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
  },
  activeFilterTab: {
    backgroundColor: Colors.light.primary,
  },
  filterTabText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  activeFilterTabText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  taskList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});