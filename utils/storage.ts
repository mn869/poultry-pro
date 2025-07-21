// Local Storage Utilities for PoultryPro Application

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@poultrypro:auth_token',
  USER_DATA: '@poultrypro:user_data',
  FARM_DATA: '@poultrypro:farm_data',
  OFFLINE_DATA: '@poultrypro:offline_data',
  SETTINGS: '@poultrypro:settings',
  CACHE: '@poultrypro:cache',
} as const;

class StorageService {
  // Generic storage methods
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  // Authentication storage
  async setAuthToken(token: string): Promise<void> {
    return this.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  async getAuthToken(): Promise<string | null> {
    return this.getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
  }

  async removeAuthToken(): Promise<void> {
    return this.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  // User data storage
  async setUserData(userData: any): Promise<void> {
    return this.setItem(STORAGE_KEYS.USER_DATA, userData);
  }

  async getUserData(): Promise<any | null> {
    return this.getItem(STORAGE_KEYS.USER_DATA);
  }

  async removeUserData(): Promise<void> {
    return this.removeItem(STORAGE_KEYS.USER_DATA);
  }

  // Farm data storage
  async setFarmData(farmData: any): Promise<void> {
    return this.setItem(STORAGE_KEYS.FARM_DATA, farmData);
  }

  async getFarmData(): Promise<any | null> {
    return this.getItem(STORAGE_KEYS.FARM_DATA);
  }

  async removeFarmData(): Promise<void> {
    return this.removeItem(STORAGE_KEYS.FARM_DATA);
  }

  // Offline data storage
  async setOfflineData(data: any): Promise<void> {
    const existingData = await this.getOfflineData() || {};
    const updatedData = { ...existingData, ...data };
    return this.setItem(STORAGE_KEYS.OFFLINE_DATA, updatedData);
  }

  async getOfflineData(): Promise<any | null> {
    return this.getItem(STORAGE_KEYS.OFFLINE_DATA);
  }

  async removeOfflineData(): Promise<void> {
    return this.removeItem(STORAGE_KEYS.OFFLINE_DATA);
  }

  // Settings storage
  async setSettings(settings: any): Promise<void> {
    return this.setItem(STORAGE_KEYS.SETTINGS, settings);
  }

  async getSettings(): Promise<any | null> {
    return this.getItem(STORAGE_KEYS.SETTINGS);
  }

  // Cache management
  async setCacheData(key: string, data: any, expiryTime?: number): Promise<void> {
    const cacheItem = {
      data,
      timestamp: Date.now(),
      expiryTime: expiryTime || Date.now() + (24 * 60 * 60 * 1000), // 24 hours default
    };
    
    const existingCache = await this.getItem(STORAGE_KEYS.CACHE) || {};
    existingCache[key] = cacheItem;
    
    return this.setItem(STORAGE_KEYS.CACHE, existingCache);
  }

  async getCacheData(key: string): Promise<any | null> {
    const cache = await this.getItem(STORAGE_KEYS.CACHE) || {};
    const cacheItem = cache[key];
    
    if (!cacheItem) return null;
    
    // Check if cache has expired
    if (Date.now() > cacheItem.expiryTime) {
      await this.removeCacheData(key);
      return null;
    }
    
    return cacheItem.data;
  }

  async removeCacheData(key: string): Promise<void> {
    const cache = await this.getItem(STORAGE_KEYS.CACHE) || {};
    delete cache[key];
    return this.setItem(STORAGE_KEYS.CACHE, cache);
  }

  async clearExpiredCache(): Promise<void> {
    const cache = await this.getItem(STORAGE_KEYS.CACHE) || {};
    const currentTime = Date.now();
    
    const validCache = Object.keys(cache).reduce((acc, key) => {
      if (cache[key].expiryTime > currentTime) {
        acc[key] = cache[key];
      }
      return acc;
    }, {} as any);
    
    return this.setItem(STORAGE_KEYS.CACHE, validCache);
  }

  // Utility methods
  async getStorageSize(): Promise<number> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += value.length;
        }
      }
      
      return totalSize;
    } catch (error) {
      console.error('Error calculating storage size:', error);
      return 0;
    }
  }

  async exportData(): Promise<any> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data: any = {};
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          data[key] = JSON.parse(value);
        }
      }
      
      return data;
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }

  async importData(data: any): Promise<void> {
    try {
      for (const [key, value] of Object.entries(data)) {
        await this.setItem(key, value);
      }
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  }
}

export const storageService = new StorageService();
export default storageService;