import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Camera, Check, Upload, ArrowLeft, Shield } from 'lucide-react-native';

export default function ImageVerificationScreen() {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleTakePhoto = async () => {
    // Simulate camera capture
    setImageUri('https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400');
    
    // Simulate AWS Rekognition verification
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 3000);
  };

  const handleContinue = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2563EB', '#1D4ED8']}
        style={styles.gradient}
      >
        <Animatable.View animation="fadeInUp" delay={200} style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Verify Your Identity</Text>
          <Text style={styles.subtitle}>Take a clear photo of your face for verification</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={400} style={styles.content}>
          <View style={styles.verificationCard}>
            <Shield size={64} color="#2563EB" style={styles.shieldIcon} />
            
            <Text style={styles.cardTitle}>Identity Verification</Text>
            <Text style={styles.cardDescription}>
              We use AWS Rekognition to verify your identity and ensure the safety of our community.
            </Text>

            <View style={styles.imageContainer}>
              {imageUri ? (
                <View style={styles.imagePreview}>
                  <Image source={{ uri: imageUri }} style={styles.previewImage} />
                  {isVerifying && (
                    <View style={styles.verifyingOverlay}>
                      <Text style={styles.verifyingText}>Verifying...</Text>
                    </View>
                  )}
                  {isVerified && (
                    <View style={styles.verifiedOverlay}>
                      <Check size={32} color="#FFFFFF" />
                      <Text style={styles.verifiedText}>Verified!</Text>
                    </View>
                  )}
                </View>
              ) : (
                <View style={styles.placeholderImage}>
                  <Camera size={48} color="#9CA3AF" />
                  <Text style={styles.placeholderText}>No image selected</Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.photoButton}
              onPress={handleTakePhoto}
              disabled={isVerifying}
            >
              <Camera size={24} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.photoButtonText}>
                {imageUri ? 'Retake Photo' : 'Take Photo'}
              </Text>
            </TouchableOpacity>

            <View style={styles.guidelines}>
              <Text style={styles.guidelinesTitle}>Photo Guidelines:</Text>
              <Text style={styles.guidelineItem}>• Ensure good lighting</Text>
              <Text style={styles.guidelineItem}>• Remove glasses and hats</Text>
              <Text style={styles.guidelineItem}>• Look directly at the camera</Text>
              <Text style={styles.guidelineItem}>• Keep face clearly visible</Text>
            </View>

            {isVerified && (
              <Animatable.View animation="fadeInUp" delay={300}>
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleContinue}
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
              </Animatable.View>
            )}
          </View>
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
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#BFDBFE',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  verificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  shieldIcon: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  imageContainer: {
    marginBottom: 32,
  },
  imagePreview: {
    position: 'relative',
    width: 200,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  verifyingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(37, 99, 235, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyingText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  verifiedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(22, 163, 74, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  placeholderImage: {
    width: 200,
    height: 200,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginTop: 12,
  },
  photoButton: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  photoButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  guidelines: {
    width: '100%',
    marginBottom: 24,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  guidelineItem: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  continueButton: {
    backgroundColor: '#16A34A',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});