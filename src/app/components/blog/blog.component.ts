import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { TourismService } from '../../services/tourism.service';

interface BlogPost {
  id: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  author: string;
  authorAr: string;
  date: Date;
  category: string;
  categoryAr: string;
  image: string;
  readTime: number;
  tags: string[];
  tagsAr: string[];
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="blog-page" [attr.dir]="i18nService.isRTL() ? 'rtl' : 'ltr'">
      <!-- Hero Section -->
      <section class="blog-hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">{{ i18nService.translate('blogTitle') }}</h1>
            <p class="hero-subtitle">{{ i18nService.translate('blogSubtitle') }}</p>
          </div>
        </div>
      </section>

      <!-- Blog Content -->
      <section class="blog-content">
        <div class="container">
          <!-- Categories Filter -->
          <div class="blog-filters">
            <h3>{{ i18nService.translate('categories') }}</h3>
            <div class="filter-buttons">
              <button 
                *ngFor="let category of categories" 
                class="filter-btn"
                [class.active]="selectedCategory === category.key"
                (click)="filterByCategory(category.key)"
              >
                {{ i18nService.isRTL() ? category.nameAr : category.name }}
              </button>
            </div>
          </div>

          <!-- Blog Posts Grid -->
          <div class="blog-grid">
            <article 
              *ngFor="let post of filteredPosts" 
              class="blog-card"
              [class.rtl]="i18nService.isRTL()"
            >
              <div class="blog-image">
                <img [src]="post.image" [alt]="i18nService.isRTL() ? post.titleAr : post.title">
                <div class="blog-category">
                  {{ i18nService.isRTL() ? post.categoryAr : post.category }}
                </div>
              </div>
              
              <div class="blog-content-card">
                <div class="blog-meta">
                  <span class="blog-author">
                    <span class="material-icons">person</span>
                    {{ i18nService.isRTL() ? post.authorAr : post.author }}
                  </span>
                  <span class="blog-date">
                    <span class="material-icons">schedule</span>
                    {{ i18nService.formatDate(post.date) }}
                  </span>
                  <span class="blog-read-time">
                    <span class="material-icons">access_time</span>
                    {{ post.readTime }} {{ i18nService.translate('minutesRead') }}
                  </span>
                </div>
                
                <h3 class="blog-title">
                  {{ i18nService.isRTL() ? post.titleAr : post.title }}
                </h3>
                
                <p class="blog-excerpt">
                  {{ i18nService.isRTL() ? post.excerptAr : post.excerpt }}
                </p>
                
                <div class="blog-tags">
                  <span 
                    *ngFor="let tag of (i18nService.isRTL() ? post.tagsAr : post.tags)" 
                    class="blog-tag"
                  >
                    #{{ tag }}
                  </span>
                </div>
                
                <div class="blog-actions">
                  <button class="btn btn-primary" (click)="readPost(post)">
                    {{ i18nService.translate('readMore') }}
                    <span class="material-icons">{{ i18nService.isRTL() ? 'arrow_back' : 'arrow_forward' }}</span>
                  </button>
                </div>
              </div>
            </article>
          </div>

          <!-- Load More Button -->
          <div class="load-more" *ngIf="hasMorePosts">
            <button class="btn btn-secondary" (click)="loadMorePosts()">
              {{ i18nService.translate('loadMorePosts') }}
            </button>
          </div>
        </div>
      </section>

      <!-- Newsletter Signup -->
      <section class="newsletter-section">
        <div class="container">
          <div class="newsletter-content">
            <h3>{{ i18nService.translate('stayUpdated') }}</h3>
            <p>{{ i18nService.translate('stayUpdatedDesc') }}</p>
            <div class="newsletter-form">
              <input 
                type="email" 
                [placeholder]="i18nService.translate('enterEmail')"
                class="newsletter-input"
                [style.text-align]="i18nService.isRTL() ? 'right' : 'left'"
              >
              <button class="btn btn-accent">
                {{ i18nService.translate('subscribe') }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .blog-page {
      min-height: 100vh;
      padding-top: 80px;
    }

    .blog-hero {
      background: var(--primary-gradient);
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

    .blog-content {
      padding: 4rem 0;
    }

    .blog-filters {
      margin-bottom: 3rem;
      text-align: center;
    }

    .blog-filters h3 {
      margin-bottom: 1.5rem;
      color: var(--text-primary);
    }

    .filter-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.75rem 1.5rem;
      border: 2px solid var(--border-color);
      background: white;
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: all var(--transition-normal);
      font-weight: 500;
    }

    .filter-btn:hover,
    .filter-btn.active {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }

    .blog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .blog-card {
      background: white;
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
    }

    .blog-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
    }

    .blog-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .blog-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-normal);
    }

    .blog-card:hover .blog-image img {
      transform: scale(1.05);
    }

    .blog-category {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: var(--accent-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-full);
      font-size: 0.875rem;
      font-weight: 500;
    }

    .blog-card.rtl .blog-category {
      left: auto;
      right: 1rem;
    }

    .blog-content-card {
      padding: 1.5rem;
    }

    .blog-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
      flex-wrap: wrap;
    }

    .blog-card.rtl .blog-meta {
      flex-direction: row-reverse;
    }

    .blog-meta span {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .blog-meta .material-icons {
      font-size: 1rem;
    }

    .blog-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-primary);
      line-height: 1.4;
    }

    .blog-excerpt {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .blog-tags {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .blog-card.rtl .blog-tags {
      flex-direction: row-reverse;
    }

    .blog-tag {
      background: var(--background-color);
      color: var(--primary-color);
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.875rem;
      font-weight: 500;
    }

    .blog-actions {
      display: flex;
      justify-content: flex-start;
    }

    .blog-card.rtl .blog-actions {
      justify-content: flex-end;
    }

    .load-more {
      text-align: center;
      margin-top: 2rem;
    }

    .newsletter-section {
      background: var(--background-color);
      padding: 4rem 0;
    }

    .newsletter-content {
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
    }

    .newsletter-content h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .newsletter-content p {
      font-size: 1.125rem;
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }

    .newsletter-form {
      display: flex;
      gap: 1rem;
      max-width: 400px;
      margin: 0 auto;
    }

    .newsletter-input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      font-size: 1rem;
    }

    .newsletter-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    /* RTL Specific Styles */
    [dir="rtl"] .blog-meta {
      flex-direction: row-reverse;
    }

    [dir="rtl"] .blog-tags {
      flex-direction: row-reverse;
    }

    [dir="rtl"] .blog-actions {
      justify-content: flex-end;
    }

    [dir="rtl"] .filter-buttons {
      flex-direction: row-reverse;
    }

    [dir="rtl"] .newsletter-form {
      flex-direction: row-reverse;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .blog-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .blog-meta {
        flex-direction: column;
        gap: 0.5rem;
      }

      .newsletter-form {
        flex-direction: column;
        gap: 1rem;
      }

      .filter-buttons {
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .hero-title {
        font-size: 2rem;
      }

      .blog-content-card {
        padding: 1rem;
      }

      .filter-btn {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }
    }
  `]
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  categories = [
    { key: 'all', name: 'All Categories', nameAr: 'جميع الفئات' },
    { key: 'history', name: 'History & Culture', nameAr: 'التاريخ والثقافة' },
    { key: 'travel', name: 'Travel Tips', nameAr: 'نصائح السفر' },
    { key: 'attractions', name: 'Attractions', nameAr: 'المعالم السياحية' },
    { key: 'food', name: 'Food & Cuisine', nameAr: 'الطعام والمأكولات' },
    { key: 'events', name: 'Events & Festivals', nameAr: 'الفعاليات والمهرجانات' }
  ];
  selectedCategory = 'all';
  hasMorePosts = true;

  constructor(
    public i18nService: I18nService,
    private tourismService: TourismService
  ) {}

  ngOnInit() {
    this.loadBlogPosts();
    this.updateTranslations();
    
    // Subscribe to language changes
    this.i18nService.currentLanguage$.subscribe(() => {
      this.updateTranslations();
    });
  }

  private updateTranslations() {
    // Add new translation keys to the service
    const newTranslations = {
      blogTitle: this.i18nService.getCurrentLanguage() === 'ar' ? 'مدونة سياحة المنيا' : 'Minya Tourism Blog',
      blogSubtitle: this.i18nService.getCurrentLanguage() === 'ar' ? 
        'اكتشف قصص السفر والثقافة والتاريخ من قلب مصر القديمة' : 
        'Discover travel stories, culture, and history from the heart of ancient Egypt',
      categories: this.i18nService.getCurrentLanguage() === 'ar' ? 'الفئات' : 'Categories',
      minutesRead: this.i18nService.getCurrentLanguage() === 'ar' ? 'دقائق قراءة' : 'min read',
      loadMorePosts: this.i18nService.getCurrentLanguage() === 'ar' ? 'تحميل المزيد' : 'Load More Posts',
      stayUpdated: this.i18nService.getCurrentLanguage() === 'ar' ? 'ابق على اطلاع' : 'Stay Updated',
      stayUpdatedDesc: this.i18nService.getCurrentLanguage() === 'ar' ? 
        'اشترك في نشرتنا الإخبارية للحصول على آخر قصص السفر ونصائح السياحة' : 
        'Subscribe to our newsletter for the latest travel stories and tourism tips',
      enterEmail: this.i18nService.getCurrentLanguage() === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'
    };
  }

  private loadBlogPosts() {
    this.blogPosts = [
      {
        id: '1',
        title: 'Discovering the Ancient Tombs of Beni Hassan',
        titleAr: 'اكتشاف مقابر بني حسن القديمة',
        excerpt: 'Journey through 4,000 years of history as we explore the magnificent Middle Kingdom tombs...',
        excerptAr: 'رحلة عبر 4000 عام من التاريخ بينما نستكشف مقابر الدولة الوسطى الرائعة...',
        content: 'Full article content here...',
        contentAr: 'محتوى المقال الكامل هنا...',
        author: 'Dr. Sarah Ahmed',
        authorAr: 'د. سارة أحمد',
        date: new Date('2024-01-15'),
        category: 'History & Culture',
        categoryAr: 'التاريخ والثقافة',
        image: '/assets/images/beni_hassan.webp',
        readTime: 8,
        tags: ['Ancient Egypt', 'Archaeology', 'Middle Kingdom'],
        tagsAr: ['مصر القديمة', 'الآثار', 'الدولة الوسطى']
      },
      {
        id: '2',
        title: 'A Culinary Journey Through Minya',
        titleAr: 'رحلة طهي عبر المنيا',
        excerpt: 'Taste the authentic flavors of Upper Egypt with traditional dishes and local specialties...',
        excerptAr: 'تذوق النكهات الأصيلة لصعيد مصر مع الأطباق التقليدية والتخصصات المحلية...',
        content: 'Full article content here...',
        contentAr: 'محتوى المقال الكامل هنا...',
        author: 'Chef Mohamed Hassan',
        authorAr: 'الشيف محمد حسن',
        date: new Date('2024-01-10'),
        category: 'Food & Cuisine',
        categoryAr: 'الطعام والمأكولات',
        image: '/assets/images/nile_cruise.jpg',
        readTime: 6,
        tags: ['Egyptian Food', 'Local Cuisine', 'Traditional Recipes'],
        tagsAr: ['الطعام المصري', 'المأكولات المحلية', 'الوصفات التقليدية']
      },
      {
        id: '3',
        title: 'Best Time to Visit Minya: A Seasonal Guide',
        titleAr: 'أفضل وقت لزيارة المنيا: دليل موسمي',
        excerpt: 'Plan your perfect trip with our comprehensive guide to Minya\'s seasons and weather...',
        excerptAr: 'خطط لرحلتك المثالية مع دليلنا الشامل لمواسم وطقس المنيا...',
        content: 'Full article content here...',
        contentAr: 'محتوى المقال الكامل هنا...',
        author: 'Travel Expert Team',
        authorAr: 'فريق خبراء السفر',
        date: new Date('2024-01-05'),
        category: 'Travel Tips',
        categoryAr: 'نصائح السفر',
        image: '/assets/images/nile_river.jpg',
        readTime: 5,
        tags: ['Travel Planning', 'Weather', 'Best Time'],
        tagsAr: ['تخطيط السفر', 'الطقس', 'أفضل وقت']
      },
      {
        id: '4',
        title: 'The Mysteries of Tell el-Amarna',
        titleAr: 'أسرار تل العمارنة',
        excerpt: 'Explore the fascinating capital city of Akhenaten and uncover its ancient secrets...',
        excerptAr: 'استكشف العاصمة الرائعة لأخناتون واكتشف أسرارها القديمة...',
        content: 'Full article content here...',
        contentAr: 'محتوى المقال الكامل هنا...',
        author: 'Prof. Ahmed Mahmoud',
        authorAr: 'أ.د. أحمد محمود',
        date: new Date('2023-12-28'),
        category: 'History & Culture',
        categoryAr: 'التاريخ والثقافة',
        image: '/assets/images/hero_banner.png',
        readTime: 10,
        tags: ['Akhenaten', 'Ancient Capital', 'Amarna Period'],
        tagsAr: ['أخناتون', 'العاصمة القديمة', 'فترة العمارنة']
      },
      {
        id: '5',
        title: 'Nile River Cruises: A Magical Experience',
        titleAr: 'رحلات نهر النيل: تجربة سحرية',
        excerpt: 'Sail along the eternal Nile and witness the timeless beauty of Egypt\'s lifeline...',
        excerptAr: 'أبحر على طول النيل الخالد واشهد الجمال الخالد لشريان الحياة في مصر...',
        content: 'Full article content here...',
        contentAr: 'محتوى المقال الكامل هنا...',
        author: 'Captain Youssef Ali',
        authorAr: 'الكابتن يوسف علي',
        date: new Date('2023-12-20'),
        category: 'Attractions',
        categoryAr: 'المعالم السياحية',
        image: '/assets/images/nile_boats.jpg',
        readTime: 7,
        tags: ['Nile River', 'Boat Tours', 'Scenic Views'],
        tagsAr: ['نهر النيل', 'جولات القوارب', 'المناظر الطبيعية']
      },
      {
        id: '6',
        title: 'Annual Festivals and Cultural Events',
        titleAr: 'المهرجانات السنوية والفعاليات الثقافية',
        excerpt: 'Join the celebration of Minya\'s rich cultural heritage through vibrant festivals...',
        excerptAr: 'انضم للاحتفال بالتراث الثقافي الغني للمنيا من خلال المهرجانات النابضة بالحياة...',
        content: 'Full article content here...',
        contentAr: 'محتوى المقال الكامل هنا...',
        author: 'Cultural Affairs Office',
        authorAr: 'مكتب الشؤون الثقافية',
        date: new Date('2023-12-15'),
        category: 'Events & Festivals',
        categoryAr: 'الفعاليات والمهرجانات',
        image: '/assets/images/pattern_bg.png',
        readTime: 6,
        tags: ['Festivals', 'Cultural Events', 'Local Traditions'],
        tagsAr: ['المهرجانات', 'الفعاليات الثقافية', 'التقاليد المحلية']
      }
    ];

    this.filteredPosts = this.blogPosts;
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredPosts = this.blogPosts;
    } else {
      this.filteredPosts = this.blogPosts.filter(post => {
        const categoryToCheck = this.i18nService.isRTL() ? post.categoryAr : post.category;
        const selectedCategoryName = this.categories.find(cat => cat.key === category);
        const categoryName = this.i18nService.isRTL() ? 
          selectedCategoryName?.nameAr : selectedCategoryName?.name;
        return categoryToCheck === categoryName;
      });
    }
  }

  readPost(post: BlogPost) {
    // Navigate to full blog post (would be implemented with routing)
    console.log('Reading post:', post.id);
  }

  loadMorePosts() {
    // Load more posts (pagination)
    this.hasMorePosts = false;
  }
}
