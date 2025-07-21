import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { 
  Stethoscope, 
  UserCheck, 
  Wrench, 
  GraduationCap,
  Search,
  Star,
  MapPin,
  Clock,
  Phone
} from 'lucide-react-native';

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('veterinary');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'veterinary', title: 'Veterinary', icon: Stethoscope, color: '#EF4444' },
    { id: 'consulting', title: 'Consulting', icon: UserCheck, color: '#3B82F6' },
    { id: 'equipment', title: 'Equipment', icon: Wrench, color: '#F59E0B' },
    { id: 'training', title: 'Training', icon: GraduationCap, color: '#8B5CF6' },
  ];

  const handleBookService = (serviceId: number) => {
    console.log(`Booking service ${serviceId}`);
    // Add booking logic here
  };

  const handleCallService = (serviceId: number) => {
    console.log(`Calling service ${serviceId}`);
    // Add call logic here
  };

  const services = {
    veterinary: [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        service: 'Poultry Veterinarian',
        rating: 4.8,
        reviews: 127,
        distance: '2.3 km',
        availability: 'Available Now',
        price: '$75/visit',
        specialties: ['Disease Diagnosis', 'Vaccination', 'Emergency Care']
      },
      {
        id: 2,
        name: 'Animal Health Clinic',
        service: 'Veterinary Services',
        rating: 4.6,
        reviews: 89,
        distance: '5.1 km',
        availability: 'Next Available: 2 PM',
        price: '$60/visit',
        specialties: ['Health Checkups', 'Surgery', 'Lab Testing']
      }
    ],
    consulting: [
      {
        id: 3,
        name: 'Farm Management Pro',
        service: 'Business Consulting',
        rating: 4.9,
        reviews: 203,
        distance: 'Remote',
        availability: 'Available Now',
        price: '$120/hour',
        specialties: ['Business Planning', 'Efficiency Optimization', 'Market Analysis']
      }
    ],
    equipment: [
      {
        id: 4,
        name: 'AgriTech Solutions',
        service: 'Equipment Maintenance',
        rating: 4.7,
        reviews: 156,
        distance: '8.2 km',
        availability: 'Tomorrow 9 AM',
        price: '$85/hour',
        specialties: ['Incubator Repair', 'Feeding Systems', 'Ventilation']
      }
    ],
    training: [
      {
        id: 5,
        name: 'Poultry Academy',
        service: 'Training & Workshops',
        rating: 4.8,
        reviews: 312,
        distance: 'Online/On-site',
        availability: 'Next Session: Mon',
        price: '$150/session',
        specialties: ['Modern Farming', 'Disease Prevention', 'Feed Management']
      }
    ]
  };

  const filteredServices = services[selectedCategory]?.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.service.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services Marketplace</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.selectedCategoryCard
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}15` }]}>
                  <category.icon 
                    size={24} 
                    color={selectedCategory === category.id ? 'white' : category.color} 
                  />
                </View>
                <Text style={[
                  styles.categoryTitle,
                  selectedCategory === category.id && styles.selectedCategoryTitle
                ]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Services List */}
        <View style={styles.servicesContainer}>
          {filteredServices.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceType}>{service.service}</Text>
                </View>
                <View style={styles.serviceRating}>
                  <Star size={16} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.ratingText}>{service.rating}</Text>
                  <Text style={styles.reviewsText}>({service.reviews})</Text>
                </View>
              </View>

              <View style={styles.serviceDetails}>
                <View style={styles.serviceDetail}>
                  <MapPin size={16} color="#64748b" />
                  <Text style={styles.serviceDetailText}>{service.distance}</Text>
                </View>
                <View style={styles.serviceDetail}>
                  <Clock size={16} color="#64748b" />
                  <Text style={styles.serviceDetailText}>{service.availability}</Text>
                </View>
              </View>

              <View style={styles.specialtiesContainer}>
                {service.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.serviceFooter}>
                <Text style={styles.servicePrice}>{service.price}</Text>
                <View style={styles.serviceActions}>
                  <TouchableOpacity 
                    style={styles.callButton}
                    onPress={() => handleCallService(service.id)}
                    activeOpacity={0.7}
                  >
                    <Phone size={16} color="#64748b" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.bookButton}
                    onPress={() => handleBookService(service.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.bookButtonText}>Book Service</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#374151',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCategoryCard: {
    backgroundColor: '#16A34A',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  selectedCategoryTitle: {
    color: 'white',
  },
  servicesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 14,
    color: '#64748b',
  },
  serviceRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  reviewsText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  serviceDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  serviceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  serviceDetailText: {
    fontSize: 14,
    color: '#64748b',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  specialtyTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  specialtyText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  serviceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  bookButton: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});