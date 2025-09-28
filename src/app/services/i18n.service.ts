import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
}

export interface TranslationKeys {
  // Navigation
  home: string;
  attractions: string;

  events: string;
  itineraries: string;
  visitorInfo: string;
  blog: string;
  map: string;

  // Common
  search: string;
  filter: string;
  viewDetails: string;
  bookNow: string;
  learnMore: string;
  readMore: string;
  showMore: string;
  loading: string;
  noResults: string;
  clearFilters: string;

  // Home Page
  heroTitle: string;
  heroSubtitle: string;
  exploreAttractions: string;
  planYourTrip: string;
  featuredAttractions: string;
  latestStories: string;
  readyToExplore: string;
  readyToExploreDesc: string;

  // Attractions
  attractionsTitle: string;
  attractionsSubtitle: string;
  searchAttractions: string;
  allCategories: string;
  historicalSites: string;
  archaeologicalSites: string;
  ancientCities: string;
  scenicAreas: string;

  // Hotels
  hotelsTitle: string;
  hotelsSubtitle: string;
  searchHotels: string;
  allStarRatings: string;
  allPriceRanges: string;
  budget: string;
  midRange: string;
  luxury: string;

  // Footer
  aboutUs: string;
  contactUs: string;
  privacyPolicy: string;
  termsOfService: string;
  followUs: string;
  newsletter: string;
  newsletterDesc: string;
  subscribe: string;

  // Attraction Details
  aboutAttraction: string;
  historicalPeriod: string;
  historicalSignificance: string;
  featuresAmenities: string;
  photoGallery: string;
  visitInformation: string;
  openingHours: string;
  ticketPrice: string;
  location: string;
  getDirections: string;
  saveToFavorites: string;
  share: string;
  quickStats: string;
  averageRating: string;
  totalReviews: string;
  annualVisitors: string;
  youMightAlsoLike: string;

  // Statistics
  historicSites: string;
  hotels: string;
  restaurants: string;
  annualVisitorsCount: string;

  // Tips
  bookingTips: string;
  bestTimeToBook: string;
  bestTimeToBookDesc: string;
  locationMatters: string;
  locationMattersDesc: string;
  packageDeals: string;
  packageDealsDesc: string;

  // Why Visit
  whyVisitMinya: string;
  richHistory: string;
  richHistoryDesc: string;
  scenicBeauty: string;
  scenicBeautyDesc: string;
  culturalHeritage: string;
  culturalHeritageDesc: string;
  blogTitle: string;
  blogSubtitle : string;
  categories :string;
  minutesRead :string; 
  loadMorePosts :string;
  enterEmail : string;
  stayUpdatedDesc: string; 
  stayUpdated :string;
  
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private readonly languages: Language[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      rtl: false
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇪🇬',
      rtl: true
    }
  ];

  private readonly translations: Record<string, TranslationKeys> = {
    en: {
      // Navigation
      home: 'Home',
      attractions: 'Attractions',
      hotels: 'Hotels',
      restaurants: 'Restaurants',
      events: 'Events',
      itineraries: 'Itineraries',
      visitorInfo: 'Visitor Info',
      blog: 'Blog',
      map: 'Map',

      // Common
      search: 'Search',
      filter: 'Filter',
      viewDetails: 'View Details',
      bookNow: 'Book Now',
      learnMore: 'Learn More',
      readMore: 'Read More',
      showMore: 'Show More',
      loading: 'Loading...',
      noResults: 'No results found',
      clearFilters: 'Clear Filters',

      // Home Page
      heroTitle: 'Discover Ancient Egypt in Minya',
      heroSubtitle: 'Explore the hidden treasures of Minya, where ancient history meets the timeless beauty of the Nile River. Journey through millennia of Egyptian heritage and create unforgettable memories.',
      exploreAttractions: 'Explore Attractions',
      planYourTrip: 'Plan Your Trip',
      featuredAttractions: 'Featured Attractions',
      latestStories: 'Latest Stories',
      readyToExplore: 'Ready to Explore Minya?',
      readyToExploreDesc: 'Start planning your journey through ancient Egypt today. Discover the treasures that await you in Minya.',

      // Attractions
      attractionsTitle: 'Discover Minya\'s Attractions',
      attractionsSubtitle: 'Explore ancient wonders and historical treasures that have captivated visitors for millennia',
      searchAttractions: 'Search attractions...',
      allCategories: 'All Categories',
      historicalSites: 'Historical Sites',
      archaeologicalSites: 'Archaeological Sites',
      ancientCities: 'Ancient Cities',
      scenicAreas: 'Scenic Areas',

      // Hotels
      hotelsTitle: 'Hotels in Minya',
      hotelsSubtitle: 'Find comfortable accommodations with stunning Nile views and authentic Egyptian hospitality',
      searchHotels: 'Search hotels...',
      allStarRatings: 'All Star Ratings',
      allPriceRanges: 'All Price Ranges',
      budget: 'Budget (Under 500 EGP)',
      midRange: 'Mid-range (500-1000 EGP)',
      luxury: 'Luxury (1000+ EGP)',

      // Footer
      aboutUs: 'About Us',
      contactUs: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      followUs: 'Follow Us',
      newsletter: 'Newsletter',
      newsletterDesc: 'Subscribe to our newsletter for the latest updates on Minya tourism.',
      subscribe: 'Subscribe',

      // Attraction Details
      aboutAttraction: 'About This Attraction',
      historicalPeriod: 'Historical Period',
      historicalSignificance: 'Historical Significance',
      featuresAmenities: 'Features & Amenities',
      photoGallery: 'Photo Gallery',
      visitInformation: 'Visit Information',
      openingHours: 'Opening Hours',
      ticketPrice: 'Ticket Price',
      location: 'Location',
      getDirections: 'Get Directions',
      saveToFavorites: 'Save to Favorites',
      share: 'Share',
      quickStats: 'Quick Stats',
      averageRating: 'Average Rating',
      totalReviews: 'Total Reviews',
      annualVisitors: 'Annual Visitors',
      youMightAlsoLike: 'You Might Also Like',

      // Statistics
      historicSites: 'Historic Sites',

      annualVisitorsCount: 'Annual Visitors',

      // Tips
      bookingTips: 'Booking Tips',
      bestTimeToBook: 'Best Time to Book',
      bestTimeToBookDesc: 'Book 2-4 weeks in advance for better rates, especially during peak season (October-April).',
      locationMatters: 'Location Matters',
      locationMattersDesc: 'Hotels near the Nile Corniche offer beautiful river views and easy access to attractions.',
      packageDeals: 'Package Deals',
      packageDealsDesc: 'Look for packages that include meals, tours, or transportation for better value.',

      // Why Visit
      whyVisitMinya: 'Why Visit Minya?',
      richHistory: 'Rich History',
      richHistoryDesc: 'Explore 4,000 years of Egyptian civilization through well-preserved monuments and artifacts.',
      scenicBeauty: 'Scenic Beauty',
      scenicBeautyDesc: 'Experience the timeless beauty of the Nile River and surrounding desert landscapes.',
      culturalHeritage: 'Cultural Heritage',
      culturalHeritageDesc: 'Immerse yourself in authentic Egyptian culture and traditions that continue today.',
      blogTitle: 'Tourism Blog',
      blogSubtitle: 'Stay inspired with the latest stories, guides, and travel tips from Minya.',
      categories: 'Categories',
      minutesRead: 'minutes read',
      loadMorePosts: 'Load More Posts',
      stayUpdated: 'Stay Updated',
      stayUpdatedDesc: 'Subscribe to get the latest articles, travel tips, and news directly to your inbox.',
      enterEmail: 'Enter your email',
    },
    ar: {
      // Navigation
      home: 'الرئيسية',
      attractions: 'المعالم السياحية',
      hotels: 'الفنادق',
      restaurants: 'المطاعم',
      events: 'الفعاليات',
      itineraries: 'برامج الرحلات',
      visitorInfo: 'معلومات الزوار',
      blog: 'المدونة',
      map: 'الخريطة',

      // Common
      search: 'بحث',
      filter: 'تصفية',
      viewDetails: 'عرض التفاصيل',
      bookNow: 'احجز الآن',
      learnMore: 'اعرف المزيد',
      readMore: 'اقرأ المزيد',
      showMore: 'عرض المزيد',
      loading: 'جاري التحميل...',
      noResults: 'لم يتم العثور على نتائج',
      clearFilters: 'مسح المرشحات',

      // Home Page
      heroTitle: 'اكتشف مصر القديمة في المنيا',
      heroSubtitle: 'استكشف الكنوز المخفية في المنيا، حيث يلتقي التاريخ القديم بجمال نهر النيل الخالد. سافر عبر آلاف السنين من التراث المصري واصنع ذكريات لا تُنسى.',
      exploreAttractions: 'استكشف المعالم',
      planYourTrip: 'خطط لرحلتك',
      featuredAttractions: 'المعالم المميزة',
      latestStories: 'أحدث القصص',
      readyToExplore: 'مستعد لاستكشاف المنيا؟',
      readyToExploreDesc: 'ابدأ في التخطيط لرحلتك عبر مصر القديمة اليوم. اكتشف الكنوز التي تنتظرك في المنيا.',

      // Attractions
      attractionsTitle: 'اكتشف معالم المنيا السياحية',
      attractionsSubtitle: 'استكشف العجائب القديمة والكنوز التاريخية التي أسرت الزوار لآلاف السنين',
      searchAttractions: 'البحث في المعالم السياحية...',
      allCategories: 'جميع الفئات',
      historicalSites: 'المواقع التاريخية',
      archaeologicalSites: 'المواقع الأثرية',
      ancientCities: 'المدن القديمة',
      scenicAreas: 'المناطق الطبيعية',

      // Hotels
      hotelsTitle: 'فنادق المنيا',
      hotelsSubtitle: 'اعثر على أماكن إقامة مريحة مع إطلالات خلابة على النيل وضيافة مصرية أصيلة',
      searchHotels: 'البحث في الفنادق...',
      allStarRatings: 'جميع تصنيفات النجوم',
      allPriceRanges: 'جميع الفئات السعرية',
      budget: 'اقتصادي (أقل من 500 جنيه)',
      midRange: 'متوسط (500-1000 جنيه)',
      luxury: 'فاخر (1000+ جنيه)',

      // Footer
      aboutUs: 'من نحن',
      contactUs: 'اتصل بنا',
      privacyPolicy: 'سياسة الخصوصية',
      termsOfService: 'شروط الخدمة',
      followUs: 'تابعنا',
      newsletter: 'النشرة الإخبارية',
      newsletterDesc: 'اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات حول سياحة المنيا.',
      subscribe: 'اشترك',

      // Attraction Details
      aboutAttraction: 'حول هذا المعلم',
      historicalPeriod: 'الفترة التاريخية',
      historicalSignificance: 'الأهمية التاريخية',
      featuresAmenities: 'المميزات والخدمات',
      photoGallery: 'معرض الصور',
      visitInformation: 'معلومات الزيارة',
      openingHours: 'ساعات العمل',
      ticketPrice: 'سعر التذكرة',
      location: 'الموقع',
      getDirections: 'احصل على الاتجاهات',
      saveToFavorites: 'حفظ في المفضلة',
      share: 'مشاركة',
      quickStats: 'إحصائيات سريعة',
      averageRating: 'متوسط التقييم',
      totalReviews: 'إجمالي المراجعات',
      annualVisitors: 'الزوار السنويون',
      youMightAlsoLike: 'قد يعجبك أيضاً',

      // Statistics
      historicSites: 'المواقع التاريخية',

      annualVisitorsCount: 'الزوار السنويون',

      // Tips
      bookingTips: 'نصائح الحجز',
      bestTimeToBook: 'أفضل وقت للحجز',
      bestTimeToBookDesc: 'احجز قبل 2-4 أسابيع للحصول على أسعار أفضل، خاصة خلال موسم الذروة (أكتوبر-أبريل).',
      locationMatters: 'الموقع مهم',
      locationMattersDesc: 'الفنادق القريبة من كورنيش النيل توفر إطلالات جميلة على النهر وسهولة الوصول للمعالم.',
      packageDeals: 'العروض الشاملة',
      packageDealsDesc: 'ابحث عن العروض التي تشمل الوجبات والجولات أو النقل للحصول على قيمة أفضل.',

      // Why Visit
      whyVisitMinya: 'لماذا تزور المنيا؟',
      richHistory: 'تاريخ عريق',
      richHistoryDesc: 'استكشف 4000 عام من الحضارة المصرية من خلال الآثار والتحف المحفوظة جيداً.',
      scenicBeauty: 'جمال طبيعي',
      scenicBeautyDesc: 'استمتع بالجمال الخالد لنهر النيل والمناظر الطبيعية الصحراوية المحيطة.',
      culturalHeritage: 'تراث ثقافي',
      culturalHeritageDesc: 'انغمس في الثقافة والتقاليد المصرية الأصيلة التي تستمر حتى اليوم.',
      blogTitle: 'مدونة السياحة',
      blogSubtitle: 'ابقَ مُلهمًا مع أحدث القصص والأدلة ونصائح السفر من المنيا.',
      categories: 'الفئات',
      minutesRead: 'دقائق قراءة',
      loadMorePosts: 'تحميل المزيد من المقالات',
      stayUpdated: 'ابقَ على اطلاع',
      stayUpdatedDesc: 'اشترك للحصول على أحدث المقالات ونصائح السفر والأخبار مباشرة في بريدك.',
      enterEmail: 'أدخل بريدك الإلكتروني',
    }
  };

  constructor() {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && this.isValidLanguage(savedLanguage)) {
      this.setLanguage(savedLanguage);
    }
  }

  getLanguages(): Language[] {
    return this.languages;
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  getCurrentLanguageInfo(): Language {
    return this.languages.find(lang => lang.code === this.getCurrentLanguage()) || this.languages[0];
  }

  setLanguage(languageCode: string): void {
    if (this.isValidLanguage(languageCode)) {
      this.currentLanguageSubject.next(languageCode);
      localStorage.setItem('selectedLanguage', languageCode);

      // Update document direction and language
      const isRTL = this.getCurrentLanguageInfo().rtl;
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = languageCode;

      // Update body class for styling
      document.body.classList.toggle('rtl', isRTL);
      document.body.classList.toggle('ltr', !isRTL);
    }
  }

  translate(key: keyof TranslationKeys): string {
    const currentLang = this.getCurrentLanguage();
    return this.translations[currentLang]?.[key] || this.translations['en'][key] || key;
  }

  translateWithParams(key: keyof TranslationKeys, params: Record<string, string>): string {
    let translation = this.translate(key);

    Object.keys(params).forEach(param => {
      translation = translation.replace(`{{${param}}}`, params[param]);
    });

    return translation;
  }

  isRTL(): boolean {
    return this.getCurrentLanguageInfo().rtl;
  }

  private isValidLanguage(languageCode: string): boolean {
    return this.languages.some(lang => lang.code === languageCode);
  }

  // Helper method to get opposite direction for animations
  getOppositeDirection(direction: 'left' | 'right'): 'left' | 'right' {
    if (!this.isRTL()) {
      return direction;
    }
    return direction === 'left' ? 'right' : 'left';
  }

  // Helper method for number formatting (Arabic uses different numerals)
  formatNumber(num: number): string {
    const currentLang = this.getCurrentLanguage();
    if (currentLang === 'ar') {
      // Convert to Arabic-Indic numerals
      return num.toString().replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
    }
    return num.toString();
  }

  // Helper method for date formatting
  formatDate(date: Date): string {
    const currentLang = this.getCurrentLanguage();
    return date.toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US');
  }
}
