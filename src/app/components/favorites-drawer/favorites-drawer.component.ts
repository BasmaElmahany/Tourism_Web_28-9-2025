import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritesService, FavoriteItem } from '../../services/favorites.service';
import { I18nService } from '../../services/i18n.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-favorites-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites-drawer.component.html',
  styleUrls: ['./favorites-drawer.component.scss']
})
export class FavoritesDrawerComponent implements OnInit, OnDestroy {
  isOpen = false;
  favorites: FavoriteItem[] = [];
  filteredFavorites: FavoriteItem[] = [];
  selectedFilter: FavoriteItem['type'] | 'all' = 'all';
  
  private destroy$ = new Subject<void>();

  constructor(
    public favoritesService: FavoritesService,
    public i18n: I18nService
  ) {}

  ngOnInit(): void {
    // Subscribe to favorites changes
    this.favoritesService.favorites$
      .pipe(takeUntil(this.destroy$))
      .subscribe(favorites => {
        this.favorites = favorites;
        this.filterFavorites();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Open drawer
   */
  open(): void {
    this.isOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  /**
   * Close drawer
   */
  close(): void {
    this.isOpen = false;
    document.body.style.overflow = ''; // Restore scroll
  }

  /**
   * Toggle drawer
   */
  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Filter favorites by type
   */
  setFilter(filter: FavoriteItem['type'] | 'all'): void {
    this.selectedFilter = filter;
    this.filterFavorites();
  }

  /**
   * Apply filter
   */
  private filterFavorites(): void {
    if (this.selectedFilter === 'all') {
      this.filteredFavorites = this.favorites;
    } else {
      this.filteredFavorites = this.favorites.filter(fav => fav.type === this.selectedFilter);
    }
  }

  /**
   * Remove item from favorites
   */
  removeFromFavorites(id: string): void {
    this.favoritesService.removeFromFavorites(id);
  }

  /**
   * Clear all favorites
   */
  clearAll(): void {
    if (confirm(this.i18n.translate('confirmClearFavorites') || 'Are you sure you want to clear all favorites?')) {
      this.favoritesService.clearAllFavorites();
    }
  }

  /**
   * Get count for filter
   */
  getFilterCount(type: FavoriteItem['type'] | 'all'): number {
    if (type === 'all') {
      return this.favorites.length;
    }
    return this.favoritesService.getFavoritesCountByType(type);
  }

  /**
   * Get icon for item type
   */
  getTypeIcon(type: FavoriteItem['type']): string {
    const icons: Record<FavoriteItem['type'], string> = {
      attraction: 'place',
      hotel: 'hotel',
      restaurant: 'restaurant',
      event: 'event',
      shop: 'store',
      service: 'medical_services'
    };
    return icons[type] || 'favorite';
  }

  /**
   * Get route for item
   */
  getItemRoute(item: FavoriteItem): string {
    const routes: Record<FavoriteItem['type'], string> = {
      attraction: '/attractions',
      hotel: '/hotels',
      restaurant: '/restaurants',
      event: '/events',
      shop: '/souvenirs',
      service: '/services'
    };
    return `${routes[item.type]}/${item.id}`;
  }

  /**
   * Track by function for ngFor
   */
  trackByFavoriteId(index: number, item: FavoriteItem): string {
    return item.id;
  }
}

