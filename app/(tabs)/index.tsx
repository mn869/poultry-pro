import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Camera, Users, ShoppingCart, Activity, TriangleAlert as AlertTriangle, TrendingUp, Calendar, DollarSign } from 'lucide-react-native';
import DiseaseDetectionModal from '../../components/DiseaseDetectionModal';

export default function Dashboard() {
  const [diseaseModalVisible, setDiseaseModalVisible] = React.useState(false);

  const quickActions = [
    { 
      icon: Camera, 
      title: 'Disease Detection', 
      color: '#EF4444',
      onPress: () => setDiseaseModalVisible(true)
    },
    { 
      icon: Users, 
      title: 'Add Customer', 
      color: '#3B82F6',
      onPress: () => console.log('Add Customer pressed')
    },
    { 
      icon: ShoppingCart, 
      title: 'Order Feed', 
      color: '#F59E0B',
      onPress: () => console.log('Order Feed pressed')
    },
    { 
      icon: Calendar, 
      title: 'Schedule Visit', 
      color: '#8B5CF6',
      onPress: () => console.log('Schedule Visit pressed')
    },
  ];

  const metrics = [
    { title: 'Total Birds', value: '2,450', change: '+12%', icon: Activity, color: '#16A34A' },
    { title: 'Daily Production', value: '1,890', change: '+5%', icon: TrendingUp, color: '#3B82F6' },
    { title: 'Feed Stock', value: '850 kg', change: '-8%', icon: ShoppingCart, color: '#F59E0B' },
    { title: 'Revenue', value: '$4,230', change: '+18%', icon: DollarSign, color: '#10B981' },
  ];

  const alerts = [
    { type: 'warning', message: 'Feed stock running low - 3 days remaining', time: '2 hours ago' },
    { type: 'info', message: 'Vaccination due for Coop A birds', time: '5 hours ago' },
    { type: 'urgent', message: 'Health check recommended for sick bird #247', time: '1 day ago' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.farmName}>Green Valley Farm</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileInitial}>JD</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.quickActionCard}
                onPress={action.onPress}
                activeOpacity={0.7}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
                  <action.icon size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farm Overview</Text>
          <View style={styles.metricsGrid}>
            {metrics.map((metric, index) => (
              <View key={index} style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <metric.icon size={20} color={metric.color} />
                  <Text style={[styles.metricChange, { color: metric.change.startsWith('+') ? '#16A34A' : '#EF4444' }]}>
                    {metric.change}
                  </Text>
                </View>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricTitle}>{metric.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Alerts & Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alerts & Notifications</Text>
          {alerts.map((alert, index) => (
            <View key={index} style={styles.alertCard}>
              <View style={styles.alertContent}>
                <AlertTriangle 
                  size={20} 
                  color={alert.type === 'urgent' ? '#EF4444' : alert.type === 'warning' ? '#F59E0B' : '#3B82F6'} 
                />
                <View style={styles.alertTextContainer}>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                  <Text style={styles.alertTime}>{alert.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      
      <DiseaseDetectionModal
        visible={diseaseModalVisible}
        onClose={() => setDiseaseModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 4,
  },
  farmName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 14,
    color: '#64748b',
  },
  alertCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  alertTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  alertMessage: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
});