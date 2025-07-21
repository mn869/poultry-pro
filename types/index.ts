// Core Types for PoultryPro Application

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'veterinarian' | 'supplier' | 'customer';
  farmId?: string;
  profileImage?: string;
  phone?: string;
  location?: Location;
  createdAt: Date;
  updatedAt: Date;
}

export interface Farm {
  id: string;
  name: string;
  ownerId: string;
  location: Location;
  totalBirds: number;
  farmType: 'broiler' | 'layer' | 'mixed';
  establishedDate: Date;
  certifications: string[];
  coops: Coop[];
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Coop {
  id: string;
  farmId: string;
  name: string;
  capacity: number;
  currentBirds: number;
  coopType: 'broiler' | 'layer' | 'breeder';
  constructionDate: Date;
  lastCleaning: Date;
}

export interface Bird {
  id: string;
  coopId: string;
  breed: string;
  hatchDate: Date;
  gender: 'male' | 'female';
  weight: number;
  healthStatus: 'healthy' | 'sick' | 'quarantined' | 'deceased';
  vaccinations: Vaccination[];
  treatments: Treatment[];
}

export interface Vaccination {
  id: string;
  birdId: string;
  vaccineType: string;
  administeredDate: Date;
  nextDueDate?: Date;
  veterinarianId: string;
  batchNumber: string;
}

export interface Treatment {
  id: string;
  birdId: string;
  disease: string;
  medication: string;
  startDate: Date;
  endDate?: Date;
  veterinarianId: string;
  notes: string;
}

export interface DiseaseDetection {
  id: string;
  birdId: string;
  imageUrl: string;
  detectedDisease: string;
  confidence: number;
  symptoms: string[];
  recommendations: string[];
  severity: 'low' | 'moderate' | 'high';
  detectionDate: Date;
  veterinarianReview?: VeterinarianReview;
}

export interface VeterinarianReview {
  veterinarianId: string;
  diagnosis: string;
  treatment: string;
  followUpRequired: boolean;
  reviewDate: Date;
  notes: string;
}

export interface Service {
  id: string;
  providerId: string;
  type: 'veterinary' | 'consulting' | 'equipment' | 'training';
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  availability: ServiceAvailability[];
  rating: number;
  reviews: Review[];
  specialties: string[];
}

export interface ServiceAvailability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  isAvailable: boolean;
}

export interface ServiceBooking {
  id: string;
  serviceId: string;
  farmerId: string;
  providerId: string;
  scheduledDate: Date;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  notes: string;
  totalCost: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
}

export interface Review {
  id: string;
  userId: string;
  serviceId?: string;
  supplierId?: string;
  rating: number; // 1-5
  comment: string;
  createdDate: Date;
  helpful: number;
}

export interface Customer {
  id: string;
  name: string;
  type: 'restaurant' | 'retail' | 'distributor' | 'individual';
  email: string;
  phone: string;
  location: Location;
  orders: Order[];
  totalRevenue: number;
  lastOrderDate?: Date;
  paymentTerms: string;
  creditLimit: number;
}

export interface Order {
  id: string;
  customerId: string;
  farmerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  deliveryDate?: Date;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'overdue';
  notes: string;
}

export interface OrderItem {
  id: string;
  productType: 'eggs' | 'meat' | 'live-birds';
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  specifications: Record<string, any>;
}

export interface FeedSupplier {
  id: string;
  name: string;
  location: Location;
  rating: number;
  reviews: Review[];
  products: FeedProduct[];
  minimumOrder: number;
  deliveryOptions: DeliveryOption[];
  paymentTerms: string;
  certifications: string[];
}

export interface FeedProduct {
  id: string;
  supplierId: string;
  name: string;
  type: 'starter' | 'grower' | 'layer' | 'finisher' | 'supplement';
  price: number;
  unit: string; // kg, bag, ton
  nutritionalInfo: NutritionalInfo;
  ingredients: string[];
  shelfLife: number; // days
  availability: boolean;
}

export interface NutritionalInfo {
  protein: number; // percentage
  fat: number; // percentage
  fiber: number; // percentage
  moisture: number; // percentage
  ash: number; // percentage
  calcium: number; // percentage
  phosphorus: number; // percentage
  energy: number; // kcal/kg
}

export interface DeliveryOption {
  type: 'same-day' | 'next-day' | 'standard' | 'scheduled';
  cost: number;
  estimatedDays: number;
  minimumOrder: number;
}

export interface FeedOrder {
  id: string;
  supplierId: string;
  farmerId: string;
  items: FeedOrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  deliveryDate?: Date;
  deliveryOption: DeliveryOption;
  paymentStatus: 'pending' | 'paid' | 'overdue';
}

export interface FeedOrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface FeedInventory {
  id: string;
  farmId: string;
  productId: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  unit: string;
  costPerUnit: number;
  expiryDate: Date;
  location: string; // storage location
  lastUpdated: Date;
}

export interface ProductionRecord {
  id: string;
  farmId: string;
  coopId: string;
  date: Date;
  eggProduction: number;
  feedConsumption: number;
  waterConsumption: number;
  mortality: number;
  notes: string;
  recordedBy: string;
}

export interface FinancialRecord {
  id: string;
  farmId: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: Date;
  paymentMethod: string;
  receiptUrl?: string;
  tags: string[];
}

export interface MarketPrice {
  id: string;
  productType: 'eggs' | 'broiler' | 'layer' | 'feed';
  price: number;
  unit: string;
  market: string;
  location: Location;
  date: Date;
  source: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'alert' | 'reminder' | 'update' | 'promotion';
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdDate: Date;
  expiryDate?: Date;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  user: User | null;
  farm: Farm | null;
  isAuthenticated: boolean;
  loading: LoadingState;
  notifications: Notification[];
}