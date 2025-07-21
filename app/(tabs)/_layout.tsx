import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  Chrome as Home, 
  ShoppingCart, 
  Users, 
  Stethoscope, 
  ChartBar as BarChart3,
  Menu,
  X,
  LogOut
} from 'lucide-react-native';

// Import all tab screens
import Dashboard from './index';
import Services from './services';
import Customers from './customers';
import Feed from './feed';
import Analytics from './analytics';

const tabs = [
  { id: 'dashboard', title: 'Dashboard', icon: Home, component: Dashboard },
  { id: 'services', title: 'Services', icon: Stethoscope, component: Services },
  { id: 'customers', title: 'Customers', icon: Users, component: Customers },
  { id: 'feed', title: 'Feed', icon: ShoppingCart, component: Feed },
  { id: 'analytics', title: 'Analytics', icon: BarChart3, component: Analytics },
];

export default function TabLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => router.replace('/auth/welcome')
        }
      ]
    );
  };

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Dashboard;

  const renderSidebar = () => (
    <View style={[styles.sidebar, sidebarVisible && styles.sidebarVisible]}>
      <View style={styles.sidebarHeader}>
        <Text style={styles.appTitle}>PoultryPro</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => setSidebarVisible(false)}
        >
          <X size={24} color="#64748b" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.sidebarContent}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.sidebarItem,
              activeTab === tab.id && styles.activeSidebarItem
            ]}
            onPress={() => {
              setActiveTab(tab.id);
              setSidebarVisible(false);
            }}
          >
            <tab.icon 
              size={24} 
              color={activeTab === tab.id ? '#16A34A' : '#64748b'} 
            />
            <Text style={[
              styles.sidebarItemText,
              activeTab === tab.id && styles.activeSidebarItemText
            ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.sidebarFooter}>
        <View style={styles.userProfile}>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitial}>JD</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.farmName}>Green Valley Farm</Text>
          </View>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <LogOut size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.layout}>
        {/* Desktop Sidebar */}
        <View style={styles.desktopSidebar}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.appTitle}>PoultryPro</Text>
          </View>
          
          <ScrollView style={styles.sidebarContent}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.sidebarItem,
                  activeTab === tab.id && styles.activeSidebarItem
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <tab.icon 
                  size={24} 
                  color={activeTab === tab.id ? '#16A34A' : '#64748b'} 
                />
                <Text style={[
                  styles.sidebarItemText,
                  activeTab === tab.id && styles.activeSidebarItemText
                ]}>
                  {tab.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.sidebarFooter}>
            <View style={styles.userProfile}>
              <View style={styles.userAvatar}>
                <Text style={styles.userInitial}>JD</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>John Doe</Text>
                <Text style={styles.farmName}>Green Valley Farm</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <LogOut size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Mobile Sidebar Overlay */}
        {sidebarVisible && (
          <View style={styles.overlay}>
            <TouchableOpacity 
              style={styles.overlayBackground}
              onPress={() => setSidebarVisible(false)}
            />
            {renderSidebar()}
          </View>
        )}

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Mobile Header */}
          <View style={styles.mobileHeader}>
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => setSidebarVisible(true)}
            >
              <Menu size={24} color="#1e293b" />
            </TouchableOpacity>
            <Text style={styles.mobileTitle}>
              {tabs.find(tab => tab.id === activeTab)?.title}
            </Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Active Tab Content */}
          <View style={styles.contentContainer}>
            <ActiveComponent />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
  },
  desktopSidebar: {
    width: 280,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
    display: 'none', // Hidden on mobile, shown on larger screens
  },
  sidebar: {
    position: 'absolute',
    left: -280,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sidebarVisible: {
    left: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  overlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarContent: {
    flex: 1,
    paddingVertical: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 12,
    borderRadius: 12,
  },
  activeSidebarItem: {
    backgroundColor: '#DCFCE7',
  },
  sidebarItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
    marginLeft: 16,
  },
  activeSidebarItemText: {
    color: '#16A34A',
    fontWeight: '600',
  },
  sidebarFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInitial: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  farmName: {
    fontSize: 14,
    color: '#64748b',
  },
  logoutButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  mainContent: {
    flex: 1,
  },
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginLeft: 16,
  },
  headerSpacer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

// Media query for larger screens (this would be handled differently in a real React Native app)
// For now, we'll use a simple approach
if (typeof window !== 'undefined' && window.innerWidth >= 768) {
  StyleSheet.create({
    desktopSidebar: {
      display: 'flex',
    },
    mobileHeader: {
      display: 'none',
    },
  });
}