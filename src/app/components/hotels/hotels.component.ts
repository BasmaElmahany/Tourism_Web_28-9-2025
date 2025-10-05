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
    // إذا لم يكن هناك أي فلتر مفعل، اعرض كل الفنادق مباشرة
    if (!this.searchQuery.trim() && !this.selectedStarRating && !this.selectedPriceRange) {
      this.filteredHotels = this.hotels;
      return;
    }

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

    // Apply price range filter (parse price as number)
    if (this.selectedPriceRange) {
      filtered = filtered.filter(hotel => {
        // Extract first number from priceRange string
        const priceMatch = hotel.priceRange.match(/\d+/);
        const price = priceMatch ? parseInt(priceMatch[0]) : 0;
        switch (this.selectedPriceRange) {
          case 'budget':
            return price > 0 && price < 500;
          case 'mid':
            return price >= 500 && price < 1000;
          case 'luxury':
            return price >= 1000;
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
    // Ensure rating is a valid, non-negative integer
    const safeRating = Math.max(0, Math.round(Number(rating)) || 0);
    return Array(safeRating).fill(0);
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
