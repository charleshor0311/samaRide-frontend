import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { 
  User, 
  Star, 
  Shield, 
  Car, 
  CreditCard,
  Settings,
  ChevronRight,
  Bell,
  MessageCircle,
  History,
  Award
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const userStats = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    rating: 4.9,
    totalRides: 127,
    verified: true,
    joinDate: 'Member since Jan 2023',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    walletBalance: 45.50
  };

  const profileSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Personal Information', route: '/profile/personal' },
        { icon: Shield, label: 'Verification Status', route: '/profile/verification' },
        { icon: Car, label: 'Vehicle Information', route: '/profile/vehicle' },
        { icon: CreditCard, label: 'Payment Methods', route: '/payment' },
      ]
    },
    {
      title: 'Activity',
      items: [
        { icon: History, label: 'Ride History', route: '/profile/history' },
        { icon: Star, label: 'Reviews & Ratings', route: '/profile/reviews' },
        { icon: Award, label: 'Achievements', route: '/profile/achievements' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: MessageCircle, label: 'Chat Support', route: '/chat' },
        { icon: Settings, label: 'Settings', route: '/profile/settings' },
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2563EB', '#1D4ED8']}
        style={styles.header}
      >
        <Animatable.View animation="fadeInDown" delay={200} style={styles.headerContent}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: userStats.photo }} style={styles.profilePhoto} />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userStats.name}</Text>
              <Text style={styles.userEmail}>{userStats.email}</Text>
              <Text style={styles.joinDate}>{userStats.joinDate}</Text>
            </View>
            {userStats.verified && (
              <View style={styles.verificationBadge}>
                <Shield size={16} color="#FFFFFF" />
              </View>
            )}
          </View>
        </Animatable.View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Stats Cards */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Star size={24} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.statNumber}>{userStats.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            
            <View style={styles.statCard}>
              <Car size={24} color="#2563EB" />
              <Text style={styles.statNumber}>{userStats.totalRides}</Text>
              <Text style={styles.statLabel}>Total Rides</Text>
            </View>
            
            <View style={styles.statCard}>
              <CreditCard size={24} color="#16A34A" />
              <Text style={styles.statNumber}>RM {userStats.walletBalance}</Text>
              <Text style={styles.statLabel}>Wallet</Text>
            </View>
          </View>
        </Animatable.View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <Animatable.View 
            key={section.title}
            animation="fadeInUp" 
            delay={600 + sectionIndex * 100}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.menuItem,
                    itemIndex === section.items.length - 1 && styles.menuItemLast
                  ]}
                  onPress={() => router.push(item.route)}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <item.icon size={20} color="#6B7280" />
                    </View>
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </View>
                  <ChevronRight size={20} color="#9CA3AF" />
                </TouchableOpacity>
              ))}
            </View>
          </Animatable.View>
        ))}

        {/* Notification Toggle */}
        <Animatable.View animation="fadeInUp" delay={900} style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionContent}>
            <View style={styles.toggleItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <Bell size={20} color="#6B7280" />
                </View>
                <Text style={styles.menuItemText}>Push Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                thumbColor={notificationsEnabled ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>
          </View>
        </Animatable.View>

        {/* Sign Out Button */}
        <Animatable.View animation="fadeInUp" delay={1100} style={styles.signOutContainer}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </Animatable.View>

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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#BFDBFE',
    marginBottom: 2,
  },
  joinDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#93C5FD',
  },
  verificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#16A34A',
    borderRadius: 12,
    padding: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    marginTop: -10,
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  statsContainer: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  signOutContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  signOutButton: {
    backgroundColor: '#EF4444',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  signOutButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});