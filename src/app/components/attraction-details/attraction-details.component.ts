import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { TourismService } from '../../services/tourism.service';
import { Attraction } from '../../models/tourism.models';
import { I18nService } from 'src/app/services/i18n.service';

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
  showFreeLabel = false;

  constructor(
    private route: ActivatedRoute,
    private tourismService: TourismService,
    public i18n: I18nService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadAttraction(id);
    });
  }

  handleBookClick(e?: Event) {
    // If bookingUrl is literally the string 'null' we treat it as a free booking.
    if (this.attraction && this.attraction.bookingUrl === 'null') {
      this.showFreeLabel = true;
      // optionally prevent navigation if called from an anchor
      if (e) e.preventDefault();
  // hide label after 5s
  setTimeout(() => this.showFreeLabel = false, 5000);
    }
  }

  private loadAttraction(id: string) {
    this.tourismService.getAttractionById(id).subscribe(attraction => {
      if (attraction) {
        this.attraction = attraction;
        const gallery = attraction.imageGallery ?? [];
        this.currentImage = gallery[0] || attraction.imageUrl;
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
      this.relatedAttractions = (attractions ?? [])
        .filter(a => a.id !== this.attraction!.id)
        .slice(0, 3);
    });
  }

  nextImage() {
    if (!this.attraction) return;
    const gallery = this.attraction.imageGallery ?? [];
    if (this.currentImageIndex >= gallery.length - 1) return;

    this.currentImageIndex++;
    this.currentImage = gallery[this.currentImageIndex];
  }

  previousImage() {
    if (!this.attraction) return;
    if (this.currentImageIndex <= 0) return;

    this.currentImageIndex--;
    this.currentImage = (this.attraction.imageGallery ?? [])[this.currentImageIndex];
  }

  goToImage(index: number) {
    if (!this.attraction) return;
    const gallery = this.attraction.imageGallery ?? [];
    if (index < 0 || index >= gallery.length) return;

    this.currentImageIndex = index;
    this.currentImage = gallery[index];
  }

  addToFavorites() {
    if (this.attraction) {
      console.log('Added to favorites:', this.i18n.pick((this.attraction as any).name));
      // Implement favorites functionality here
    }
  }

  getVisitorEstimate(): string {
    if (!this.attraction) return '0';
    const estimate = Math.floor(this.attraction.rating * this.attraction.reviewCount * 50);
    if (estimate >= 1000) {
      return this.i18n.formatNumber(Math.floor(estimate / 1000)) + 'K+';
    }
    return this.i18n.formatNumber(estimate);
  }

  pickedFeatures(a: Attraction): string[] {
    const raw = (a as any)?.features ?? [];
    return this.i18n.pickArray(raw);
  }


  getMapsUrl(): string {
  if (!this.attraction) return '#';
  const { latitude, longitude } = this.attraction;
  // Opens the pin on Maps
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

getDirectionsUrl(): string {
  if (!this.attraction) return '#';
  const { latitude, longitude } = this.attraction;
  // Starts directions to the lat,lng
  // Optionally include a label (best-effort – Google ignores it if unsupported)
  const label = encodeURIComponent(this.i18n.pick((this.attraction as any).name) || '');
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_place_id=&destination_name=${label}`;
}
}
