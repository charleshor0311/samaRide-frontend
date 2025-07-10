import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { Car, MapPin, Shield, Users } from 'lucide-react-native';
import AnimatedLogo from '@/components/AnimatedLogo';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  const features = [
    {
      icon: Car,
      title: 'Safe Rides',
      description: 'Verified drivers and secure journeys',
      color: '#2563EB'
    },
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      description: 'Track your ride in real-time',
      color: '#16A34A'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Touch n Go eWallet integration',
      color: '#DC2626'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with fellow travelers',
      color: '#7C3AED'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animatable.View animation="fadeInUp" delay={300} style={styles.header}>
          <Text style={styles.logo}>SamaRide</Text>
          <Text style={styles.tagline}>Your Journey, Our Priority</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={600} style={styles.heroSection}>
          <AnimatedLogo size={140} color="#2563EB" />
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
              <View style={[styles.iconContainer, { backgroundColor: `${feature.color}15` }]}>
                <feature.icon size={28} color={feature.color} />
              </View>
              <Text style={[styles.featureTitle, { color: feature.color }]}>{feature.title}</Text>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
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
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#2563EB',
    marginBottom: 8,
    textShadowColor: 'rgba(37, 99, 235, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
    lineHeight: 38,
  },
  heroSubtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 26,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  buttonContainer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2563EB',
  },
});