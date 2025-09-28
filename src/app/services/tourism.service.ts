import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {
  Attraction,
  Hotel,
  Restaurant,
  Event,
  Itinerary,
  BlogPost,
  VisitorInfo,
  MapLocation,
  TourismStats
} from '../models/tourism.models';

@Injectable({
  providedIn: 'root'
})
export class TourismService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  // Attractions
  getAttractions(): Observable<Attraction[]> {
    this.setLoading(true);
    const attractions: Attraction[] = [
      {
        id: '1',
        name: 'Beni Hassan Tombs',
        description: 'Ancient Egyptian tombs dating back to the Middle Kingdom, featuring well-preserved wall paintings and hieroglyphs that tell stories of daily life in ancient Egypt.',
        imageUrl: '/assets/images/hero_banner.png',
        imageGallery: [
          '/assets/images/hero_banner.png',
          '/assets/images/beni_hassan.webp',
          '/assets/images/nile_river.jpg'
        ],
        latitude: 27.9158,
        longitude: 30.8739,
        openingHours: '8:00 AM - 5:00 PM',
        ticketPrice: '100 EGP',
        rating: 4.7,
        reviewCount: 324,
        category: 'Historical Site',
        features: ['Guided Tours', 'Photography Allowed', 'Wheelchair Accessible'],
        historicalPeriod: 'Middle Kingdom (2055-1650 BC)',
        significance: 'One of the most important Middle Kingdom burial sites in Egypt'
      },
      {
        id: '2',
        name: 'Tuna el-Gebel',
        description: 'An ancient necropolis and archaeological site featuring Greco-Roman tombs, catacombs, and the famous tomb of Petosiris.',
        imageUrl: '/assets/images/beni_hassan.webp',
        imageGallery: [
          '/assets/images/beni_hassan.webp',
          '/assets/images/hero_banner.png'
        ],
        latitude: 27.7667,
        longitude: 30.7333,
        openingHours: '8:00 AM - 4:00 PM',
        ticketPrice: '80 EGP',
        rating: 4.5,
        reviewCount: 198,
        category: 'Archaeological Site',
        features: ['Guided Tours', 'Museum', 'Gift Shop'],
        historicalPeriod: 'Greco-Roman Period (332 BC - 395 AD)',
        significance: 'Important Greco-Roman necropolis with unique architectural blend'
      },
      {
        id: '3',
        name: 'Tell el-Amarna',
        description: 'The ancient city of Akhetaten, capital of Egypt during the reign of Akhenaten, offering insights into the Amarna Period.',
        imageUrl: '/assets/images/hero_banner.png',
        imageGallery: ['/assets/images/hero_banner.png'],
        latitude: 27.6500,
        longitude: 30.9000,
        openingHours: '8:00 AM - 5:00 PM',
        ticketPrice: '120 EGP',
        rating: 4.6,
        reviewCount: 156,
        category: 'Ancient City',
        features: ['Archaeological Tours', 'Research Center', 'Educational Programs'],
        historicalPeriod: 'New Kingdom - Amarna Period (1353-1336 BC)',
        significance: 'Capital city of Pharaoh Akhenaten, center of monotheistic revolution'
      },
      {
        id: '4',
        name: 'Minya Corniche',
        description: 'A beautiful waterfront promenade along the Nile River, perfect for evening walks and enjoying sunset views.',
        imageUrl: '/assets/images/nile_river.jpg',
        imageGallery: ['/assets/images/nile_river.jpg'],
        latitude: 28.1099,
        longitude: 30.7503,
        openingHours: '24 hours',
        ticketPrice: 'Free',
        rating: 4.3,
        reviewCount: 89,
        category: 'Scenic Area',
        features: ['Walking Path', 'Cafes', 'Boat Rides', 'Photography Spots'],
        significance: 'Modern recreational area showcasing the beauty of the Nile River'
      }
    ];

    return of(attractions).pipe(
      delay(800),
      map(data => {
        this.setLoading(false);
        return data;
      })
    );
  }

  getAttractionById(id: string): Observable<Attraction | undefined> {
    return this.getAttractions().pipe(
      map(attractions => attractions.find(a => a.id === id))
    );
  }

  // Hotels
  getHotels(): Observable<Hotel[]> {
    this.setLoading(true);
    const hotels: Hotel[] = [
      {
        id: '1',
        name: 'Nile Palace Hotel',
        description: 'Luxury hotel overlooking the Nile River with modern amenities and traditional Egyptian hospitality.',
        imageUrl: '/assets/images/nile_river.jpg',
        imageGallery: ['/assets/images/nile_river.jpg'],
        latitude: 28.1050,
        longitude: 30.7480,
        rating: 4.5,
        reviewCount: 234,
        priceRange: '800-1500 EGP/night',
        amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Room Service', 'Parking'],
        roomTypes: ['Standard Room', 'Deluxe Room', 'Suite', 'Nile View Room'],
        contactInfo: {
          phone: '+20 86 234 5678',
          email: 'info@nilepalace.com',
          website: 'www.nilepalace.com'
        },
        starRating: 4
      },
      {
        id: '2',
        name: 'Minya Grand Hotel',
        description: 'Modern business hotel in the heart of Minya with excellent facilities for both leisure and business travelers.',
        imageUrl: '/assets/images/hero_banner.png',
        imageGallery: ['/assets/images/hero_banner.png'],
        latitude: 28.1100,
        longitude: 30.7520,
        rating: 4.2,
        reviewCount: 156,
        priceRange: '500-900 EGP/night',
        amenities: ['Free WiFi', 'Business Center', 'Fitness Center', 'Restaurant', 'Conference Rooms'],
        roomTypes: ['Standard Room', 'Business Room', 'Executive Suite'],
        contactInfo: {
          phone: '+20 86 234 9876',
          email: 'reservations@minyagrand.com'
        },
        starRating: 3
      }
    ];

    return of(hotels).pipe(
      delay(600),
      map(data => {
        this.setLoading(false);
        return data;
      })
    );
  }

  // Restaurants
  getRestaurants(): Observable<Restaurant[]> {
    this.setLoading(true);
    const restaurants: Restaurant[] = [
      {
        id: '1',
        name: 'Nile Breeze Restaurant',
        description: 'Authentic Egyptian cuisine with a modern twist, featuring fresh ingredients and traditional recipes passed down through generations.',
        imageUrl: '/assets/images/nile_river.jpg',
        latitude: 28.1080,
        longitude: 30.7490,
        rating: 4.6,
        reviewCount: 187,
        cuisineType: 'Egyptian',
        priceRange: '150-300 EGP per person',
        openingHours: '12:00 PM - 11:00 PM',
        specialties: ['Koshari', 'Molokhia', 'Grilled Fish', 'Om Ali'],
        contactInfo: {
          phone: '+20 86 234 1234',
          email: 'info@nilebreeze.com'
        },
        features: ['Nile View', 'Outdoor Seating', 'Live Music', 'Vegetarian Options']
      },
      {
        id: '2',
        name: 'Al Minya Traditional Kitchen',
        description: 'Family-owned restaurant serving traditional Upper Egyptian dishes in a cozy, authentic atmosphere.',
        imageUrl: '/assets/images/hero_banner.png',
        latitude: 28.1120,
        longitude: 30.7510,
        rating: 4.4,
        reviewCount: 98,
        cuisineType: 'Traditional Egyptian',
        priceRange: '80-200 EGP per person',
        openingHours: '11:00 AM - 10:00 PM',
        specialties: ['Fattah', 'Bamia', 'Roz Bel Laban', 'Fresh Bread'],
        contactInfo: {
          phone: '+20 86 234 5555'
        },
        features: ['Family Friendly', 'Traditional Decor', 'Local Ingredients', 'Takeaway']
      }
    ];

    return of(restaurants).pipe(
      delay(600),
      map(data => {
        this.setLoading(false);
        return data;
      })
    );
  }

  // Events
  getEvents(): Observable<Event[]> {
    this.setLoading(true);
    const events: Event[] = [
      {
        id: '1',
        name: 'Minya Heritage Festival',
        description: 'Annual celebration of Minya\'s rich cultural heritage featuring traditional music, dance, crafts, and local cuisine.',
        imageUrl: '/assets/images/hero_banner.png',
        startDate: new Date('2024-11-15'),
        endDate: new Date('2024-11-17'),
        location: 'Minya Cultural Center',
        latitude: 28.1090,
        longitude: 30.7500,
        ticketPrice: 'Free Entry',
        isFree: true,
        category: 'Cultural Festival',
        organizer: 'Minya Tourism Authority',
        contactInfo: {
          phone: '+20 86 234 7777',
          email: 'events@minyatourism.gov.eg'
        }
      },
      {
        id: '2',
        name: 'Nile Sunset Concert',
        description: 'Monthly classical music concert featuring local and international artists, performed against the backdrop of the Nile River.',
        imageUrl: '/assets/images/nile_river.jpg',
        startDate: new Date('2024-10-20'),
        endDate: new Date('2024-10-20'),
        location: 'Minya Corniche Amphitheater',
        latitude: 28.1099,
        longitude: 30.7503,
        ticketPrice: '50-150 EGP',
        isFree: false,
        category: 'Music Concert',
        organizer: 'Minya Arts Council',
        contactInfo: {
          phone: '+20 86 234 8888',
          website: 'www.minyaarts.org'
        }
      }
    ];

    return of(events).pipe(
      delay(600),
      map(data => {
        this.setLoading(false);
        return data;
      })
    );
  }

  // Itineraries
  getItineraries(): Observable<Itinerary[]> {
    this.setLoading(true);
    const itineraries: Itinerary[] = [
      {
        id: '1',
        name: 'Ancient Minya Explorer',
        description: 'A comprehensive 3-day journey through Minya\'s most significant archaeological sites and historical landmarks.',
        imageUrl: '/assets/images/hero_banner.png',
        duration: 3,
        difficulty: 'Moderate',
        estimatedCost: 2500,
        category: 'Historical Tour',
        highlights: [
          'Beni Hassan Tombs exploration',
          'Tuna el-Gebel archaeological site',
          'Tell el-Amarna ancient city',
          'Nile River cruise',
          'Traditional Egyptian dinner'
        ],
        dayByDay: [
          {
            day: 1,
            title: 'Arrival and Beni Hassan',
            description: 'Arrive in Minya and visit the famous Beni Hassan Tombs',
            activities: ['Hotel check-in', 'Beni Hassan Tombs tour', 'Welcome dinner'],
            meals: ['Lunch', 'Dinner'],
            accommodation: 'Nile Palace Hotel'
          },
          {
            day: 2,
            title: 'Tuna el-Gebel and Tell el-Amarna',
            description: 'Explore two major archaeological sites',
            activities: ['Tuna el-Gebel tour', 'Tell el-Amarna visit', 'Sunset at Nile Corniche'],
            meals: ['Breakfast', 'Lunch', 'Dinner'],
            accommodation: 'Nile Palace Hotel'
          },
          {
            day: 3,
            title: 'Nile Experience and Departure',
            description: 'Enjoy a Nile cruise and local culture before departure',
            activities: ['Nile River cruise', 'Local market visit', 'Departure'],
            meals: ['Breakfast', 'Lunch']
          }
        ],
        includedServices: ['Accommodation', 'All meals', 'Transportation', 'Guide services', 'Entry tickets'],
        excludedServices: ['International flights', 'Personal expenses', 'Tips', 'Travel insurance']
      }
    ];

    return of(itineraries).pipe(
      delay(600),
      map(data => {
        this.setLoading(false);
        return data;
      })
    );
  }

  // Blog Posts
  getBlogPosts(): Observable<BlogPost[]> {
    this.setLoading(true);
    const blogPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Discovering the Hidden Treasures of Beni Hassan',
        content: 'The Beni Hassan tombs represent one of Egypt\'s most remarkable archaeological treasures...',
        excerpt: 'Explore the fascinating Middle Kingdom tombs that showcase daily life in ancient Egypt through stunning wall paintings and hieroglyphs.',
        imageUrl: '/assets/images/hero_banner.png',
        author: 'Dr. Sarah Ahmed',
        publishDate: new Date('2024-09-15'),
        category: 'Archaeology',
        tags: ['Beni Hassan', 'Middle Kingdom', 'Tombs', 'Ancient Egypt'],
        readTime: 8,
        featured: true
      },
      {
        id: '2',
        title: 'A Culinary Journey Through Minya',
        content: 'Minya\'s cuisine reflects the rich agricultural heritage of Upper Egypt...',
        excerpt: 'Discover the authentic flavors of Upper Egyptian cuisine and the traditional dishes that make Minya a culinary destination.',
        imageUrl: '/assets/images/nile_river.jpg',
        author: 'Chef Mohamed Hassan',
        publishDate: new Date('2024-09-10'),
        category: 'Food & Culture',
        tags: ['Egyptian Cuisine', 'Traditional Food', 'Local Restaurants'],
        readTime: 6,
        featured: false
      }
    ];

    return of(blogPosts).pipe(
      delay(600),
      map(data => {
        this.setLoading(false);
        return data;
      })
    );
  }

  // Visitor Information
  getVisitorInfo(): Observable<VisitorInfo[]> {
    const visitorInfo: VisitorInfo[] = [
      {
        id: '1',
        category: 'Transportation',
        title: 'Getting to Minya',
        content: 'Train: Regular trains from Cairo (3-4 hours)\nMicrobus: Available from Cairo and other cities\nPrivate Car: Via Cairo-Aswan Highway\nBus: Daily buses from major Egyptian cities',
        icon: 'directions_car',
        priority: 1
      },
      {
        id: '2',
        category: 'Emergency',
        title: 'Emergency Numbers',
        content: 'Police: 122\nAmbulance: 123\nFire Department: 180\nTourist Police: +20 86 234 5555',
        icon: 'emergency',
        priority: 2
      }
    ];

    return of(visitorInfo).pipe(delay(400));
  }

  // Map Locations
  getMapLocations(): Observable<MapLocation[]> {
    const locations: MapLocation[] = [
      {
        id: '1',
        name: 'Beni Hassan Tombs',
        type: 'attraction',
        latitude: 27.9158,
        longitude: 30.8739,
        description: 'Ancient Middle Kingdom tombs',
        imageUrl: '/assets/images/hero_banner.png',
        rating: 4.7
      },
      {
        id: '2',
        name: 'Nile Palace Hotel',
        type: 'hotel',
        latitude: 28.1050,
        longitude: 30.7480,
        description: 'Luxury Nile-view hotel',
        imageUrl: '/assets/images/nile_river.jpg',
        rating: 4.5
      }
    ];

    return of(locations).pipe(delay(400));
  }

  // Tourism Statistics
  getTourismStats(): Observable<TourismStats> {
    const stats: TourismStats = {
      totalAttractions: 12,
      totalHotels: 8,
      totalRestaurants: 15,
      totalEvents: 6,
      averageRating: 4.4,
      totalVisitors: 125000
    };

    return of(stats).pipe(delay(300));
  }

  // Utility methods
  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  // Search functionality
  searchAttractions(query: string): Observable<Attraction[]> {
    return this.getAttractions().pipe(
      map(attractions => 
        attractions.filter(attraction =>
          attraction.name.toLowerCase().includes(query.toLowerCase()) ||
          attraction.description.toLowerCase().includes(query.toLowerCase()) ||
          attraction.category.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  searchHotels(query: string): Observable<Hotel[]> {
    return this.getHotels().pipe(
      map(hotels =>
        hotels.filter(hotel =>
          hotel.name.toLowerCase().includes(query.toLowerCase()) ||
          hotel.description.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  searchRestaurants(query: string): Observable<Restaurant[]> {
    return this.getRestaurants().pipe(
      map(restaurants =>
        restaurants.filter(restaurant =>
          restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
          restaurant.cuisineType.toLowerCase().includes(query.toLowerCase()) ||
          restaurant.specialties.some(specialty => 
            specialty.toLowerCase().includes(query.toLowerCase())
          )
        )
      )
    );
  }
}
