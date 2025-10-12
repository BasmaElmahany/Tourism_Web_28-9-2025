import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photographer } from '../../models/tourism.models';
import { TourismService } from '../../services/tourism.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-photographer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photographer.component.html',
  styleUrls: ['./photographer.component.scss']
})
export class PhotographerComponent implements OnInit {
  photographers: Photographer[] = [];
  loading = false;
  shownPhone: Record<string, string> = {};
  shownEmail: Record<string, string> = {};

  constructor(private tourism: TourismService, public i18n: I18nService) {}

  ngOnInit() {
    this.loading = true;
    this.tourism.getPhotographers().subscribe((p: any[]) => {
      this.photographers = p || [];
      this.loading = false;
    });
  }

  pickText(v: any) { return this.i18n.pick(v); }

  mapsHref(p: Photographer) {
    const lat = p.location?.latitude;
    const lng = p.location?.longitude;
    if (typeof lat === 'number' && typeof lng === 'number') {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lat + ',' + lng)}`;
    }
    const fallback = typeof p.name === 'string' ? p.name : p.name?.en || '';
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fallback)}`;
  }

  showPhone(p: Photographer) {
    const phone = p.phone ? this.i18n.pick(p.phone) : '';
    if (!phone) return;
    try { navigator.clipboard?.writeText(phone); } catch (e) {}
    this.shownPhone[p.id] = phone;
    setTimeout(() => delete this.shownPhone[p.id], 6000);
  }

  showEmail(p: Photographer) {
    const email = p.email ? this.i18n.pick(p.email) : '';
    if (!email) return;
    try { navigator.clipboard?.writeText(email); } catch (e) {}
    this.shownEmail[p.id] = email;
    setTimeout(() => delete this.shownEmail[p.id], 6000);
  }
}
