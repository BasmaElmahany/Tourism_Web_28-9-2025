import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { TourismService } from '../../services/tourism.service';
import { Attraction } from '../../models/tourism.models';

@Component({
  selector: 'app-attraction-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './attraction-details.component.html',

  styleUrls: ['./attraction-details.component.scss']
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
