import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  DollarSign,
  Package,
  TrendingUp,
  Calendar
} from 'lucide-react-native';

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', title: 'All Customers' },
    { id: 'restaurant', title: 'Restaurants' },
    { id: 'retail', title: 'Retailers' },
    { id: 'distributor', title: 'Distributors' },
  ];

  const customers = [
    {
      id: 1,
      name: 'Fresh Foods Restaurant',
      type: 'Restaurant',
      email: 'orders@freshfoods.com',
      phone: '+1 234-567-8901',
      location: 'Downtown District',
      totalOrders: 24,
      totalRevenue: 8420,
      lastOrder: '2 days ago',
      status: 'active',
      orders: [
        { date: '2024-01-15', items: 'Organic Eggs (50 dozen)', amount: 350, status: 'delivered' },
        { date: '2024-01-10', items: 'Free-range Chicken (25 lbs)', amount: 275, status: 'delivered' },
      ]
    },
    {
      id: 2,
      name: 'Green Market Grocery',
      type: 'Retail',
      email: 'purchasing@greenmarket.com',
      phone: '+1 234-567-8902',
      location: 'Suburban Plaza',
      totalOrders: 18,
      totalRevenue: 6230,
      lastOrder: '5 days ago',
      status: 'active',
      orders: [
        { date: '2024-01-12', items: 'Mixed Eggs (30 dozen)', amount: 210, status: 'delivered' },
        { date: '2024-01-08', items: 'Organic Chicken (15 lbs)', amount: 180, status: 'delivered' },
      ]
    },
    {
      id: 3,
      name: 'Regional Food Distributors',
      type: 'Distributor',
      email: 'orders@rfd.com',
      phone: '+1 234-567-8903',
      location: 'Industrial Zone',
      totalOrders: 42,
      totalRevenue: 15680,
      lastOrder: '1 day ago',
      status: 'active',
      orders: [
        { date: '2024-01-16', items: 'Bulk Eggs (200 dozen)', amount: 1400, status: 'processing' },
        { date: '2024-01-14', items: 'Whole Chickens (100 lbs)', amount: 850, status: 'delivered' },
      ]
    }
  ];

  const handleAddCustomer = () => {
    console.log('Add new customer');
    // Add customer creation logic here
  };

  const handleContactCustomer = (customerId: number) => {
    console.log(`Contacting customer ${customerId}`);
    // Add contact logic here
  };

  const handleNewOrder = (customerId: number) => {
    console.log(`Creating new order for customer ${customerId}`);
    // Add order creation logic here
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || customer.type.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Customer Management</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddCustomer}
            activeOpacity={0.7}
          >
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search customers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && styles.selectedFilterChip
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter.id && styles.selectedFilterText
              ]}>
                {filter.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.customersList}>
        {filteredCustomers.map((customer) => (
          <View key={customer.id} style={styles.customerCard}>
            <View style={styles.customerHeader}>
              <View style={styles.customerInfo}>
                <Text style={styles.customerName}>{customer.name}</Text>
                <View style={styles.customerType}>
                  <Text style={styles.customerTypeText}>{customer.type}</Text>
                </View>
              </View>
              <View style={styles.customerStats}>
                <Text style={styles.revenueText}>${customer.totalRevenue.toLocaleString()}</Text>
                <Text style={styles.ordersText}>{customer.totalOrders} orders</Text>
              </View>
            </View>

            <View style={styles.customerDetails}>
              <View style={styles.customerDetail}>
                <Mail size={16} color="#64748b" />
                <Text style={styles.customerDetailText}>{customer.email}</Text>
              </View>
              <View style={styles.customerDetail}>
                <Phone size={16} color="#64748b" />
                <Text style={styles.customerDetailText}>{customer.phone}</Text>
              </View>
              <View style={styles.customerDetail}>
                <MapPin size={16} color="#64748b" />
                <Text style={styles.customerDetailText}>{customer.location}</Text>
              </View>
            </View>

            <View style={styles.metricsContainer}>
              <View style={styles.metric}>
                <Package size={16} color="#3B82F6" />
                <Text style={styles.metricLabel}>Last Order</Text>
                <Text style={styles.metricValue}>{customer.lastOrder}</Text>
              </View>
              <View style={styles.metric}>
                <TrendingUp size={16} color="#16A34A" />
                <Text style={styles.metricLabel}>Revenue</Text>
                <Text style={styles.metricValue}>${customer.totalRevenue.toLocaleString()}</Text>
              </View>
              <View style={styles.metric}>
                <Calendar size={16} color="#F59E0B" />
                <Text style={styles.metricLabel}>Orders</Text>
                <Text style={styles.metricValue}>{customer.totalOrders}</Text>
              </View>
            </View>

            <View style={styles.recentOrders}>
              <Text style={styles.recentOrdersTitle}>Recent Orders</Text>
              {customer.orders.slice(0, 2).map((order, index) => (
                <View key={index} style={styles.orderItem}>
                  <View style={styles.orderInfo}>
                    <Text style={styles.orderDate}>{order.date}</Text>
                    <Text style={styles.orderItems}>{order.items}</Text>
                  </View>
                  <View style={styles.orderAmount}>
                    <Text style={styles.orderPrice}>${order.amount}</Text>
                    <View style={[
                      styles.orderStatus,
                      { backgroundColor: order.status === 'delivered' ? '#DCFCE7' : '#FEF3C7' }
                    ]}>
                      <Text style={[
                        styles.orderStatusText,
                        { color: order.status === 'delivered' ? '#16A34A' : '#F59E0B' }
                      ]}>
                        {order.status}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.customerActions}>
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => handleContactCustomer(customer.id)}
                activeOpacity={0.7}
              >
                <Phone size={16} color="#64748b" />
                <Text style={styles.contactButtonText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.orderButton}
                onPress={() => handleNewOrder(customer.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.orderButtonText}>New Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
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
  filtersContainer: {
    marginBottom: 20,
  },
  filtersScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedFilterChip: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  selectedFilterText: {
    color: 'white',
  },
  customersList: {
    paddingHorizontal: 20,
  },
  customerCard: {
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
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  customerType: {
    alignSelf: 'flex-start',
  },
  customerTypeText: {
    fontSize: 12,
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontWeight: '500',
  },
  customerStats: {
    alignItems: 'flex-end',
  },
  revenueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  ordersText: {
    fontSize: 12,
    color: '#64748b',
  },
  customerDetails: {
    gap: 8,
    marginBottom: 16,
  },
  customerDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  customerDetailText: {
    fontSize: 14,
    color: '#64748b',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 2,
  },
  recentOrders: {
    marginBottom: 16,
  },
  recentOrdersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  orderInfo: {
    flex: 1,
  },
  orderDate: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },
  orderItems: {
    fontSize: 14,
    color: '#374151',
  },
  orderAmount: {
    alignItems: 'flex-end',
  },
  orderPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  orderStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  orderStatusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  customerActions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  orderButton: {
    flex: 1,
    backgroundColor: '#16A34A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});