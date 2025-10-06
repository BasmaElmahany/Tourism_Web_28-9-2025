import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../services/i18n.service';
import { restaurants } from '../../data/restaurants';

interface Restaurant {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  imageUrl: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  cuisineType: Record<string, string>;
  priceRange: Record<string, string>;
  openingHours: Record<string, string>;
  specialties: Record<string, string>[];
  contactInfo: {
    phone: Record<string, string>;
    email?: string;
  };
  
  features: Record<string, string>[];
  

}

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
    this.restaurants = restaurants;
    this.filteredRestaurants = this.restaurants;
  }

  filterRestaurants() {
    const lang = this.i18nService.getCurrentLanguage();

    this.filteredRestaurants = this.restaurants.filter(restaurant => {
      const matchesSearch = this.searchQuery === '' ||
        restaurant.name[lang]?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        restaurant.cuisineType[lang]?.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesCuisine = this.selectedCuisine === '' ||
        restaurant.cuisineType['en'].toLowerCase().includes(this.selectedCuisine.toLowerCase());

      const matchesPriceRange = this.selectedPriceRange === '' ||
        restaurant.priceRange['en'].toLowerCase().includes(this.selectedPriceRange.toLowerCase());

      const matchesRating = this.selectedRating === '' ||
        restaurant.rating >= parseFloat(this.selectedRating);

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
