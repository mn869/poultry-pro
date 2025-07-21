import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Search, Calculator, Package, TrendingDown, Star, MapPin, Truck, CircleAlert as AlertCircle, Plus, Minus } from 'lucide-react-native';

export default function Feed() {
  const [activeTab, setActiveTab] = useState('suppliers');
  const [searchQuery, setSearchQuery] = useState('');
  const [flockSize, setFlockSize] = useState('250');
  const [birdAge, setBirdAge] = useState('12');

  const tabs = [
    { id: 'suppliers', title: 'Suppliers' },
    { id: 'calculator', title: 'Calculator' },
    { id: 'inventory', title: 'Inventory' },
  ];

  const suppliers = [
    {
      id: 1,
      name: 'Premium Feeds Co.',
      rating: 4.8,
      reviews: 156,
      distance: '3.2 km',
      products: ['Starter Feed', 'Grower Feed', 'Layer Feed'],
      price: '$24.50/bag',
      minOrder: '10 bags',
      delivery: 'Same day',
      quality: 'Organic Certified'
    },
    {
      id: 2,
      name: 'AgriNutrition Supply',
      rating: 4.6,
      reviews: 89,
      distance: '7.1 km',
      products: ['Complete Nutrition', 'Supplements', 'Medicated Feed'],
      price: '$22.00/bag',
      minOrder: '20 bags',
      delivery: 'Next day',
      quality: 'High Protein'
    },
    {
      id: 3,
      name: 'Local Farm Feed',
      rating: 4.4,
      reviews: 203,
      distance: '1.8 km',
      products: ['Basic Feed', 'Scratch Mix', 'Organic Options'],
      price: '$19.75/bag',
      minOrder: '5 bags',
      delivery: '2-3 days',
      quality: 'Natural'
    }
  ];

  const inventory = [
    {
      id: 1,
      name: 'Starter Feed (0-6 weeks)',
      currentStock: 45,
      totalCapacity: 100,
      unit: 'bags',
      expiryDate: '2024-03-15',
      status: 'good',
      costPerBag: 24.50
    },
    {
      id: 2,
      name: 'Grower Feed (7-18 weeks)',
      currentStock: 8,
      totalCapacity: 80,
      unit: 'bags',
      expiryDate: '2024-02-28',
      status: 'low',
      costPerBag: 23.00
    },
    {
      id: 3,
      name: 'Layer Feed (18+ weeks)',
      currentStock: 62,
      totalCapacity: 120,
      unit: 'bags',
      expiryDate: '2024-04-10',
      status: 'good',
      costPerBag: 25.75
    }
  ];

  const handlePlaceOrder = (supplierId: number) => {
    console.log(`Placing order with supplier ${supplierId}`);
    // Add order placement logic here
  };

  const handleReorder = (itemId: number) => {
    console.log(`Reordering item ${itemId}`);
    // Add reorder logic here
  };

  const calculateFeedRequirement = () => {
    const birds = parseInt(flockSize) || 0;
    const age = parseInt(birdAge) || 0;
    
    let dailyFeedPerBird = 0;
    if (age <= 6) dailyFeedPerBird = 0.05; // 50g for starter
    else if (age <= 18) dailyFeedPerBird = 0.1; // 100g for grower
    else dailyFeedPerBird = 0.12; // 120g for layer
    
    const dailyTotal = birds * dailyFeedPerBird;
    const weeklyTotal = dailyTotal * 7;
    const monthlyTotal = dailyTotal * 30;
    
    return {
      daily: dailyTotal.toFixed(1),
      weekly: weeklyTotal.toFixed(1),
      monthly: monthlyTotal.toFixed(1)
    };
  };

  const feedRequirement = calculateFeedRequirement();

  const renderSuppliers = () => (
    <View style={styles.tabContent}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#9ca3af" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search suppliers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9ca3af"
        />
      </View>

      {suppliers.map((supplier) => (
        <View key={supplier.id} style={styles.supplierCard}>
          <View style={styles.supplierHeader}>
            <View style={styles.supplierInfo}>
              <Text style={styles.supplierName}>{supplier.name}</Text>
              <View style={styles.supplierRating}>
                <Star size={16} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.ratingText}>{supplier.rating}</Text>
                <Text style={styles.reviewsText}>({supplier.reviews})</Text>
              </View>
            </View>
            <View style={styles.supplierPrice}>
              <Text style={styles.priceText}>{supplier.price}</Text>
            </View>
          </View>

          <View style={styles.supplierDetails}>
            <View style={styles.supplierDetail}>
              <MapPin size={16} color="#64748b" />
              <Text style={styles.supplierDetailText}>{supplier.distance}</Text>
            </View>
            <View style={styles.supplierDetail}>
              <Truck size={16} color="#64748b" />
              <Text style={styles.supplierDetailText}>{supplier.delivery}</Text>
            </View>
            <View style={styles.supplierDetail}>
              <Package size={16} color="#64748b" />
              <Text style={styles.supplierDetailText}>Min: {supplier.minOrder}</Text>
            </View>
          </View>

          <View style={styles.productsContainer}>
            {supplier.products.map((product, index) => (
              <View key={index} style={styles.productTag}>
                <Text style={styles.productText}>{product}</Text>
              </View>
            ))}
          </View>

          <View style={styles.qualityBadge}>
            <Text style={styles.qualityText}>{supplier.quality}</Text>
          </View>

          <TouchableOpacity 
            style={styles.orderButton}
            onPress={() => handlePlaceOrder(supplier.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.orderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderCalculator = () => (
    <View style={styles.tabContent}>
      <View style={styles.calculatorCard}>
        <Text style={styles.calculatorTitle}>Feed Requirement Calculator</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Flock Size</Text>
          <View style={styles.inputRow}>
            <TouchableOpacity 
              style={styles.inputButton}
              onPress={() => setFlockSize(String(Math.max(0, parseInt(flockSize) - 10)))}
            >
              <Minus size={20} color="#64748b" />
            </TouchableOpacity>
            <TextInput
              style={styles.numberInput}
              value={flockSize}
              onChangeText={setFlockSize}
              keyboardType="numeric"
              textAlign="center"
            />
            <TouchableOpacity 
              style={styles.inputButton}
              onPress={() => setFlockSize(String(parseInt(flockSize) + 10))}
            >
              <Plus size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputUnit}>birds</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Average Age</Text>
          <View style={styles.inputRow}>
            <TouchableOpacity 
              style={styles.inputButton}
              onPress={() => setBirdAge(String(Math.max(0, parseInt(birdAge) - 1)))}
            >
              <Minus size={20} color="#64748b" />
            </TouchableOpacity>
            <TextInput
              style={styles.numberInput}
              value={birdAge}
              onChangeText={setBirdAge}
              keyboardType="numeric"
              textAlign="center"
            />
            <TouchableOpacity 
              style={styles.inputButton}
              onPress={() => setBirdAge(String(parseInt(birdAge) + 1))}
            >
              <Plus size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputUnit}>weeks</Text>
        </View>

        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Feed Requirements</Text>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Daily:</Text>
            <Text style={styles.resultValue}>{feedRequirement.daily} kg</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Weekly:</Text>
            <Text style={styles.resultValue}>{feedRequirement.weekly} kg</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Monthly:</Text>
            <Text style={styles.resultValue}>{feedRequirement.monthly} kg</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderInventory = () => (
    <View style={styles.tabContent}>
      {inventory.map((item) => (
        <View key={item.id} style={styles.inventoryCard}>
          <View style={styles.inventoryHeader}>
            <Text style={styles.inventoryName}>{item.name}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: item.status === 'good' ? '#DCFCE7' : '#FEF3C7' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: item.status === 'good' ? '#16A34A' : '#F59E0B' }
              ]}>
                {item.status === 'good' ? 'Good Stock' : 'Low Stock'}
              </Text>
            </View>
          </View>

          <View style={styles.stockProgress}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${(item.currentStock / item.totalCapacity) * 100}%`,
                    backgroundColor: item.status === 'good' ? '#16A34A' : '#F59E0B'
                  }
                ]}
              />
            </View>
            <Text style={styles.stockText}>
              {item.currentStock}/{item.totalCapacity} {item.unit}
            </Text>
          </View>

          <View style={styles.inventoryDetails}>
            <View style={styles.inventoryDetail}>
              <Text style={styles.detailLabel}>Cost per bag:</Text>
              <Text style={styles.detailValue}>${item.costPerBag}</Text>
            </View>
            <View style={styles.inventoryDetail}>
              <Text style={styles.detailLabel}>Expiry date:</Text>
              <Text style={styles.detailValue}>{item.expiryDate}</Text>
            </View>
            <View style={styles.inventoryDetail}>
              <Text style={styles.detailLabel}>Total value:</Text>
              <Text style={styles.detailValue}>${(item.currentStock * item.costPerBag).toFixed(2)}</Text>
            </View>
          </View>

          {item.status === 'low' && (
            <View style={styles.lowStockAlert}>
              <AlertCircle size={16} color="#F59E0B" />
              <Text style={styles.alertText}>Consider reordering soon</Text>
            </View>
          )}

          <TouchableOpacity 
            style={styles.reorderButton}
            onPress={() => handleReorder(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.reorderButtonText}>Reorder</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed Management</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {activeTab === 'suppliers' && renderSuppliers()}
        {activeTab === 'calculator' && renderCalculator()}
        {activeTab === 'inventory' && renderInventory()}
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
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  activeTab: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
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
  supplierCard: {
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
  supplierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  supplierInfo: {
    flex: 1,
  },
  supplierName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  supplierRating: {
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
  supplierPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  supplierDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  supplierDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  supplierDetailText: {
    fontSize: 14,
    color: '#64748b',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  productTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  productText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  qualityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  qualityText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  orderButton: {
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
  calculatorCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calculatorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  inputButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberInput: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  inputUnit: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
  resultsContainer: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16A34A',
  },
  inventoryCard: {
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
  inventoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  inventoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  stockProgress: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  stockText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  inventoryDetails: {
    gap: 8,
    marginBottom: 16,
  },
  inventoryDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  lowStockAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  alertText: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '500',
  },
  reorderButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  reorderButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});