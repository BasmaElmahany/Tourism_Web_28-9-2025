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
  template: `
    <div class="restaurants-page" [attr.dir]="i18nService.isRTL() ? 'rtl' : 'ltr'">
      <!-- Hero Section -->
      <section class="restaurants-hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">{{ getTranslation('restaurantsTitle') }}</h1>
            <p class="hero-subtitle">{{ getTranslation('restaurantsSubtitle') }}</p>
          </div>
        </div>
      </section>

      <!-- Search and Filters -->
      <section class="search-filters">
        <div class="container">
          <div class="search-bar">
            <div class="search-input-wrapper">
              <span class="material-icons search-icon">search</span>
              <input 
                type="text" 
                [placeholder]="getTranslation('searchRestaurants')"
                class="search-input"
                [(ngModel)]="searchQuery"
                (input)="filterRestaurants()"
                [style.text-align]="i18nService.isRTL() ? 'right' : 'left'"
              >
            </div>
          </div>

          <div class="filters">
            <div class="filter-group">
              <label>{{ getTranslation('cuisine') }}</label>
              <select [(ngModel)]="selectedCuisine" (change)="filterRestaurants()" class="filter-select">
                <option value="">{{ getTranslation('allCuisines') }}</option>
                <option *ngFor="let cuisine of cuisineTypes" [value]="cuisine.key">
                  {{ i18nService.isRTL() ? cuisine.nameAr : cuisine.name }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <label>{{ getTranslation('priceRange') }}</label>
              <select [(ngModel)]="selectedPriceRange" (change)="filterRestaurants()" class="filter-select">
                <option value="">{{ i18nService.translate('allPriceRanges') }}</option>
                <option *ngFor="let range of priceRanges" [value]="range.key">
                  {{ i18nService.isRTL() ? range.nameAr : range.name }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <label>{{ getTranslation('rating') }}</label>
              <select [(ngModel)]="selectedRating" (change)="filterRestaurants()" class="filter-select">
                <option value="">{{ getTranslation('allRatings') }}</option>
                <option value="4">4+ {{ getTranslation('stars') }}</option>
                <option value="3">3+ {{ getTranslation('stars') }}</option>
              </select>
            </div>

            <button class="btn btn-secondary" (click)="clearFilters()">
              {{ i18nService.translate('clearFilters') }}
            </button>
          </div>
        </div>
      </section>

      <!-- Restaurants Grid -->
      <section class="restaurants-content">
        <div class="container">
          <div class="restaurants-grid">
            <div 
              *ngFor="let restaurant of filteredRestaurants" 
              class="restaurant-card"
              [class.rtl]="i18nService.isRTL()"
            >
              <div class="restaurant-image">
                <img [src]="restaurant.image" [alt]="i18nService.isRTL() ? restaurant.nameAr : restaurant.name">
                <div class="restaurant-rating">
                  <span class="material-icons">star</span>
                  {{ restaurant.rating }}
                </div>
                <div class="restaurant-price-badge">
                  {{ i18nService.isRTL() ? restaurant.priceRangeAr : restaurant.priceRange }}
                </div>
              </div>

              <div class="restaurant-content">
                <div class="restaurant-header">
                  <h3 class="restaurant-name">
                    {{ i18nService.isRTL() ? restaurant.nameAr : restaurant.name }}
                  </h3>
                  <div class="restaurant-cuisine">
                    {{ i18nService.isRTL() ? restaurant.cuisineAr : restaurant.cuisine }}
                  </div>
                </div>

                <p class="restaurant-description">
                  {{ i18nService.isRTL() ? restaurant.descriptionAr : restaurant.description }}
                </p>

                <div class="restaurant-details">
                  <div class="detail-item">
                    <span class="material-icons">location_on</span>
                    <span>{{ i18nService.isRTL() ? restaurant.addressAr : restaurant.address }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="material-icons">phone</span>
                    <span>{{ restaurant.phone }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="material-icons">schedule</span>
                    <span>{{ i18nService.isRTL() ? restaurant.openingHoursAr : restaurant.openingHours }}</span>
                  </div>
                </div>

                <div class="restaurant-features">
                  <span 
                    *ngFor="let feature of (i18nService.isRTL() ? restaurant.featuresAr : restaurant.features)" 
                    class="feature-tag"
                  >
                    {{ feature }}
                  </span>
                </div>

                <div class="restaurant-specialties">
                  <h4>{{ getTranslation('specialties') }}</h4>
                  <div class="specialties-list">
                    <span 
                      *ngFor="let specialty of (i18nService.isRTL() ? restaurant.specialtiesAr : restaurant.specialties)" 
                      class="specialty-item"
                    >
                      {{ specialty }}
                    </span>
                  </div>
                </div>

                <div class="restaurant-actions">
                  <button class="btn btn-primary" (click)="viewMenu(restaurant)">
                    {{ getTranslation('viewMenu') }}
                  </button>
                  <button class="btn btn-secondary" (click)="makeReservation(restaurant)">
                    {{ getTranslation('makeReservation') }}
                  </button>
                  <button class="btn btn-accent" (click)="getDirections(restaurant)">
                    {{ i18nService.translate('getDirections') }}
                  </button>
                </div>

                <div class="restaurant-reviews">
                  <div class="reviews-summary">
                    <span class="material-icons">reviews</span>
                    {{ restaurant.reviewCount }} {{ getTranslation('reviews') }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- No Results -->
          <div *ngIf="filteredRestaurants.length === 0" class="no-results">
            <div class="no-results-content">
              <span class="material-icons">restaurant</span>
              <h3>{{ getTranslation('noRestaurantsFound') }}</h3>
              <p>{{ getTranslation('tryDifferentFilters') }}</p>
              <button class="btn btn-primary" (click)="clearFilters()">
                {{ i18nService.translate('clearFilters') }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Dining Tips Section -->
      <section class="dining-tips">
        <div class="container">
          <h2 class="section-title">{{ getTranslation('diningTips') }}</h2>
          <div class="tips-grid">
            <div class="tip-card" [class.rtl]="i18nService.isRTL()">
              <div class="tip-icon">
                <span class="material-icons">schedule</span>
              </div>
              <h3>{{ getTranslation('reservationTip') }}</h3>
              <p>{{ getTranslation('reservationTipDesc') }}</p>
            </div>
            <div class="tip-card" [class.rtl]="i18nService.isRTL()">
              <div class="tip-icon">
                <span class="material-icons">local_dining</span>
              </div>
              <h3>{{ getTranslation('localCuisineTip') }}</h3>
              <p>{{ getTranslation('localCuisineTipDesc') }}</p>
            </div>
            <div class="tip-card" [class.rtl]="i18nService.isRTL()">
              <div class="tip-icon">
                <span class="material-icons">payment</span>
              </div>
              <h3>{{ getTranslation('paymentTip') }}</h3>
              <p>{{ getTranslation('paymentTipDesc') }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .restaurants-page {
      min-height: 100vh;
      padding-top: 80px;
    }

    .restaurants-hero {
      background: var(--golden-gradient);
      color: white;
      padding: 4rem 0;
      text-align: center;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }

    .search-filters {
      background: white;
      padding: 2rem 0;
      border-bottom: 1px solid var(--border-color);
    }

    .search-bar {
      margin-bottom: 2rem;
    }

    .search-input-wrapper {
      position: relative;
      max-width: 500px;
      margin: 0 auto;
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-secondary);
    }

    [dir="rtl"] .search-icon {
      left: auto;
      right: 1rem;
    }

    .search-input {
      width: 100%;
      padding: 1rem 1rem 1rem 3rem;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-lg);
      font-size: 1rem;
      transition: border-color var(--transition-normal);
    }

    [dir="rtl"] .search-input {
      padding: 1rem 3rem 1rem 1rem;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .filters {
      display: flex;
      gap: 1.5rem;
      align-items: end;
      justify-content: center;
      flex-wrap: wrap;
    }

    [dir="rtl"] .filters {
      flex-direction: row-reverse;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .filter-group label {
      font-weight: 500;
      color: var(--text-primary);
      font-size: 0.9rem;
    }

    .filter-select {
      padding: 0.75rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      background: white;
      font-size: 0.9rem;
      min-width: 150px;
    }

    .restaurants-content {
      padding: 4rem 0;
    }

    .restaurants-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .restaurant-card {
      background: white;
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
    }

    .restaurant-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
    }

    .restaurant-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .restaurant-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-normal);
    }

    .restaurant-card:hover .restaurant-image img {
      transform: scale(1.05);
    }

    .restaurant-rating {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 0.5rem;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-weight: 500;
    }

    .restaurant-card.rtl .restaurant-rating {
      left: auto;
      right: 1rem;
    }

    .restaurant-price-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: var(--accent-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-full);
      font-weight: 500;
      font-size: 0.875rem;
    }

    .restaurant-card.rtl .restaurant-price-badge {
      right: auto;
      left: 1rem;
    }

    .restaurant-content {
      padding: 1.5rem;
    }

    .restaurant-header {
      margin-bottom: 1rem;
    }

    .restaurant-name {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .restaurant-cuisine {
      color: var(--primary-color);
      font-weight: 500;
      font-size: 0.9rem;
    }

    .restaurant-description {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .restaurant-details {
      margin-bottom: 1.5rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .restaurant-card.rtl .detail-item {
      flex-direction: row-reverse;
    }

    .detail-item .material-icons {
      font-size: 1.1rem;
      color: var(--primary-color);
    }

    .restaurant-features {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .restaurant-card.rtl .restaurant-features {
      flex-direction: row-reverse;
    }

    .feature-tag {
      background: var(--background-color);
      color: var(--primary-color);
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      font-weight: 500;
    }

    .restaurant-specialties {
      margin-bottom: 1.5rem;
    }

    .restaurant-specialties h4 {
      font-size: 1rem;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .specialties-list {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .restaurant-card.rtl .specialties-list {
      flex-direction: row-reverse;
    }

    .specialty-item {
      background: var(--golden-sand);
      color: var(--primary-color);
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      font-weight: 500;
    }

    .restaurant-actions {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .restaurant-card.rtl .restaurant-actions {
      flex-direction: row-reverse;
    }

    .restaurant-actions .btn {
      flex: 1;
      min-width: 120px;
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
    }

    .restaurant-reviews {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }

    .reviews-summary {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .no-results {
      text-align: center;
      padding: 4rem 0;
    }

    .no-results-content {
      max-width: 400px;
      margin: 0 auto;
    }

    .no-results .material-icons {
      font-size: 4rem;
      color: var(--text-light);
      margin-bottom: 1rem;
    }

    .no-results h3 {
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .no-results p {
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }

    .dining-tips {
      background: var(--background-color);
      padding: 4rem 0;
    }

    .tips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .tip-card {
      background: white;
      padding: 2rem;
      border-radius: var(--radius-xl);
      text-align: center;
      box-shadow: var(--shadow-sm);
    }

    .tip-icon {
      width: 60px;
      height: 60px;
      background: var(--primary-gradient);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }

    .tip-icon .material-icons {
      color: white;
      font-size: 1.5rem;
    }

    .tip-card h3 {
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .tip-card p {
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .filters {
        flex-direction: column;
        align-items: stretch;
      }

      .filter-group {
        width: 100%;
      }

      .filter-select {
        min-width: auto;
      }

      .restaurants-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .restaurant-actions {
        flex-direction: column;
      }

      .restaurant-actions .btn {
        flex: none;
      }

      .tips-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .hero-title {
        font-size: 2rem;
      }

      .restaurant-content {
        padding: 1rem;
      }

      .restaurant-actions .btn {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
      }
    }
  `]
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
