import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Filter,
  Navigation,
  DollarSign
} from 'lucide-react-native';

const mockRides = [
  {
    id: '1',
    driver: {
      name: 'Ahmad Rahman',
      rating: 4.8,
      photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      vehicle: 'Toyota Camry',
      plate: 'ABC 1234'
    },
    route: {
      from: 'KLCC',
      to: 'Sunway Pyramid',
      distance: '25 km',
      duration: '45 mins'
    },
    price: 15,
    seats: 3,
    departure: '2:30 PM',
    amenities: ['AC', 'WiFi', 'Music'],
  },
  {
    id: '2',
    driver: {
      name: 'Siti Nurhaliza',
      rating: 4.9,
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      vehicle: 'Honda Civic',
      plate: 'XYZ 5678'
    },
    route: {
      from: 'Mid Valley',
      to: 'Genting Highlands',
      distance: '45 km',
      duration: '1h 20m'
    },
    price: 25,
    seats: 2,
    departure: '3:00 PM',
    amenities: ['AC', 'Snacks'],
  },
  {
    id: '3',
    driver: {
      name: 'Lim Wei Ming',
      rating: 4.7,
      photo: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      vehicle: 'Nissan Teana',
      plate: 'DEF 9012'
    },
    route: {
      from: 'Bukit Bintang',
      to: 'Shah Alam',
      distance: '35 km',
      duration: '55 mins'
    },
    price: 18,
    seats: 4,
    departure: '4:15 PM',
    amenities: ['AC', 'Phone Charger'],
  },
];

export default function PassengerScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [rides, setRides] = useState(mockRides);

  const filterOptions = [
    { id: 'all', label: 'All Rides' },
    { id: 'price', label: 'Lowest Price' },
    { id: 'rating', label: 'Best Rating' },
    { id: 'time', label: 'Earliest' },
  ];

  const handleFilterChange = (filterId: string) => {
    setSelectedFilter(filterId);
    let sortedRides = [...mockRides];
    
    switch (filterId) {
      case 'price':
        sortedRides.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        sortedRides.sort((a, b) => b.driver.rating - a.driver.rating);
        break;
      case 'time':
        sortedRides.sort((a, b) => a.departure.localeCompare(b.departure));
        break;
    }
    
    setRides(sortedRides);
  };

  const handleBookRide = (rideId: string) => {
    router.push(`/ride-details?id=${rideId}`);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2563EB', '#1D4ED8']}
        style={styles.header}
      >
        <Animatable.View animation="fadeInDown" delay={200} style={styles.headerContent}>
          <Text style={styles.greeting}>Good afternoon! 👋</Text>
          <Text style={styles.title}>Find Your Ride</Text>
          
          <View style={styles.searchContainer}>
            <Search size={20} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Where are you going?"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </Animatable.View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" delay={400} style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersList}>
            {filterOptions.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  selectedFilter === filter.id && styles.filterChipActive
                ]}
                onPress={() => handleFilterChange(filter.id)}
              >
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter.id && styles.filterTextActive
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animatable.View>

        <View style={styles.ridesContainer}>
          <Text style={styles.sectionTitle}>Available Rides</Text>
          
          {rides.map((ride, index) => (
            <Animatable.View
              key={ride.id}
              animation="fadeInUp"
              delay={600 + index * 100}
              style={styles.rideCard}
            >
              <View style={styles.rideHeader}>
                <View style={styles.driverInfo}>
                  <Image source={{ uri: ride.driver.photo }} style={styles.driverPhoto} />
                  <View>
                    <Text style={styles.driverName}>{ride.driver.name}</Text>
                    <View style={styles.ratingContainer}>
                      <Star size={14} color="#F59E0B" fill="#F59E0B" />
                      <Text style={styles.rating}>{ride.driver.rating}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>RM {ride.price}</Text>
                  <Text style={styles.priceUnit}>per person</Text>
                </View>
              </View>

              <View style={styles.routeContainer}>
                <View style={styles.routePoint}>
                  <View style={styles.routeMarker} />
                  <Text style={styles.routeText}>{ride.route.from}</Text>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routePoint}>
                  <View style={[styles.routeMarker, styles.routeMarkerDestination]} />
                  <Text style={styles.routeText}>{ride.route.to}</Text>
                </View>
              </View>

              <View style={styles.rideDetails}>
                <View style={styles.detailItem}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{ride.departure}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Users size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{ride.seats} seats</Text>
                </View>
                <View style={styles.detailItem}>
                  <Navigation size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{ride.route.duration}</Text>
                </View>
              </View>

              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleText}>
                  {ride.driver.vehicle} • {ride.driver.plate}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => handleBookRide(ride.id)}
              >
                <Text style={styles.bookButtonText}>Book Ride</Text>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>
      </ScrollView>
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
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#BFDBFE',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    width: '100%',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 56,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  content: {
    flex: 1,
    marginTop: -10,
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  filtersContainer: {
    padding: 20,
  },
  filtersList: {
    flexDirection: 'row',
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  ridesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  rideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverPhoto: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  driverName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#16A34A',
    marginBottom: 2,
  },
  priceUnit: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  routeContainer: {
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563EB',
    marginRight: 12,
  },
  routeMarkerDestination: {
    backgroundColor: '#16A34A',
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginLeft: 5,
    marginBottom: 8,
  },
  routeText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 6,
  },
  vehicleInfo: {
    marginBottom: 16,
  },
  vehicleText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  bookButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});