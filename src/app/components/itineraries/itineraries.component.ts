import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../services/i18n.service';
import { TourismService } from '../../services/tourism.service';

interface Itinerary {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  duration: string;
  durationAr: string;
  difficulty: string;
  difficultyAr: string;
  price: string;
  priceAr: string;
  image: string;
  highlights: string[];
  highlightsAr: string[];
  includes: string[];
  includesAr: string[];
  excludes: string[];
  excludesAr: string[];
  bestTime: string;
  bestTimeAr: string;
  groupSize: string;
  groupSizeAr: string;
  isFeatured: boolean;
  category: string;
  categoryAr: string;
}


@Component({
  selector: 'app-itineraries',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],

  templateUrl: './itineraries.component.html',
  styleUrl: './itineraries.component.scss'
})
export class  ItinerariesComponent implements OnInit {
  itineraries: Itinerary[] = [];
  filteredItineraries: Itinerary[] = [];
  featuredItineraries: Itinerary[] = [];
  selectedDuration = '';
  selectedDifficulty = '';
  selectedPriceRange = '';

  private translations: Record<string, Record<string, string>> = {
    en: {
      itinerariesTitle: 'Travel Itineraries for Minya',
      itinerariesSubtitle: 'Carefully crafted travel plans to help you explore Minya\'s ancient wonders and cultural treasures',
      findItinerary: 'Find Your Perfect Itinerary',
      duration: 'Duration',
      allDurations: 'All Durations',
      oneDay: '1 Day',
      twoDays: '2-3 Days',
      weekLong: '4-7 Days',
      difficulty: 'Difficulty',
      allDifficulties: 'All Difficulties',
      easy: 'Easy',
      moderate: 'Moderate',
      challenging: 'Challenging',
      allPrices: 'All Prices',
      budget: 'Budget',
      midRange: 'Mid-Range',
      luxury: 'Luxury',
      featuredItineraries: 'Featured Itineraries',
      allItineraries: 'All Itineraries',
      highlights: 'Highlights',
      viewDetails: 'View Details',
      bookNow: 'Book Now',
      download: 'Download',
      noItinerariesFound: 'No itineraries found',
      tryDifferentFilters: 'Try different filters to find your perfect travel plan',
      customItinerary: 'Create Custom Itinerary',
      customItineraryDesc: 'Need something unique? Let our experts create a personalized itinerary just for you',
      personalizedPlanning: 'Personalized Planning',
      flexibleSchedule: 'Flexible Schedule',
      expertGuidance: 'Expert Guidance',
      createCustomItinerary: 'Create Custom Itinerary',
      planningTips: 'Planning Tips',
      bestTimeToVisit: 'Best Time to Visit',
      bestTimeToVisitDesc: 'October to April offers the most comfortable weather for exploring ancient sites',
      whatToPack: 'What to Pack',
      whatToPackDesc: 'Comfortable walking shoes, sun protection, and layers for temperature changes',
      budgetPlanning: 'Budget Planning',
      budgetPlanningDesc: 'Plan for entrance fees, meals, transportation, and optional guide services'
    },
    ar: {
      itinerariesTitle: 'برامج سياحية للمنيا',
      itinerariesSubtitle: 'خطط سفر مصممة بعناية لمساعدتك على استكشاف عجائب المنيا القديمة وكنوزها الثقافية',
      findItinerary: 'اعثر على البرنامج المثالي',
      duration: 'المدة',
      allDurations: 'جميع المدد',
      oneDay: 'يوم واحد',
      twoDays: '2-3 أيام',
      weekLong: '4-7 أيام',
      difficulty: 'الصعوبة',
      allDifficulties: 'جميع المستويات',
      easy: 'سهل',
      moderate: 'متوسط',
      challenging: 'صعب',
      allPrices: 'جميع الأسعار',
      budget: 'اقتصادي',
      midRange: 'متوسط',
      luxury: 'فاخر',
      featuredItineraries: 'البرامج المميزة',
      allItineraries: 'جميع البرامج',
      highlights: 'أبرز المعالم',
      viewDetails: 'عرض التفاصيل',
      bookNow: 'احجز الآن',
      download: 'تحميل',
      noItinerariesFound: 'لم يتم العثور على برامج',
      tryDifferentFilters: 'جرب مرشحات مختلفة للعثور على خطة السفر المثالية',
      customItinerary: 'إنشاء برنامج مخصص',
      customItineraryDesc: 'تحتاج شيئاً فريداً؟ دع خبراءنا ينشئون برنامجاً شخصياً مخصصاً لك',
      personalizedPlanning: 'تخطيط شخصي',
      flexibleSchedule: 'جدول مرن',
      expertGuidance: 'إرشاد خبير',
      createCustomItinerary: 'إنشاء برنامج مخصص',
      planningTips: 'نصائح التخطيط',
      bestTimeToVisit: 'أفضل وقت للزيارة',
      bestTimeToVisitDesc: 'من أكتوبر إلى أبريل يوفر أكثر الأجواء راحة لاستكشاف المواقع الأثرية',
      whatToPack: 'ما تحتاج لحزمه',
      whatToPackDesc: 'أحذية مشي مريحة، حماية من الشمس، وطبقات ملابس لتغيرات درجة الحرارة',
      budgetPlanning: 'تخطيط الميزانية',
      budgetPlanningDesc: 'خطط لرسوم الدخول والوجبات والنقل وخدمات الدليل الاختيارية'
    }
  };

  constructor(
    public i18nService: I18nService,
    private tourismService: TourismService
  ) {}

  ngOnInit() {
    this.loadItineraries();
  }

  getTranslation(key: string): string {
    const currentLang = this.i18nService.getCurrentLanguage();
    return this.translations[currentLang]?.[key] || this.translations['en'][key] || key;
  }

  private loadItineraries() {
    this.itineraries = [
      {
        id: '1',
        title: 'Ancient Minya Discovery - 3 Days',
        titleAr: 'اكتشاف المنيا القديمة - 3 أيام',
        description: 'Explore the most significant archaeological sites of Minya including Beni Hassan tombs, Tell el-Amarna, and Tuna el-Gebel',
        descriptionAr: 'استكشف أهم المواقع الأثرية في المنيا بما في ذلك مقابر بني حسن وتل العمارنة وطونة الجبل',
        duration: '3 Days / 2 Nights',
        durationAr: '3 أيام / ليلتان',
        difficulty: 'Moderate',
        difficultyAr: 'متوسط',
        price: 'From $150 per person',
        priceAr: 'من 150 دولار للشخص',
        image: '/assets/images/beni_hassan.webp',
        highlights: ['Beni Hassan Tombs', 'Tell el-Amarna', 'Tuna el-Gebel', 'Nile River Views'],
        highlightsAr: ['مقابر بني حسن', 'تل العمارنة', 'طونة الجبل', 'إطلالات نهر النيل'],
        includes: ['Accommodation', 'Transportation', 'Guide', 'Entrance Fees'],
        includesAr: ['الإقامة', 'النقل', 'المرشد', 'رسوم الدخول'],
        excludes: ['Meals', 'Personal Expenses', 'Tips'],
        excludesAr: ['الوجبات', 'المصروفات الشخصية', 'البقشيش'],
        bestTime: 'October - April',
        bestTimeAr: 'أكتوبر - أبريل',
        groupSize: '2-15 people',
        groupSizeAr: '2-15 شخص',
        isFeatured: true,
        category: 'Archaeological',
        categoryAr: 'أثري'
      },
      {
        id: '2',
        title: 'Nile River Experience - 1 Day',
        titleAr: 'تجربة نهر النيل - يوم واحد',
        description: 'A relaxing day cruise along the Nile with traditional felucca sailing and riverside dining',
        descriptionAr: 'رحلة نهارية مريحة على النيل مع الإبحار بالفلوكة التقليدية وتناول الطعام على ضفة النهر',
        duration: '1 Day',
        durationAr: 'يوم واحد',
        difficulty: 'Easy',
        difficultyAr: 'سهل',
        price: 'From $75 per person',
        priceAr: 'من 75 دولار للشخص',
        image: '/assets/images/nile_boats.jpg',
        highlights: ['Felucca Sailing', 'Nile Views', 'Traditional Lunch', 'Sunset Cruise'],
        highlightsAr: ['الإبحار بالفلوكة', 'إطلالات النيل', 'غداء تقليدي', 'رحلة الغروب'],
        includes: ['Felucca Boat', 'Lunch', 'Guide', 'Refreshments'],
        includesAr: ['قارب الفلوكة', 'الغداء', 'المرشد', 'المرطبات'],
        excludes: ['Transportation to/from hotel', 'Personal Expenses'],
        excludesAr: ['النقل من وإلى الفندق', 'المصروفات الشخصية'],
        bestTime: 'Year Round',
        bestTimeAr: 'على مدار السنة',
        groupSize: '2-20 people',
        groupSizeAr: '2-20 شخص',
        isFeatured: true,
        category: 'Nature & River',
        categoryAr: 'طبيعة ونهر'
      },
      {
        id: '3',
        title: 'Cultural Heritage Tour - 5 Days',
        titleAr: 'جولة التراث الثقافي - 5 أيام',
        description: 'Comprehensive exploration of Minya\'s cultural heritage including museums, traditional crafts, and local communities',
        descriptionAr: 'استكشاف شامل للتراث الثقافي للمنيا بما في ذلك المتاحف والحرف التقليدية والمجتمعات المحلية',
        duration: '5 Days / 4 Nights',
        durationAr: '5 أيام / 4 ليالي',
        difficulty: 'Easy',
        difficultyAr: 'سهل',
        price: 'From $300 per person',
        priceAr: 'من 300 دولار للشخص',
        image: '/assets/images/pattern_bg.png',
        highlights: ['Museums', 'Traditional Crafts', 'Local Markets', 'Cultural Performances'],
        highlightsAr: ['المتاحف', 'الحرف التقليدية', 'الأسواق المحلية', 'العروض الثقافية'],
        includes: ['4-star Accommodation', 'All Meals', 'Transportation', 'Guide', 'Activities'],
        includesAr: ['إقامة 4 نجوم', 'جميع الوجبات', 'النقل', 'المرشد', 'الأنشطة'],
        excludes: ['International Flights', 'Visa Fees', 'Personal Shopping'],
        excludesAr: ['الطيران الدولي', 'رسوم التأشيرة', 'التسوق الشخصي'],
        bestTime: 'November - March',
        bestTimeAr: 'نوفمبر - مارس',
        groupSize: '4-12 people',
        groupSizeAr: '4-12 شخص',
        isFeatured: false,
        category: 'Cultural',
        categoryAr: 'ثقافي'
      }
    ];

    this.filteredItineraries = this.itineraries;
    this.featuredItineraries = this.itineraries.filter(itinerary => itinerary.isFeatured);
  }

  filterItineraries() {
    this.filteredItineraries = this.itineraries.filter(itinerary => {
      const matchesDuration = this.selectedDuration === '' || this.checkDuration(itinerary.duration);
      const matchesDifficulty = this.selectedDifficulty === '' || 
        itinerary.difficulty.toLowerCase().includes(this.selectedDifficulty.toLowerCase());
      const matchesPriceRange = this.selectedPriceRange === '' || this.checkPriceRange(itinerary.price);

      return matchesDuration && matchesDifficulty && matchesPriceRange;
    });
  }

  private checkDuration(duration: string): boolean {
    switch (this.selectedDuration) {
      case '1-day':
        return duration.toLowerCase().includes('1 day');
      case '2-3-days':
        return duration.toLowerCase().includes('2') || duration.toLowerCase().includes('3');
      case '4-7-days':
        return duration.toLowerCase().includes('4') || duration.toLowerCase().includes('5') || 
               duration.toLowerCase().includes('6') || duration.toLowerCase().includes('7');
      default:
        return true;
    }
  }

  private checkPriceRange(price: string): boolean {
    const priceNumber = parseInt(price.match(/\d+/)?.[0] || '0');
    switch (this.selectedPriceRange) {
      case 'budget':
        return priceNumber < 100;
      case 'mid-range':
        return priceNumber >= 100 && priceNumber <= 250;
      case 'luxury':
        return priceNumber > 250;
      default:
        return true;
    }
  }

  clearFilters() {
    this.selectedDuration = '';
    this.selectedDifficulty = '';
    this.selectedPriceRange = '';
    this.filteredItineraries = this.itineraries;
  }

  viewItinerary(itinerary: Itinerary) {
    console.log('Viewing itinerary:', itinerary.title);
  }

  bookItinerary(itinerary: Itinerary) {
    console.log('Booking itinerary:', itinerary.title);
  }

  downloadItinerary(itinerary: Itinerary) {
    console.log('Downloading itinerary:', itinerary.title);
  }
}
