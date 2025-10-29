import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TourismService } from '../../services/tourism.service';
import { FavoritesService, FavoriteItem } from '../../services/favorites.service';
import { Attraction, BlogPost } from '../../models/tourism.models';
import { I18nService } from 'src/app/services/i18n.service';
import { ATTRACTIONS } from '../../data/attractions';
import { blogPosts } from '../../data/blog_posts';
import { hotels } from '../../data/hotels';
import { photographers } from '../../data/photographe';
import { restaurants } from '../../data/restaurants';
import { services } from '../../data/services';
import { souvenirShops } from '../../data/souviners';
import { tourGuides } from '../../data/tourguide';
import { FavoritesDrawerComponent } from '../favorites-drawer/favorites-drawer.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { WeatherComponent } from '../weather/weather.component';
import { TourguideComponent } from '../tourguide/tourguide.component';
import { PhotographerComponent } from '../photographer/photographer.component';

export interface StatItem {
  labelKey: string;
  defaultLabel: string;
  value: string;
}

interface Blogger {
  name: string;
  channelUrl: string;
  videoPath: string;
  thumbnail?: string;
  description?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FavoritesDrawerComponent,
    ChatbotComponent,
    WeatherComponent,TourguideComponent
    ,PhotographerComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(FavoritesDrawerComponent) favoritesDrawer!: FavoritesDrawerComponent;


  currentBlogSlide = 0;
  featuredAttractions: Attraction[] = [];
  latestBlogPosts: BlogPost[] = [];
  stats: StatItem[] = [];
  // display strings for animated counts (optional)
  animatedDisplay: string[] = [];
  statsAnimated = false;
  private statsObserver?: IntersectionObserver;
  currentSlide = 0;
  favoritesCount = 0;
  playingIndex: number | null = null;
  showChat = false;
  // slider state for bloggers videos
  videoSlideIndex = 0;
  private sliderIntervalId: any = null;
  constructor(
    private tourismService: TourismService,
    public favoritesService: FavoritesService,
    public i18n: I18nService
    , private sanitizer: DomSanitizer
    , private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadFeaturedAttractions();
    this.loadLatestBlogPosts();
    this.loadFavoritesCount();
    this.loadStats();
    this.startVideoAutoplay();
  }

  ngAfterViewInit() {
    // Observe when the stats section scrolls into view, then start count animation
    const el = document.querySelector('.stats-section');
    if (!el) return;
    try {
      this.statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.statsAnimated) {
            this.statsAnimated = true;
            this.startStatsCountAnimation();
            if (this.statsObserver) { this.statsObserver.disconnect(); this.statsObserver = undefined; }
          }
        });
      }, { threshold: 0.2 });
      this.statsObserver.observe(el);
    } catch (e) {
      // IntersectionObserver may not be available in some environments; fallback to immediate animation
      this.startStatsCountAnimation();
    }
  }

  ngOnDestroy() {
    this.stopVideoAutoplay();
    if (this.statsObserver) {
      try { this.statsObserver.disconnect(); } catch {}
      this.statsObserver = undefined;
    }
  }

  private startStatsCountAnimation() {
    if (!Array.isArray(this.stats) || this.stats.length === 0) return;
    // initialize display with zeros
    this.animatedDisplay = this.stats.map(() => '0');

    this.stats.forEach((s, i) => {
      const numeric = parseInt(String(s.value).replace(/\D/g, ''), 10) || 0;
      const duration = 900 + Math.min(800, numeric * 12); // dynamic duration
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const current = Math.floor(progress * numeric);
        // use locale formatting for thousands
        this.animatedDisplay[i] = current.toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          // finalize with original suffix if any (e.g., '+')
          const suffix = String(s.value).match(/\D+$/)?.[0] || '';
          this.animatedDisplay[i] = numeric.toLocaleString() + suffix;
        }
      };

      requestAnimationFrame(tick);
    });
  }

  startVideoAutoplay() {
    this.stopVideoAutoplay();
    this.sliderIntervalId = setInterval(() => this.nextVideo(), 5000);
  }

  stopVideoAutoplay() {
    if (this.sliderIntervalId) {
      clearInterval(this.sliderIntervalId);
      this.sliderIntervalId = null;
    }
  }

  nextVideo() {
    const len = (this.bloggers || []).slice(0,2).length || 0;
    if (len === 0) return;
    this.videoSlideIndex = (this.videoSlideIndex + 1) % len;
  }

  prevVideo() {
    const len = (this.bloggers || []).slice(0,2).length || 0;
    if (len === 0) return;
    this.videoSlideIndex = (this.videoSlideIndex - 1 + len) % len;
  }

  private loadStats() {
    // Build stats from local data exports
    const attractionsCount = Array.isArray(ATTRACTIONS) ? ATTRACTIONS.length : 0;
    const blogsCount = Array.isArray(blogPosts) ? blogPosts.length : 0;
    const hotelsCount = Array.isArray(hotels) ? hotels.length : 0;
    const photographersCount = Array.isArray(photographers) ? photographers.length : 0;
    const restaurantsCount = Array.isArray(restaurants) ? restaurants.length : 0;
    const servicesCount = Array.isArray(services) ? services.length : 0;
    const souvenirsCount = Array.isArray(souvenirShops) ? souvenirShops.length : 0;
    const tourGuidesCount = Array.isArray(tourGuides) ? tourGuides.length : 0;

    // Build 8 stat cards (one per requested data file)
    this.stats = [
      { labelKey: 'attractions', defaultLabel: 'Attractions', value: `${attractionsCount}+` },
  { labelKey: 'latestStories', defaultLabel: 'Articles', value: `${blogsCount}+` },
      { labelKey: 'hotels', defaultLabel: 'Hotels', value: `${hotelsCount}+` },
      { labelKey: 'photographers', defaultLabel: 'Photographers', value: `${photographersCount}+` },
      { labelKey: 'restaurants', defaultLabel: 'Restaurants', value: `${restaurantsCount}+` },
      { labelKey: 'services', defaultLabel: 'Services', value: `${servicesCount}+` },
      { labelKey: 'souvenirs', defaultLabel: 'Souvenirs', value: `${souvenirsCount}+` },
      { labelKey: 'tourguide', defaultLabel: 'Tour Guides', value: `${tourGuidesCount}+` }
    ];
  }

  private loadFeaturedAttractions() {
    this.tourismService.getAttractions().subscribe(attractions => {
      this.featuredAttractions = attractions.slice(0, 4); // Show first 4 attractions
    });
  }

  private loadLatestBlogPosts() {
    this.tourismService.getBlogPosts().subscribe(posts => {
      this.latestBlogPosts = posts.slice(0, 2); // Show first 2 blog posts
    });
  }

  private loadFavoritesCount() {
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favoritesCount = favorites.length;
    });
  }

  nextSlide() {
    if (this.currentSlide < this.featuredAttractions.length - 1) {
      this.currentSlide++;
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
  previousBlogSlide() {
  if (this.currentBlogSlide > 0) this.currentBlogSlide--;
}

nextBlogSlide() {
  if (this.currentBlogSlide < this.latestBlogPosts.length - 1)
    this.currentBlogSlide++;
}

goToBlogSlide(index: number) {
  this.currentBlogSlide = index;
}

  /**
   * Toggle favorite for attraction
   * @param attraction - The attraction to toggle
   * @param event - Mouse event (optional) to prevent bubbling
   */
  toggleFavorite(attraction: Attraction, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const favoriteItem: FavoriteItem = {
      id: attraction.id,
      type: 'attraction',
      name: typeof attraction.name === 'string' ? attraction.name : attraction.name.en,
      nameAr: typeof attraction.name === 'string' ? attraction.name : attraction.name.ar,
      image: attraction.imageGallery?.[0] || '/assets/images/placeholder.jpg',
      category: typeof attraction.category === 'string' ? attraction.category : attraction.category?.en,
      categoryAr: typeof attraction.category === 'string' ? attraction.category : attraction.category?.ar,
      rating: attraction.rating,
      addedAt: new Date()
    };

    this.favoritesService.toggleFavorite(favoriteItem);
  }

  /**
   * Check if attraction is favorite
   * @param attractionId - The ID of the attraction to check
   * @returns true if the attraction is in favorites
   */
  isFavorite(attractionId: string): boolean {
    return this.favoritesService.isFavorite(attractionId);
  }

  /**
   * Open favorites drawer
   */
  openFavoritesDrawer(): void {
    if (this.favoritesDrawer) {
      this.favoritesDrawer.open();
    }
  }

  toggleChat() { this.showChat = !this.showChat }

  // --- Bloggers / Video helpers ---
  // Use local videos stored under assets/videos/
  bloggers: Blogger[] = [
    // { name: 'MinyaVlogger', channelUrl: '#', videoPath: '/assets/images/video1.mp4', thumbnail: '/assets/images/video-thumb1.jpg', description: 'Local vlogger exploring Minya.' },
    { name: 'DiscoverMinya', channelUrl: '#', videoPath: '/assets/images/video2.mp4', thumbnail: '/assets/images/video-thumb2.jpg', description: 'Hidden gems and ancient sites.' },
    { name: 'EgyptTravel', channelUrl: '#', videoPath: '/assets/images/video3.mp4', thumbnail: '/assets/images/video-thumb3.jpg', description: 'Travel tips and food tours.' }
  ];

  getSafeEmbedUrl(videoPath: string): SafeResourceUrl {
    // For local video files under /assets, bypassing is safe for embedding in src
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoPath);
  }

  openVideo(index: number) {
    this.playingIndex = index;
    // Wait for the template to render the <video>
    setTimeout(() => {
      const section = document.querySelector('.bloggers-section');
      if (!section) return;
      const vids = Array.from(section.querySelectorAll('video')) as HTMLVideoElement[];
      const v = vids[0]; // only one video element is rendered per card when open, so pick first
      if (v) {
        v.currentTime = 0;
        v.muted = true; // ensure autoplay allowed
        v.play().catch(() => {});
        v.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 80);
  }

  closeVideo() {
    this.playingIndex = null;
    // pause any playing video in the section
    const section = document.querySelector('.bloggers-section');
    if (!section) return;
    const vids = Array.from(section.querySelectorAll('video')) as HTMLVideoElement[];
    vids.forEach(v => {
      try { v.pause(); v.currentTime = 0; } catch {}
    });
  }
}
