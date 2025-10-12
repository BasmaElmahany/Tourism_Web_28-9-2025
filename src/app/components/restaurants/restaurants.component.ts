import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../services/i18n.service';
import { restaurants } from '../../data/restaurants';
import { Restaurant } from '../../models/tourism.models';

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
    public i18nService: I18nService
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

  viewMenu(restaurant: Restaurant) {
    console.log('Viewing menu for:', this.i18nService.pick(restaurant.name));
  }

  makeReservation(restaurant: Restaurant) {
    console.log('Making reservation at:', this.i18nService.pick(restaurant.name));
  }

  getDirections(restaurant: Restaurant) {
    console.log('Getting directions to:', this.i18nService.pick(restaurant.name));
  }


}
