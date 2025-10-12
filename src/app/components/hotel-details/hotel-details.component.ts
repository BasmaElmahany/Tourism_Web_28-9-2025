import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { TourismService } from '../../services/tourism.service';
import { Hotel } from '../../models/tourism.models';
import { I18nService } from 'src/app/services/i18n.service';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {
  hotel: Hotel | null = null;
  relatedHotels: Hotel[] = [];
  currentImageIndex = 0;
  currentImage = '';
  error = false;

  constructor(
    private route: ActivatedRoute,
    private tourismService: TourismService,
    public i18n: I18nService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadHotel(id);
    });
  }

  private loadHotel(id: string) {
    this.tourismService.getHotelById(id).subscribe(hotel => {
      if (hotel) {
        this.hotel = hotel;
        const gallery = hotel.imageGallery ?? [];
        this.currentImage = gallery[0] || hotel.imageUrl;
        this.currentImageIndex = 0;
        this.loadRelatedHotels();
      } else {
        this.error = true;
      }
    });
  }

  private loadRelatedHotels() {
    if (!this.hotel) return;

    this.tourismService.getHotels().subscribe(hotels => {
      this.relatedHotels = (hotels ?? [])
        .filter(h => h.id !== this.hotel!.id)
        .slice(0, 3);
    });
  }

  nextImage() {
    if (!this.hotel) return;
    const gallery = this.hotel.imageGallery ?? [];
    if (this.currentImageIndex >= gallery.length - 1) return;

    this.currentImageIndex++;
    this.currentImage = gallery[this.currentImageIndex];
  }

  previousImage() {
    if (!this.hotel) return;
    if (this.currentImageIndex <= 0) return;

    this.currentImageIndex--;
    this.currentImage = (this.hotel.imageGallery ?? [])[this.currentImageIndex];
  }

  goToImage(index: number) {
    if (!this.hotel) return;
    const gallery = this.hotel.imageGallery ?? [];
    if (index < 0 || index >= gallery.length) return;

    this.currentImageIndex = index;
    this.currentImage = gallery[index];
  }

  addToFavorites() {
    if (this.hotel) {
      console.log('Added to favorites:', this.i18n.pick((this.hotel as any).name));
      // Implement favorites functionality here
    }
  }

  getVisitorEstimate(): string {
    if (!this.hotel) return '0';
    const estimate = Math.floor(this.hotel.rating * this.hotel.reviewCount * 50);
    if (estimate >= 1000) {
      return this.i18n.formatNumber(Math.floor(estimate / 1000)) + 'K+';
    }
    return this.i18n.formatNumber(estimate);
  }

  pickedAmenities(h: Hotel): string[] {
    const raw = (h as any)?.amenities ?? [];
    return this.i18n.pickArray(raw);
  }

  mapsHref(): string {
    if (!this.hotel) return 'https://www.google.com/maps';
    const lat = this.hotel.latitude;
    const lng = this.hotel.longitude;
    if (typeof lat === 'number' && typeof lng === 'number') {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lat + ',' + lng)}`;
    }
    // fallback to name/address
    const fallback = this.i18n.pick(this.hotel.name);
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fallback)}`;
  }
}
