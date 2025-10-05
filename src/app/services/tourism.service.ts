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
        id: "1",
        name: "MG Nefertiti",
        description: "Hotel on the Corniche (Minya).",
        imageUrl: "https://scontent.fcai19-4.fna.fbcdn.net/v/t39.30808-6/490233321_1131608562312066_7251707255499770974_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=a_0RPYryHuUQ7kNvwHKM9Lu&_nc_oc=AdkYwF17LAwEGBV_aIiR9pgJsxe8Cjriza001xlXAHpSHEnwA3B329tHfkAglwnonuE&_nc_zt=23&_nc_ht=scontent.fcai19-4.fna&_nc_gid=62bahSXAp0B2oYFZ0FGpPA&oh=00_Afb9uMZ6p4AoeMWzSuhj90Bnm1WjVPTnxZjaxB5ZjhGLjA&oe=68E22207",
        imageGallery: ["https://images.trvl-media.com/lodging/46000000/45550000/45540600/45540513/30342fe1.jpg?impolicy=resizecrop&rw=1200&ra=fit" , "https://images.trvl-media.com/lodging/46000000/45550000/45540600/45540513/48da3be1.jpg?impolicy=resizecrop&rw=1200&ra=fit" , "https://images.trvl-media.com/lodging/46000000/45550000/45540600/45540513/cf27dd9c.jpg?impolicy=resizecrop&rw=1200&ra=fit"],
        latitude: 28.11391331310829, 
        longitude: 30.74967797116394,
        rating: 3.8,
        reviewCount: 1800,
        priceRange: "45$",
        amenities: [
  "Swimming Pool",
  "Wi-Fi Access",
  "Free",
  "Air Conditioning",
  "Breakfast"
],
        roomTypes: [],
        contactInfo: {
          phone: "01220883347",
          email: "reservations@mgnefertiti.com",
          website: "https://www.mgnefertiti.com/lander?fbclid=IwY2xjawNJH71leHRuA2FlbQIxMABicmlkETFMS3I2WFBwamJEYzNMbnVzAR4kohjMYtEGzNKGWXiEhefvm7BETklgQFAwQtapk0AEBzqh255pK8EfEFBXKQ_aem_PS0XpnGbzIvUdDsq6RaJew&oref=https%3A%2F%2Fl.facebook.com%2F"
        },
        starRating: 4
      },
      {
          id: "2",
        name: "Grand Aton",
        description: "Hotel on the Corniche (Minya).",
        imageUrl: "/assets/images/Grand.jpg",
        imageGallery: ["/assets/images/Grand.jpg"],
        latitude: 28.113914,
        longitude:  30.751081,
        rating: 3/5,
        reviewCount: 2.096,
        priceRange: "",
        amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Parking"],
        roomTypes: [],
        contactInfo: {
          phone: "010 00308020",
          email: "",
          website:""
        },
        starRating: 4
      },
      {
        id: "3",
        name: "Horus",
        description: "Hotel on the Corniche (Minya).",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/a0/be/2c/horus-resort-menia.jpg?w=1400&h=-1&s=1",
        imageGallery: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/a0/be/28/horus-resort-menia.jpg?w=1400&h=-1&s=1" , "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/a0/be/2d/horus-resort-menia.jpg?w=1400&h=-1&s=1" , "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/a0/be/31/horus-resort-menia.jpg?w=1400&h=-1&s=1"],
        latitude: 28.11533829131303, 
        longitude: 30.750456813491823,
        rating: 3.9,
        reviewCount: 4400,
        priceRange: "",
        amenities: [
  "Free parking",
  "Free internet",
  "Internet",
  "Pool",
  "Free breakfast",
  "Bar / lounge",
  "Restaurant",
  "Children Activities (Kid / Family Friendly)"
],
        roomTypes: [],
        contactInfo: {
          phone: "086/2316660",
          email: "horusresortmenia@yahoo.com",
          website: "http://www.horusresortmenia.com/?fbclid=IwY2xjawNJIvBleHRuA2FlbQIxMABicmlkETFTb1RwWDE4OVk1NVNiRWNaAR6hVMNqFH-0x7Cf8UpAtARyTwawbifTyhx4VEukgPCwJnaF03mw4LUlV9DujA_aem_QvwPwjDkg1VaCxwryuPiyg"
        },
        starRating: 0
      },
      {
        id: "4",
        name: "Savoy",
        description: "Hotel at El Mahatta Square (Minya).",
        imageUrl: "/assets/images/Savoy.webp",
        imageGallery: ["/assets/images/Savoy.webp"],
        latitude: 28.09731855655996, 
        longitude: 30.754475799999998,
        rating: 4.5,
        reviewCount: 182,
        priceRange: "75$",
        amenities: [
  "Restaurant",
  "Balcony",
  "Private bathroom",
  "Air conditioning",
  "Free WiFi",
  "View",
  "Flat-screen TV",
  "Parking",
  "Room service",
  "Non-smoking rooms"
],
        roomTypes: [],
        contactInfo: {
          phone: "086/2343494",
          email: "Reservation@savoy-elminya.com",
          website: "https://www.savoy-elminya.com/lander?fbclid=IwY2xjawNJJNJleHRuA2FlbQIxMABicmlkETFTb1RwWDE4OVk1NVNiRWNaAR5AXIAaNLpdGinXglys8chRNKXQFdHKQaLPCKimUkNcdAnN1Taw6yacYCppnw_aem_vkV8ditQQBCRhpoVyac4ZA&oref=https%3A%2F%2Fl.facebook.com%2F"
        },
        starRating: 4.5
      },
      {
        id: "5",
        name: "Armed Forces Hotel",
        description: "Hotel on East Nile (Minya).",
        imageUrl: "/assets/images/Armed Forces Hotel.jpg",
        imageGallery: ["/assets/images/Armed Forces Hotel.jpg"  ],
        latitude: 28.091573859365592,
        longitude: 30.772246407930595,
        rating: 3.9,
        reviewCount: 373,
        priceRange: "81$",
        amenities: [
  "Paid public parking on-site",
  "Free High Speed Internet (WiFi)",
  "Sauna",
  "Pool",
  "Restaurant",
  "Bowling",
  "Squash",
  "Meeting rooms"
],
        roomTypes: [],
        contactInfo: {
          phone: "086/2366274",
          email: "marketing@afh.jo",
          website: "https://armedforceshotel.com/en/?page_id=61"
        },
        starRating: 3
      },
      {
        id: "6",
        name: "Sea Boat (Floating Hotel)",
        description: "Floating hotel at the Evangelical Authority marina (Minya).",
        imageUrl: "/assets/images/Sea Boat.jpg",
        imageGallery: ["/assets/images/Sea Boat.jpg" ],
        latitude: 28.10217791926841,
        longitude: 30.758276448668266,
        rating: 4.1,
        reviewCount: 802,
        priceRange: "60$",
        amenities: [
  "Free Wifi",
  "Private bathroom",
  "Air conditioning",
  "View",
  "Terrace",
  "Non-smoking rooms",
  "Tour desk",
  "Shower",
  "Bar"
],
        roomTypes: [],
        contactInfo: {
          phone: "01278722340",
          email: "dahabiah@ceoss.org.eg",
          website: ""
        },
        starRating: 3
      },
      {
        id: "7",
        name: "Holy Family",
        description: "Hotel at Jabal al-Tair (Smalout).",
        imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/285407894.jpg?k=3fdb726e0ce4dc31d2999c0b1a05f680f783fbf38331dd79b9eca3433efea549&o=",
        imageGallery: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/511994837.jpg?k=8f74935e8128eed1fee60c8d6b9d69fc3359b491cff4a9d1040c453ce93fe394&o=" , "https://cf.bstatic.com/xdata/images/hotel/max1024x768/492739028.jpg?k=b7fa78702b366bf2bc8175d00a3f02d7b9c63b625d6b2e2f0a75f4d84d81b091&o=" , "https://cf.bstatic.com/xdata/images/hotel/max1024x768/497660924.jpg?k=6d1bc77de402ef63a3be70c59c9e14926357e093be7c3650f1dedba07fc45499&o="],
        latitude: 0,
        longitude: 0,
        rating: 4.4,
        reviewCount: 100,
        priceRange: "130$",
        amenities:[
  "Restaurant",
  "Balcony",
  "Private bathroom",
  "Air conditioning",
  "Free WiFi",
  "View",
  "Flat-screen TV",
  "Parking",
  "Terrace",
  "Room service"
],
        roomTypes: [],
        contactInfo: {
          phone: "01090390178",
          email: "Reservation@holyfamilyhotel.net",
          website: "https://holyfamilyhotel.net/?fbclid=IwY2xjawNJKMFleHRuA2FlbQIxMABicmlkETFTb1RwWDE4OVk1NVNiRWNaAR56oNLHnGKbuyRbbG_Vwq-uzZUQuipjPLToY2NEUc4Rlb3rss7Vh-294jq45Q_aem_xhP3hkXeh_0-aK6orO4zdQ"
        },
        starRating: 3
      },
      {
        id: "8",
        name: "Cleopatra",
        description: "Hotel on Taha Hussein St (Minya).",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/71/05/71/ontbijtzaal-met-uitzicht.jpg?w=2000&h=-1&s=1",
        imageGallery: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/71/05/71/ontbijtzaal-met-uitzicht.jpg?w=2000&h=-1&s=1" , "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/fa/ba/2b/entrance.jpg?w=1600&h=-1&s=1" , "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/ac/4b/01/caption.jpg?w=1100&h=-1&s=1"],
        latitude: 28.112403593728384,
        longitude: 30.749438544180297,
        rating: 3.5,
        reviewCount: 1056,
        priceRange: "",
        amenities: ["Laundry Service"],
        roomTypes: [],
        contactInfo: {
          phone: "086/2370800",
          email: "info@cleopatra.com",
          website: ""
        },
        starRating: 3
      },
      {
        id: "9",
        name: "Lotus",
        description: "Hotel on Port Said St (Minya).",
        imageUrl: "/assets/images/Lotus.webp",
        imageGallery: ["/assets/images/Lotus.webp"],
        latitude: 28.101631,
        longitude: 30.752481,
        rating: 2.0,
        reviewCount: 0,
        priceRange: "",
        amenities: [],
        roomTypes: [],
        contactInfo: {
          phone: "086/2364541",
          email: "Loutsnk1965@gmail.com",
          website: undefined
        },
        starRating: 2

      },
      {
        id: "10",
        name: "Al Shatee (The Beach)",
        description: "Hotel on El Gomhoureya St (Minya).",
        imageUrl: "/assets/images/Al Shatee.jpg",
        imageGallery: ["/assets/images/Al Shatee.jpg"],
        latitude: 0,
        longitude: 0,
        rating: 0,
        reviewCount: 0,
        priceRange: "",
        amenities: [],
        roomTypes: [],
        contactInfo: {
          phone: "086/2362307",
          email: "",
          website: undefined
        },
        starRating: 2
      },
      {
        id: "11",
        name: "Ibn Khasib",
        description: "Hotel on Ragheb St (Minya).",
        imageUrl: "/assets/images/abn alkseb.jpg",
        imageGallery: ["/assets/images/abn alkseb.jpg"],
        latitude: 28.09681,
        longitude:  30.75541,
        rating: 0,
        reviewCount: 0,
        priceRange: "",
        amenities: [],
        roomTypes: ["Double Room",
          "2 Single beds", "1 Double bed"
        ],
        contactInfo: {
          phone: "086/2364535",
          email: "",
          website: undefined
        },
        starRating: 3
      },
      {
        id: "12",
        name: "Akhenaton",
        description: "Hotel on the Corniche (Minya), categorized as popular (شعبي).",
        imageUrl: "/assets/images/Akhenaton.jpg",
        imageGallery: ["/assets/images/Akhenaton.jpg"],
        latitude: 28.100132,
        longitude: 30.7490,
        rating: 3.4,
        reviewCount: 375,
        priceRange: "",
        amenities: ["Parking Free",
          "24-hour front desk", "Wi-Fi in public areas",
          "Restaurant", "Room service", "Garden",
          "No smoking in public areas"],
        roomTypes: ["Double Room", "Single Room", "Triple Room"],
        contactInfo: {
          phone: "086/2365918",
          email: "",
          website: "kingakhenatonhotel.com"
        },
        starRating: 3.4
      },
      {
        id: "13",
        name: "Omar Khayyam",
        description: "Hotel on Damran St (Minya), popular category.",
        imageUrl: "/assets/images/Omar Khayyam.webp",
        imageGallery: ["/assets/images/Omar Khayyam.webp"],
        latitude: 28.099108,
        longitude: 30.758577,
        rating: 8.8,
        reviewCount: 66,
        priceRange: "",
        amenities: ["Airport shuttle service", "Room service", "Non-smoking rooms", "Free parking", "Free Wi-Fi", "Tea/coffee maker in all rooms", "Breakfast"],
        roomTypes: ["Deluxe Twin Room", "Deluxe Suite", "Deluxe Queen Suite", "Deluxe Double Room", "Deluxe Triple Room", "Deluxe Single Room"],
        contactInfo: {
          phone: "086/2365666",
          email: "",
          website: undefined
        },
        starRating: 2
      },
      {
        id: "14",
        name: "Al Nile",
        description: "Hotel on Taha Hussein St (Minya), popular category.",
        imageUrl: "/assets/images/Al Nile.jpg",
        imageGallery: ["/assets/images/Al Nile.jpg"],
        latitude: 28.100132,
        longitude: 30.7490,
        rating: 0,
        reviewCount: 0,
        priceRange: "",
        amenities: [],
        roomTypes: [],
        contactInfo: {
          phone: "086/2363204",
          email: "",
          website: undefined
        },
        starRating: 0
      },
      {
        id: "15",
        name: "Palace",
        description: "Hotel at Palace Square (Minya), popular category.",
        imageUrl: "/assets/images/Palace.jpg",
        imageGallery: ["/assets/images/Palace.jpg"],
        latitude: 28.098467084224755, 
        longitude: 30.75661284048028,
        rating:2.4,
        reviewCount: 49 ,
        priceRange: "",
        amenities: [],
        roomTypes: ["Single", "Room Assigned on Arrival", "Superior", "Standard", "Standard Room with Twin Bed", "2 Twin Beds", "Private Bathroom", "City View", "Superior Twin Room", "2 Twin Beds", "Private Bathroom", "City View", "Family", "2 BEDS CITY VIEW FOR NON-SMOKERS", "SUPERIOR 2 TWIN BEDS CITY VIEW"],
        contactInfo: {
          phone: "086/2364021",
          email: "mohamed.adel2010.ma@gmail.com",
          website: "whitepalacehall.com"
        },
        starRating: 2
      },
      {
        id: "16",
        name: "Al Zahraa",
        description: "Hotel on Port Said St (Minya), popular category.",
        imageUrl: "/assets/images/Al Zahraa.jpg",
        imageGallery: ["/assets/images/Al Zahraa.jpg"],
        latitude: 0,
        longitude: 0,
        rating: 0,
        reviewCount: 0,
        priceRange: "",
        amenities: [],
        roomTypes: [],
        contactInfo: {
          phone: "086/2362979",
          email: "mohamed.adel2010.ma@gmail.com",
          website: "whitepalacehall.com"
        },
        starRating: 0
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
