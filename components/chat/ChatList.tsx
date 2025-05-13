import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Globe } from 'lucide-react-native';
import Colors from '@/constants/Colors';

// This would come from a database in a real app
const FAMILY_CHATS = [
  {
    id: 'family',
    name: 'Family Group',
    lastMessage: 'Dad: What time is dinner tonight?',
    time: '10 min ago',
    unread: 3,
    avatars: [
      'https://images.pexels.com/photos/3814994/pexels-photo-3814994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ]
  },
  {
    id: 'mom',
    name: 'Mom',
    lastMessage: 'Can you pick up milk on your way home?',
    time: '1 hour ago',
    unread: 0,
    avatars: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ]
  },
  {
    id: 'sarah',
    name: 'Sarah',
    lastMessage: 'I need help with my homework',
    time: '2 hours ago',
    unread: 1,
    avatars: [
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ]
  },
  {
    id: 'max',
    name: 'Max',
    lastMessage: 'Can I play video games after dinner?',
    time: 'Yesterday',
    unread: 0,
    avatars: [
      'https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ]
  },
];

// Sample global chats with automatic translation
const GLOBAL_CHATS = [
  {
    id: 'grandparents',
    name: 'Grandparents (Spanish)',
    lastMessage: 'Grandma: ¿Cómo están los niños?',
    translatedMessage: 'How are the children?',
    time: '3 hours ago',
    unread: 2,
    language: 'Spanish',
    flag: '🇪🇸',
    avatars: [
      'https://images.pexels.com/photos/5257599/pexels-photo-5257599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ]
  },
  {
    id: 'cousins',
    name: 'Cousins (French)',
    lastMessage: 'Pierre: Nous viendrons vous rendre visite cet été',
    translatedMessage: 'We will come visit you this summer',
    time: 'Yesterday',
    unread: 0,
    language: 'French',
    flag: '🇫🇷',
    avatars: [
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ]
  },
  {
    id: 'exchange',
    name: 'Exchange Student (Japanese)',
    lastMessage: 'Akira: 来週あなたの家に滞在できますか？',
    translatedMessage: 'Can I stay at your home next week?',
    time: '2 days ago',
    unread: 1,
    language: 'Japanese',
    flag: '🇯🇵',
    avatars: [
      'https://images.pexels.com/photos/5378700/pexels-photo-5378700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ]
  },
];

interface ChatListProps {
  chatType: string;
  onSelectChat: (chatId: string) => void;
}

export default function ChatList({ chatType, onSelectChat }: ChatListProps) {
  const chats = chatType === 'chats' ? FAMILY_CHATS : GLOBAL_CHATS;
  
  const renderChatItem = ({ item }: { item: any }) => {
    const isGlobalChat = chatType === 'global';
    
    return (
      <TouchableOpacity 
        style={styles.chatItem}
        onPress={() => onSelectChat(item.id)}>
        <View style={styles.avatarContainer}>
          {item.avatars.length === 1 ? (
            <Image source={{ uri: item.avatars[0] }} style={styles.avatar} />
          ) : (
            <View style={styles.groupAvatars}>
              {item.avatars.slice(0, 2).map((avatar: string, index: number) => (
                <Image 
                  key={index} 
                  source={{ uri: avatar }} 
                  style={[
                    styles.groupAvatar,
                    index === 1 && styles.secondGroupAvatar
                  ]} 
                />
              ))}
            </View>
          )}
          {isGlobalChat && (
            <View style={styles.flagBadge}>
              <Text>{item.flag}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.chatTime}>{item.time}</Text>
          </View>
          
          <View style={styles.messageContainer}>
            <Text 
              style={styles.lastMessage}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.lastMessage}
            </Text>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
          </View>
          
          {isGlobalChat && item.translatedMessage && (
            <View style={styles.translationContainer}>
              <Globe size={12} color={Colors.light.textSecondary} style={styles.translationIcon} />
              <Text 
                style={styles.translatedMessage}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.translatedMessage}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <FlatList
      data={chats}
      renderItem={renderChatItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 2,
  },
  avatarContainer: {
    marginRight: 12,
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  groupAvatars: {
    width: 50,
    height: 50,
    position: 'relative',
  },
  groupAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    position: 'absolute',
    top: 0,
    left: 0,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  secondGroupAvatar: {
    top: 12,
    left: 12,
  },
  flagBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  chatTime: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  unreadText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  translationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  translationIcon: {
    marginRight: 4,
  },
  translatedMessage: {
    flex: 1,
    fontSize: 12,
    color: Colors.light.primary,
    fontStyle: 'italic',
  },
});