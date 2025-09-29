import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../services/i18n.service';
import { TourismService } from '../../services/tourism.service';

interface Restaurant {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  cuisine: string;
  cuisineAr: string;
  priceRange: string;
  priceRangeAr: string;
  rating: number;
  reviewCount: number;
  image: string;
  address: string;
  addressAr: string;
  phone: string;
  openingHours: string;
  openingHoursAr: string;
  features: string[];
  featuresAr: string[];
  specialties: string[];
  specialtiesAr: string[];
  location: { lat: number; lng: number };
}

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchQuery = '';
  selectedCuisine = '';
  selectedPriceRange = '';
  selectedRating = '';

  cuisineTypes = [
    { key: 'egyptian', name: 'Egyptian', nameAr: 'مصري' },
    { key: 'middle-eastern', name: 'Middle Eastern', nameAr: 'شرق أوسطي' },
    { key: 'mediterranean', name: 'Mediterranean', nameAr: 'متوسطي' },
    { key: 'international', name: 'International', nameAr: 'عالمي' },
    { key: 'seafood', name: 'Seafood', nameAr: 'مأكولات بحرية' },
    { key: 'vegetarian', name: 'Vegetarian', nameAr: 'نباتي' }
  ];

  priceRanges = [
    { key: 'budget', name: 'Budget (Under 200 EGP)', nameAr: 'اقتصادي (أقل من 200 جنيه)' },
    { key: 'mid-range', name: 'Mid-range (200-500 EGP)', nameAr: 'متوسط (200-500 جنيه)' },
    { key: 'upscale', name: 'Upscale (500+ EGP)', nameAr: 'راقي (500+ جنيه)' }
  ];

  private translations: Record<string, Record<string, string>> = {
    en: {
      restaurantsTitle: 'Restaurants in Minya',
      restaurantsSubtitle: 'Discover authentic flavors and traditional cuisine at Minya\'s finest restaurants',
      searchRestaurants: 'Search restaurants...',
      cuisine: 'Cuisine',
      allCuisines: 'All Cuisines',
      rating: 'Rating',
      allRatings: 'All Ratings',
      stars: 'stars',
      specialties: 'Specialties',
      viewMenu: 'View Menu',
      makeReservation: 'Make Reservation',
      reviews: 'reviews',
      noRestaurantsFound: 'No restaurants found',
      tryDifferentFilters: 'Try different filters',
      diningTips: 'Dining Tips',
      reservationTip: 'Advance Reservations',
      reservationTipDesc: 'Book your table in advance, especially for popular restaurants and peak times',
      localCuisineTip: 'Local Cuisine',
      localCuisineTipDesc: 'Try traditional Egyptian dishes for an authentic culinary experience',
      paymentTip: 'Payment Methods',
      paymentTipDesc: 'Most restaurants accept cash and cards, but it\'s good to ask beforehand'
    },
    ar: {
      restaurantsTitle: 'مطاعم المنيا',
      restaurantsSubtitle: 'اكتشف النكهات الأصيلة والمأكولات التقليدية في أفضل مطاعم المنيا',
      searchRestaurants: 'البحث في المطاعم...',
      cuisine: 'نوع المطبخ',
      allCuisines: 'جميع المطابخ',
      rating: 'التقييم',
      allRatings: 'جميع التقييمات',
      stars: 'نجوم',
      specialties: 'التخصصات',
      viewMenu: 'عرض القائمة',
      makeReservation: 'احجز طاولة',
      reviews: 'مراجعات',
      noRestaurantsFound: 'لم يتم العثور على مطاعم',
      tryDifferentFilters: 'جرب مرشحات مختلفة',
      diningTips: 'نصائح الطعام',
      reservationTip: 'الحجز المسبق',
      reservationTipDesc: 'احجز طاولتك مسبقاً خاصة في المطاعم الشعبية وأوقات الذروة',
      localCuisineTip: 'المأكولات المحلية',
      localCuisineTipDesc: 'جرب الأطباق التقليدية المصرية للحصول على تجربة طعام أصيلة',
      paymentTip: 'طرق الدفع',
      paymentTipDesc: 'معظم المطاعم تقبل النقد والبطاقات، تأكد من السؤال مسبقاً'
    }
  };

  constructor(
    public i18nService: I18nService,
    private tourismService: TourismService
  ) {}

  ngOnInit() {
    this.loadRestaurants();
  }

  getTranslation(key: string): string {
    const currentLang = this.i18nService.getCurrentLanguage();
    return this.translations[currentLang]?.[key] || this.translations['en'][key] || key;
  }

  private loadRestaurants() {
    this.restaurants = [
      {
        id: '1',
        name: 'Nile View Restaurant',
        nameAr: 'مطعم إطلالة النيل',
        description: 'Elegant dining with stunning Nile River views and traditional Egyptian cuisine',
        descriptionAr: 'مطعم أنيق مع إطلالات خلابة على نهر النيل والمأكولات المصرية التقليدية',
        cuisine: 'Egyptian',
        cuisineAr: 'مصري',
        priceRange: 'Mid-range (200-500 EGP)',
        priceRangeAr: 'متوسط (200-500 جنيه)',
        rating: 4.5,
        reviewCount: 127,
        image: '/assets/images/nile_river.jpg',
        address: 'Corniche El Nile, Minya',
        addressAr: 'كورنيش النيل، المنيا',
        phone: '+20 86 234-5678',
        openingHours: 'Daily 12:00 PM - 11:00 PM',
        openingHoursAr: 'يومياً 12:00 ظهراً - 11:00 مساءً',
        features: ['Nile View', 'Outdoor Seating', 'Live Music', 'Parking'],
        featuresAr: ['إطلالة على النيل', 'جلسات خارجية', 'موسيقى حية', 'موقف سيارات'],
        specialties: ['Grilled Fish', 'Molokhia', 'Stuffed Pigeon', 'Om Ali'],
        specialtiesAr: ['سمك مشوي', 'ملوخية', 'حمام محشي', 'أم علي'],
        location: { lat: 28.1099, lng: 30.7503 }
      },
      {
        id: '2',
        name: 'Al Masry Traditional Kitchen',
        nameAr: 'المطبخ المصري التقليدي',
        description: 'Authentic Egyptian home-style cooking in a warm, family-friendly atmosphere',
        descriptionAr: 'طبخ مصري أصيل بطريقة منزلية في جو دافئ ومناسب للعائلات',
        cuisine: 'Egyptian',
        cuisineAr: 'مصري',
        priceRange: 'Budget (Under 200 EGP)',
        priceRangeAr: 'اقتصادي (أقل من 200 جنيه)',
        rating: 4.3,
        reviewCount: 89,
        image: '/assets/images/nile_cruise.jpg',
        address: 'Downtown Minya, Near Central Market',
        addressAr: 'وسط المنيا، بالقرب من السوق المركزي',
        phone: '+20 86 345-6789',
        openingHours: 'Daily 10:00 AM - 10:00 PM',
        openingHoursAr: 'يومياً 10:00 صباحاً - 10:00 مساءً',
        features: ['Family Friendly', 'Traditional Decor', 'Takeaway', 'Air Conditioning'],
        featuresAr: ['مناسب للعائلات', 'ديكور تقليدي', 'طلبات خارجية', 'تكييف'],
        specialties: ['Koshari', 'Ful Medames', 'Mahshi', 'Basbousa'],
        specialtiesAr: ['كشري', 'فول مدمس', 'محشي', 'بسبوسة'],
        location: { lat: 28.1050, lng: 30.7450 }
      },
      {
        id: '3',
        name: 'Mediterranean Breeze',
        nameAr: 'نسيم البحر المتوسط',
        description: 'Fresh Mediterranean cuisine with a modern twist and elegant ambiance',
        descriptionAr: 'مأكولات البحر المتوسط الطازجة مع لمسة عصرية وأجواء أنيقة',
        cuisine: 'Mediterranean',
        cuisineAr: 'متوسطي',
        priceRange: 'Upscale (500+ EGP)',
        priceRangeAr: 'راقي (500+ جنيه)',
        rating: 4.7,
        reviewCount: 156,
        image: '/assets/images/nile_boats.jpg',
        address: 'Luxury Hotel District, Minya',
        addressAr: 'منطقة الفنادق الفاخرة، المنيا',
        phone: '+20 86 456-7890',
        openingHours: 'Daily 6:00 PM - 12:00 AM',
        openingHoursAr: 'يومياً 6:00 مساءً - 12:00 منتصف الليل',
        features: ['Fine Dining', 'Wine Selection', 'Valet Parking', 'Private Dining'],
        featuresAr: ['مطعم راقي', 'تشكيلة نبيذ', 'خدمة صف السيارات', 'جلسات خاصة'],
        specialties: ['Grilled Octopus', 'Lamb Tagine', 'Seafood Paella', 'Baklava'],
        specialtiesAr: ['أخطبوط مشوي', 'طاجن لحم ضأن', 'بايلا المأكولات البحرية', 'بقلاوة'],
        location: { lat: 28.1120, lng: 30.7520 }
      }
    ];

    this.filteredRestaurants = this.restaurants;
  }

  filterRestaurants() {
    this.filteredRestaurants = this.restaurants.filter(restaurant => {
      const matchesSearch = this.searchQuery === '' || 
        restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        restaurant.nameAr.includes(this.searchQuery) ||
        restaurant.cuisine.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        restaurant.cuisineAr.includes(this.searchQuery);

      const matchesCuisine = this.selectedCuisine === '' || 
        restaurant.cuisine.toLowerCase().includes(this.selectedCuisine.toLowerCase());

      const matchesPriceRange = this.selectedPriceRange === '' || 
        restaurant.priceRange.toLowerCase().includes(this.selectedPriceRange.toLowerCase());

      const matchesRating = this.selectedRating === '' || 
        restaurant.rating >= parseFloat(this.selectedRating);

      return matchesSearch && matchesCuisine && matchesPriceRange && matchesRating;
    });
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCuisine = '';
    this.selectedPriceRange = '';
    this.selectedRating = '';
    this.filteredRestaurants = this.restaurants;
  }

  viewMenu(restaurant: Restaurant) {
    console.log('Viewing menu for:', restaurant.name);
  }

  makeReservation(restaurant: Restaurant) {
    console.log('Making reservation at:', restaurant.name);
  }

  getDirections(restaurant: Restaurant) {
    console.log('Getting directions to:', restaurant.name);
  }
}
