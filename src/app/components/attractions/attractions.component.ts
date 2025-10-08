import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TourismService } from '../../services/tourism.service';
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
  selectedCategory = ''; // holds a localized category label or '' (all)
  viewMode: 'grid' | 'list' = 'grid';

  constructor(private tourismService: TourismService, public i18n: I18nService) {}

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

  addToFavorites(attraction: Attraction) {
    // Implement favorites functionality as desired
    console.log('Added to favorites:', this.i18n.pick(attraction.name as any));
  }

  trackByAttractionId(index: number, attraction: Attraction): string {
    return attraction.id;
  }

  // Helpers to bind localized category values used in data
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
