// BMW Vehicle Types
export interface BMWSeries {
  id: string;
  name: string;
  slug: string;
  generations: BMWGeneration[];
}

export interface BMWGeneration {
  id: string;
  seriesId: string;
  code: string; // E.g., "E90", "F30", "G20"
  name: string;
  yearStart: number;
  yearEnd: number | null;
  models: BMWModel[];
}

export interface BMWModel {
  id: string;
  generationId: string;
  name: string; // E.g., "320i", "330i", "M3"
  engineCodes?: string[];
}

export interface SavedVehicle {
  id: string;
  userId: string;
  seriesId: string;
  generationId: string;
  modelId: string;
  year: number;
  nickname?: string;
  isPrimary: boolean;
  createdAt: string;
}

// Product Types
export type ProductCategory =
  | "exterior"
  | "interior"
  | "kits";

export type ProductSubcategory =
  // Exterior
  | "spoilers"
  | "mirror-caps"
  | "grilles"
  | "badges"
  | "exterior-trim"
  // Interior
  | "gearknobs"
  | "boot-covers"
  | "door-lights"
  | "interior-trim"
  | "steering-wheels"
  // Kits
  | "gearknob-kits"
  | "interior-kits"
  | "exterior-kits";

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  fitment: ProductFitment[];
  isUniversal: boolean;
  inStock: boolean;
  stockQuantity: number;
  specifications: Record<string, string>;
  features: string[];
  includedItems?: string[];
  relatedProducts?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductFitment {
  seriesId: string;
  generationId: string;
  modelIds: string[]; // Empty array means all models in generation
  yearStart?: number;
  yearEnd?: number;
  notes?: string;
}

// Cart Types - CartItem is defined in store/cart-store.ts
export interface Cart {
  subtotal: number;
  shipping: number;
  total: number;
}

// Order Types
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "payfast" | "yoco";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  email: string;
  phone: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  price: number;
  quantity: number;
  total: number;
  vehicleInfo?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: SAProvince;
  postalCode: string;
  country: "ZA";
}

export type SAProvince =
  | "gauteng"
  | "western-cape"
  | "kwazulu-natal"
  | "eastern-cape"
  | "free-state"
  | "limpopo"
  | "mpumalanga"
  | "north-west"
  | "northern-cape";

export interface ShippingRate {
  province: SAProvince;
  standardRate: number;
  expressRate: number;
  freeShippingThreshold: number;
}

// Customer Types
export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: ShippingAddress[];
  savedVehicles: SavedVehicle[];
  createdAt: string;
}

// Supplier Product Types (from scraped inventory)
export interface SupplierProduct {
  id: string;
  source: "autostyle" | "carbon-sport";
  source_id: string;
  source_url: string;
  name: string;
  description?: string;
  short_description?: string;
  price: number;
  regular_price?: number;
  in_stock: boolean;
  stock_status?: string;
  stock_quantity?: number;
  primary_category?: string;
  categories?: string[];
  images?: string[];
  hosted_images?: string[];
  compatibility_text?: string;
  compatibility_models?: string[];
  scraped_at: string;
  created_at: string;
  updated_at: string;
}

// Admin Types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager";
  createdAt: string;
}
