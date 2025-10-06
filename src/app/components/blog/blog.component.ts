import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { TourismService } from '../../services/tourism.service';
import { FormsModule } from '@angular/forms';
import { BlogPost } from '../../models/tourism.models'; // use the unified model
import { blogPosts } from 'src/app/data/blog_posts';
     // import the data

@Component({
  standalone: true,
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],

  imports: [CommonModule, RouterModule, FormsModule],

})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  categories = [
    { key: 'all', name: { en: 'All Categories', ar: 'جميع الفئات' } },
    { key: 'history', name: { en: 'History & Culture', ar: 'التاريخ والثقافة' } },
    { key: 'travel', name: { en: 'Travel Tips', ar: 'نصائح السفر' } },
    { key: 'attractions', name: { en: 'Attractions', ar: 'المعالم السياحية' } },
    { key: 'food', name: { en: 'Food & Cuisine', ar: 'الطعام والمأكولات' } },
    { key: 'events', name: { en: 'Events & Festivals', ar: 'الفعاليات والمهرجانات' } }
  ];
  selectedCategory = 'all';
  hasMorePosts = true;

  constructor(
    public i18nService: I18nService,
    private tourismService: TourismService
  ) {}

  ngOnInit() {
    this.loadBlogPosts();
  }

  private loadBlogPosts() {
    this.blogPosts = blogPosts; // load from your data file
    this.filteredPosts = this.blogPosts;
  }

filterByCategory(category: string) {
  this.selectedCategory = category;

  if (category === 'all') {
    this.filteredPosts = this.blogPosts;
  } else {
    this.filteredPosts = this.blogPosts.filter(post => {
      const lang = this.i18nService.getCurrentLanguage() as 'en' | 'ar';

      const postCategory =
        typeof post.category === 'string'
          ? post.category
          : post.category[lang];

      const selectedCategoryName = this.categories.find(cat => cat.key === category);
      const categoryName = selectedCategoryName ? selectedCategoryName.name[lang] : '';

      return postCategory === categoryName;
    });
  }
}



  getLocalizedText(text: any): string {
    if (typeof text === 'string') return text;
    return this.i18nService.getCurrentLanguage() === 'ar' ? text.ar : text.en;
  }

  readPost(post: BlogPost) {
    console.log('Reading post:', post.id);
  }

  loadMorePosts() {
    this.hasMorePosts = false;
  }
  
}
