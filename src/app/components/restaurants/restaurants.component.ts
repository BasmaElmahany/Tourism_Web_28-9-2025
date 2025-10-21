import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../services/i18n.service';
import { restaurants } from '../../data/restaurants';
import { Restaurant } from '../../models/tourism.models';
import { FavoritesService, FavoriteItem } from '../../services/favorites.service';
@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchQuery = '';
  selectedCuisine = '';
  selectedPriceRange = '';
  selectedRating = '';
 cuisineTypes = [
    { key: 'egyptian', en: 'Egyptian', ar: 'مصرية' },
    { key: 'italian', en: 'Italian', ar: 'إيطالية' },
    { key: 'oriental', en: 'Oriental', ar: 'شرقية' },
    { key: 'fastfood', en: 'Fast Food', ar: 'وجبات سريعة' }
  ];

  priceRanges = [
    { key: 'low', en: 'Low', ar: 'منخفض' },
    { key: 'medium', en: 'Medium', ar: 'متوسط' },
    { key: 'high', en: 'High', ar: 'مرتفع' }
  ];
  constructor(
    public i18nService: I18nService, public favoritesService: FavoritesService 
  ) {}

  ngOnInit() {
    this.loadRestaurants();
  }

  private loadRestaurants() {
    // Normalize the imported raw data into the app's Restaurant model so templates and
    // type-checking remain consistent regardless of source shape.
    const raw: any[] = Array.isArray(restaurants) ? restaurants : [];
    this.restaurants = raw.map(r => this.normalizeRawRestaurant(r));
    this.filteredRestaurants = this.restaurants;
  }

  private normalizeRawRestaurant(r: any): Restaurant {
    const toLocalized = (val: any, alt?: any) => {
      if (!val && !alt) return '';
      if (typeof val === 'string') return { en: val, ar: alt ?? '' } as any;
      return val as any;
    };

    return {
      id: r?.id ?? r?.ID ?? '',
      name: toLocalized(r?.name, r?.nameAr),
      description: toLocalized(r?.description, r?.descriptionAr),
      imageUrl: r?.imageUrl ?? r?.image ?? '',
      latitude: r?.latitude ?? r?.location?.lat ?? 0,
      longitude: r?.longitude ?? r?.location?.lng ?? 0,
      rating: r?.rating ?? 0,
      reviewCount: r?.reviewCount ?? 0,
      cuisineType: toLocalized(r?.cuisineType ?? r?.cuisine, r?.cuisineAr),
      priceRange: toLocalized(r?.priceRange, r?.priceRangeAr),
      openingHours: toLocalized(r?.openingHours, r?.openingHoursAr),
  specialties: (r?.specialties ?? []).map((s: any) => (typeof s === 'string' ? { en: s, ar: '' } : s)),
  // menuUrl may be provided as a string (URL) or localized object
  menuUrl: (r?.menuUrl ?? r?.menu) || undefined,
      contactInfo: { phone: toLocalized(r?.contactInfo?.phone ?? r?.phone) } as any,
      features: (r?.features ?? []).map((f: any) => (typeof f === 'string' ? { en: f, ar: '' } : f)),
    } as unknown as Restaurant;
  }

  filterRestaurants() {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredRestaurants = this.restaurants.filter(restaurant => {
      const name = String(this.i18nService.pick(restaurant.name)).toLowerCase();
      const cuisine = String(this.i18nService.pick(restaurant.cuisineType)).toLowerCase();
      const price = String(this.i18nService.pick(restaurant.priceRange)).toLowerCase();

      const matchesSearch = q === '' || name.includes(q) || cuisine.includes(q) || price.includes(q);
      const matchesCuisine = this.selectedCuisine === '' || cuisine.includes(this.selectedCuisine.toLowerCase());
      const matchesPriceRange = this.selectedPriceRange === '' || price.includes(this.selectedPriceRange.toLowerCase());
      const matchesRating = this.selectedRating === '' || restaurant.rating >= parseFloat(this.selectedRating);

      return matchesSearch && matchesCuisine && matchesPriceRange && matchesRating;
    });
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCuisine = '';
    this.selectedPriceRange = '';
    this.selectedRating = '';
    this.filteredRestaurants = this.restaurants;
  }

  async viewMenu(restaurant: Restaurant) {
    const name = this.i18nService.pick(restaurant.name) || '';

    // Prefer explicit menuUrl if provided
    const rawMenu = restaurant.menuUrl as any;
    let menuUrl: string | null = null;

    if (rawMenu) {
      if (typeof rawMenu === 'string') {
        menuUrl = rawMenu;
      } else if (typeof rawMenu === 'object') {
        // localized object
        menuUrl = rawMenu[this.i18nService.getCurrentLanguage()] || rawMenu['en'] || null;
      }
    }

    const openUrl = (url: string) => {
      try {
        window.open(url, '_blank');
      } catch (err) {
        window.location.href = url;
      }
    };

    if (menuUrl) {
      openUrl(menuUrl);
      return;
    }

    const candidates = [
      `/assets/menus/${restaurant.id}.pdf`,
      `/assets/menus/${restaurant.id}-menu.pdf`,
      `/assets/menus/${restaurant.id}.PDF`,
    ];

    // Sequentially HEAD each candidate and open the first that exists.
    for (const c of candidates) {
      try {
        const res = await fetch(c, { method: 'HEAD' });
        if (res.ok) {
          openUrl(c);
          return;
        }
      } catch (e) {
        // network error or CORS; continue to next candidate
      }
    }

    // No menu found — show a localized alert
    alert(this.i18nService.translate('menuUnavailable') || 'Menu not available');
  }

  makeReservation(restaurant: Restaurant) {
    console.log('Making reservation at:', this.i18nService.pick(restaurant.name));
  }

  getDirections(restaurant: Restaurant) {
    const name = this.i18nService.pick(restaurant.name) || '';
    const lat = restaurant.latitude;
    const lng = restaurant.longitude;

    let url = '#';
    if (lat && lng && !isNaN(Number(lat)) && !isNaN(Number(lng))) {
      // Use Google Maps Directions with destination coordinates and optional name
      const label = encodeURIComponent(String(name));
      url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_name=${label}`;
    } else if (name) {
      // Fallback: search by name
      const q = encodeURIComponent(String(name));
      url = `https://www.google.com/maps/search/?api=1&query=${q}`;
    }

    // Open in new tab
    try {
      window.open(url, '_blank');
    } catch (err) {
      // Fallback to navigating in the same tab if window.open is blocked
      window.location.href = url;
    }
  }

  private pickLang(v: any, key: 'en' | 'ar'): string {
    return typeof v === 'string' ? v : (v?.[key] ?? '');
  }

  // ---- FAVORITES: add these two methods ----
  toggleFavorite(restaurant: Restaurant, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const nameEn = this.pickLang(restaurant.name as any, 'en');
    const nameAr = this.pickLang(restaurant.name as any, 'ar');

    // Use cuisineType as the category label (en/ar)
    const catEn = this.pickLang(restaurant.cuisineType as any, 'en') || (this.i18nService.translate('Restaurant') ?? 'Restaurant');
    const catAr = this.pickLang(restaurant.cuisineType as any, 'ar') || (this.i18nService.translate('Restaurant') ?? 'مطعم');

    const favoriteItem: FavoriteItem = {
      id: restaurant.id,
      type: 'restaurant',
      name: nameEn,
      nameAr: nameAr,
      image: restaurant.imageUrl || '/assets/images/placeholder.jpg',
      category: catEn,
      categoryAr: catAr,
      rating: restaurant.rating,
      addedAt: new Date()
    };

    const isNowFavorite = this.favoritesService.toggleFavorite(favoriteItem);

    // Optional toast (same pattern you used elsewhere)
    // const msg = isNowFavorite
    //   ? this.i18nService.translate('addedToFavorites')
    //   : this.i18nService.translate('removedFromFavorites');
    // this.showToast(msg);
  }

  isFavorite(restaurantId: string): boolean {
    return this.favoritesService.isFavorite(restaurantId);
  }
}
