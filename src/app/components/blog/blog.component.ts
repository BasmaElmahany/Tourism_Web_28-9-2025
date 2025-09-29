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
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
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
