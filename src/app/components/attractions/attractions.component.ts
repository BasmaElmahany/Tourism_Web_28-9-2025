import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TourismService } from '../../services/tourism.service';
import { Attraction } from '../../models/tourism.models';

@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="attractions-container">
      <!-- Page Header -->
      <section class="page-header">
        <div class="header-background">
          <img src="/assets/images/hero_banner.png" alt="Minya Attractions" class="header-image">
          <div class="header-overlay"></div>
        </div>
        <div class="header-content">
          <div class="container">
            <h1 class="page-title fade-in">Discover Minya's Attractions</h1>
            <p class="page-subtitle fade-in">
              Explore ancient wonders and historical treasures that have captivated visitors for millennia
            </p>
          </div>
        </div>
      </section>

      <!-- Filters and Search -->
      <section class="filters-section">
        <div class="container">
          <div class="filters-header">
            <div class="search-container">
              <div class="search-input-wrapper">
                <span class="material-icons search-icon">search</span>
                <input 
                  type="text" 
                  placeholder="Search attractions..." 
                  class="search-input"
                  [(ngModel)]="searchQuery"
                  (input)="onSearch()"
                >
              </div>
            </div>
            
            <div class="view-controls">
              <div class="filter-dropdown">
                <select [(ngModel)]="selectedCategory" (change)="onFilterChange()" class="filter-select">
                  <option value="">All Categories</option>
                  <option value="Historical Site">Historical Sites</option>
                  <option value="Archaeological Site">Archaeological Sites</option>
                  <option value="Ancient City">Ancient Cities</option>
                  <option value="Scenic Area">Scenic Areas</option>
                </select>
              </div>
              
              <div class="view-toggle">
                <button 
                  class="view-btn"
                  [class.active]="viewMode === 'grid'"
                  (click)="setViewMode('grid')"
                  title="Grid View"
                >
                  <span class="material-icons">grid_view</span>
                </button>
                <button 
                  class="view-btn"
                  [class.active]="viewMode === 'list'"
                  (click)="setViewMode('list')"
                  title="List View"
                >
                  <span class="material-icons">view_list</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Results Info -->
          <div class="results-info" *ngIf="filteredAttractions.length > 0">
            <p>Showing {{ filteredAttractions.length }} of {{ totalAttractions }} attractions</p>
          </div>
        </div>
      </section>

      <!-- Attractions Grid/List -->
      <section class="attractions-section">
        <div class="container">
          <!-- Loading State -->
          <div class="loading-container" *ngIf="loading">
            <div class="spinner"></div>
            <p>Loading attractions...</p>
          </div>

          <!-- No Results -->
          <div class="no-results" *ngIf="!loading && filteredAttractions.length === 0">
            <div class="no-results-icon">
              <span class="material-icons">search_off</span>
            </div>
            <h3>No attractions found</h3>
            <p>Try adjusting your search criteria or browse all attractions.</p>
            <button class="btn btn-primary" (click)="clearFilters()">
              <span class="material-icons">clear</span>
              Clear Filters
            </button>
          </div>

          <!-- Grid View -->
          <div class="attractions-grid" *ngIf="!loading && filteredAttractions.length > 0 && viewMode === 'grid'">
            <div class="attraction-card" *ngFor="let attraction of filteredAttractions; trackBy: trackByAttractionId">
              <div class="card-image">
                <img [src]="attraction.imageUrl" [alt]="attraction.name" loading="lazy">
                <div class="card-overlay">
                  <div class="rating">
                    <span class="material-icons">star</span>
                    <span>{{ attraction.rating }}</span>
                    <span class="review-count">({{ attraction.reviewCount }})</span>
                  </div>
                  <div class="category-badge">{{ attraction.category }}</div>
                </div>
              </div>
              <div class="card-content">
                <h3 class="attraction-name">{{ attraction.name }}</h3>
                <p class="attraction-description">{{ attraction.description | slice:0:120 }}...</p>
                
                <div class="attraction-details">
                  <div class="detail-item">
                    <span class="material-icons">schedule</span>
                    <span>{{ attraction.openingHours }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="material-icons">local_offer</span>
                    <span>{{ attraction.ticketPrice }}</span>
                  </div>
                </div>

                <div class="card-actions">
                  <a [routerLink]="['/attractions', attraction.id]" class="btn btn-primary">
                    <span class="material-icons">visibility</span>
                    View Details
                  </a>
                  <button class="btn btn-secondary" (click)="addToFavorites(attraction)">
                    <span class="material-icons">favorite_border</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- List View -->
          <div class="attractions-list" *ngIf="!loading && filteredAttractions.length > 0 && viewMode === 'list'">
            <div class="attraction-list-item" *ngFor="let attraction of filteredAttractions; trackBy: trackByAttractionId">
              <div class="list-item-image">
                <img [src]="attraction.imageUrl" [alt]="attraction.name" loading="lazy">
              </div>
              <div class="list-item-content">
                <div class="list-item-header">
                  <h3 class="attraction-name">{{ attraction.name }}</h3>
                  <div class="rating">
                    <span class="material-icons">star</span>
                    <span>{{ attraction.rating }}</span>
                    <span class="review-count">({{ attraction.reviewCount }} reviews)</span>
                  </div>
                </div>
                
                <p class="attraction-description">{{ attraction.description }}</p>
                
                <div class="list-item-details">
                  <div class="detail-group">
                    <div class="detail-item">
                      <span class="material-icons">category</span>
                      <span>{{ attraction.category }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="material-icons">schedule</span>
                      <span>{{ attraction.openingHours }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="material-icons">local_offer</span>
                      <span>{{ attraction.ticketPrice }}</span>
                    </div>
                  </div>
                  
                  <div class="features-list" *ngIf="attraction.features.length > 0">
                    <span class="feature-tag" *ngFor="let feature of attraction.features.slice(0, 3)">
                      {{ feature }}
                    </span>
                  </div>
                </div>

                <div class="list-item-actions">
                  <a [routerLink]="['/attractions', attraction.id]" class="btn btn-primary">
                    <span class="material-icons">visibility</span>
                    View Details
                  </a>
                  <button class="btn btn-secondary" (click)="addToFavorites(attraction)">
                    <span class="material-icons">favorite_border</span>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Section -->
      <section class="featured-section" *ngIf="!loading && filteredAttractions.length > 0">
        <div class="container">
          <h2 class="section-title">Why Visit Minya?</h2>
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">
                <span class="material-icons">history_edu</span>
              </div>
              <h3>Rich History</h3>
              <p>Explore 4,000 years of Egyptian civilization through well-preserved monuments and artifacts.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <span class="material-icons">landscape</span>
              </div>
              <h3>Scenic Beauty</h3>
              <p>Experience the timeless beauty of the Nile River and surrounding desert landscapes.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <span class="material-icons">groups</span>
              </div>
              <h3>Cultural Heritage</h3>
              <p>Immerse yourself in authentic Egyptian culture and traditions that continue today.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .attractions-container {
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

    .filters-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      margin-bottom: 1rem;
    }

    .search-container {
      flex: 1;
      max-width: 400px;
    }

    .search-input-wrapper {
      position: relative;
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

    .view-controls {
      display: flex;
      align-items: center;
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
    }

    .filter-select:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .view-toggle {
      display: flex;
      background: var(--background-color);
      border-radius: 8px;
      padding: 0.25rem;
    }

    .view-btn {
      padding: 0.5rem;
      border: none;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      color: var(--text-secondary);
    }

    .view-btn.active {
      background: var(--primary-color);
      color: white;
    }

    .view-btn:hover:not(.active) {
      background: rgba(26, 54, 93, 0.1);
      color: var(--primary-color);
    }

    .results-info {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    /* Attractions Section */
    .attractions-section {
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

    /* Grid View */
    .attractions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    .attraction-card {
      background: var(--white);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .attraction-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .card-image {
      position: relative;
      height: 250px;
      overflow: hidden;
    }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .attraction-card:hover .card-image img {
      transform: scale(1.05);
    }

    .card-overlay {
      position: absolute;
      top: 1rem;
      left: 1rem;
      right: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .rating {
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 0.5rem 0.75rem;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.9rem;
    }

    .rating .material-icons {
      font-size: 1rem;
      color: #FFD700;
    }

    .review-count {
      font-size: 0.8rem;
      opacity: 0.8;
    }

    .category-badge {
      background: var(--primary-color);
      color: white;
      padding: 0.5rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .card-content {
      padding: 1.5rem;
    }

    .attraction-name {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: var(--text-primary);
    }

    .attraction-description {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .attraction-details {
      margin-bottom: 1.5rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .detail-item .material-icons {
      font-size: 1rem;
      color: var(--primary-color);
    }

    .card-actions {
      display: flex;
      gap: 0.75rem;
    }

    .card-actions .btn {
      flex: 1;
    }

    .card-actions .btn-secondary {
      flex: 0;
      padding: 0.75rem;
    }

    /* List View */
    .attractions-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .attraction-list-item {
      background: var(--white);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      display: flex;
      transition: all 0.3s ease;
    }

    .attraction-list-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .list-item-image {
      width: 300px;
      height: 200px;
      flex-shrink: 0;
      overflow: hidden;
    }

    .list-item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .attraction-list-item:hover .list-item-image img {
      transform: scale(1.05);
    }

    .list-item-content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .list-item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .list-item-details {
      margin-bottom: 1.5rem;
    }

    .detail-group {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .features-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .feature-tag {
      background: var(--background-color);
      color: var(--text-secondary);
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
    }

    .list-item-actions {
      display: flex;
      gap: 1rem;
      margin-top: auto;
    }

    /* Featured Section */
    .featured-section {
      padding: 4rem 0;
      background: var(--background-color);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .feature-item {
      text-align: center;
      padding: 2rem;
      background: var(--white);
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    .feature-icon {
      width: 80px;
      height: 80px;
      background: var(--primary-gradient);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }

    .feature-icon .material-icons {
      font-size: 2rem;
      color: white;
    }

    .feature-item h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .feature-item p {
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .attractions-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      }

      .list-item-image {
        width: 250px;
        height: 180px;
      }
    }

    @media (max-width: 768px) {
      .page-title {
        font-size: 2.5rem;
      }

      .filters-header {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
      }

      .view-controls {
        justify-content: space-between;
      }

      .attractions-grid {
        grid-template-columns: 1fr;
      }

      .attraction-list-item {
        flex-direction: column;
      }

      .list-item-image {
        width: 100%;
        height: 200px;
      }

      .list-item-header {
        flex-direction: column;
        gap: 0.5rem;
      }

      .detail-group {
        flex-direction: column;
        gap: 0.5rem;
      }

      .list-item-actions {
        flex-direction: column;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .page-title {
        font-size: 2rem;
      }

      .card-actions {
        flex-direction: column;
      }

      .card-actions .btn-secondary {
        flex: 1;
      }
    }
  `]
})
export class AttractionsComponent implements OnInit {
  attractions: Attraction[] = [];
  filteredAttractions: Attraction[] = [];
  loading = false;
  searchQuery = '';
  selectedCategory = '';
  viewMode: 'grid' | 'list' = 'grid';
  totalAttractions = 0;

  constructor(private tourismService: TourismService) {}

  ngOnInit() {
    this.loadAttractions();
  }

  private loadAttractions() {
    this.loading = true;
    this.tourismService.getAttractions().subscribe(attractions => {
      this.attractions = attractions;
      this.filteredAttractions = attractions;
      this.totalAttractions = attractions.length;
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
    let filtered = this.attractions;

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(attraction =>
        attraction.name.toLowerCase().includes(query) ||
        attraction.description.toLowerCase().includes(query) ||
        attraction.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(attraction =>
        attraction.category === this.selectedCategory
      );
    }

    this.filteredAttractions = filtered;
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.filteredAttractions = this.attractions;
  }

  addToFavorites(attraction: Attraction) {
    // Implement favorites functionality
    console.log('Added to favorites:', attraction.name);
    // You can add actual favorites logic here
  }

  trackByAttractionId(index: number, attraction: Attraction): string {
    return attraction.id;
  }
}
