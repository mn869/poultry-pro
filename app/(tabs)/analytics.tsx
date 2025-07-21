import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TrendingUp, TrendingDown, DollarSign, Activity, Users, Package, Calendar, ChartBar as BarChart3, Camera, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { id: 'week', title: 'Week' },
    { id: 'month', title: 'Month' },
    { id: 'quarter', title: 'Quarter' },
    { id: 'year', title: 'Year' },
  ];

  const kpis = [
    {
      title: 'Total Revenue',
      value: '$18,450',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: '#16A34A',
      description: 'Monthly sales revenue'
    },
    {
      title: 'Egg Production',
      value: '12,350',
      change: '+8.2%',
      trend: 'up',
      icon: Activity,
      color: '#F59E0B',
      description: 'Eggs collected this month'
    },
    {
      title: 'Feed Efficiency',
      value: '2.1:1',
      change: '-3.1%',
      trend: 'down',
      icon: Package,
      color: '#3B82F6',
      description: 'Feed conversion ratio'
    },
    {
      title: 'Mortality Rate',
      value: '1.8%',
      change: '-0.5%',
      trend: 'up',
      icon: AlertTriangle,
      color: '#EF4444',
      description: 'Monthly bird mortality'
    }
  ];

  const productionData = [
    { period: 'Week 1', eggs: 2850, target: 3000, efficiency: 95 },
    { period: 'Week 2', eggs: 3120, target: 3000, efficiency: 104 },
    { period: 'Week 3', eggs: 2980, target: 3000, efficiency: 99 },
    { period: 'Week 4', eggs: 3200, target: 3000, efficiency: 107 },
  ];

  const healthMetrics = [
    { category: 'Vaccinated', count: 2450, percentage: 100, color: '#16A34A' },
    { category: 'Healthy', count: 2401, percentage: 98, color: '#3B82F6' },
    { category: 'Under Treatment', count: 35, percentage: 1.4, color: '#F59E0B' },
    { category: 'Quarantined', count: 14, percentage: 0.6, color: '#EF4444' },
  ];

  const recentDetections = [
    {
      id: 1,
      date: '2024-01-16',
      bird: 'Bird #247',
      disease: 'Suspected Respiratory Infection',
      confidence: 87,
      status: 'Under Treatment',
      action: 'Isolated and treated'
    },
    {
      id: 2,
      date: '2024-01-15',
      bird: 'Bird #156',
      disease: 'Coccidiosis',
      confidence: 94,
      status: 'Recovered',
      action: 'Treatment completed'
    },
    {
      id: 3,
      date: '2024-01-14',
      bird: 'Bird #389',
      disease: 'Newcastle Disease (Suspected)',
      confidence: 76,
      status: 'Test Pending',
      action: 'Lab test ordered'
    }
  ];

  const marketPrices = [
    { item: 'Organic Eggs (dozen)', current: '$4.50', change: '+$0.15', trend: 'up' },
    { item: 'Free-range Chicken (lb)', current: '$8.25', change: '-$0.30', trend: 'down' },
    { item: 'Standard Eggs (dozen)', current: '$2.80', change: '+$0.05', trend: 'up' },
    { item: 'Broiler Chicken (lb)', current: '$3.45', change: '+$0.10', trend: 'up' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Farm Analytics</Text>
        
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && styles.selectedPeriodButton
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period.id && styles.selectedPeriodText
              ]}>
                {period.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* KPIs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
          <View style={styles.kpiGrid}>
            {kpis.map((kpi, index) => (
              <View key={index} style={styles.kpiCard}>
                <View style={styles.kpiHeader}>
                  <View style={[styles.kpiIcon, { backgroundColor: `${kpi.color}15` }]}>
                    <kpi.icon size={20} color={kpi.color} />
                  </View>
                  <View style={styles.kpiChange}>
                    {kpi.trend === 'up' ? (
                      <TrendingUp size={16} color="#16A34A" />
                    ) : (
                      <TrendingDown size={16} color="#EF4444" />
                    )}
                    <Text style={[
                      styles.changeText,
                      { color: kpi.trend === 'up' ? '#16A34A' : '#EF4444' }
                    ]}>
                      {kpi.change}
                    </Text>
                  </View>
                </View>
                <Text style={styles.kpiValue}>{kpi.value}</Text>
                <Text style={styles.kpiTitle}>{kpi.title}</Text>
                <Text style={styles.kpiDescription}>{kpi.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Production Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Production Performance</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Weekly Egg Production</Text>
              <BarChart3 size={20} color="#64748b" />
            </View>
            
            {productionData.map((data, index) => (
              <View key={index} style={styles.chartRow}>
                <Text style={styles.chartLabel}>{data.period}</Text>
                <View style={styles.chartBar}>
                  <View 
                    style={[
                      styles.chartProgress,
                      { 
                        width: `${(data.eggs / 3500) * 100}%`,
                        backgroundColor: data.eggs >= data.target ? '#16A34A' : '#F59E0B'
                      }
                    ]}
                  />
                </View>
                <Text style={styles.chartValue}>{data.eggs}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Health Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flock Health Overview</Text>
          <View style={styles.healthCard}>
            {healthMetrics.map((metric, index) => (
              <View key={index} style={styles.healthRow}>
                <View style={styles.healthInfo}>
                  <View style={[styles.healthDot, { backgroundColor: metric.color }]} />
                  <Text style={styles.healthCategory}>{metric.category}</Text>
                </View>
                <View style={styles.healthStats}>
                  <Text style={styles.healthCount}>{metric.count}</Text>
                  <Text style={styles.healthPercentage}>({metric.percentage}%)</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Disease Detection History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Disease Detections</Text>
          {recentDetections.map((detection) => (
            <View key={detection.id} style={styles.detectionCard}>
              <View style={styles.detectionHeader}>
                <View style={styles.detectionInfo}>
                  <Text style={styles.detectionDate}>{detection.date}</Text>
                  <Text style={styles.detectionBird}>{detection.bird}</Text>
                </View>
                <View style={styles.confidenceScore}>
                  <Camera size={16} color="#64748b" />
                  <Text style={styles.confidenceText}>{detection.confidence}%</Text>
                </View>
              </View>
              
              <Text style={styles.diseaseName}>{detection.disease}</Text>
              
              <View style={styles.detectionFooter}>
                <View style={[
                  styles.statusBadge,
                  { 
                    backgroundColor: detection.status === 'Recovered' ? '#DCFCE7' : 
                                   detection.status === 'Under Treatment' ? '#FEF3C7' : '#FEE2E2'
                  }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { 
                      color: detection.status === 'Recovered' ? '#16A34A' : 
                            detection.status === 'Under Treatment' ? '#F59E0B' : '#EF4444'
                    }
                  ]}>
                    {detection.status}
                  </Text>
                </View>
                <Text style={styles.actionText}>{detection.action}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Market Prices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Market Prices</Text>
          <View style={styles.marketCard}>
            {marketPrices.map((price, index) => (
              <View key={index} style={styles.priceRow}>
                <Text style={styles.priceItem}>{price.item}</Text>
                <View style={styles.priceInfo}>
                  <Text style={styles.currentPrice}>{price.current}</Text>
                  <View style={styles.priceChange}>
                    {price.trend === 'up' ? (
                      <TrendingUp size={14} color="#16A34A" />
                    ) : (
                      <TrendingDown size={14} color="#EF4444" />
                    )}
                    <Text style={[
                      styles.changeAmount,
                      { color: price.trend === 'up' ? '#16A34A' : '#EF4444' }
                    ]}>
                      {price.change}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  selectedPeriodButton: {
    backgroundColor: '#16A34A',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  selectedPeriodText: {
    color: 'white',
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
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
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
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  kpiTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  kpiDescription: {
    fontSize: 12,
    color: '#64748b',
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartLabel: {
    width: 80,
    fontSize: 14,
    color: '#64748b',
  },
  chartBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    marginHorizontal: 12,
  },
  chartProgress: {
    height: '100%',
    borderRadius: 4,
  },
  chartValue: {
    width: 60,
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'right',
  },
  healthCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  healthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  healthDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  healthCategory: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  healthStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  healthCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  healthPercentage: {
    fontSize: 12,
    color: '#64748b',
  },
  detectionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  detectionInfo: {
    flex: 1,
  },
  detectionDate: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },
  detectionBird: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  confidenceScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  detectionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  actionText: {
    fontSize: 12,
    color: '#64748b',
    fontStyle: 'italic',
  },
  marketCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceItem: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  priceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  changeAmount: {
    fontSize: 12,
    fontWeight: '600',
  },
});