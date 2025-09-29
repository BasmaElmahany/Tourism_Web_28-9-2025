import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TourismService } from '../../services/tourism.service';
import { Hotel } from '../../models/tourism.models';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  loading = false;
  searchQuery = '';
  selectedStarRating = '';
  selectedPriceRange = '';

  constructor(private tourismService: TourismService) {}

  ngOnInit() {
    this.loadHotels();
  }

  private loadHotels() {
    this.loading = true;
    this.tourismService.getHotels().subscribe(hotels => {
      this.hotels = hotels;
      this.filteredHotels = hotels;
      this.loading = false;
    });
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  private applyFilters() {
    let filtered = this.hotels;

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(query) ||
        hotel.description.toLowerCase().includes(query)
      );
    }

    // Apply star rating filter
    if (this.selectedStarRating) {
      const rating = parseInt(this.selectedStarRating);
      filtered = filtered.filter(hotel => hotel.starRating === rating);
    }

    // Apply price range filter
    if (this.selectedPriceRange) {
      filtered = filtered.filter(hotel => {
        const priceRange = hotel.priceRange.toLowerCase();
        switch (this.selectedPriceRange) {
          case 'budget':
            return priceRange.includes('500') && !priceRange.includes('1000');
          case 'mid':
            return priceRange.includes('500') || priceRange.includes('900');
          case 'luxury':
            return priceRange.includes('1000') || priceRange.includes('1500');
          default:
            return true;
        }
      });
    }

    this.filteredHotels = filtered;
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedStarRating = '';
    this.selectedPriceRange = '';
    this.filteredHotels = this.hotels;
  }

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  viewHotelDetails(hotel: Hotel) {
    console.log('View hotel details:', hotel.name);
    // Implement hotel details view
  }

  bookHotel(hotel: Hotel) {
    console.log('Book hotel:', hotel.name);
    // Implement hotel booking functionality
  }
}
