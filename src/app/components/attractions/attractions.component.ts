import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TourismService } from '../../services/tourism.service';
import { FavoritesService, FavoriteItem } from '../../services/favorites.service';
import { Attraction } from '../../models/tourism.models';
import { I18nService } from 'src/app/services/i18n.service';

@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss']
})
export class AttractionsComponent implements OnInit {
  attractions: Attraction[] = [];
  filteredAttractions: Attraction[] = [];
  totalAttractions = 0;
  loading = true;

  searchQuery = '';
  selectedCategory = '';
  viewMode: 'grid' | 'list' = 'grid';

  constructor(
    private tourismService: TourismService,
    public favoritesService: FavoritesService,
    public i18n: I18nService
  ) {}

  ngOnInit(): void {
    this.tourismService.getAttractions().subscribe((attractions) => {
      this.attractions = attractions ?? [];
      this.totalAttractions = this.attractions.length;
      this.filteredAttractions = this.attractions;
      this.loading = false;
    });
  }

  onSearch(): void {
    this.filterAttractions();
  }

  onFilterChange(): void {
    this.filterAttractions();
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.filterAttractions();
  }

  filterAttractions(): void {
    const list = this.attractions ?? [];
    const qRaw = (this.searchQuery ?? '').trim();
    const lang = this.i18n.getCurrentLanguage();

    const norm = (s: string) =>
      (s ?? '')
        .toLocaleLowerCase(lang)
        .normalize('NFKD');

    const q = norm(qRaw);
    const selectedCat = this.selectedCategory ?? '';

    this.filteredAttractions = list.filter((a) => {
      const name = norm(this.i18n.pick(a.name as any));
      const desc = norm(this.i18n.pick(a.description as any));
      const categoryLabel = this.i18n.pick((a as any).category);

      const matchesQuery =
        !q ||
        name.includes(q) ||
        desc.includes(q) ||
        ((a as any).features ?? [])
          .map((f: any) => norm(this.i18n.pick(f)))
          .some((f: string) => f.includes(q));

      const matchesCategory = !selectedCat || categoryLabel === selectedCat;

      return matchesQuery && matchesCategory;
    });
  }

  /**
   * Toggle favorite for attraction
   * @param attraction - The attraction to toggle
   * @param event - Mouse event (optional) to prevent bubbling
   */
  toggleFavorite(attraction: Attraction, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const favoriteItem: FavoriteItem = {
      id: attraction.id,
      type: 'attraction',
      name: typeof attraction.name === 'string' ? attraction.name : attraction.name.en,
      nameAr: typeof attraction.name === 'string' ? attraction.name : attraction.name.ar,
      image: attraction.imageGallery?.[0] || '/assets/images/placeholder.jpg',
      category: typeof attraction.category === 'string' ? attraction.category : attraction.category?.en,
      categoryAr: typeof attraction.category === 'string' ? attraction.category : attraction.category?.ar,
      rating: attraction.rating,
      addedAt: new Date()
    };

    const isNowFavorite = this.favoritesService.toggleFavorite(favoriteItem);
    
    // Optional: Show toast notification
    // const message = isNowFavorite 
    //   ? this.i18n.translate('addedToFavorites') 
    //   : this.i18n.translate('removedFromFavorites');
    // this.showToast(message);
  }

  /**
   * Check if attraction is favorite
   * @param attractionId - The ID of the attraction to check
   * @returns true if the attraction is in favorites
   */
  isFavorite(attractionId: string): boolean {
    return this.favoritesService.isFavorite(attractionId);
  }

  trackByAttractionId(index: number, attraction: Attraction): string {
    return attraction.id;
  }

  // Category helpers
  get catHistoricalSite(): string {
    return this.i18n.pick({ en: 'Historical Site', ar: 'موقع تاريخي' });
  }
  get catArchaeologicalSite(): string {
    return this.i18n.pick({ en: 'Archaeological Site', ar: 'موقع أثري' });
  }
  get catReligiouIsamicSite(): string {
    return this.i18n.pick({ en: 'Islamic Religious Site', ar:  'موقع ديني اسلامي' });
  }
  get catReligiouChristianSite(): string {
    return this.i18n.pick({ en: 'Christian religious site', ar:  'موقع ديني مسيحي' });
  }
  get catScenicArea(): string {
    return this.i18n.pick({ en: 'Scenic Area', ar: 'منطقة طبيعية' });
  }
  get museum() : string {
    return this.i18n.pick({en: 'Museum' , ar : 'متحف'})
  }
}
