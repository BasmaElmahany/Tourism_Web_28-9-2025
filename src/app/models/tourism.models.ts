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
  rating: number;
  reviewCount: number;
  category: LocalizedText;
  features: LocalizedArray;
  historicalPeriod?: LocalizedText;
  significance?: LocalizedText;
}


export interface Hotel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageGallery: string[];
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  priceRange: string;
  amenities: string[];
  roomTypes: string[];
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  starRating: number;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  cuisineType: string;
  priceRange: string;
  openingHours: string;
  specialties: string[];
  contactInfo: {
    phone: string;
    email?: string;
  };
  features: string[];
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
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  publishDate: Date;
  category: string;
  tags: string[];
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
