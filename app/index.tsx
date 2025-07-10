import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Car, MapPin, Shield, Users } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  const features = [
    {
      icon: Car,
      title: 'Safe Rides',
      description: 'Verified drivers and secure journeys'
    },
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      description: 'Track your ride in real-time'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Touch n Go eWallet integration'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with fellow travelers'
    }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2563EB', '#1D4ED8', '#1E40AF']}
        style={styles.gradient}
      >
        <Animatable.View animation="fadeInUp" delay={300} style={styles.header}>
          <Text style={styles.logo}>SamaRide</Text>
          <Text style={styles.tagline}>Your Journey, Our Priority</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={600} style={styles.heroSection}>
          <Car size={120} color="#FFFFFF" strokeWidth={1.5} />
          <Text style={styles.heroTitle}>
            Ride Together,{'\n'}Save Together
          </Text>
          <Text style={styles.heroSubtitle}>
            Join Malaysia's most trusted ride-sharing community
          </Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={900} style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              delay={1200 + index * 100}
              style={styles.featureCard}
            >
              <feature.icon size={24} color="#2563EB" />
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </Animatable.View>
          ))}
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={1600} style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/auth/register')}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </Animatable.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#BFDBFE',
    textAlign: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
    lineHeight: 34,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#BFDBFE',
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  featureCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#BFDBFE',
    textAlign: 'center',
    lineHeight: 16,
  },
  buttonContainer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});