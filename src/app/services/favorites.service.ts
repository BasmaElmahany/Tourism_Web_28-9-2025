import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface FavoriteItem {
  id: string;
  type: 'attraction' | 'hotel' | 'restaurant' | 'event' | 'shop' | 'service';
  name: string;
  nameAr: string;
  image: string;
  category?: string;
  categoryAr?: string;
  rating?: number;
  addedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'minya_favorites';
  private favoritesSubject = new BehaviorSubject<FavoriteItem[]>([]);
  public favorites$: Observable<FavoriteItem[]> = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavoritesFromStorage();
  }

  /**
   * Load favorites from localStorage
   */
  private loadFavoritesFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const favorites = JSON.parse(stored);
        // Convert date strings back to Date objects
        favorites.forEach((fav: FavoriteItem) => {
          fav.addedAt = new Date(fav.addedAt);
        });
        this.favoritesSubject.next(favorites);
      }
    } catch (error) {
      console.error('Error loading favorites from storage:', error);
    }
  }

  /**
   * Save favorites to localStorage
   */
  private saveFavoritesToStorage(favorites: FavoriteItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to storage:', error);
    }
  }

  /**
   * Get all favorites
   */
  getFavorites(): FavoriteItem[] {
    return this.favoritesSubject.value;
  }

  /**
   * Get favorites count
   */
  getFavoritesCount(): number {
    return this.favoritesSubject.value.length;
  }

  /**
   * Check if item is in favorites
   */
  isFavorite(id: string): boolean {
    return this.favoritesSubject.value.some(fav => fav.id === id);
  }

  /**
   * Add item to favorites
   */
  addToFavorites(item: FavoriteItem): void {
    const currentFavorites = this.favoritesSubject.value;
    
    // Check if already exists
    if (this.isFavorite(item.id)) {
      console.log('Item already in favorites');
      return;
    }

    // Add timestamp
    item.addedAt = new Date();

    // Add to favorites
    const updatedFavorites = [...currentFavorites, item];
    this.favoritesSubject.next(updatedFavorites);
    this.saveFavoritesToStorage(updatedFavorites);
  }

  /**
   * Remove item from favorites
   */
  removeFromFavorites(id: string): void {
    const currentFavorites = this.favoritesSubject.value;
    const updatedFavorites = currentFavorites.filter(fav => fav.id !== id);
    this.favoritesSubject.next(updatedFavorites);
    this.saveFavoritesToStorage(updatedFavorites);
  }

  /**
   * Toggle favorite status
   */
  toggleFavorite(item: FavoriteItem): boolean {
    if (this.isFavorite(item.id)) {
      this.removeFromFavorites(item.id);
      return false;
    } else {
      this.addToFavorites(item);
      return true;
    }
  }

  /**
   * Clear all favorites
   */
  clearAllFavorites(): void {
    this.favoritesSubject.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Get favorites by type
   */
  getFavoritesByType(type: FavoriteItem['type']): FavoriteItem[] {
    return this.favoritesSubject.value.filter(fav => fav.type === type);
  }

  /**
   * Get favorites count by type
   */
  getFavoritesCountByType(type: FavoriteItem['type']): number {
    return this.getFavoritesByType(type).length;
  }
}

