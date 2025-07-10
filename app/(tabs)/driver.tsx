import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Car,
  DollarSign,
  Plus,
  Minus
} from 'lucide-react-native';

export default function DriverScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: 1,
    price: 0,
    vehicle: '',
    description: ''
  });

  const [suggestedPrice, setSuggestedPrice] = useState(0);

  const calculateSuggestedPrice = () => {
    // Smart price calculation based on distance and demand
    const basePrice = 10;
    const distanceMultiplier = 1.2;
    const demandMultiplier = 1.1;
    
    const suggested = Math.round(basePrice * distanceMultiplier * demandMultiplier);
    setSuggestedPrice(suggested);
    setFormData({...formData, price: suggested});
  };

  const handleSeatsChange = (increment: boolean) => {
    const newSeats = increment ? formData.seats + 1 : formData.seats - 1;
    if (newSeats >= 1 && newSeats <= 8) {
      setFormData({...formData, seats: newSeats});
    }
  };

  const handleCreateRide = () => {
    if (!formData.from || !formData.to || !formData.date || !formData.time) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Simulate ride creation
    Alert.alert(
      'Success',
      'Your ride has been created successfully!',
      [{ text: 'OK', onPress: () => router.push('/(tabs)') }]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#16A34A', '#15803D']}
        style={styles.header}
      >
        <Animatable.View animation="fadeInDown" delay={200} style={styles.headerContent}>
          <Text style={styles.greeting}>Ready to drive? 🚗</Text>
          <Text style={styles.title}>Create New Ride</Text>
        </Animatable.View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" delay={400} style={styles.formContainer}>
          
          {/* Route Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Route Details</Text>
            
            <View style={styles.inputContainer}>
              <MapPin size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="From (e.g., KLCC)"
                placeholderTextColor="#9CA3AF"
                value={formData.from}
                onChangeText={(text) => setFormData({...formData, from: text})}
              />
            </View>

            <View style={styles.inputContainer}>
              <MapPin size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="To (e.g., Sunway Pyramid)"
                placeholderTextColor="#9CA3AF"
                value={formData.to}
                onChangeText={(text) => setFormData({...formData, to: text})}
              />
            </View>
          </View>

          {/* Date & Time Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Schedule</Text>
            
            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Calendar size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Date"
                  placeholderTextColor="#9CA3AF"
                  value={formData.date}
                  onChangeText={(text) => setFormData({...formData, date: text})}
                />
              </View>

              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Clock size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Time"
                  placeholderTextColor="#9CA3AF"
                  value={formData.time}
                  onChangeText={(text) => setFormData({...formData, time: text})}
                />
              </View>
            </View>
          </View>

          {/* Seats Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Seats</Text>
            
            <View style={styles.seatsContainer}>
              <TouchableOpacity
                style={styles.seatsButton}
                onPress={() => handleSeatsChange(false)}
              >
                <Minus size={20} color="#6B7280" />
              </TouchableOpacity>
              
              <View style={styles.seatsDisplay}>
                <Users size={24} color="#2563EB" />
                <Text style={styles.seatsText}>{formData.seats}</Text>
              </View>
              
              <TouchableOpacity
                style={styles.seatsButton}
                onPress={() => handleSeatsChange(true)}
              >
                <Plus size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Price Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pricing</Text>
            
            <TouchableOpacity
              style={styles.suggestButton}
              onPress={calculateSuggestedPrice}
            >
              <DollarSign size={20} color="#16A34A" />
              <Text style={styles.suggestButtonText}>Get Smart Price Suggestion</Text>
            </TouchableOpacity>

            {suggestedPrice > 0 && (
              <View style={styles.priceCard}>
                <Text style={styles.priceCardTitle}>Suggested Price</Text>
                <Text style={styles.priceCardAmount}>RM {suggestedPrice}</Text>
                <Text style={styles.priceCardDescription}>
                  Based on distance, demand, and market rates
                </Text>
              </View>
            )}

            <View style={styles.inputContainer}>
              <DollarSign size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Price per person (RM)"
                placeholderTextColor="#9CA3AF"
                value={formData.price.toString()}
                onChangeText={(text) => setFormData({...formData, price: parseInt(text) || 0})}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Vehicle Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vehicle Information</Text>
            
            <View style={styles.inputContainer}>
              <Car size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Vehicle (e.g., Toyota Camry - ABC 1234)"
                placeholderTextColor="#9CA3AF"
                value={formData.vehicle}
                onChangeText={(text) => setFormData({...formData, vehicle: text})}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Additional notes (optional)"
                placeholderTextColor="#9CA3AF"
                value={formData.description}
                onChangeText={(text) => setFormData({...formData, description: text})}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* Create Ride Button */}
          <Animatable.View animation="fadeInUp" delay={800} style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateRide}
            >
              <Text style={styles.createButtonText}>Create Ride</Text>
            </TouchableOpacity>
          </Animatable.View>

        </Animatable.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#BBF7D0',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  content: {
    flex: 1,
    marginTop: -10,
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  formContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  seatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  seatsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  seatsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 32,
  },
  seatsText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginLeft: 12,
  },
  suggestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#16A34A',
    borderStyle: 'dashed',
  },
  suggestButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#16A34A',
    marginLeft: 8,
  },
  priceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#16A34A',
  },
  priceCardTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 8,
  },
  priceCardAmount: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#16A34A',
    marginBottom: 8,
  },
  priceCardDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 32,
  },
  createButton: {
    backgroundColor: '#16A34A',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  createButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});