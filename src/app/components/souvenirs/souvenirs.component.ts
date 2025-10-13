import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { SouvenirCategory, SouvenirShop } from 'src/app/models/tourism.models';
import { souvenirCategories, souvenirShops } from 'src/app/data/souviners';


@Component({
  selector: 'app-souvenirs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './souvenirs.component.html',
  styleUrls: ['./souvenirs.component.scss']
})
export class SouvenirsComponent implements OnInit {
  categories: SouvenirCategory[] = souvenirCategories;
  shops: SouvenirShop[] = [];
  filteredShops: SouvenirShop[] = [];
  featuredShops: SouvenirShop[] = [];

  selectedCategory = '';
  selectedPriceRange = '';
  onlyFeatured = false;
  acceptsCards = false;
  hasDelivery = false;

  priceRanges = [
    { key: '$', name: 'Budget', nameAr: 'اقتصادي' },
    { key: '$$', name: 'Moderate', nameAr: 'متوسط' },
    { key: '$$$', name: 'Premium', nameAr: 'فاخر' }
  ];

  constructor(public i18n: I18nService) {}

  ngOnInit(): void {
    this.loadShops();
  }

  private loadShops() {
    this.shops = souvenirShops;
    this.filteredShops = this.shops;
    this.featuredShops = this.shops.filter(s => s.isFeatured);
  }

  filterShops() {
    this.filteredShops = this.shops.filter(shop => {
      const matchesCategory = !this.selectedCategory || shop.category === this.selectedCategory;
      const matchesPrice = !this.selectedPriceRange || shop.priceRange === this.selectedPriceRange;
      const matchesFeatured = !this.onlyFeatured || shop.isFeatured;
      const matchesCards = !this.acceptsCards || shop.acceptsCreditCard;
      const matchesDelivery = !this.hasDelivery || shop.hasDelivery;
      
      return matchesCategory && matchesPrice && matchesFeatured && matchesCards && matchesDelivery;
    });
  }

  clearFilters() {
    this.selectedCategory = '';
    this.selectedPriceRange = '';
    this.onlyFeatured = false;
    this.acceptsCards = false;
    this.hasDelivery = false;
    this.filteredShops = this.shops;
  }

  getCategoryName(key: string): string {
    const category = this.categories.find(c => c.key === key);
    return category ? this.i18n.pick({ en: category.name, ar: category.nameAr }) : key;
  }

  getPriceRangeName(key: string): string {
    const range = this.priceRanges.find(r => r.key === key);
    return range ? this.i18n.pick({ en: range.name, ar: range.nameAr }) : key;
  }

  telHref(phone: string) {
    return `tel:${phone.replace(/\s+/g, '')}`;
  }

  mapsHref(shop: SouvenirShop) {
    if (shop.latitude && shop.longitude) {
      return `https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`;
    }
    const q = encodeURIComponent(`${shop.name} ${shop.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }

  emailHref(email: string) {
    return `mailto:${email}`;
  }

  formatDistance(km?: number) {
    if (km == null) return '';
    return `${km.toFixed(1)} km`;
  }

  getShopsByCategory(categoryKey: string): SouvenirShop[] {
    return this.shops.filter(s => s.category === categoryKey).slice(0, 3);
  }
}

