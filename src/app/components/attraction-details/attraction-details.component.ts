import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { TourismService } from '../../services/tourism.service';
import { Attraction } from '../../models/tourism.models';

@Component({
  selector: 'app-attraction-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="attraction-details-container" *ngIf="attraction">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-background">
          <img [src]="currentImage" [alt]="attraction.name" class="hero-image">
          <div class="hero-overlay"></div>
        </div>
        
        <div class="hero-content">
          <div class="container">
            <div class="breadcrumb">
              <a routerLink="/home">Home</a>
              <span class="material-icons">chevron_right</span>
              <a routerLink="/attractions">Attractions</a>
              <span class="material-icons">chevron_right</span>
              <span>{{ attraction.name }}</span>
            </div>
            
            <div class="hero-info">
              <h1 class="attraction-title">{{ attraction.name }}</h1>
              <div class="attraction-meta">
                <div class="rating-info">
                  <div class="rating">
                    <span class="material-icons">star</span>
                    <span class="rating-value">{{ attraction.rating }}</span>
                  </div>
                  <span class="review-count">{{ attraction.reviewCount }} reviews</span>
                </div>
                <div class="category-badge">{{ attraction.category }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Image Gallery Navigation -->
        <div class="gallery-nav" *ngIf="attraction.imageGallery.length > 1">
          <button 
            class="gallery-btn prev" 
            (click)="previousImage()"
            [disabled]="currentImageIndex === 0"
          >
            <span class="material-icons">chevron_left</span>
          </button>
          <button 
            class="gallery-btn next" 
            (click)="nextImage()"
            [disabled]="currentImageIndex === attraction.imageGallery.length - 1"
          >
            <span class="material-icons">chevron_right</span>
          </button>
        </div>

        <!-- Gallery Indicators -->
        <div class="gallery-indicators" *ngIf="attraction.imageGallery.length > 1">
          <button 
            *ngFor="let image of attraction.imageGallery; let i = index"
            class="indicator"
            [class.active]="i === currentImageIndex"
            (click)="goToImage(i)"
          ></button>
        </div>
      </section>

      <!-- Main Content -->
      <section class="main-content">
        <div class="container">
          <div class="content-grid">
            <!-- Left Column - Details -->
            <div class="details-column">
              <!-- Description -->
              <div class="content-section">
                <h2>About This Attraction</h2>
                <p class="description">{{ attraction.description }}</p>
                
                <div class="historical-info" *ngIf="attraction.historicalPeriod || attraction.significance">
                  <div class="info-item" *ngIf="attraction.historicalPeriod">
                    <h4>Historical Period</h4>
                    <p>{{ attraction.historicalPeriod }}</p>
                  </div>
                  <div class="info-item" *ngIf="attraction.significance">
                    <h4>Historical Significance</h4>
                    <p>{{ attraction.significance }}</p>
                  </div>
                </div>
              </div>

              <!-- Features -->
              <div class="content-section" *ngIf="attraction.features.length > 0">
                <h2>Features & Amenities</h2>
                <div class="features-grid">
                  <div class="feature-item" *ngFor="let feature of attraction.features">
                    <span class="material-icons">check_circle</span>
                    <span>{{ feature }}</span>
                  </div>
                </div>
              </div>

              <!-- Image Gallery Thumbnails -->
              <div class="content-section" *ngIf="attraction.imageGallery.length > 1">
                <h2>Photo Gallery</h2>
                <div class="thumbnail-gallery">
                  <div 
                    class="thumbnail"
                    *ngFor="let image of attraction.imageGallery; let i = index"
                    [class.active]="i === currentImageIndex"
                    (click)="goToImage(i)"
                  >
                    <img [src]="image" [alt]="attraction.name + ' - Image ' + (i + 1)" loading="lazy">
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Info Card -->
            <div class="info-column">
              <div class="info-card">
                <h3>Visit Information</h3>
                
                <div class="info-item">
                  <div class="info-label">
                    <span class="material-icons">schedule</span>
                    Opening Hours
                  </div>
                  <div class="info-value">{{ attraction.openingHours }}</div>
                </div>

                <div class="info-item">
                  <div class="info-label">
                    <span class="material-icons">local_offer</span>
                    Ticket Price
                  </div>
                  <div class="info-value">{{ attraction.ticketPrice }}</div>
                </div>

                <div class="info-item">
                  <div class="info-label">
                    <span class="material-icons">place</span>
                    Location
                  </div>
                  <div class="info-value">
                    {{ attraction.latitude.toFixed(4) }}, {{ attraction.longitude.toFixed(4) }}
                  </div>
                </div>

                <div class="action-buttons">
                  <button class="btn btn-primary full-width">
                    <span class="material-icons">directions</span>
                    Get Directions
                  </button>
                  <button class="btn btn-secondary full-width" (click)="addToFavorites()">
                    <span class="material-icons">favorite_border</span>
                    Save to Favorites
                  </button>
                  <button class="btn btn-accent full-width">
                    <span class="material-icons">share</span>
                    Share
                  </button>
                </div>
              </div>

              <!-- Quick Stats -->
              <div class="stats-card">
                <h3>Quick Stats</h3>
                <div class="stat-item">
                  <span class="stat-value">{{ attraction.rating }}/5</span>
                  <span class="stat-label">Average Rating</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ attraction.reviewCount }}</span>
                  <span class="stat-label">Total Reviews</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ getVisitorEstimate() }}</span>
                  <span class="stat-label">Annual Visitors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Attractions -->
      <section class="related-section" *ngIf="relatedAttractions.length > 0">
        <div class="container">
          <h2 class="section-title">You Might Also Like</h2>
          <div class="related-grid">
            <div class="related-card" *ngFor="let related of relatedAttractions">
              <div class="related-image">
                <img [src]="related.imageUrl" [alt]="related.name" loading="lazy">
              </div>
              <div class="related-content">
                <h4>{{ related.name }}</h4>
                <p>{{ related.description | slice:0:80 }}...</p>
                <div class="related-meta">
                  <div class="rating">
                    <span class="material-icons">star</span>
                    <span>{{ related.rating }}</span>
                  </div>
                  <span class="price">{{ related.ticketPrice }}</span>
                </div>
                <a [routerLink]="['/attractions', related.id]" class="btn btn-primary btn-sm">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Loading State -->
    <div class="loading-container" *ngIf="!attraction && !error">
      <div class="spinner"></div>
      <p>Loading attraction details...</p>
    </div>

    <!-- Error State -->
    <div class="error-container" *ngIf="error">
      <div class="error-icon">
        <span class="material-icons">error_outline</span>
      </div>
      <h2>Attraction Not Found</h2>
      <p>The attraction you're looking for doesn't exist or has been removed.</p>
      <a routerLink="/attractions" class="btn btn-primary">
        <span class="material-icons">arrow_back</span>
        Back to Attractions
      </a>
    </div>
  `,
  styles: [`
    .attraction-details-container {
      min-height: 100vh;
    }

    /* Hero Section */
    .hero-section {
      position: relative;
      height: 70vh;
      overflow: hidden;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.1) 50%,
        rgba(0, 0, 0, 0.7) 100%
      );
    }

    .hero-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
      color: white;
      padding: 2rem 0;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }

    .breadcrumb a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .breadcrumb a:hover {
      color: white;
    }

    .breadcrumb .material-icons {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .hero-info {
      max-width: 800px;
    }

    .attraction-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .attraction-meta {
      display: flex;
      align-items: center;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .rating-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      background: rgba(0, 0, 0, 0.5);
      padding: 0.5rem 1rem;
      border-radius: 25px;
    }

    .rating .material-icons {
      color: #FFD700;
      font-size: 1.2rem;
    }

    .rating-value {
      font-weight: 600;
      font-size: 1.1rem;
    }

    .review-count {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.9rem;
    }

    .category-badge {
      background: var(--primary-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 25px;
      font-size: 0.9rem;
      font-weight: 500;
    }

    /* Gallery Navigation */
    .gallery-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
      z-index: 3;
    }

    .gallery-btn {
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .gallery-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    .gallery-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .gallery-indicators {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 0.5rem;
      z-index: 3;
    }

    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.5);
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .indicator.active {
      background: white;
      border-color: white;
    }

    /* Main Content */
    .main-content {
      padding: 4rem 0;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
    }

    .content-section {
      margin-bottom: 3rem;
    }

    .content-section h2 {
      font-size: 1.75rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--text-primary);
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }

    .historical-info {
      background: var(--background-color);
      padding: 2rem;
      border-radius: 12px;
      border-left: 4px solid var(--primary-color);
    }

    .info-item {
      margin-bottom: 1.5rem;
    }

    .info-item:last-child {
      margin-bottom: 0;
    }

    .info-item h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    .info-item p {
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* Features */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: var(--white);
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .feature-item .material-icons {
      color: var(--primary-color);
      font-size: 1.2rem;
    }

    /* Thumbnail Gallery */
    .thumbnail-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1rem;
    }

    .thumbnail {
      aspect-ratio: 1;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      border: 3px solid transparent;
      transition: all 0.3s ease;
    }

    .thumbnail.active {
      border-color: var(--primary-color);
    }

    .thumbnail:hover {
      transform: scale(1.05);
    }

    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Info Card */
    .info-card {
      background: var(--white);
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
      position: sticky;
      top: 100px;
    }

    .info-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--text-primary);
    }

    .info-card .info-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .info-card .info-item:last-of-type {
      border-bottom: none;
    }

    .info-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .info-label .material-icons {
      color: var(--primary-color);
      font-size: 1.2rem;
    }

    .info-value {
      color: var(--text-secondary);
      text-align: right;
      max-width: 60%;
    }

    .action-buttons {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .full-width {
      width: 100%;
      justify-content: center;
    }

    /* Stats Card */
    .stats-card {
      background: var(--primary-gradient);
      color: white;
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
    }

    .stats-card h3 {
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
    }

    .stat-item {
      margin-bottom: 1rem;
    }

    .stat-item:last-child {
      margin-bottom: 0;
    }

    .stat-value {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      color: var(--golden-sand);
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.9;
    }

    /* Related Section */
    .related-section {
      padding: 4rem 0;
      background: var(--background-color);
    }

    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .related-card {
      background: var(--white);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .related-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .related-image {
      height: 180px;
      overflow: hidden;
    }

    .related-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .related-card:hover .related-image img {
      transform: scale(1.05);
    }

    .related-content {
      padding: 1.5rem;
    }

    .related-content h4 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: var(--text-primary);
    }

    .related-content p {
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .related-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .related-meta .rating {
      background: none;
      padding: 0;
      color: var(--text-primary);
    }

    .related-meta .rating .material-icons {
      color: #FFD700;
      font-size: 1rem;
    }

    .price {
      font-weight: 600;
      color: var(--accent-color);
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }

    /* Loading and Error States */
    .loading-container,
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
      color: var(--text-secondary);
    }

    .error-icon .material-icons {
      font-size: 4rem;
      color: var(--accent-color);
      margin-bottom: 1rem;
    }

    .error-container h2 {
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .error-container p {
      margin-bottom: 2rem;
      max-width: 400px;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .content-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .info-card {
        position: static;
      }
    }

    @media (max-width: 768px) {
      .hero-section {
        height: 50vh;
      }

      .attraction-title {
        font-size: 2.5rem;
      }

      .attraction-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .gallery-nav {
        padding: 0 1rem;
      }

      .gallery-btn {
        width: 40px;
        height: 40px;
      }

      .main-content {
        padding: 2rem 0;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .thumbnail-gallery {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      }

      .related-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .attraction-title {
        font-size: 2rem;
      }

      .breadcrumb {
        font-size: 0.8rem;
      }

      .info-card {
        padding: 1.5rem;
      }

      .stats-card {
        padding: 1.5rem;
      }

      .stat-value {
        font-size: 1.5rem;
      }
    }
  `]
})
export class AttractionDetailsComponent implements OnInit {
  attraction: Attraction | null = null;
  relatedAttractions: Attraction[] = [];
  currentImageIndex = 0;
  currentImage = '';
  error = false;

  constructor(
    private route: ActivatedRoute,
    private tourismService: TourismService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadAttraction(id);
    });
  }

  private loadAttraction(id: string) {
    this.tourismService.getAttractionById(id).subscribe(attraction => {
      if (attraction) {
        this.attraction = attraction;
        this.currentImage = attraction.imageGallery[0] || attraction.imageUrl;
        this.currentImageIndex = 0;
        this.loadRelatedAttractions();
      } else {
        this.error = true;
      }
    });
  }

  private loadRelatedAttractions() {
    if (!this.attraction) return;

    this.tourismService.getAttractions().subscribe(attractions => {
      this.relatedAttractions = attractions
        .filter(a => a.id !== this.attraction!.id)
        .slice(0, 3);
    });
  }

  nextImage() {
    if (!this.attraction || this.currentImageIndex >= this.attraction.imageGallery.length - 1) return;
    
    this.currentImageIndex++;
    this.currentImage = this.attraction.imageGallery[this.currentImageIndex];
  }

  previousImage() {
    if (!this.attraction || this.currentImageIndex <= 0) return;
    
    this.currentImageIndex--;
    this.currentImage = this.attraction.imageGallery[this.currentImageIndex];
  }

  goToImage(index: number) {
    if (!this.attraction || index < 0 || index >= this.attraction.imageGallery.length) return;
    
    this.currentImageIndex = index;
    this.currentImage = this.attraction.imageGallery[index];
  }

  addToFavorites() {
    if (this.attraction) {
      console.log('Added to favorites:', this.attraction.name);
      // Implement favorites functionality
    }
  }

  getVisitorEstimate(): string {
    if (!this.attraction) return '0';
    
    // Simple estimation based on rating and review count
    const estimate = Math.floor((this.attraction.rating * this.attraction.reviewCount * 50));
    
    if (estimate >= 1000) {
      return Math.floor(estimate / 1000) + 'K+';
    }
    return estimate.toString();
  }
}
