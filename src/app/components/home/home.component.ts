import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TourismService } from '../../services/tourism.service';
import { FavoritesService, FavoriteItem } from '../../services/favorites.service';
import { Attraction, BlogPost } from '../../models/tourism.models';
import { I18nService } from 'src/app/services/i18n.service';
import { FavoritesDrawerComponent } from '../favorites-drawer/favorites-drawer.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FavoritesDrawerComponent,
    ChatbotComponent,
    WeatherComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(FavoritesDrawerComponent) favoritesDrawer!: FavoritesDrawerComponent;
  
  featuredAttractions: Attraction[] = [];
  latestBlogPosts: BlogPost[] = [];
  currentSlide = 0;
  favoritesCount = 0;
showChat = false;
  constructor(
    private tourismService: TourismService,
    public favoritesService: FavoritesService,
    public i18n: I18nService
  ) {}

  ngOnInit() {
    this.loadFeaturedAttractions();
    this.loadLatestBlogPosts();
    this.loadFavoritesCount();
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
}



