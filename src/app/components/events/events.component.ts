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
  template: `
    <div class="events-page" [attr.dir]="i18nService.isRTL() ? 'rtl' : 'ltr'">
      <!-- Hero Section -->
      <section class="events-hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">{{ getTranslation('eventsTitle') }}</h1>
            <p class="hero-subtitle">{{ getTranslation('eventsSubtitle') }}</p>
          </div>
        </div>
      </section>

      <!-- Filters Section -->
      <section class="events-filters">
        <div class="container">
          <div class="filters-header">
            <h3>{{ getTranslation('findEvents') }}</h3>
          </div>
          
          <div class="filters-grid">
            <div class="filter-group">
              <label>{{ getTranslation('category') }}</label>
              <select [(ngModel)]="selectedCategory" (change)="filterEvents()" class="filter-select">
                <option value="">{{ getTranslation('allCategories') }}</option>
                <option *ngFor="let category of eventCategories" [value]="category.key">
                  {{ i18nService.isRTL() ? category.nameAr : category.name }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <label>{{ getTranslation('dateRange') }}</label>
              <select [(ngModel)]="selectedDateRange" (change)="filterEvents()" class="filter-select">
                <option value="">{{ getTranslation('allDates') }}</option>
                <option value="today">{{ getTranslation('today') }}</option>
                <option value="this-week">{{ getTranslation('thisWeek') }}</option>
                <option value="this-month">{{ getTranslation('thisMonth') }}</option>
                <option value="upcoming">{{ getTranslation('upcoming') }}</option>
              </select>
            </div>

            <div class="filter-group">
              <label>{{ getTranslation('priceRange') }}</label>
              <select [(ngModel)]="selectedPriceRange" (change)="filterEvents()" class="filter-select">
                <option value="">{{ getTranslation('allPrices') }}</option>
                <option value="free">{{ getTranslation('freeEvents') }}</option>
                <option value="paid">{{ getTranslation('paidEvents') }}</option>
              </select>
            </div>

            <button class="btn btn-secondary" (click)="clearFilters()">
              {{ i18nService.translate('clearFilters') }}
            </button>
          </div>
        </div>
      </section>

      <!-- Featured Events -->
      <section class="featured-events" *ngIf="featuredEvents.length > 0">
        <div class="container">
          <h2 class="section-title">{{ getTranslation('featuredEvents') }}</h2>
          <div class="featured-grid">
            <div 
              *ngFor="let event of featuredEvents" 
              class="featured-event-card"
              [class.rtl]="i18nService.isRTL()"
            >
              <div class="event-image">
                <img [src]="event.image" [alt]="i18nService.isRTL() ? event.titleAr : event.title">
                <div class="event-date-badge">
                  <div class="date-day">{{ formatDay(event.date) }}</div>
                  <div class="date-month">{{ formatMonth(event.date) }}</div>
                </div>
                <div class="event-category-badge">
                  {{ i18nService.isRTL() ? event.categoryAr : event.category }}
                </div>
              </div>
              
              <div class="event-content">
                <h3 class="event-title">
                  {{ i18nService.isRTL() ? event.titleAr : event.title }}
                </h3>
                
                <p class="event-description">
                  {{ i18nService.isRTL() ? event.descriptionAr : event.description }}
                </p>
                
                <div class="event-details">
                  <div class="detail-item">
                    <span class="material-icons">schedule</span>
                    <span>{{ i18nService.isRTL() ? event.timeAr : event.time }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="material-icons">location_on</span>
                    <span>{{ i18nService.isRTL() ? event.locationAr : event.location }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="material-icons">confirmation_number</span>
                    <span>{{ i18nService.isRTL() ? event.priceAr : event.price }}</span>
                  </div>
                </div>
                
                <div class="event-actions">
                  <button class="btn btn-primary" (click)="viewEventDetails(event)">
                    {{ getTranslation('viewDetails') }}
                  </button>
                  <button class="btn btn-accent" (click)="registerForEvent(event)" *ngIf="event.registrationRequired">
                    {{ getTranslation('register') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- All Events -->
      <section class="all-events">
        <div class="container">
          <h2 class="section-title">{{ getTranslation('allEvents') }}</h2>
          
          <div class="events-grid">
            <div 
              *ngFor="let event of filteredEvents" 
              class="event-card"
              [class.rtl]="i18nService.isRTL()"
            >
              <div class="event-image">
                <img [src]="event.image" [alt]="i18nService.isRTL() ? event.titleAr : event.title">
                <div class="event-date-badge">
                  <div class="date-day">{{ formatDay(event.date) }}</div>
                  <div class="date-month">{{ formatMonth(event.date) }}</div>
                </div>
              </div>
              
              <div class="event-content">
                <div class="event-header">
                  <div class="event-category">
                    {{ i18nService.isRTL() ? event.categoryAr : event.category }}
                  </div>
                  <div class="event-price">
                    {{ i18nService.isRTL() ? event.priceAr : event.price }}
                  </div>
                </div>
                
                <h3 class="event-title">
                  {{ i18nService.isRTL() ? event.titleAr : event.title }}
                </h3>
                
                <p class="event-description">
                  {{ i18nService.isRTL() ? event.descriptionAr : event.description }}
                </p>
                
                <div class="event-meta">
                  <div class="meta-item">
                    <span class="material-icons">schedule</span>
                    <span>{{ i18nService.isRTL() ? event.timeAr : event.time }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="material-icons">location_on</span>
                    <span>{{ i18nService.isRTL() ? event.locationAr : event.location }}</span>
                  </div>
                  <div class="meta-item" *ngIf="event.organizer">
                    <span class="material-icons">person</span>
                    <span>{{ i18nService.isRTL() ? event.organizerAr : event.organizer }}</span>
                  </div>
                </div>
                
                <div class="event-features" *ngIf="event.features.length > 0">
                  <span 
                    *ngFor="let feature of (i18nService.isRTL() ? event.featuresAr : event.features)" 
                    class="feature-tag"
                  >
                    {{ feature }}
                  </span>
                </div>
                
                <div class="event-actions">
                  <button class="btn btn-primary" (click)="viewEventDetails(event)">
                    {{ getTranslation('viewDetails') }}
                  </button>
                  <button class="btn btn-secondary" (click)="addToCalendar(event)">
                    {{ getTranslation('addToCalendar') }}
                  </button>
                  <button class="btn btn-accent" (click)="registerForEvent(event)" *ngIf="event.registrationRequired">
                    {{ getTranslation('register') }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- No Results -->
          <div *ngIf="filteredEvents.length === 0" class="no-results">
            <div class="no-results-content">
              <span class="material-icons">event</span>
              <h3>{{ getTranslation('noEventsFound') }}</h3>
              <p>{{ getTranslation('tryDifferentFilters') }}</p>
              <button class="btn btn-primary" (click)="clearFilters()">
                {{ i18nService.translate('clearFilters') }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Event Tips -->
      <section class="event-tips">
        <div class="container">
          <h2 class="section-title">{{ getTranslation('eventTips') }}</h2>
          <div class="tips-grid">
            <div class="tip-card" [class.rtl]="i18nService.isRTL()">
              <div class="tip-icon">
                <span class="material-icons">schedule</span>
              </div>
              <h3>{{ getTranslation('planAhead') }}</h3>
              <p>{{ getTranslation('planAheadDesc') }}</p>
            </div>
            <div class="tip-card" [class.rtl]="i18nService.isRTL()">
              <div class="tip-icon">
                <span class="material-icons">confirmation_number</span>
              </div>
              <h3>{{ getTranslation('bookEarly') }}</h3>
              <p>{{ getTranslation('bookEarlyDesc') }}</p>
            </div>
            <div class="tip-card" [class.rtl]="i18nService.isRTL()">
              <div class="tip-icon">
                <span class="material-icons">info</span>
              </div>
              <h3>{{ getTranslation('checkDetails') }}</h3>
              <p>{{ getTranslation('checkDetailsDesc') }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .events-page {
      min-height: 100vh;
      padding-top: 80px;
    }

    .events-hero {
      background: var(--secondary-gradient);
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

    .events-filters {
      background: white;
      padding: 2rem 0;
      border-bottom: 1px solid var(--border-color);
    }

    .filters-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .filters-header h3 {
      color: var(--text-primary);
      font-size: 1.5rem;
    }

    .filters-grid {
      display: flex;
      gap: 1.5rem;
      align-items: end;
      justify-content: center;
      flex-wrap: wrap;
    }

    [dir="rtl"] .filters-grid {
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

    .featured-events {
      padding: 4rem 0;
      background: var(--background-color);
    }

    .featured-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .featured-event-card {
      background: white;
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      transition: all var(--transition-normal);
    }

    .featured-event-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-xl);
    }

    .all-events {
      padding: 4rem 0;
    }

    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .event-card {
      background: white;
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
    }

    .event-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .event-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .event-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-normal);
    }

    .event-card:hover .event-image img,
    .featured-event-card:hover .event-image img {
      transform: scale(1.05);
    }

    .event-date-badge {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: var(--primary-color);
      color: white;
      padding: 0.75rem;
      border-radius: var(--radius-md);
      text-align: center;
      min-width: 60px;
    }

    .event-card.rtl .event-date-badge,
    .featured-event-card.rtl .event-date-badge {
      left: auto;
      right: 1rem;
    }

    .date-day {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1;
    }

    .date-month {
      font-size: 0.75rem;
      text-transform: uppercase;
      opacity: 0.9;
    }

    .event-category-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: var(--accent-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-full);
      font-size: 0.875rem;
      font-weight: 500;
    }

    .featured-event-card.rtl .event-category-badge {
      right: auto;
      left: 1rem;
    }

    .event-content {
      padding: 1.5rem;
    }

    .event-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .event-card.rtl .event-header {
      flex-direction: row-reverse;
    }

    .event-category {
      background: var(--background-color);
      color: var(--primary-color);
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      font-weight: 500;
    }

    .event-price {
      font-weight: 600;
      color: var(--accent-color);
      font-size: 0.9rem;
    }

    .event-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1rem;
      line-height: 1.4;
    }

    .featured-event-card .event-title {
      font-size: 1.5rem;
    }

    .event-description {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .event-details,
    .event-meta {
      margin-bottom: 1.5rem;
    }

    .detail-item,
    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .event-card.rtl .detail-item,
    .event-card.rtl .meta-item,
    .featured-event-card.rtl .detail-item,
    .featured-event-card.rtl .meta-item {
      flex-direction: row-reverse;
    }

    .detail-item .material-icons,
    .meta-item .material-icons {
      font-size: 1.1rem;
      color: var(--primary-color);
    }

    .event-features {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .event-card.rtl .event-features,
    .featured-event-card.rtl .event-features {
      flex-direction: row-reverse;
    }

    .feature-tag {
      background: var(--golden-sand);
      color: var(--primary-color);
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      font-weight: 500;
    }

    .event-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .event-card.rtl .event-actions,
    .featured-event-card.rtl .event-actions {
      flex-direction: row-reverse;
    }

    .event-actions .btn {
      flex: 1;
      min-width: 100px;
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
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

    .event-tips {
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
      background: var(--secondary-gradient);
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

      .filters-grid {
        flex-direction: column;
        align-items: stretch;
      }

      .filter-group {
        width: 100%;
      }

      .filter-select {
        min-width: auto;
      }

      .featured-grid {
        grid-template-columns: 1fr;
      }

      .events-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .event-actions {
        flex-direction: column;
      }

      .event-actions .btn {
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

      .event-content {
        padding: 1rem;
      }

      .event-actions .btn {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
      }
    }
  `]
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  featuredEvents: Event[] = [];
  selectedCategory = '';
  selectedDateRange = '';
  selectedPriceRange = '';

  eventCategories = [
    { key: 'cultural', name: 'Cultural Events', nameAr: 'فعاليات ثقافية' },
    { key: 'festivals', name: 'Festivals', nameAr: 'مهرجانات' },
    { key: 'religious', name: 'Religious Events', nameAr: 'فعاليات دينية' },
    { key: 'educational', name: 'Educational', nameAr: 'تعليمية' },
    { key: 'entertainment', name: 'Entertainment', nameAr: 'ترفيهية' },
    { key: 'sports', name: 'Sports', nameAr: 'رياضية' }
  ];

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
      const matchesCategory = this.selectedCategory === '' || 
        event.category.toLowerCase().includes(this.selectedCategory.toLowerCase());

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
    const months = this.i18nService.getCurrentLanguage() === 'ar' ? 
      ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'] :
      ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
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
