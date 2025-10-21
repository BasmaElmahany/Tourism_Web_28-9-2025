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
  free: string;
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
  chatPlaceholder: string;
  chatSend: string;
  chatSending: string;
  openChat: string;
  closeChat: string;

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

  // Hotel Details / Booking
  aboutHotel: string;
  roomTypes: string;
  contact: string;
  bookingInformation: string;
  starRating: string;

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
  blogSubtitle: string;
  featuredBloggers: string;
  viewChannel: string;
  videoFallbackSummary: string;
  readMoreOnChannel: string;
  categories: string;
  minutesRead: string;
  // Tourguide
  languages: string;
  call: string;
  email: string;
  // Blog details / generic
  about: string;
  tags: string;
  postInfo: string;
  publishDate: string;
  readTime: string;
  minutes: string;
  author: string;
  loadMorePosts: string;
  enterEmail: string;
  stayUpdatedDesc: string;
  stayUpdated: string;
  Discover_Minya: string;
  exploreHotels: string;
  more: string;
  reviews: string;
  priceLuxury: string;
  priceMid: string;
  priceBudget: string;
  twoStars: string;
  threeStars: string;
  fourStars: string;
  fiveStars: string;

  paymentTipDesc: string;
  paymentTip: string;
  localCuisineTipDesc: string;
  localCuisineTip: string;
  reservationTipDesc: string;
  reservationTip: string;
  diningTips: string;
  tryDifferentFilters: string;
  noRestaurantsFound: string;
  makeReservation: string;
  viewMenu: string;
  specialties: string;
  menuUnavailable: string;
  restaurantsSubtitle: string;
  restaurantsTitle: string;
  stars: string;
  allRatings: string;
  rating: string;
  priceRange: string;
  allCuisines: string;
  cuisine: string;
  searchRestaurants: string,
  Islamic_Religious_Site: string,
  Christian_religious_site: string,
  Museum: string;
  tourguide: string;
  tourguideSubtitle: string;
  photographer: string;
  photographers: string;
  photographerSubtitle: string;
  services: string;
  Book_A_Ticket: string;
  souvenirs: string;
  souvenirsSubtitle: string;
  shopByCategory: string;
  shops: string;
  filterShops: string;
  category: string;
  allPrices: string;
  souvenirsTitle: string;
  featuredOnly: string;
  acceptsCards: string;
  hasDelivery: string;
  featuredShops: string;
  featured: string;
  allShops: string;

  // Shop Details

  directions: string;
  onlineStore: string;

  // No Results
  noShopsFound: string;

  // Shopping Tips
  shoppingTips: string;
  tipAuthenticity: string;
  tipAuthenticityDesc: string;
  tipBargain: string;
  tipBargainDesc: string;
  tipPackaging: string;
  tipPackagingDesc: string;
  tipTiming: string;
  tipTimingDesc: string;

  // Product Categories
  categoryHandicrafts: string;
  categoryJewelry: string;
  categoryTextiles: string;
  categoryPottery: string;
  categoryPapyrus: string;
  categoryMarket: string;
  categoryGallery: string;

  // Price Ranges
  priceModerate: string;
  pricePremium: string;

  // Additional
  resultsCount: string;
  myFavorites: string;
  favorites: string;
  addToFavorites: string;
  removeFromFavorites: string;
  noFavorites: string;
  noFavoritesDesc: string;
  clearAll: string;
  confirmClearFavorites: string;
  all: string;
  close: string;

  // Messages
  addedToFavorites: string;
  removedFromFavorites: string;
  favoriteAdded: string;
  favoriteRemoved: string;
  visitorGuide: string;
  ctaDescription: string;
  minRead: string;
  by: string;
  viewAllPosts: string;
  culturalExperiences: string;
  tasteLocalCuisine: string;
  findAccommodation: string;
  discoverAncientSites: string;


  // Header
  minyaTourismAssistant: string;
  onlineNow: string;

  // Welcome
  chatWelcome: string;
  chatWelcomeDesc: string;

  // Quick Actions
  showAttractions: string;
  findHotels: string;
  localRestaurants: string;
  planTrip: string;

  // Responses
  chatAttractionResponse: string;
  chatHotelResponse: string;
  chatRestaurantResponse: string;
  chatTripResponse: string;
  chatDefaultResponse: string;
  chatError: string;

  // Footer
  poweredByAI: string;

  // Actions
  clearChat: string;
  newConversation: string;
  chatTitle: string;
  online: string;
  souviners: string;
  chatbotNotice: string;
  helperTitle: string;
  helperSub: string;
  // Tourism / Weather panel
  tourism_title: string;
  tourism_title_short?: string;
  tourism_weather_heading: string;
  tourism_weather_paragraph: string;
  tourism_best_time_heading: string;
  tourism_best_time_paragraph: string;
  tourism_what_to_wear_heading: string;
  tourism_what_to_wear_paragraph: string;
  tourism_quick_note: string;
  tourism_close: string;
  tourism_refresh: string;
  tourism_quick_note_title: string;
  tourism_section_subtitle: string;
  hotel: string;
  Restaurant: string;
  follow : string;
  shareDefaultText : string ;
  linkCopied  : string ;
  copyLinkPrompt : string ;
  goToSlide: string;
  play: string;
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
      goToSlide: 'Go To Slide',
       linkCopied :'Link Copied',
       copyLinkPrompt : 'Copy Link' ,
      shareDefaultText : 'Share Default Text',
      follow :'Follow',
      // Navigation
      hotel: 'Hotel',
      home: 'Home',
      attractions: 'Attractions',
      hotels: 'Hotels',
      restaurants: 'Restaurants',
      events: 'Events',
      itineraries: 'Itineraries',
      visitorInfo: 'Visitor Info',
      blog: 'Blog',
      map: 'Map',
      services: 'Services',
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
  latestStories: 'Articles',
      featuredBloggers: 'Featured Bloggers & Videos',
      viewChannel: 'View Channel',
  // Blogger / Video fallbacks
  videoFallbackSummary: 'Short clip highlighting local attractions and tips.',
  readMoreOnChannel: ' Read more on the channel.',
      readyToExplore: 'Ready to Explore Minya?',
      readyToExploreDesc: 'Start planning your journey through ancient Egypt today. Discover the treasures that await you in Minya.',

      // Tourism info (weather)
      tourism_title: 'Al-Minya Weather',
      tourism_title_short: 'Weather',
      tourism_weather_heading: 'Al-Minya Weather',
      tourism_weather_paragraph: 'Al-Minya has a desert climate with almost no rainfall all year long. Summers are arid and sweltering, with an average temperature fluctuating between 37°C (99°F) and 43°C (109.4°F). However, winters are cool and dry, with an average temperature fluctuating between 20°C (69.8°F) and 26°C (78.8°F). June is the hottest month in the Al-Minya Governorate, while January is the coldest.',
      tourism_best_time_heading: 'Best Time to Visit Al-Minya',
      tourism_best_time_paragraph: 'The best time to visit Al-Minya is from early March to late April or early October. During this time, you will experience good weather with pleasant temperatures. Additionally, you will enjoy outdoor tourist activities. You can also travel to Al-Minya from early May to mid-September for hot-weather activities. Al-Minya is also fantastic in winter, from late November to early February.',
      tourism_what_to_wear_heading: 'What to Wear in Al-Minya',
      tourism_what_to_wear_paragraph: 'If you travel to Al-Minya in winter, pack pullovers, heavy pants or skirts, a jacket, sunglasses and sports footwear. However, take cotton t-shirts, jeans, skirts, light footwear, sandals, sunglasses, sunscreen lotion, beachwear and a beach towel if you travel in summer.',
      tourism_quick_note: 'Quick tip: Al-Minya has a desert climate; summers are very hot and winters are mild. Choose clothing according to the season and enjoy your trip!',
      tourism_close: 'Close',
      tourism_refresh: 'Refresh',
      tourism_quick_note_title: 'Quick tip',
      tourism_section_subtitle: 'Current conditions and local travel tips for Minya',

      helperTitle: 'Ask me',
      helperSub: 'I can help plan your visit',

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
      // Tourguide
      languages: 'Languages',
      call: 'Call',
      email: 'Email',
      // Hotel Details
      aboutHotel: 'About This Hotel',
      roomTypes: 'Room Types',
      contact: 'Contact',
      bookingInformation: 'Booking Information',
      starRating: 'Star Rating',

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
      // Blog details / generic
      about: 'About this post',
      tags: 'Tags',
      postInfo: 'Post Information',
      publishDate: 'Publish Date',
      readTime: 'Read Time',
      minutes: 'minutes',
      author: 'Author',
      loadMorePosts: 'Load More Posts',
      stayUpdated: 'Stay Updated',
      stayUpdatedDesc: 'Subscribe to get the latest articles, travel tips, and news directly to your inbox.',
      enterEmail: 'Enter your email',
      Discover_Minya: "Discover Minya",
      exploreHotels: " Explore Hotels",
      more: "More",
      reviews: "Reviews",
      priceLuxury: "Price Luxury",
      priceMid: " Price Mid",
      priceBudget: "Price Budget",
      twoStars: "Two Stars",
      threeStars: "Three Stars",
      fourStars: "Four Stars",
      fiveStars: "Five Stars",
      paymentTipDesc: 'Payment Tip Desc',
      paymentTip: 'Payment Tip',
      localCuisineTipDesc: 'Local Cuisine Tip Desc',
      localCuisineTip: 'Local Cuisine Tip',
      reservationTipDesc: 'Reservation Tip Desc',
      reservationTip: 'Reservation Tip',
      diningTips: 'Dining Tips',
      tryDifferentFilters: 'Try Different Filters',
      noRestaurantsFound: 'No Restaurants Found',
      makeReservation: 'Make Reservation',
      viewMenu: 'View Menu',
      menuUnavailable: 'Menu not available',
      specialties: 'Specialties',
      restaurantsSubtitle: 'Restaurants Subtitle',
      restaurantsTitle: 'Restaurants Title',
      stars: 'Stars',
      allRatings: 'All Ratings',
      rating: 'Rating',
      priceRange: 'Price Range',
      allCuisines: 'All Cuisines',
      cuisine: 'Cuisine',
      searchRestaurants: 'Search Restaurants',
      Museum: 'Museum',
      Christian_religious_site: 'Christian Religious Site',
      Islamic_Religious_Site: ' Islamic Religious Site',
      tourguide: 'Tourguide',
      tourguideSubtitle: 'Find licensed local guides, interpreters, and experts to lead your Minya experience.',
      photographer: 'Photographer',
      photographers: 'Photographers',
      photographerSubtitle: 'Local and professional photographers available for events, tours, and photo sessions.',
      Book_A_Ticket: 'Book A Ticket',
  souvenirs: 'Souvenirs',

  // Hero Section
  souvenirsSubtitle: 'Discover authentic Egyptian treasures and handcrafted souvenirs in Minya',
  souvenirsTitle: 'Souvenirs',

      // Categories
      shopByCategory: 'Shop by Category',
      shops: 'shops',

      // Filters
      filterShops: 'Filter Shops',
      category: 'Category',
      allPrices: 'All Prices',
      featuredOnly: 'Featured Only',
      acceptsCards: 'Accepts Cards',
      hasDelivery: 'Has Delivery',

      // Shop Sections
      featuredShops: 'Featured Shops',
      featured: 'Featured',
      allShops: 'All Shops',

      // Shop Details
      directions: 'Directions',
      onlineStore: 'Online Store',

      // No Results
      noShopsFound: 'No shops found',


      // Shopping Tips
      shoppingTips: 'Shopping Tips',
      tipAuthenticity: 'Check Authenticity',
      tipAuthenticityDesc: 'Look for certificates of authenticity, especially for papyrus, alabaster, and jewelry.',
      tipBargain: 'Bargaining is Expected',
      tipBargainDesc: 'In traditional markets, bargaining is part of the culture. Start at 50-60% of the asking price.',
      tipPackaging: 'Ask for Packaging',
      tipPackagingDesc: 'Request proper packaging for fragile items like pottery and glass to ensure safe travel.',
      tipTiming: 'Best Shopping Times',
      tipTimingDesc: 'Visit shops in the morning or late afternoon to avoid crowds and heat.',

      // Product Categories
      categoryHandicrafts: 'Handicrafts',
      categoryJewelry: 'Jewelry & Accessories',
      categoryTextiles: 'Textiles & Fabrics',
      categoryPottery: 'Pottery & Ceramics',
      categoryPapyrus: 'Papyrus & Art',
      categoryMarket: 'Traditional Markets',
      categoryGallery: 'Art Galleries',

      // Price Ranges
      priceModerate: 'Moderate',
      pricePremium: 'Premium',

      // Additional
      resultsCount: 'results',
  // souvenirsTitle already defined above
      // Favorites Drawer
      myFavorites: 'My Favorites',
      favorites: 'Favorites',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      noFavorites: 'No favorites yet',
      noFavoritesDesc: 'Start adding your favorite places, hotels, and restaurants!',
      clearAll: 'Clear All',
      confirmClearFavorites: 'Are you sure you want to clear all favorites?',

      // Filter Labels
      all: 'All',

      // Actions
      close: 'Close',

      // Messages
      addedToFavorites: 'Added to favorites',
      removedFromFavorites: 'Removed from favorites',
      favoriteAdded: 'Favorite added successfully',
      favoriteRemoved: 'Favorite removed successfully',
      visitorGuide: 'Visitor Guide',
      ctaDescription: 'Cta Description',
      minRead: 'minRead',
      by: 'By',
      viewAllPosts: 'View All Posts',
      culturalExperiences: 'Cultural Experiences',
      tasteLocalCuisine: 'Taste LocalCuisine',
      findAccommodation: 'Find Accommodation',
      discoverAncientSites: 'Discover AncientSites',
      chatPlaceholder: 'Chat Place holder',
      chatSend: 'Chat Send',
      chatSending: 'Chat Sending',
      openChat: 'Open Chat',
      closeChat: 'Close Chat'
      ,
      // Small labels
      free: 'Free',

      // Chat UI


      chatbotNotice: 'Chatbot Notice',
      // Header
      minyaTourismAssistant: 'Minya Tourism Assistant',
      onlineNow: 'Online now',

      // Welcome
      chatWelcome: 'Welcome to Minya Tourism! 👋',
      chatWelcomeDesc: 'How can I help you explore the ancient treasures of Minya today?',

      // Quick Actions
      showAttractions: 'Show me attractions',
      findHotels: 'Find hotels',
      localRestaurants: 'Local restaurants',
      planTrip: 'Plan my trip',

      // Responses
      chatAttractionResponse: 'Minya has amazing attractions! Visit Beni Hassan tombs, Tuna el-Gebel, and the Akhenaten Museum. Would you like more details about any of these?',
      chatHotelResponse: 'We have several great hotels in Minya. I can show you options ranging from budget to luxury. What\'s your preference?',
      chatRestaurantResponse: 'Minya offers delicious Egyptian cuisine! Try local favorites like koshari, ful medames, and fresh Nile fish. Would you like restaurant recommendations?',
      chatTripResponse: 'I\'d be happy to help plan your trip! How many days will you be staying in Minya? This will help me create the perfect itinerary for you.',
      chatDefaultResponse: 'Thank you for your question! I\'m here to help you explore Minya. You can ask me about attractions, hotels, restaurants, or trip planning. What would you like to know?',
      chatError: 'Sorry, I encountered an error. Please try again.',

      // Footer
      poweredByAI: 'Powered by AI',

      // Actions
      clearChat: 'Clear chat history',
      newConversation: 'New conversation',
      chatTitle: 'Nefertiti',
      online: 'Online',
      souviners: 'Souviners',
      Restaurant : 'Restaurant',
      play :'Play'
    },
    ar: {
      play :'تشغيل',
      goToSlide: 'الذهاب الي الصفحة',
      linkCopied :'تم نسخ الرابط',
       copyLinkPrompt : 'نسخ الرابط' ,
       shareDefaultText : 'مشاركة النص الافتراضي',
      // Navigation
      follow :'متابعة',
       Restaurant : 'مطعم',
      hotel: 'فندق',
      home: 'الرئيسية',
      attractions: 'المعالم السياحية',
      hotels: 'الفنادق',
      restaurants: 'المطاعم',
      events: 'الفعاليات',
      itineraries: 'برامج الرحلات',
      visitorInfo: 'معلومات الزوار',
      blog: 'المدونة',
      map: 'الخريطة',
      tourguide: 'المرشد السياحي',
      tourguideSubtitle: 'اعثر على مرشدين محليين مرخصين ومترجمين وخبراء ليقودوا تجربتك في المنيا.',
      photographer: 'المصور',
      photographerSubtitle: 'مصورون محليون ومحترفون متاحون لتغطية الفعاليات والجولات وجلسات التصوير.',
      services: 'الخدمات',
      Book_A_Ticket: 'احجز تذكرة',
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
      photographers: 'المصورين',
      // Home Page
      heroTitle: 'اكتشف مصر القديمة في المنيا',
      heroSubtitle: 'استكشف الكنوز المخفية في المنيا، حيث يلتقي التاريخ القديم بجمال نهر النيل الخالد. سافر عبر آلاف السنين من التراث المصري واصنع ذكريات لا تُنسى.',
      exploreAttractions: 'استكشف المعالم',
      planYourTrip: 'خطط لرحلتك',
      featuredAttractions: 'المعالم المميزة',
  latestStories: 'مقالات',
      featuredBloggers: 'المدونون المميزون والفيديوهات',
      viewChannel: 'عرض القناة',
  // Blogger / Video fallbacks - Arabic
  videoFallbackSummary: 'مقطع قصير يبرز المعالم والنصائح المحلية.',
  readMoreOnChannel: ' اقرأ المزيد على القناة.',
      readyToExplore: 'مستعد لاستكشاف المنيا؟',
      readyToExploreDesc: 'ابدأ في التخطيط لرحلتك عبر مصر القديمة اليوم. اكتشف الكنوز التي تنتظرك في المنيا.',
      helperTitle: 'اسألني',
      helperSub: 'أنا هنا لمساعدتك في التخطيط لزيارتك',

      // Tourism info (weather) translations - Arabic
      tourism_title: 'طقس المنيا',
      tourism_weather_heading: 'طقس المنيا',
      tourism_weather_paragraph: 'المنيا تتميز بمناخ صحراوي مع قلة شديدة في الأمطار طوال العام. الصيف جاف وحار للغاية، وتتذبذب درجات الحرارة في المتوسط بين 37°C (99°F) و43°C (109.4°F). أما الشتاء فمعتدل وجاف مع متوسط درجات حرارة يتراوح بين 20°C (69.8°F) و26°C (78.8°F). يونيو هو أحر شهور المحافظة، بينما يناير هو الأبرد.',
      tourism_best_time_heading: 'أفضل وقت لزيارة المنيا',
      tourism_best_time_paragraph: 'أفضل وقت لزيارة المنيا هو من أوائل مارس إلى أواخر أبريل أو أوائل أكتوبر. خلال هذا الوقت ستجد طقساً لطيفاً ومناسباً للأنشطة الخارجية. يمكنك أيضاً السفر بين أوائل مايو ومنتصف سبتمبر للأنشطة ذات الطقس الحار. المنيا جميلة أيضاً في الشتاء من أواخر نوفمبر إلى أوائل فبراير.',
      tourism_what_to_wear_heading: 'ماذا أرتدي في المنيا',
      tourism_what_to_wear_paragraph: 'إذا سافرت إلى المنيا في الشتاء، احضري بُلُوفرات، بنطلونات أو تنانير ثقيلة، سترة، نظارات شمسية وحذاء رياضي. أما في الصيف فاحملي قُمصان قطنية، جينز، تنانير، أحذية خفيفة، صندل، واقي شمس، ملابس شاطئ ومنشفة.',
      tourism_quick_note: 'معلومة سريعة: المنيا تتميز بمناخ صحراوي؛ الصيف شديد الحرارة والشتاء لطيف. اختاري الملابس بحسب الموسم واستمتعي بالرحلة!',
      tourism_close: 'إغلاق',
      tourism_refresh: 'تحديث',
      tourism_title_short: 'الطقس',
      tourism_quick_note_title: 'معلومة سريعة',
      tourism_section_subtitle: 'أحوال الطقس الحالية ونصائح السفر المحلية في المنيا',

      // Attractions
      attractionsTitle: 'اكتشف معالم المنيا السياحية',
      attractionsSubtitle: 'استكشف العجائب القديمة والكنوز التاريخية التي أسرت الزوار لآلاف السنين',
      searchAttractions: 'البحث في المعالم السياحية...',
      allCategories: 'جميع الفئات',
      historicalSites: 'المواقع التاريخية',
      archaeologicalSites: 'المواقع الأثرية',
      ancientCities: 'المدن القديمة',
      scenicAreas: 'المناطق الطبيعية',
      Museum: 'متحف',
      Christian_religious_site: 'موقع ديني مسيحي',
      Islamic_Religious_Site: 'موقع ديني اسلامي',

      // Hotels
      hotelsTitle: 'فنادق المنيا',
      hotelsSubtitle: 'اعثر على أماكن إقامة مريحة مع إطلالات خلابة على النيل وضيافة مصرية أصيلة',
      searchHotels: 'البحث في الفنادق...',
      allStarRatings: 'جميع تصنيفات النجوم',
      allPriceRanges: 'جميع الفئات السعرية',
      budget: 'اقتصادي (أقل من 500 جنيه)',
      midRange: 'متوسط (500-1000 جنيه)',
      luxury: 'فاخر (1000+ جنيه)',
      // Hotel Details
      aboutHotel: 'عن هذا الفندق',
      roomTypes: 'أنواع الغرف',
      contact: 'معلومات الاتصال',
      bookingInformation: 'معلومات الحجز',
      starRating: 'تصنيف النجوم',
      exploreHotels: "اكتشف الفنادق",
      more: "المزيد",
      reviews: "الأراء",
      priceLuxury: "اسعار فاخرة",
      priceMid: "فئة متوسطة",
      priceBudget: "فئة اقتصادية",
      twoStars: "نجمتين",
      threeStars: "ثلاث نجوم",
      fourStars: "أربع نجوم",
      fiveStars: "خمس نجوم",

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
      // Tourguide
      languages: 'اللغات',
      call: 'اتصل',
      email: 'البريد الإلكتروني',

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
      // Blog details / generic
      about: 'حول هذا المقال',
      tags: 'الوسوم',
      postInfo: 'معلومات المقال',
      publishDate: 'تاريخ النشر',
      readTime: 'مدة القراءة',
      minutes: 'دقائق',
      author: 'المؤلف',
      loadMorePosts: 'تحميل المزيد من المقالات',
      stayUpdated: 'ابقَ على اطلاع',
      stayUpdatedDesc: 'اشترك للحصول على أحدث المقالات ونصائح السفر والأخبار مباشرة في بريدك.',
      enterEmail: 'أدخل بريدك الإلكتروني',
      Discover_Minya: 'اكتشف المنيا',
      paymentTipDesc: "وصف نصيحة الدفع",
      paymentTip: "نصيحة الدفع",
      localCuisineTipDesc: "وصف نصيحة المطبخ المحلي",
      localCuisineTip: "نصيحة المطبخ المحلي",
      reservationTipDesc: "وصف نصيحة الحجز",
      reservationTip: "نصيحة الحجز",
      diningTips: "نصائح الطعام",
      tryDifferentFilters: "جرّب مرشحات مختلفة",
      noRestaurantsFound: "لم يتم العثور على مطاعم",
      makeReservation: "إجراء حجز",
      viewMenu: "عرض القائمة",
      menuUnavailable: 'القائمة غير متوفرة',
      specialties: "التخصصات",
      restaurantsSubtitle: "عنوان فرعي للمطاعم",
      restaurantsTitle: "عنوان المطعم",
      rating: "التقييم",
      priceRange: "نطاق السعر",
      allCuisines: "جميع المطابخ",
      cuisine: "المطبخ",
      searchRestaurants: "البحث عن المطاعم",
      stars: 'النجوم',
      allRatings: 'جميع التقييمات ',
      // Navigation
      souvenirs: 'الهدايا التذكارية والتسوق',

      // Hero Section
      souvenirsTitle: 'الهدايا التذكارية والحرف اليدوية المصرية',
      souvenirsSubtitle: 'اكتشف الكنوز المصرية الأصيلة والهدايا التذكارية المصنوعة يدوياً في المنيا',

      // Categories
      shopByCategory: 'تسوق حسب الفئة',
      shops: 'محلات',

      // Filters
      filterShops: 'تصفية المحلات',
      category: 'الفئة',
      allPrices: 'جميع الأسعار',
      featuredOnly: 'المميزة فقط',
      acceptsCards: 'يقبل البطاقات',
      hasDelivery: 'يوجد توصيل',

      // Shop Sections
      featuredShops: 'المحلات المميزة',
      featured: 'مميز',
      allShops: 'جميع المحلات',

      // Shop Details
      directions: 'الاتجاهات',
      onlineStore: 'متجر إلكتروني',

      // No Results
      noShopsFound: 'لم يتم العثور على محلات',

      // Shopping Tips
      shoppingTips: 'نصائح التسوق',
      tipAuthenticity: 'تحقق من الأصالة',
      tipAuthenticityDesc: 'ابحث عن شهادات الأصالة، خاصة للبردي والمرمر والمجوهرات.',
      tipBargain: 'المساومة متوقعة',
      tipBargainDesc: 'في الأسواق التقليدية، المساومة جزء من الثقافة. ابدأ بـ 50-60٪ من السعر المطلوب.',
      tipPackaging: 'اطلب التغليف',
      tipPackagingDesc: 'اطلب تغليفاً مناسباً للعناصر الهشة مثل الفخار والزجاج لضمان السفر الآمن.',
      tipTiming: 'أفضل أوقات التسوق',
      tipTimingDesc: 'قم بزيارة المحلات في الصباح أو بعد الظهر لتجنب الازدحام والحرارة.',

      // Product Categories
      categoryHandicrafts: 'الحرف اليدوية',
      categoryJewelry: 'المجوهرات والإكسسوارات',
      categoryTextiles: 'المنسوجات والأقمشة',
      categoryPottery: 'الفخار والخزف',
      categoryPapyrus: 'البردي والفنون',
      categoryMarket: 'الأسواق التقليدية',
      categoryGallery: 'المعارض الفنية',

      // Price Ranges
      priceModerate: 'متوسط',
      pricePremium: 'فاخر',

      // Additional
      resultsCount: 'نتيجة',
      myFavorites: 'المفضلة',
      favorites: 'المفضلة',
      addToFavorites: 'إضافة للمفضلة',
      removeFromFavorites: 'إزالة من المفضلة',
      noFavorites: 'لا توجد مفضلات بعد',
      noFavoritesDesc: 'ابدأ بإضافة أماكنك وفنادقك ومطاعمك المفضلة!',
      clearAll: 'مسح الكل',
      confirmClearFavorites: 'هل أنت متأكد من مسح جميع المفضلات؟',

      // Filter Labels
      all: 'الكل',

      close: 'إغلاق',

      // Messages
      addedToFavorites: 'تمت الإضافة للمفضلة',
      removedFromFavorites: 'تمت الإزالة من المفضلة',
      favoriteAdded: 'تمت إضافة المفضلة بنجاح',
      favoriteRemoved: 'تمت إزالة المفضلة بنجاح',
      visitorGuide: 'دليل الزوار',
      ctaDescription: 'وصف دعوة العمل',
      minRead: ' مدة القراءة',
      by: ' بواسطة',
      viewAllPosts: 'عرض جميع المنشورات',
      culturalExperiences: 'تجارب ثقافية',
      tasteLocalCuisine: 'تذوق المأكولات المحلية',
      findAccommodation: 'البحث عن سكن',
      discoverAncientSites: 'اكتشاف المواقع الأثرية',

      openChat: 'فتح المحادثة',
      closeChat: 'إغلاق المحادثة',
      chatPlaceholder: 'اكتب رسالتك...',
      chatSend: 'إرسال',
      chatSending: 'جاري الارسال',


      // Small labels
      free: 'مجانا',


      // Header
      minyaTourismAssistant: 'مساعد سياحة المنيا',
      onlineNow: 'متصل الآن',

      // Welcome
      chatWelcome: 'مرحباً بك في سياحة المنيا! 👋',
      chatWelcomeDesc: 'كيف يمكنني مساعدتك في استكشاف كنوز المنيا القديمة اليوم؟',

      // Quick Actions
      showAttractions: 'أظهر المعالم السياحية',
      findHotels: 'ابحث عن فنادق',
      localRestaurants: 'المطاعم المحلية',
      planTrip: 'خطط لرحلتي',

      // Responses
      chatAttractionResponse: 'المنيا بها معالم سياحية رائعة! قم بزيارة مقابر بني حسن وتونا الجبل ومتحف أخناتون. هل تريد المزيد من التفاصيل عن أي منها؟',
      chatHotelResponse: 'لدينا العديد من الفنادق الرائعة في المنيا. يمكنني أن أريك خيارات تتراوح من الاقتصادية إلى الفاخرة. ما هو تفضيلك؟',
      chatRestaurantResponse: 'المنيا تقدم مأكولات مصرية لذيذة! جرب الأطباق المحلية المفضلة مثل الكشري والفول المدمس وسمك النيل الطازج. هل تريد توصيات للمطاعم؟',
      chatTripResponse: 'يسعدني مساعدتك في التخطيط لرحلتك! كم يوماً ستقضي في المنيا؟ سيساعدني هذا في إنشاء برنامج مثالي لك.',
      chatDefaultResponse: 'شكراً لسؤالك! أنا هنا لمساعدتك في استكشاف المنيا. يمكنك أن تسألني عن المعالم السياحية أو الفنادق أو المطاعم أو التخطيط للرحلات. ماذا تريد أن تعرف؟',
      chatError: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',

      // Footer
      poweredByAI: 'مدعوم بالذكاء الاصطناعي',

      // Actions
      clearChat: 'مسح سجل المحادثة',
      newConversation: 'محادثة جديدة',
      chatTitle: 'نفرتيتي',
      online: 'متصل الآن',
      souviners: ' هدايا تذكارية',
      chatbotNotice: 'إشعار'
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
  // في I18nService مثلاً
  setDirection(isRTL: boolean) {
    const html = document.documentElement;
    const body = document.body;

    // Set direction attribute
    html.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

    // Optional: add/remove class for targeting in CSS
    body.classList.toggle('rtl', isRTL);
    body.classList.toggle('ltr', !isRTL);
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


  pick(text: string | Record<string, string>): string {
    if (typeof text === 'string') return text; // supports legacy/plain strings
    const lang = this.getCurrentLanguage();
    return text?.[lang] ?? text?.['en'] ?? Object.values(text ?? {})[0] ?? '';
  }

  pickArray(items: Array<string | Record<string, string>>): string[] {
    return (items ?? []).map(i => this.pick(i));
  }

}
