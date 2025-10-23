import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { TourismService } from '../../services/tourism.service';
import { FormsModule } from '@angular/forms';
import { BlogPost } from '../../models/tourism.models';
import { blogPosts } from 'src/app/data/blog_posts';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class BlogComponent implements OnInit, OnDestroy {
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

  // share popup state (DOM-only)
  activeShareIndex: number | null = null;
  sharePopupOpen = false;

  // inline styles for positioning the popup (applied as fixed)
  popupStyles: { [k: string]: string } = {};

  // origin for building absolute links (safe fallback)
  origin = typeof window !== 'undefined' ? window.location.origin : '';

  private postSub?: Subscription;

  // single document click listener reference so we can remove it later
  private onDocClick = (evt?: Event) => {
    if (this.sharePopupOpen) {
      this.closeSharePopup();
    }
  };

  constructor(
    public i18nService: I18nService,
    private tourismService: TourismService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.loadBlogPosts();
    // close any open popup when clicking outside
    document.addEventListener('click', this.onDocClick);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.onDocClick);
    if (this.postSub) this.postSub.unsubscribe();
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
    this.router.navigate(['/blog', post.id]);
  }

  /**
   * Toggle share popup and position it fixed above the clicked button.
   * Uses event.currentTarget to calculate coordinates.
   */
  toggleSharePopup(index: number, event?: MouseEvent) {
    if (event) event.stopPropagation();

    // close if same index
    if (this.sharePopupOpen && this.activeShareIndex === index) {
      this.closeSharePopup();
      return;
    }

    // otherwise open
    this.activeShareIndex = index;
    this.sharePopupOpen = true;

    // compute initial fixed position based on the button
    const target = event?.currentTarget as HTMLElement | null;
    if (!target) {
      // fallback: center top
      this.popupStyles = {
        position: 'fixed',
        left: '50%',
        top: '20%',
        transform: 'translateX(-50%)'
      };
      return;
    }

    // first compute horizontal center of the trigger
    const btnRect = target.getBoundingClientRect();
    const centerX = btnRect.left + btnRect.width / 2 + window.scrollX;
    // place temporarily at top (will adjust after render)
    this.popupStyles = {
      position: 'fixed',
      left: `${centerX}px`,
      top: `${btnRect.top + window.scrollY - 8}px`,
      transform: 'translateX(-50%)'
    };

    // after Angular renders the popup, measure and adjust so it's above the button without overflow
    setTimeout(() => {
      const popup = document.querySelector('.share-popup') as HTMLElement | null;
      if (!popup) return;

      // remove any previous fixed class (we use fixed positioning)
      popup.classList.remove('share-popup--fixed');

      const popupRect = popup.getBoundingClientRect();

      // desired top (so popup sits above button with 8px gap)
      let top = btnRect.top - popupRect.height - 8;
      let left = centerX - popupRect.width / 2; // absolute viewport coords

      // adjust for viewport edges (padding 8px)
      const pad = 8;
      if (left < pad) left = pad;
      if (left + popupRect.width > window.innerWidth - pad) left = window.innerWidth - pad - popupRect.width;

      // if placing above would push off-screen vertically, fallback to below the button
      if (top < pad) {
        top = btnRect.bottom + 8; // place below with gap
      }

      // set final styles (fixed coordinates)
      this.popupStyles = {
        position: 'fixed',
        left: `${left}px`,
        top: `${top}px`,
        transform: 'none'
      };
    }, 30); // small delay to allow DOM paint
  }

  // helper for template to check visibility
  isShareOpen(index: number): boolean {
    return this.sharePopupOpen && this.activeShareIndex === index;
  }

  closeSharePopup() {
    this.sharePopupOpen = false;
    this.activeShareIndex = null;
    this.popupStyles = {};
    // remove any fallback class just in case
    const popped = document.querySelectorAll('.share-popup');
    popped.forEach(p => p.classList.remove('share-popup--fixed'));
  }

  copyLinkToClipboard(post: BlogPost) {
    const url = this.origin + '/blog/' + post.id;
    try {
      navigator.clipboard.writeText(url);
      alert(this.i18nService.translate('linkCopied') || 'Link copied');
    } catch (e) {
      const res = prompt(this.i18nService.translate('copyLinkPrompt') || 'Copy this link:', url);
      if (res !== null) { /* copied manually */ }
    }
    // close popup after copy
    this.closeSharePopup();
  }

  // Sharing URLs helpers
  public getWhatsAppShareUrl(post: BlogPost): string {
    const title = this.getLocalizedText(post.title || '');
    const url = this.origin + '/blog/' + (post.id || '');
    const text = `${title} — ${url}`;
    return 'https://wa.me/?text=' + encodeURIComponent(text);
  }

  public getFacebookShareUrl(post: BlogPost): string {
    const url = this.origin + '/blog/' + (post.id || '');
    return 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
  }

  public getTwitterShareUrl(post: BlogPost): string {
    const title = this.getLocalizedText(post.title || '');
    const url = this.origin + '/blog/' + (post.id || '');
    return 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title);
  }

  public getTelegramShareUrl(post: BlogPost): string {
    const title = this.getLocalizedText(post.title || '');
    const url = this.origin + '/blog/' + (post.id || '');
    return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  }

  public getLinkedinShareUrl(post: BlogPost): string {
    const title = this.getLocalizedText(post.title || '');
    const url = this.origin + '/blog/' + (post.id || '');
    return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
  }

  loadMorePosts() {
    this.hasMorePosts = false;
  }
}
