import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { ArrowUp, CreditCard as Edit, Search, Globe } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import ChatList from '@/components/chat/ChatList';
import ConversationView from '@/components/chat/ConversationView';

export default function ChatScreen() {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const openChat = (chatId: any) => {
    setSelectedChat(chatId);
  };

  const closeChat = () => {
    setSelectedChat(null);
  };

  return (
    <View style={styles.container}>
      {!selectedChat ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Family Connect</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.actionButton} onPress={toggleSearch}>
                <Search size={20} color={Colors.light.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Edit size={20} color={Colors.light.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {searchVisible && (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search conversations..."
                placeholderTextColor={Colors.light.textSecondary}
                autoFocus
              />
            </View>
          )}

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'chats' && styles.activeTab]}
              onPress={() => setActiveTab('chats')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'chats' && styles.activeTabText,
                ]}>
                Family Chats
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'global' && styles.activeTab]}
              onPress={() => setActiveTab('global')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'global' && styles.activeTabText,
                ]}>
                Global Connect
              </Text>
              <Globe size={16} color={activeTab === 'global' ? Colors.light.primary : Colors.light.textSecondary} style={styles.tabIcon} />
            </TouchableOpacity>
          </View>

          <ChatList 
            chatType={activeTab} 
            onSelectChat={openChat} 
          />

          <TouchableOpacity style={styles.newChatButton}>
            <Edit size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </>
      ) : (
        <ConversationView 
          chatId={selectedChat} 
          onClose={closeChat} 
          isGlobal={activeTab === 'global'} 
        />
      )}
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
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchInput: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 14,
    color: Colors.light.text,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.textSecondary,
  },
  activeTabText: {
    color: Colors.light.primary,
  },
  tabIcon: {
    marginLeft: 6,
  },
  newChatButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: Colors.light.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
});