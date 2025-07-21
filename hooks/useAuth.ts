// Authentication Hook for PoultryPro Application

import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import { storageService } from '../utils/storage';
import { errorHandler } from '../utils/errorHandler';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'farmer' | 'veterinarian' | 'supplier' | 'customer';
  farmName?: string;
  location?: any;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize authentication state
  const initializeAuth = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const token = await storageService.getAuthToken();
      const userData = await storageService.getUserData();

      if (token && userData) {
        apiService.setAuthToken(token);
        setAuthState({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      const appError = errorHandler.handleError(error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: appError.message,
      });
    }
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await apiService.login(credentials.email, credentials.password);
      
      if (response.success && response.data) {
        const { token, user } = response.data;
        
        // Store authentication data
        await storageService.setAuthToken(token);
        await storageService.setUserData(user);
        
        // Set API token
        apiService.setAuthToken(token);
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return true;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const appError = errorHandler.handleError(error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: appError.message,
      }));
      return false;
    }
  }, []);

  // Register function
  const register = useCallback(async (registerData: RegisterData): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await apiService.register(registerData);
      
      if (response.success && response.data) {
        const { token, user } = response.data;
        
        // Store authentication data
        await storageService.setAuthToken(token);
        await storageService.setUserData(user);
        
        // Set API token
        apiService.setAuthToken(token);
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return true;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      const appError = errorHandler.handleError(error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: appError.message,
      }));
      return false;
    }
  }, []);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Call logout API
      await apiService.logout();
      
      // Clear stored data
      await storageService.removeAuthToken();
      await storageService.removeUserData();
      await storageService.removeFarmData();
      
      // Clear API token
      apiService.clearAuthToken();
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      // Even if logout API fails, clear local data
      await storageService.removeAuthToken();
      await storageService.removeUserData();
      await storageService.removeFarmData();
      apiService.clearAuthToken();
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (userData: Partial<User>): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await apiService.updateProfile(userData);
      
      if (response.success && response.data) {
        const updatedUser = response.data;
        
        // Update stored user data
        await storageService.setUserData(updatedUser);
        
        setAuthState(prev => ({
          ...prev,
          user: updatedUser,
          isLoading: false,
        }));
        
        return true;
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      const appError = errorHandler.handleError(error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: appError.message,
      }));
      return false;
    }
  }, []);

  // Refresh token
  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const response = await apiService.refreshToken();
      
      if (response.success && response.data) {
        const { token } = response.data;
        await storageService.setAuthToken(token);
        apiService.setAuthToken(token);
        return true;
      }
      
      return false;
    } catch (error) {
      // If refresh fails, logout user
      await logout();
      return false;
    }
  }, [logout]);

  // Clear error
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  // Check if user has specific role
  const hasRole = useCallback((role: string): boolean => {
    return authState.user?.role === role;
  }, [authState.user]);

  // Check if user is farmer
  const isFarmer = useCallback((): boolean => {
    return hasRole('farmer');
  }, [hasRole]);

  // Check if user is veterinarian
  const isVeterinarian = useCallback((): boolean => {
    return hasRole('veterinarian');
  }, [hasRole]);

  // Check if user is supplier
  const isSupplier = useCallback((): boolean => {
    return hasRole('supplier');
  }, [hasRole]);

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return {
    // State
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    refreshToken,
    clearError,
    
    // Utilities
    hasRole,
    isFarmer,
    isVeterinarian,
    isSupplier,
  };
};

export default useAuth;