import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  MapPin,
  Clock
} from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'driver';
  timestamp: string;
  type: 'text' | 'location' | 'system';
}

export default function ChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to your ride chat! I\'m Ahmad, your driver for today.',
      sender: 'driver',
      timestamp: '2:30 PM',
      type: 'text'
    },
    {
      id: '2',
      text: 'Hi Ahmad! Looking forward to the ride.',
      sender: 'user',
      timestamp: '2:31 PM',
      type: 'text'
    },
    {
      id: '3',
      text: 'I\'m about 5 minutes away from the pickup point. White Toyota Camry, plate ABC 1234.',
      sender: 'driver',
      timestamp: '2:32 PM',
      type: 'text'
    },
    {
      id: '4',
      text: 'Perfect! I\'ll be waiting at the main entrance.',
      sender: 'user',
      timestamp: '2:33 PM',
      type: 'text'
    },
    {
      id: '5',
      text: 'Driver shared live location',
      sender: 'driver',
      timestamp: '2:34 PM',
      type: 'location'
    }
  ]);

  const rideInfo = {
    driver: 'Ahmad Rahman',
    vehicle: 'Toyota Camry - ABC 1234',
    pickup: 'KLCC',
    destination: 'Sunway Pyramid',
    eta: '15 mins',
    rating: 4.8
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate driver response
      setTimeout(() => {
        const driverResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Got it! See you soon.',
          sender: 'driver',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
        };
        setMessages(prev => [...prev, driverResponse]);
      }, 1000);
    }
  };

  const renderMessage = (msg: Message) => {
    if (msg.type === 'location') {
      return (
        <View style={[styles.messageContainer, styles.locationMessage]}>
          <View style={styles.locationCard}>
            <MapPin size={20} color="#2563EB" />
            <Text style={styles.locationText}>{msg.text}</Text>
          </View>
          <Text style={styles.timestamp}>{msg.timestamp}</Text>
        </View>
      );
    }

    return (
      <View style={[
        styles.messageContainer,
        msg.sender === 'user' ? styles.userMessage : styles.driverMessage
      ]}>
        <View style={[
          styles.messageBubble,
          msg.sender === 'user' ? styles.userBubble : styles.driverBubble
        ]}>
          <Text style={[
            styles.messageText,
            msg.sender === 'user' ? styles.userText : styles.driverText
          ]}>
            {msg.text}
          </Text>
        </View>
        <Text style={[
          styles.timestamp,
          msg.sender === 'user' ? styles.userTimestamp : styles.driverTimestamp
        ]}>
          {msg.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2563EB', '#1D4ED8']}
        style={styles.header}
      >
        <Animatable.View animation="fadeInDown" delay={200} style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.rideInfo}>
            <Text style={styles.driverName}>{rideInfo.driver}</Text>
            <Text style={styles.vehicleInfo}>{rideInfo.vehicle}</Text>
          </View>
          
          <TouchableOpacity style={styles.callButton}>
            <Phone size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </Animatable.View>
        
        <Animatable.View animation="fadeInDown" delay={400} style={styles.tripDetails}>
          <View style={styles.tripRoute}>
            <View style={styles.routePoint}>
              <View style={styles.pickupDot} />
              <Text style={styles.routeText}>{rideInfo.pickup}</Text>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routePoint}>
              <View style={styles.destinationDot} />
              <Text style={styles.routeText}>{rideInfo.destination}</Text>
            </View>
          </View>
          
          <View style={styles.etaContainer}>
            <Clock size={16} color="#BFDBFE" />
            <Text style={styles.etaText}>{rideInfo.eta}</Text>
          </View>
        </Animatable.View>
      </LinearGradient>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          ref={(ref) => ref?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <Animatable.View
              key={msg.id}
              animation="fadeInUp"
              duration={300}
            >
              {renderMessage(msg)}
            </Animatable.View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, message.trim() ? styles.sendButtonActive : styles.sendButtonInactive]}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send size={20} color={message.trim() ? "#FFFFFF" : "#9CA3AF"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rideInfo: {
    flex: 1,
    alignItems: 'center',
  },
  driverName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  vehicleInfo: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BFDBFE',
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  tripRoute: {
    flex: 1,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#16A34A',
    marginRight: 8,
  },
  destinationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 8,
  },
  routeLine: {
    width: 2,
    height: 12,
    backgroundColor: '#BFDBFE',
    marginLeft: 3,
    marginVertical: 4,
  },
  routeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  etaText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#BFDBFE',
    marginLeft: 4,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -10,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  driverMessage: {
    alignItems: 'flex-start',
  },
  locationMessage: {
    alignItems: 'center',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    marginBottom: 4,
  },
  userBubble: {
    backgroundColor: '#2563EB',
    borderBottomRightRadius: 4,
  },
  driverBubble: {
    backgroundColor: '#F3F4F6',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  userText: {
    color: '#FFFFFF',
  },
  driverText: {
    color: '#111827',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  userTimestamp: {
    textAlign: 'right',
  },
  driverTimestamp: {
    textAlign: 'left',
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2563EB',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    maxHeight: 100,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#2563EB',
  },
  sendButtonInactive: {
    backgroundColor: '#F3F4F6',
  },
});