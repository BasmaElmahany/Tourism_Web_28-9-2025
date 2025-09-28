import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TourismService } from '../../services/tourism.service';
import { Attraction, Hotel, Restaurant, Event, BlogPost } from '../../models/tourism.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-background">
          <img src="/assets/images/hero_banner.png" alt="Minya Tourism" class="hero-image">
          <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
          <div class="container">
            <div class="hero-text fade-in">
              <h1 class="hero-title">Discover Ancient Egypt in Minya</h1>
              <p class="hero-subtitle">
                Explore the hidden treasures of Minya, where ancient history meets the timeless beauty of the Nile River. 
                Journey through millennia of Egyptian heritage and create unforgettable memories.
              </p>
              <div class="hero-actions">
                <a routerLink="/attractions" class="btn btn-primary">
                  <span class="material-icons">explore</span>
                  Explore Attractions
                </a>
                <a routerLink="/itineraries" class="btn btn-secondary">
                  <span class="material-icons">map</span>
                  Plan Your Trip
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-scroll-indicator">
          <span class="material-icons">keyboard_arrow_down</span>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="quick-actions-section">
        <div class="container">
          <div class="quick-actions-grid">
            <a routerLink="/attractions" class="quick-action-card">
              <div class="quick-action-icon">
                <span class="material-icons">place</span>
              </div>
              <h3>Attractions</h3>
              <p>Discover ancient sites</p>
            </a>
            <a routerLink="/hotels" class="quick-action-card">
              <div class="quick-action-icon">
                <span class="material-icons">hotel</span>
              </div>
              <h3>Hotels</h3>
              <p>Find accommodation</p>
            </a>
            <a routerLink="/restaurants" class="quick-action-card">
              <div class="quick-action-icon">
                <span class="material-icons">restaurant</span>
              </div>
              <h3>Restaurants</h3>
              <p>Taste local cuisine</p>
            </a>
            <a routerLink="/events" class="quick-action-card">
              <div class="quick-action-icon">
                <span class="material-icons">event</span>
              </div>
              <h3>Events</h3>
              <p>Cultural experiences</p>
            </a>
          </div>
        </div>
      </section>

      <!-- Featured Attractions -->
      <section class="featured-section">
        <div class="container">
          <h2 class="section-title">Featured Attractions</h2>
          <div class="featured-carousel" *ngIf="featuredAttractions.length > 0">
            <div class="carousel-container">
              <div class="carousel-track" [style.transform]="'translateX(' + (-currentSlide * 100) + '%)'">
                <div class="carousel-slide" *ngFor="let attraction of featuredAttractions">
                  <div class="attraction-card">
                    <div class="card-image">
                      <img [src]="attraction.imageUrl" [alt]="attraction.name" loading="lazy">
                      <div class="card-overlay">
                        <div class="rating">
                          <span class="material-icons">star</span>
                          <span>{{ attraction.rating }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="card-content">
                      <h3>{{ attraction.name }}</h3>
                      <p>{{ attraction.description | slice:0:120 }}...</p>
                      <div class="card-meta">
                        <span class="category">{{ attraction.category }}</span>
                        <span class="price">{{ attraction.ticketPrice }}</span>
                      </div>
                      <a [routerLink]="['/attractions', attraction.id]" class="btn btn-accent">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="carousel-controls">
              <button class="carousel-btn prev" (click)="previousSlide()" [disabled]="currentSlide === 0">
                <span class="material-icons">chevron_left</span>
              </button>
              <button class="carousel-btn next" (click)="nextSlide()" [disabled]="currentSlide >= featuredAttractions.length - 1">
                <span class="material-icons">chevron_right</span>
              </button>
            </div>
            <div class="carousel-indicators">
              <button 
                *ngFor="let attraction of featuredAttractions; let i = index"
                class="indicator"
                [class.active]="i === currentSlide"
                (click)="goToSlide(i)"
              ></button>
            </div>
          </div>
        </div>
      </section>

      <!-- Statistics Section -->
      <section class="stats-section bg-primary">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">12+</div>
              <div class="stat-label">Historic Sites</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">8+</div>
              <div class="stat-label">Hotels</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">15+</div>
              <div class="stat-label">Restaurants</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">125K+</div>
              <div class="stat-label">Annual Visitors</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Latest Blog Posts -->
      <section class="blog-section" *ngIf="latestBlogPosts.length > 0">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Latest Stories</h2>
            <a routerLink="/blog" class="view-all-link">
              View All Posts
              <span class="material-icons">arrow_forward</span>
            </a>
          </div>
          <div class="blog-grid">
            <article class="blog-card" *ngFor="let post of latestBlogPosts">
              <div class="blog-image">
                <img [src]="post.imageUrl" [alt]="post.title" loading="lazy">
                <div class="blog-category">{{ post.category }}</div>
              </div>
              <div class="blog-content">
                <h3>{{ post.title }}</h3>
                <p>{{ post.excerpt }}</p>
                <div class="blog-meta">
                  <span class="author">By {{ post.author }}</span>
                  <span class="read-time">{{ post.readTime }} min read</span>
                </div>
                <a [routerLink]="['/blog', post.id]" class="read-more">
                  Read More
                  <span class="material-icons">arrow_forward</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>Ready to Explore Minya?</h2>
            <p>Start planning your journey through ancient Egypt today. Discover the treasures that await you in Minya.</p>
            <div class="cta-actions">
              <a routerLink="/itineraries" class="btn btn-primary">
                <span class="material-icons">flight_takeoff</span>
                Plan Your Trip
              </a>
              <a routerLink="/visitor-info" class="btn btn-secondary">
                <span class="material-icons">info</span>
                Visitor Guide
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
    }

    /* Hero Section */
    .hero-section {
      position: relative;
      height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(26, 54, 93, 0.8) 0%,
        rgba(45, 90, 135, 0.6) 50%,
        rgba(212, 165, 116, 0.4) 100%
      );
    }

    .hero-content {
      position: relative;
      z-index: 2;
      width: 100%;
      color: white;
    }

    .hero-text {
      max-width: 600px;
      text-align: center;
      margin: 0 auto;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      line-height: 1.2;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2.5rem;
      line-height: 1.6;
      opacity: 0.95;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .hero-scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      color: white;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      40% {
        transform: translateX(-50%) translateY(-10px);
      }
      60% {
        transform: translateX(-50%) translateY(-5px);
      }
    }

    /* Quick Actions */
    .quick-actions-section {
      padding: 4rem 0;
      background: var(--white);
      margin-top: -2rem;
      position: relative;
      z-index: 3;
      border-radius: 2rem 2rem 0 0;
    }

    .quick-actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }

    .quick-action-card {
      background: var(--white);
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
      text-decoration: none;
      color: var(--text-primary);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }

    .quick-action-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
      color: var(--primary-color);
    }

    .quick-action-icon {
      width: 60px;
      height: 60px;
      background: var(--primary-gradient);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      transition: all 0.3s ease;
    }

    .quick-action-icon .material-icons {
      color: white;
      font-size: 1.8rem;
    }

    .quick-action-card:hover .quick-action-icon {
      background: var(--golden-gradient);
      transform: scale(1.1);
    }

    .quick-action-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .quick-action-card p {
      color: var(--text-secondary);
      margin: 0;
    }

    /* Featured Section */
    .featured-section {
      padding: 4rem 0;
      background: var(--background-color);
    }

    .featured-carousel {
      position: relative;
      max-width: 1000px;
      margin: 0 auto;
    }

    .carousel-container {
      overflow: hidden;
      border-radius: 16px;
    }

    .carousel-track {
      display: flex;
      transition: transform 0.5s ease;
    }

    .carousel-slide {
      min-width: 100%;
      padding: 0 1rem;
    }

    .attraction-card {
      background: var(--white);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .attraction-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    .card-image {
      position: relative;
      height: 300px;
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
      right: 1rem;
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

    .card-content {
      padding: 2rem;
    }

    .card-content h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .card-content p {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .category {
      background: var(--primary-color);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .price {
      font-weight: 600;
      color: var(--accent-color);
    }

    /* Carousel Controls */
    .carousel-controls {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
      pointer-events: none;
    }

    .carousel-btn {
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      pointer-events: all;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .carousel-btn:hover:not(:disabled) {
      background: white;
      transform: scale(1.1);
    }

    .carousel-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .carousel-indicators {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
    }

    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: none;
      background: rgba(26, 54, 93, 0.3);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .indicator.active {
      background: var(--primary-color);
      transform: scale(1.2);
    }

    /* Stats Section */
    .stats-section {
      padding: 4rem 0;
      color: white;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      text-align: center;
    }

    .stat-item {
      padding: 1rem;
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--golden-sand);
    }

    .stat-label {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    /* Blog Section */
    .blog-section {
      padding: 4rem 0;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
    }

    .view-all-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .view-all-link:hover {
      color: var(--accent-color);
    }

    .blog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .blog-card {
      background: var(--white);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .blog-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .blog-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .blog-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .blog-category {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: var(--primary-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .blog-content {
      padding: 1.5rem;
    }

    .blog-content h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      line-height: 1.3;
    }

    .blog-content p {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .blog-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .read-more {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .read-more:hover {
      color: var(--accent-color);
    }

    /* CTA Section */
    .cta-section {
      padding: 4rem 0;
      background: var(--golden-gradient);
      color: white;
      text-align: center;
    }

    .cta-content h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .cta-content p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .cta-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }

      .hero-actions {
        flex-direction: column;
        align-items: center;
      }

      .quick-actions-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      .quick-action-card {
        padding: 1.5rem;
      }

      .carousel-controls {
        display: none;
      }

      .section-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .blog-grid {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .cta-content h2 {
        font-size: 2rem;
      }

      .cta-actions {
        flex-direction: column;
        align-items: center;
      }
    }

    @media (max-width: 480px) {
      .hero-title {
        font-size: 2rem;
      }

      .quick-actions-grid {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .stat-number {
        font-size: 2.5rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredAttractions: Attraction[] = [];
  latestBlogPosts: BlogPost[] = [];
  currentSlide = 0;

  constructor(private tourismService: TourismService) {}

  ngOnInit() {
    this.loadFeaturedAttractions();
    this.loadLatestBlogPosts();
  }

  private loadFeaturedAttractions() {
    this.tourismService.getAttractions().subscribe(attractions => {
      this.featuredAttractions = attractions.slice(0, 4); // Show first 4 attractions
    });
  }

  private loadLatestBlogPosts() {
    this.tourismService.getBlogPosts().subscribe(posts => {
      this.latestBlogPosts = posts.slice(0, 2); // Show first 2 blog posts
    });
  }

  nextSlide() {
    if (this.currentSlide < this.featuredAttractions.length - 1) {
      this.currentSlide++;
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
