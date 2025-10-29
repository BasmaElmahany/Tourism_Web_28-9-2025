// Tourism Data Models for Minya Tourism Website

// Add these helpers at the top (or in a shared types file)
export type LocalizedText = string | { en: string; ar: string };
export type LocalizedArray = Array<string | { en: string; ar: string }>;

export interface Attraction {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  imageUrl: string;
  imageGallery: string[];
  latitude: number;
  longitude: number;
  openingHours: LocalizedText;
  ticketPrice: LocalizedText;
  /** Optional booking link (absolute URL) for this attraction. Use placeholder until real link provided. */
  bookingUrl?: string;
  rating: number;
  reviewCount: number;
  category: LocalizedText;
  features: LocalizedArray;
  historicalPeriod?: LocalizedText;
  significance?: LocalizedText;
}


export interface Hotel {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  imageUrl: string;
  imageGallery: string[];
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  priceRange: LocalizedText;
  amenities: LocalizedArray;
  roomTypes: LocalizedArray;
  contactInfo: {
    phone: LocalizedText;
    email: LocalizedText;
    website?: LocalizedText;
  };
  starRating: number;
  
}

export interface Restaurant {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  imageGallery: string[];
  imageUrl: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  cuisineType: LocalizedText;
  priceRange: LocalizedText;
  openingHours: LocalizedText;
  specialties: LocalizedArray;
  center : LocalizedText;
  /** Optional menu URL (can be a localized object or a plain URL string) */
  menuUrl?: LocalizedText;
  contactInfo: {
    phone: LocalizedText;
    email?: string;
  };
  features: LocalizedArray;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  location: string;
  latitude?: number;
  longitude?: number;
  ticketPrice: string;
  isFree: boolean;
  category: string;
  organizer: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

export interface Itinerary {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  duration: number; // in days
  difficulty: string;
  estimatedCost: number;
  category: string;
  highlights: string[];
  dayByDay: ItineraryDay[];
  includedServices: string[];
  excludedServices: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation?: string;
}

export interface BlogPost {
  id: string;
  title: LocalizedText;
  content: LocalizedText;
  excerpt: LocalizedText;
  imageUrl: LocalizedText;
  author: LocalizedText;
  publishDate: Date;
  category: LocalizedText;
  tags: LocalizedArray[];
  readTime: number; // in minutes
  featured: boolean;
}

export interface VisitorInfo {
  id: string;
  category: string;
  title: string;
  content: string;
  icon: string;
  priority: number;
}

export interface MapLocation {
  id: string;
  name: string;
  type: 'attraction' | 'hotel' | 'restaurant' | 'event';
  latitude: number;
  longitude: number;
  description: string;
  imageUrl?: string;
  rating?: number;
}

export interface TourismStats {
  totalAttractions: number;
  totalHotels: number;
  totalRestaurants: number;
  totalEvents: number;
  averageRating: number;
  totalVisitors: number;
}

// Filter and Search Interfaces
export interface AttractionFilter {
  category?: string;
  rating?: number;
  priceRange?: string;
  features?: string[];
}

export interface HotelFilter {
  starRating?: number;
  priceRange?: string;
  amenities?: string[];
}

export interface RestaurantFilter {
  cuisineType?: string;
  priceRange?: string;
  rating?: number;
}

export interface EventFilter {
  category?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  isFree?: boolean;
}

// Response interfaces for API calls
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

// Contact and Booking interfaces
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContactMethod: 'email' | 'phone';
}

export interface BookingRequest {
  type: 'hotel' | 'restaurant' | 'tour' | 'event';
  itemId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  dates: {
    checkIn: Date;
    checkOut: Date;
  };
  guests: number;
  specialRequests?: string;
}

// Newsletter subscription
export interface NewsletterSubscription {
  email: string;
  preferences: string[];
  subscribeDate: Date;
}

export interface ServiceItem {
  id: string;
  name: string;
  nameAr: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'ambulance' | 'police' | 'fire' | 'bank' | 'exchange';
  typeAr: string;
  description: string;
  descriptionAr: string;
  address: string;
  addressAr: string;
  phone: string;
  email?: string;
  image: string;
  latitude?: number;
  longitude?: number;
  distanceKm?: number;
  rating?: number;
  is24h?: boolean;
  isEmergency?: boolean;
  isFeatured?: boolean;
  features?: string[];
  featuresAr?: string[];
  
  // Additional fields for clinics
  specialty?: string;
  specialtyAr?: string;
  
  // Additional fields for pharmacies
  hasDelivery?: boolean;
  acceptsInsurance?: boolean;
}

export interface TourGuide {
  id: string;
  name: LocalizedText;
  bio?: LocalizedText;
  languages: LocalizedArray; // languages spoken
  imageUrl?: string;
  phone?: LocalizedText;
  email?: LocalizedText;
  location?: {
    latitude?: number;
    longitude?: number;
    address?: LocalizedText;
  };
  rating?: number;
}

export interface Photographer {
  id: string;
  name: LocalizedText;
  bio?: LocalizedText;
  specialties?: LocalizedArray;
  imageUrl?: string;
  phone?: LocalizedText;
  email?: LocalizedText;
  social?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  location?: {
    latitude?: number;
    longitude?: number;
    address?: LocalizedText;
  };
  rating?: number;
}

// Optional social links container for tour guides
export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
}

// Extend TourGuide with optional social links
export interface TourGuide {
  id: string;
  name: LocalizedText;
  bio?: LocalizedText;
  languages: LocalizedArray; // languages spoken
  imageUrl?: string;
  phone?: LocalizedText;
  email?: LocalizedText;
  social?: SocialLinks;
  location?: {
    latitude?: number;
    longitude?: number;
    address?: LocalizedText;
  };
  rating?: number;
}





export interface SouvenirShop {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: 'handicrafts' | 'jewelry' | 'textiles' | 'pottery' | 'papyrus' | 'market' | 'gallery';
  categoryAr: string;
  address: string;
  addressAr: string;
  phone: string;
  email?: string;
  image: string;
  images?: string[];
  latitude: number;
  longitude: number;
  distanceKm?: number;
  rating?: number;
  reviewCount?: number;
  priceRange: '$' | '$$' | '$$$';
  openingHours: string;
  openingHoursAr: string;
  isFeatured?: boolean;
  acceptsCreditCard?: boolean;
  hasDelivery?: boolean;
  hasOnlineStore?: boolean;
  specialties: string[];
  specialtiesAr: string[];
  products?: SouvenirProduct[];
}

export interface SouvenirProduct {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  categoryAr: string;
  price: number;
  currency: string;
  image: string;
  images?: string[];
  inStock: boolean;
  handmade?: boolean;
  material?: string;
  materialAr?: string;
  origin?: string;
  originAr?: string;
}

export interface SouvenirCategory {
  key: string;
  name: string;
  nameAr: string;
  icon: string;
  description: string;
  descriptionAr: string;
}

export interface TourismInfo {
  id: string;
  title: LocalizedText;
  climate: LocalizedText;
  bestTimeToVisit: LocalizedText;
  whatToWear: LocalizedText;
  notes?: LocalizedText;
  lastUpdated?: string; // ISO date string
}