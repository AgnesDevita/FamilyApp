import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CircleCheck as CheckCircle, Clock, CircleAlert as AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';

// In a real app, this would be fetched from a database
const TASKS = [
  {
    id: 1,
    title: 'Clean your room',
    description: 'Make your bed and organize your toys',
    assignedBy: 'Dad',
    assignedTo: 'Sarah',
    dueDate: 'Today',
    priority: 'high',
    status: 'pending'
  },
  {
    id: 2,
    title: 'Take out the trash',
    description: 'Empty all bathroom and kitchen trash',
    assignedBy: 'Mom',
    assignedTo: 'Max',
    dueDate: 'Today',
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 3,
    title: 'Finish homework',
    description: 'Complete math and science assignments',
    assignedBy: 'Mom',
    assignedTo: 'Max',
    dueDate: 'Tomorrow',
    priority: 'high',
    status: 'pending'
  },
  {
    id: 4,
    title: 'Prepare dinner',
    description: 'Cook pasta with vegetables',
    assignedBy: 'Dad',
    assignedTo: 'Mom',
    dueDate: 'Today',
    priority: 'medium',
    status: 'completed'
  },
  {
    id: 5,
    title: 'Grocery shopping',
    description: 'Buy items from the shopping list',
    assignedBy: 'Mom',
    assignedTo: 'Dad',
    dueDate: 'Yesterday',
    priority: 'low',
    status: 'completed'
  },
];

interface TaskListProps {
  filter: string;
  familyMember: string;
}

export default function TaskList({ filter, familyMember }: TaskListProps) {
  // Filter tasks based on the selected filter and family member
  const filteredTasks = TASKS.filter(task => {
    // Filter by status
    if (filter === 'Pending' && task.status !== 'pending') return false;
    if (filter === 'Completed' && task.status !== 'completed') return false;
    
    // Filter by family member
    if (familyMember !== 'Everyone' && task.assignedTo !== familyMember) return false;
    
    return true;
  });

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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle size={16} color={Colors.light.error} />;
      case 'medium':
        return <Clock size={16} color={Colors.light.warning} />;
      default:
        return <Clock size={16} color={Colors.light.success} />;
    }
  };

  if (filteredTasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tasks found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {filteredTasks.map(task => (
        <TouchableOpacity key={task.id} style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <View style={styles.priorityContainer}>
              {getPriorityIcon(task.priority)}
              <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </Text>
            </View>
            <View style={[styles.statusBadge, task.status === 'completed' ? styles.completedBadge : styles.pendingBadge]}>
              <Text style={task.status === 'completed' ? styles.completedText : styles.pendingText}>
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </Text>
            </View>
          </View>
          
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
          
          <View style={styles.taskDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Assigned to:</Text>
              <Text style={styles.detailValue}>{task.assignedTo}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Due:</Text>
              <Text style={styles.detailValue}>{task.dueDate}</Text>
            </View>
          </View>

          <View style={styles.taskFooter}>
            <Text style={styles.assignedBy}>Assigned by {task.assignedBy}</Text>
            {task.status === 'pending' && (
              <TouchableOpacity style={styles.completeButton}>
                <CheckCircle size={16} color="#FFFFFF" />
                <Text style={styles.completeButtonText}>Complete</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pendingBadge: {
    backgroundColor: '#E3F2FD',
  },
  completedBadge: {
    backgroundColor: '#E8F5E9',
  },
  pendingText: {
    fontSize: 12,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  completedText: {
    fontSize: 12,
    color: Colors.light.success,
    fontWeight: '500',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  taskDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailItem: {
    marginRight: 24,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  assignedBy: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.success,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});