import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../services/i18n.service';
import { TourismService } from '../../services/tourism.service';

interface Event {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  categoryAr: string;
  date: Date;
  endDate?: Date;
  time: string;
  timeAr: string;
  location: string;
  locationAr: string;
  price: string;
  priceAr: string;
  image: string;
  organizer: string;
  organizerAr: string;
  features: string[];
  featuresAr: string[];
  isFeatured: boolean;
  isRecurring: boolean;
  registrationRequired: boolean;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  eventCategories = [
    { key: 'cultural', name: 'Cultural Events', nameAr: 'فعاليات ثقافية' },
    { key: 'festivals', name: 'Festivals', nameAr: 'مهرجانات' },
    { key: 'religious', name: 'Religious Events', nameAr: 'فعاليات دينية' },
    { key: 'educational', name: 'Educational', nameAr: 'تعليمية' },
    { key: 'entertainment', name: 'Entertainment', nameAr: 'ترفيهية' },
    { key: 'sports', name: 'Sports', nameAr: 'رياضية' }
  ];
  events: Event[] = [];
  filteredEvents: Event[] = [];
  featuredEvents: Event[] = [];
  selectedCategory = '';
  selectedDateRange = '';
  selectedPriceRange = '';

  private translations: Record<string, Record<string, string>> = {
    en: {
      eventsTitle: 'Events & Festivals in Minya',
      eventsSubtitle: 'Discover cultural celebrations, festivals, and special events that showcase Minya\'s rich heritage',
      findEvents: 'Find Events',
      category: 'Category',
      allCategories: 'All Categories',
      dateRange: 'Date Range',
      allDates: 'All Dates',
      today: 'Today',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      upcoming: 'Upcoming',
      allPrices: 'All Prices',
      freeEvents: 'Free Events',
      paidEvents: 'Paid Events',
      featuredEvents: 'Featured Events',
      allEvents: 'All Events',
      viewDetails: 'View Details',
      register: 'Register',
      addToCalendar: 'Add to Calendar',
      noEventsFound: 'No events found',
      tryDifferentFilters: 'Try different filters or check back later for new events',
      eventTips: 'Event Tips',
      planAhead: 'Plan Ahead',
      planAheadDesc: 'Check event schedules and plan your visit to make the most of cultural celebrations',
      bookEarly: 'Book Early',
      bookEarlyDesc: 'Popular events fill up quickly, especially during festival seasons',
      checkDetails: 'Check Details',
      checkDetailsDesc: 'Verify event times, locations, and any special requirements before attending'
    },
    ar: {
      eventsTitle: 'الفعاليات والمهرجانات في المنيا',
      eventsSubtitle: 'اكتشف الاحتفالات الثقافية والمهرجانات والفعاليات الخاصة التي تعرض التراث الغني للمنيا',
      findEvents: 'البحث عن الفعاليات',
      category: 'الفئة',
      allCategories: 'جميع الفئات',
      dateRange: 'نطاق التاريخ',
      allDates: 'جميع التواريخ',
      today: 'اليوم',
      thisWeek: 'هذا الأسبوع',
      thisMonth: 'هذا الشهر',
      upcoming: 'القادمة',
      allPrices: 'جميع الأسعار',
      freeEvents: 'فعاليات مجانية',
      paidEvents: 'فعاليات مدفوعة',
      featuredEvents: 'الفعاليات المميزة',
      allEvents: 'جميع الفعاليات',
      viewDetails: 'عرض التفاصيل',
      register: 'التسجيل',
      addToCalendar: 'إضافة للتقويم',
      noEventsFound: 'لم يتم العثور على فعاليات',
      tryDifferentFilters: 'جرب مرشحات مختلفة أو تحقق لاحقاً من الفعاليات الجديدة',
      eventTips: 'نصائح الفعاليات',
      planAhead: 'خطط مسبقاً',
      planAheadDesc: 'تحقق من جداول الفعاليات وخطط لزيارتك للاستفادة القصوى من الاحتفالات الثقافية',
      bookEarly: 'احجز مبكراً',
      bookEarlyDesc: 'الفعاليات الشعبية تمتلئ بسرعة، خاصة خلال مواسم المهرجانات',
      checkDetails: 'تحقق من التفاصيل',
      checkDetailsDesc: 'تأكد من أوقات الفعاليات والمواقع وأي متطلبات خاصة قبل الحضور'
    }
  };

  constructor(
    public i18nService: I18nService,
    private tourismService: TourismService
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  getTranslation(key: string): string {
    const currentLang = this.i18nService.getCurrentLanguage();
    return this.translations[currentLang]?.[key] || this.translations['en'][key] || key;
  }

  private loadEvents() {
    this.events = [
      {
        id: '1',
        title: 'Minya Heritage Festival',
        titleAr: 'مهرجان تراث المنيا',
        description: 'Annual celebration of Minya\'s rich cultural heritage with traditional music, dance, and crafts',
        descriptionAr: 'احتفال سنوي بالتراث الثقافي الغني للمنيا مع الموسيقى والرقص والحرف التقليدية',
        category: 'Cultural Events',
        categoryAr: 'فعاليات ثقافية',
        date: new Date('2024-03-15'),
        endDate: new Date('2024-03-17'),
        time: '6:00 PM - 11:00 PM',
        timeAr: '6:00 مساءً - 11:00 مساءً',
        location: 'Minya Cultural Center',
        locationAr: 'مركز المنيا الثقافي',
        price: 'Free Entry',
        priceAr: 'دخول مجاني',
        image: '/assets/images/pattern_bg.png',
        organizer: 'Minya Cultural Authority',
        organizerAr: 'هيئة الثقافة بالمنيا',
        features: ['Live Music', 'Traditional Crafts', 'Food Stalls', 'Family Friendly'],
        featuresAr: ['موسيقى حية', 'حرف تقليدية', 'أكشاك طعام', 'مناسب للعائلات'],
        isFeatured: true,
        isRecurring: true,
        registrationRequired: false
      },
      {
        id: '2',
        title: 'Nile River Boat Festival',
        titleAr: 'مهرجان قوارب النيل',
        description: 'Traditional felucca boat races and water sports celebration along the Nile',
        descriptionAr: 'سباقات القوارب الشراعية التقليدية واحتفال الرياضات المائية على طول النيل',
        category: 'Festivals',
        categoryAr: 'مهرجانات',
        date: new Date('2024-04-20'),
        time: '9:00 AM - 6:00 PM',
        timeAr: '9:00 صباحاً - 6:00 مساءً',
        location: 'Nile Corniche',
        locationAr: 'كورنيش النيل',
        price: '50 EGP',
        priceAr: '50 جنيه مصري',
        image: '/assets/images/nile_boats.jpg',
        organizer: 'Minya Sports Club',
        organizerAr: 'نادي المنيا الرياضي',
        features: ['Boat Races', 'Water Sports', 'River Views', 'Competitions'],
        featuresAr: ['سباقات القوارب', 'رياضات مائية', 'إطلالات النهر', 'مسابقات'],
        isFeatured: true,
        isRecurring: false,
        registrationRequired: true
      },
      {
        id: '3',
        title: 'Ancient Egypt Lecture Series',
        titleAr: 'سلسلة محاضرات مصر القديمة',
        description: 'Educational lectures by renowned archaeologists about Minya\'s ancient history',
        descriptionAr: 'محاضرات تعليمية من قبل علماء آثار مشهورين حول تاريخ المنيا القديم',
        category: 'Educational',
        categoryAr: 'تعليمية',
        date: new Date('2024-02-10'),
        time: '7:00 PM - 9:00 PM',
        timeAr: '7:00 مساءً - 9:00 مساءً',
        location: 'Minya University Auditorium',
        locationAr: 'قاعة جامعة المنيا',
        price: '30 EGP',
        priceAr: '30 جنيه مصري',
        image: '/assets/images/beni_hassan.webp',
        organizer: 'Minya University',
        organizerAr: 'جامعة المنيا',
        features: ['Expert Speakers', 'Q&A Session', 'Educational Materials', 'Certificate'],
        featuresAr: ['متحدثون خبراء', 'جلسة أسئلة وأجوبة', 'مواد تعليمية', 'شهادة'],
        isFeatured: false,
        isRecurring: true,
        registrationRequired: true
      }
    ];
    this.filteredEvents = this.events;
    this.featuredEvents = this.events.filter(event => event.isFeatured);
  }

  filterEvents() {
    this.filteredEvents = this.events.filter(event => {
      const matchesCategory = this.selectedCategory === '' || event.category.toLowerCase().includes(this.selectedCategory.toLowerCase());
      const matchesDateRange = this.selectedDateRange === '' || this.checkDateRange(event.date);
      const matchesPriceRange = this.selectedPriceRange === '' || this.checkPriceRange(event.price);
      return matchesCategory && matchesDateRange && matchesPriceRange;
    });
  }

  private checkDateRange(eventDate: Date): boolean {
    const today = new Date();
    const eventDay = new Date(eventDate);
    switch (this.selectedDateRange) {
      case 'today':
        return eventDay.toDateString() === today.toDateString();
      case 'this-week':
        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        return eventDay >= today && eventDay <= weekFromNow;
      case 'this-month':
        return eventDay.getMonth() === today.getMonth() && eventDay.getFullYear() === today.getFullYear();
      case 'upcoming':
        return eventDay >= today;
      default:
        return true;
    }
  }

  private checkPriceRange(price: string): boolean {
    switch (this.selectedPriceRange) {
      case 'free':
        return price.toLowerCase().includes('free') || price.toLowerCase().includes('مجاني');
      case 'paid':
        return !price.toLowerCase().includes('free') && !price.toLowerCase().includes('مجاني');
      default:
        return true;
    }
  }

  clearFilters() {
    this.selectedCategory = '';
    this.selectedDateRange = '';
    this.selectedPriceRange = '';
    this.filteredEvents = this.events;
  }

  formatDay(date: Date): string {
    return date.getDate().toString();
  }

  formatMonth(date: Date): string {
    const months = this.i18nService.getCurrentLanguage() === 'ar' ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'] : ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return months[date.getMonth()];
  }

  viewEventDetails(event: Event) {
    console.log('Viewing details for:', event.title);
  }

  registerForEvent(event: Event) {
    console.log('Registering for:', event.title);
  }

  addToCalendar(event: Event) {
    console.log('Adding to calendar:', event.title);
  }
}
