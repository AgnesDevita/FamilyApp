import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { ArrowLeft, Send, Globe, Paperclip, Mic } from 'lucide-react-native';
import Colors from '@/constants/Colors';

// This would come from a database in a real app
const SAMPLE_MESSAGES = [
  {
    id: 1,
    sender: 'Dad',
    text: 'What time is dinner tonight?',
    time: '2:30 PM',
    isMine: false,
  },
  {
    id: 2,
    sender: 'Mom',
    text: 'Around 6:30, I\'m making lasagna.',
    time: '2:32 PM',
    isMine: false,
  },
  {
    id: 3,
    sender: 'You',
    text: 'Great! Do you need me to pick up anything on the way home?',
    time: '2:35 PM',
    isMine: true,
  },
  {
    id: 4,
    sender: 'Mom',
    text: 'Yes, please grab some garlic bread and salad.',
    time: '2:40 PM',
    isMine: false,
  },
];

// Sample global chat messages with translations
const GLOBAL_MESSAGES = [
  {
    id: 1,
    sender: 'Grandma',
    text: '¿Cómo están los niños?',
    translation: 'How are the children?',
    time: '10:15 AM',
    isMine: false,
  },
  {
    id: 2,
    sender: 'You',
    text: 'They are doing great! Sarah won her soccer game yesterday.',
    translation: '¡Les va muy bien! Sarah ganó su partido de fútbol ayer.',
    time: '10:20 AM',
    isMine: true,
  },
  {
    id: 3,
    sender: 'Grandpa',
    text: '¡Qué maravilloso! Estamos muy orgullosos.',
    translation: 'How wonderful! We are very proud.',
    time: '10:25 AM',
    isMine: false,
  },
  {
    id: 4,
    sender: 'You',
    text: 'We\'re planning to visit you this summer if possible.',
    translation: 'Estamos planeando visitarte este verano si es posible.',
    time: '10:30 AM',
    isMine: true,
  },
];

interface ConversationViewProps {
  chatId: string;
  onClose: () => void;
  isGlobal: boolean;
}

export default function ConversationView({ chatId, onClose, isGlobal }: ConversationViewProps) {
  const [message, setMessage] = useState('');
  const messages = isGlobal ? GLOBAL_MESSAGES : SAMPLE_MESSAGES;

  const sendMessage = () => {
    if (message.trim() === '') return;
    // In a real app, we would send the message to a backend
    setMessage('');
  };

  const chatName = isGlobal 
    ? chatId === 'grandparents' 
      ? 'Grandparents (Spanish)' 
      : chatId === 'cousins' 
        ? 'Cousins (French)' 
        : 'Exchange Student (Japanese)'
    : chatId === 'family' 
      ? 'Family Group' 
      : chatId === 'mom' 
        ? 'Mom' 
        : chatId === 'sarah' 
          ? 'Sarah' 
          : 'Max';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <ArrowLeft size={20} color={Colors.light.primary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{chatName}</Text>
          {isGlobal && (
            <View style={styles.translationBadge}>
              <Globe size={12} color={Colors.light.primary} />
              <Text style={styles.translationText}>Auto-translate</Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesList}>
        {messages.map(msg => (
          <View 
            key={msg.id} 
            style={[
              styles.messageWrapper,
              msg.isMine ? styles.myMessageWrapper : styles.otherMessageWrapper
            ]}>
            {!msg.isMine && (
              <Text style={styles.messageSender}>{msg.sender}</Text>
            )}
            <View 
              style={[
                styles.messageBubble,
                msg.isMine ? styles.myMessageBubble : styles.otherMessageBubble
              ]}>
              <Text style={[
                styles.messageText,
                msg.isMine ? styles.myMessageText : styles.otherMessageText
              ]}>
                {msg.text}
              </Text>
              {isGlobal && msg.translation && (
                <View style={styles.messageTranslation}>
                  <Globe size={12} color={msg.isMine ? '#FFFFFF' : Colors.light.primary} style={styles.translationIcon} />
                  <Text style={[
                    styles.translationText,
                    msg.isMine ? styles.myTranslationText : styles.otherTranslationText
                  ]}>
                    {msg.translation}
                  </Text>
                </View>
              )}
            </View>
            <Text style={[
              styles.messageTime,
              msg.isMine ? styles.myMessageTime : styles.otherMessageTime
            ]}>
              {msg.time}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Paperclip size={20} color={Colors.light.textSecondary} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        {message.trim() === '' ? (
          <TouchableOpacity style={styles.micButton}>
            <Mic size={20} color={Colors.light.textSecondary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={sendMessage}>
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  translationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  translationText: {
    fontSize: 12,
    color: Colors.light.primary,
    marginLeft: 4,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  messagesList: {
    padding: 16,
  },
  messageWrapper: {
    maxWidth: '80%',
    marginBottom: 16,
  },
  myMessageWrapper: {
    alignSelf: 'flex-end',
  },
  otherMessageWrapper: {
    alignSelf: 'flex-start',
  },
  messageSender: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.light.textSecondary,
    marginLeft: 12,
    marginBottom: 4,
  },
  messageBubble: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  myMessageBubble: {
    backgroundColor: Colors.light.primary,
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: Colors.light.text,
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
  },
  myMessageTime: {
    color: Colors.light.textSecondary,
    alignSelf: 'flex-end',
  },
  otherMessageTime: {
    color: Colors.light.textSecondary,
    alignSelf: 'flex-start',
  },
  messageTranslation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  translationIcon: {
    marginRight: 4,
  },
  myTranslationText: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
  otherTranslationText: {
    color: Colors.light.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
  },
  micButton: {
    padding: 8,
  },
  sendButton: {
    backgroundColor: Colors.light.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});