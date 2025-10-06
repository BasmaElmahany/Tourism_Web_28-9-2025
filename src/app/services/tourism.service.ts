import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map, single } from 'rxjs/operators';
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
import { ATTRACTIONS } from '../data/attractions';
import { blogPosts } from '../data/blog_posts';
import { hotels } from '../data/hotels';

@Injectable({
  providedIn: 'root'
})
export class TourismService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() { }

  // Attractions
  getAttractions(): Observable<Attraction[]> {
    this.setLoading(true);
    return of(ATTRACTIONS).pipe(
      delay(800),
      map((data) => {
        this.setLoading(false);
        return data;
      })
    );
  }

  getAttractionById(id: string): Observable<Attraction | undefined> {
    // Uses the same source; no duplicate data
    return this.getAttractions().pipe(
      map((attractions) => attractions.find((a) => a.id === id))
    );
  }

  // Hotels
  getHotels(): Observable<Hotel[]> {
    this.setLoading(true);
   
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
  searchAttractions(query: string)/*: Observable<Attraction[]>*/ {
    /*   return this.getAttractions().pipe(
         map(attractions => 
           attractions.filter(attraction =>
             attraction.name.toLowerCase().includes(query.toLowerCase()) ||
             attraction.description.toLowerCase().includes(query.toLowerCase()) ||
             attraction.category.toLowerCase().includes(query.toLowerCase())
           )
         )
       );*/
  }

  searchHotels(query: string)/*: Observable<Hotel[]>*/ {
   /* return this.getHotels().pipe(
      map(hotels =>
        hotels.filter(hotel =>
          hotel.name.toLowerCase().includes(query.toLowerCase()) ||
          hotel.description.toLowerCase().includes(query.toLowerCase())
        )
      )
    );*/
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
