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
  template: `
    <div class="hotels-container">
      <!-- Page Header -->
      <section class="page-header">
        <div class="header-background">
          <img src="/assets/images/nile_river.jpg" alt="Minya Hotels" class="header-image">
          <div class="header-overlay"></div>
        </div>
        <div class="header-content">
          <div class="container">
            <h1 class="page-title fade-in">Hotels in Minya</h1>
            <p class="page-subtitle fade-in">
              Find comfortable accommodations with stunning Nile views and authentic Egyptian hospitality
            </p>
          </div>
        </div>
      </section>

      <!-- Search and Filters -->
      <section class="filters-section">
        <div class="container">
          <div class="search-filters">
            <div class="search-input-wrapper">
              <span class="material-icons search-icon">search</span>
              <input 
                type="text" 
                placeholder="Search hotels..." 
                class="search-input"
                [(ngModel)]="searchQuery"
                (input)="onSearch()"
              >
            </div>
            
            <div class="filter-controls">
              <select [(ngModel)]="selectedStarRating" (change)="onFilterChange()" class="filter-select">
                <option value="">All Star Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
              </select>
              
              <select [(ngModel)]="selectedPriceRange" (change)="onFilterChange()" class="filter-select">
                <option value="">All Price Ranges</option>
                <option value="budget">Budget (Under 500 EGP)</option>
                <option value="mid">Mid-range (500-1000 EGP)</option>
                <option value="luxury">Luxury (1000+ EGP)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- Hotels List -->
      <section class="hotels-section">
        <div class="container">
          <!-- Loading State -->
          <div class="loading-container" *ngIf="loading">
            <div class="spinner"></div>
            <p>Loading hotels...</p>
          </div>

          <!-- Hotels Grid -->
          <div class="hotels-grid" *ngIf="!loading && filteredHotels.length > 0">
            <div class="hotel-card" *ngFor="let hotel of filteredHotels">
              <div class="hotel-image">
                <img [src]="hotel.imageUrl" [alt]="hotel.name" loading="lazy">
                <div class="hotel-overlay">
                  <div class="star-rating">
                    <span class="material-icons" *ngFor="let star of getStarArray(hotel.starRating)">star</span>
                  </div>
                  <div class="rating-badge">
                    <span class="material-icons">star</span>
                    <span>{{ hotel.rating }}</span>
                  </div>
                </div>
              </div>
              
              <div class="hotel-content">
                <h3 class="hotel-name">{{ hotel.name }}</h3>
                <p class="hotel-description">{{ hotel.description | slice:0:120 }}...</p>
                
                <div class="hotel-details">
                  <div class="price-range">
                    <span class="material-icons">local_offer</span>
                    <span>{{ hotel.priceRange }}</span>
                  </div>
                  <div class="review-count">
                    <span class="material-icons">reviews</span>
                    <span>{{ hotel.reviewCount }} reviews</span>
                  </div>
                </div>

                <div class="amenities-preview" *ngIf="hotel.amenities.length > 0">
                  <span class="amenity-tag" *ngFor="let amenity of hotel.amenities.slice(0, 3)">
                    {{ amenity }}
                  </span>
                  <span class="more-amenities" *ngIf="hotel.amenities.length > 3">
                    +{{ hotel.amenities.length - 3 }} more
                  </span>
                </div>

                <div class="hotel-actions">
                  <button class="btn btn-primary" (click)="viewHotelDetails(hotel)">
                    <span class="material-icons">visibility</span>
                    View Details
                  </button>
                  <button class="btn btn-accent" (click)="bookHotel(hotel)">
                    <span class="material-icons">hotel</span>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- No Results -->
          <div class="no-results" *ngIf="!loading && filteredHotels.length === 0">
            <div class="no-results-icon">
              <span class="material-icons">hotel_class</span>
            </div>
            <h3>No hotels found</h3>
            <p>Try adjusting your search criteria or browse all hotels.</p>
            <button class="btn btn-primary" (click)="clearFilters()">
              <span class="material-icons">clear</span>
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      <!-- Hotel Booking Tips -->
      <section class="tips-section">
        <div class="container">
          <h2 class="section-title">Booking Tips</h2>
          <div class="tips-grid">
            <div class="tip-card">
              <div class="tip-icon">
                <span class="material-icons">schedule</span>
              </div>
              <h3>Best Time to Book</h3>
              <p>Book 2-4 weeks in advance for better rates, especially during peak season (October-April).</p>
            </div>
            <div class="tip-card">
              <div class="tip-icon">
                <span class="material-icons">location_on</span>
              </div>
              <h3>Location Matters</h3>
              <p>Hotels near the Nile Corniche offer beautiful river views and easy access to attractions.</p>
            </div>
            <div class="tip-card">
              <div class="tip-icon">
                <span class="material-icons">local_offer</span>
              </div>
              <h3>Package Deals</h3>
              <p>Look for packages that include meals, tours, or transportation for better value.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hotels-container {
      min-height: 100vh;
    }

    /* Page Header */
    .page-header {
      position: relative;
      height: 60vh;
      display: flex;
      align-items: center;
      overflow: hidden;
    }

    .header-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .header-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .header-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(26, 54, 93, 0.8) 0%, rgba(45, 90, 135, 0.6) 100%);
    }

    .header-content {
      position: relative;
      z-index: 2;
      width: 100%;
      color: white;
      text-align: center;
    }

    .page-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .page-subtitle {
      font-size: 1.25rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }

    /* Filters Section */
    .filters-section {
      padding: 2rem 0;
      background: var(--white);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .search-filters {
      display: flex;
      gap: 2rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-input-wrapper {
      position: relative;
      flex: 1;
      min-width: 300px;
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-secondary);
      font-size: 1.2rem;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 3rem;
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-radius: 25px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.1);
    }

    .filter-controls {
      display: flex;
      gap: 1rem;
    }

    .filter-select {
      padding: 0.75rem 1rem;
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      font-size: 1rem;
      background: white;
      cursor: pointer;
      transition: border-color 0.3s ease;
      min-width: 180px;
    }

    .filter-select:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    /* Hotels Section */
    .hotels-section {
      padding: 3rem 0;
    }

    .loading-container {
      text-align: center;
      padding: 4rem 0;
      color: var(--text-secondary);
    }

    .loading-container .spinner {
      margin: 0 auto 1rem;
    }

    .hotels-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 2rem;
    }

    .hotel-card {
      background: var(--white);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .hotel-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .hotel-image {
      position: relative;
      height: 250px;
      overflow: hidden;
    }

    .hotel-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .hotel-card:hover .hotel-image img {
      transform: scale(1.05);
    }

    .hotel-overlay {
      position: absolute;
      top: 1rem;
      left: 1rem;
      right: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .star-rating {
      display: flex;
      gap: 0.1rem;
    }

    .star-rating .material-icons {
      color: #FFD700;
      font-size: 1.2rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }

    .rating-badge {
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 0.5rem 0.75rem;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.9rem;
    }

    .rating-badge .material-icons {
      font-size: 1rem;
      color: #FFD700;
    }

    .hotel-content {
      padding: 1.5rem;
    }

    .hotel-name {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: var(--text-primary);
    }

    .hotel-description {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .hotel-details {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .price-range,
    .review-count {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .price-range .material-icons,
    .review-count .material-icons {
      font-size: 1rem;
      color: var(--primary-color);
    }

    .amenities-preview {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .amenity-tag {
      background: var(--background-color);
      color: var(--text-secondary);
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
    }

    .more-amenities {
      color: var(--primary-color);
      font-size: 0.8rem;
      font-weight: 500;
    }

    .hotel-actions {
      display: flex;
      gap: 0.75rem;
    }

    .hotel-actions .btn {
      flex: 1;
    }

    .no-results {
      text-align: center;
      padding: 4rem 0;
      color: var(--text-secondary);
    }

    .no-results-icon .material-icons {
      font-size: 4rem;
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }

    .no-results h3 {
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    /* Tips Section */
    .tips-section {
      padding: 4rem 0;
      background: var(--background-color);
    }

    .tips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .tip-card {
      background: var(--white);
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }

    .tip-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    }

    .tip-icon {
      width: 80px;
      height: 80px;
      background: var(--primary-gradient);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }

    .tip-icon .material-icons {
      font-size: 2rem;
      color: white;
    }

    .tip-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .tip-card p {
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .page-title {
        font-size: 2.5rem;
      }

      .search-filters {
        flex-direction: column;
        align-items: stretch;
      }

      .search-input-wrapper {
        min-width: auto;
      }

      .filter-controls {
        flex-direction: column;
      }

      .filter-select {
        min-width: auto;
      }

      .hotels-grid {
        grid-template-columns: 1fr;
      }

      .hotel-details {
        flex-direction: column;
        gap: 0.5rem;
      }

      .hotel-actions {
        flex-direction: column;
      }

      .tips-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .page-title {
        font-size: 2rem;
      }

      .hotel-content {
        padding: 1rem;
      }

      .tip-card {
        padding: 1.5rem;
      }
    }
  `]
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
