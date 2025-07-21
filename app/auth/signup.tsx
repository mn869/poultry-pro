import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function SignUpScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [selectedUserType, setSelectedUserType] = useState('farmer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    farmName: '',
    location: '',
    specialty: '',
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const userTypes = [
    {
      id: 'farmer',
      title: 'Farmer',
      icon: 'home',
      description: 'Manage your poultry farm',
      color: '#16A34A',
    },
    {
      id: 'veterinarian',
      title: 'Veterinarian',
      icon: 'heart',
      description: 'Provide veterinary services',
      color: '#EF4444',
    },
    {
      id: 'supplier',
      title: 'Supplier',
      icon: 'truck',
      description: 'Supply feed and equipment',
      color: '#F59E0B',
    },
    {
      id: 'customer',
      title: 'Customer',
      icon: 'shopping-bag',
      description: 'Buy poultry products',
      color: '#3B82F6',
    },
  ];

  const handleSignUp = () => {
    console.log('handleSignUp called');
    console.log('Form data:', formData);
    console.log('Selected user type:', selectedUserType);
    
    if (!formData.name || !formData.email || !formData.password) {
      console.log('Missing required fields');
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      console.log('Passwords do not match');
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    console.log('Validation passed, navigating...');
    // Simulate signup process and navigate directly
    try {
      router.replace('/(tabs)');
      console.log('Navigation successful');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const renderFormFields = () => {
    const commonFields = (
      <>
        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="phone" size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            secureTextEntry
            placeholderTextColor="#9ca3af"
          />
        </View>
      </>
    );

    const specificFields = {
      farmer: (
        <>
          <View style={styles.inputContainer}>
            <Feather name="home" size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Farm Name"
              value={formData.farmName}
              onChangeText={(text) => setFormData({ ...formData, farmName: text })}
              placeholderTextColor="#9ca3af"
            />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="map-pin" size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Farm Location"
              value={formData.location}
              onChangeText={(text) => setFormData({ ...formData, location: text })}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </>
      ),
      veterinarian: (
        <View style={styles.inputContainer}>
          <Feather name="award" size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Specialty/Certification"
            value={formData.specialty}
            onChangeText={(text) => setFormData({ ...formData, specialty: text })}
            placeholderTextColor="#9ca3af"
          />
        </View>
      ),
      supplier: (
        <View style={styles.inputContainer}>
          <Feather name="package" size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Business Name"
            value={formData.farmName}
            onChangeText={(text) => setFormData({ ...formData, farmName: text })}
            placeholderTextColor="#9ca3af"
          />
        </View>
      ),
      customer: (
        <View style={styles.inputContainer}>
          <Feather name="briefcase" size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Business Type"
            value={formData.specialty}
            onChangeText={(text) => setFormData({ ...formData, specialty: text })}
            placeholderTextColor="#9ca3af"
          />
        </View>
      ),
    };

    return (
      <>
        {commonFields}
        {specificFields[selectedUserType as keyof typeof specificFields]}
      </>
    );
  };

  return (
    <LinearGradient
      colors={['#16A34A', '#22C55E']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={styles.headerSpacer} />
        </Animated.View>

        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <BlurView intensity={20} style={styles.formBlur}>
            <Text style={styles.formTitle}>Join PoultryPro</Text>
            <Text style={styles.formSubtitle}>Choose your account type to get started</Text>

            {/* User Type Selection */}
            <View style={styles.userTypeContainer}>
              {userTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.userTypeCard,
                    selectedUserType === type.id && styles.selectedUserTypeCard,
                  ]}
                  onPress={() => setSelectedUserType(type.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.userTypeIcon, { backgroundColor: `${type.color}15` }]}>
                    <Feather name={type.icon as any} size={24} color={type.color} />
                  </View>
                  <Text style={styles.userTypeTitle}>{type.title}</Text>
                  <Text style={styles.userTypeDescription}>{type.description}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Form Fields */}
            <View style={styles.formFields}>
              {renderFormFields()}
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity 
              style={styles.signUpButton} 
              onPress={() => {
                console.log('Sign up button pressed');
                handleSignUp();
              }} 
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#16A34A', '#22C55E']}
                style={styles.signUpGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.signUpButtonText}>Create Account</Text>
                <Feather name="arrow-right" size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginLink} onPress={() => router.push('/auth/login')}>
              <Text style={styles.loginLinkText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
          </BlurView>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 16,
  },
  headerSpacer: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    marginHorizontal: 24,
    borderRadius: 24,
    overflow: 'hidden',
  },
  formBlur: {
    flex: 1,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 32,
  },
  userTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  userTypeCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedUserTypeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  userTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  userTypeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userTypeDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  formFields: {
    gap: 16,
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  signUpButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  signUpGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  loginLinkText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
});