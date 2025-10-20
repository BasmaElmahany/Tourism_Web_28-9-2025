import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TourismService } from '../../services/tourism.service';
import { Hotel } from '../../models/tourism.models';
import { I18nService } from '../../services/i18n.service'; // <-- added i18n service
import { FavoritesService, FavoriteItem } from '../../services/favorites.service'; // NEW

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
  totalHotels = 0;                   // ← add
  loading = false;
  searchQuery = '';
  selectedStarRating = '';
  selectedPriceRange = '';

  constructor(
    private tourismService: TourismService,
    public i18nService: I18nService,
    private router: Router, public favoritesService: FavoritesService
  ) { }


  ngOnInit() {
    this.loadHotels();
  }

  private loadHotels() {
    this.loading = true;
    this.tourismService.getHotels().subscribe(hotels => {
      this.hotels = hotels;
      this.filteredHotels = hotels;
      this.totalHotels = hotels.length;   // ← add
      this.loading = false;
    });
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  // ... your existing methods ...

  private applyFilters() {
    if (!this.searchQuery.trim() && !this.selectedStarRating && !this.selectedPriceRange) {
      this.filteredHotels = this.hotels;
      this.totalHotels = this.hotels.length; // ← keep count consistent
      return;
    }

    let filtered = this.hotels;

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(hotel =>
        this.getHotelName(hotel).toLowerCase().includes(query) ||
        this.getHotelDescription(hotel).toLowerCase().includes(query)
      );
    }

    if (this.selectedStarRating) {
      const rating = parseInt(this.selectedStarRating, 10);
      filtered = filtered.filter(hotel => Number(hotel.starRating) === rating);
    }

    if (this.selectedPriceRange) {
      filtered = filtered.filter(hotel => {
        const lang = this.lang() as 'en' | 'ar';
        const priceText =
          typeof hotel.priceRange === 'string'
            ? hotel.priceRange
            : hotel.priceRange?.[lang] || '';

        const priceMatch = priceText.match(/\d+/);
        const price = priceMatch ? parseInt(priceMatch[0], 10) : 0;

        switch (this.selectedPriceRange) {
          case 'budget': return price > 0 && price < 500;
          case 'mid': return price >= 500 && price < 1000;
          case 'luxury': return price >= 1000;
          default: return true;
        }
      });
    }

    this.filteredHotels = filtered;
    this.totalHotels = this.hotels.length; // always show total base count
  }

  // TrackBy for performance (used in template)
  trackByHotelId = (_: number, h: Hotel) => h.id;

  getStarArray(rating: number): number[] {
    const safe = Math.min(5, Math.max(0, Math.floor(Number(rating) || 0)));
    return Array.from({ length: safe });
  }
  clearFilters() {
    this.searchQuery = '';
    this.selectedStarRating = '';
    this.selectedPriceRange = '';
    this.filteredHotels = this.hotels;
  }



  viewHotelDetails(hotel: Hotel) {
    // navigate to /hotels/:id
    if (!hotel || !hotel.id) return;
    this.router.navigate(['/hotels', hotel.id]);
  }

  bookHotel(hotel: Hotel) {
    console.log('Book hotel:', this.getHotelName(hotel));
  }

  // ✅ Multi-language helpers
  private lang(): string {
    return this.i18nService.getCurrentLanguage();
  }

  getHotelName(hotel: Hotel): string {
    const lang = this.lang() as 'en' | 'ar';
    return typeof hotel.name === 'string' ? hotel.name : hotel.name[lang] || '';
  }

  getHotelDescription(hotel: Hotel): string {
    const lang = this.lang() as 'en' | 'ar';
    return typeof hotel.description === 'string' ? hotel.description : hotel.description[lang] || '';
  }

  getAmenity(amenity: any): string {
    return typeof amenity === 'string' ? amenity : amenity[this.lang()] || '';
  }


  toggleFavorite(hotel: Hotel, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const nameEn =
      typeof hotel.name === 'string'
        ? (hotel.name as string)
        : ((hotel.name as Record<'en' | 'ar', string>).en ?? '');

    const nameAr =
      typeof hotel.name === 'string'
        ? (hotel.name as string) // or '' if you want Arabic empty when original is a plain string
        : ((hotel.name as Record<'en' | 'ar', string>).ar ?? '');

    // hotels may not have a category; default sensibly
    const catIsString = typeof (hotel as any).category === 'string';
    const catEn = catIsString
      ? (hotel as any).category
      : ((hotel as any).category?.en ?? this.i18nService.translate('hotel') ?? 'Hotel');
    const catAr = catIsString
      ? (hotel as any).category
      : ((hotel as any).category?.ar ?? this.i18nService.translate('hotel') ?? 'فندق');

    const favoriteItem: FavoriteItem = {
      id: hotel.id,
      type: 'hotel',
      name: nameEn,
      nameAr: nameAr,
      image: hotel.imageUrl || '/assets/images/placeholder.jpg',
      category: catEn,
      categoryAr: catAr,
      rating: (hotel as any).rating,
      addedAt: new Date()
    };

    const isNowFavorite = this.favoritesService.toggleFavorite(favoriteItem);

    // Optional toast (same pattern you used in Attractions)
    // const message = isNowFavorite
    //   ? this.i18nService.translate('addedToFavorites')
    //   : this.i18nService.translate('removedFromFavorites');
    // this.showToast(message);
  }

  isFavorite(hotelId: string): boolean {
    return this.favoritesService.isFavorite(hotelId);
  }

}
