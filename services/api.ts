// API Service Layer for PoultryPro Application

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.poultrypro.com';
const API_VERSION = 'v1';

interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
}

class APIService {
  private baseURL: string;
  private authToken: string | null = null;

  constructor() {
    this.baseURL = `${API_BASE_URL}/${API_VERSION}`;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  clearAuthToken() {
    this.authToken = null;
  }

  private async request<T>(endpoint: string, config: RequestConfig): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...config.headers,
    };

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    try {
      const response = await fetch(url, {
        method: config.method,
        headers,
        body: config.body ? JSON.stringify(config.body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Request failed: ${config.method} ${url}`, error);
      throw error;
    }
  }

  // Authentication APIs
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: userData,
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken() {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }

  // User APIs
  async getProfile() {
    return this.request('/users/profile', {
      method: 'GET',
    });
  }

  async updateProfile(userData: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: userData,
    });
  }

  // Farm APIs
  async getFarms() {
    return this.request('/farms', {
      method: 'GET',
    });
  }

  async createFarm(farmData: any) {
    return this.request('/farms', {
      method: 'POST',
      body: farmData,
    });
  }

  async updateFarm(farmId: string, farmData: any) {
    return this.request(`/farms/${farmId}`, {
      method: 'PUT',
      body: farmData,
    });
  }

  // Disease Detection APIs
  async uploadDiseaseImage(imageUri: string, metadata: any) {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'disease-detection.jpg',
    } as any);
    formData.append('metadata', JSON.stringify(metadata));

    return fetch(`${this.baseURL}/disease-detection/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: this.authToken ? `Bearer ${this.authToken}` : '',
      },
      body: formData,
    }).then(response => response.json());
  }

  async getDiseaseHistory(farmId: string) {
    return this.request(`/disease-detection/history/${farmId}`, {
      method: 'GET',
    });
  }

  // Services APIs
  async getServices(filters?: any) {
    const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : '';
    return this.request(`/services${queryParams}`, {
      method: 'GET',
    });
  }

  async bookService(serviceId: string, bookingData: any) {
    return this.request(`/services/${serviceId}/book`, {
      method: 'POST',
      body: bookingData,
    });
  }

  async getServiceBookings() {
    return this.request('/bookings', {
      method: 'GET',
    });
  }

  // Customer APIs
  async getCustomers() {
    return this.request('/customers', {
      method: 'GET',
    });
  }

  async createCustomer(customerData: any) {
    return this.request('/customers', {
      method: 'POST',
      body: customerData,
    });
  }

  async updateCustomer(customerId: string, customerData: any) {
    return this.request(`/customers/${customerId}`, {
      method: 'PUT',
      body: customerData,
    });
  }

  async getCustomerOrders(customerId: string) {
    return this.request(`/customers/${customerId}/orders`, {
      method: 'GET',
    });
  }

  // Feed APIs
  async getFeedSuppliers(location?: any) {
    const queryParams = location ? `?${new URLSearchParams(location).toString()}` : '';
    return this.request(`/feed/suppliers${queryParams}`, {
      method: 'GET',
    });
  }

  async getFeedProducts(supplierId: string) {
    return this.request(`/feed/suppliers/${supplierId}/products`, {
      method: 'GET',
    });
  }

  async placeFeedOrder(orderData: any) {
    return this.request('/feed/orders', {
      method: 'POST',
      body: orderData,
    });
  }

  async getFeedInventory(farmId: string) {
    return this.request(`/feed/inventory/${farmId}`, {
      method: 'GET',
    });
  }

  // Analytics APIs
  async getFarmAnalytics(farmId: string, period: string) {
    return this.request(`/analytics/farm/${farmId}?period=${period}`, {
      method: 'GET',
    });
  }

  async getProductionMetrics(farmId: string, startDate: string, endDate: string) {
    return this.request(`/analytics/production/${farmId}?start=${startDate}&end=${endDate}`, {
      method: 'GET',
    });
  }

  async getMarketPrices(location?: string) {
    const queryParams = location ? `?location=${location}` : '';
    return this.request(`/market/prices${queryParams}`, {
      method: 'GET',
    });
  }

  // Notifications APIs
  async getNotifications() {
    return this.request('/notifications', {
      method: 'GET',
    });
  }

  async markNotificationRead(notificationId: string) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  async registerPushToken(token: string) {
    return this.request('/notifications/push-token', {
      method: 'POST',
      body: { token },
    });
  }
}

export const apiService = new APIService();
export default apiService;