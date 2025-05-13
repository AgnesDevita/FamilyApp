import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SquareCheck as CheckSquare, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';

const PENDING_TASKS = [
  {
    id: 1,
    title: 'Clean your room',
    assignedTo: 'Sarah',
    dueDate: 'Today',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Take out the trash',
    assignedTo: 'Max',
    dueDate: 'Today',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Finish homework',
    assignedTo: 'Max',
    dueDate: 'Tomorrow',
    priority: 'high',
  },
];

export default function PendingTasks() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return Colors.light.error;
      case 'medium':
        return Colors.light.warning;
      default:
        return Colors.light.success;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pending Tasks</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={16} color={Colors.light.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.tasksList}>
        {PENDING_TASKS.map((task) => (
          <TouchableOpacity key={task.id} style={styles.taskItem}>
            <CheckSquare size={20} color={Colors.light.primary} style={styles.taskIcon} />
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <View style={styles.taskDetails}>
                <Text style={styles.taskAssignee}>
                  Assigned to: <Text style={styles.taskHighlight}>{task.assignedTo}</Text>
                </Text>
                <Text style={styles.taskDue}>
                  Due: <Text style={styles.taskHighlight}>{task.dueDate}</Text>
                </Text>
              </View>
            </View>
            <View 
              style={[
                styles.priorityIndicator, 
                { backgroundColor: getPriorityColor(task.priority) }
              ]} 
            />
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
  tasksList: {},
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  taskIcon: {
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 4,
  },
  taskDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  taskAssignee: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginRight: 12,
  },
  taskDue: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  taskHighlight: {
    color: Colors.light.text,
    fontWeight: '500',
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 12,
  },
});