
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourismService } from '../../services/tourism.service';
import { TourGuide } from '../../models/tourism.models';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-tourguide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tourguide.component.html',
  styleUrl: './tourguide.component.scss'
})
export class TourguideComponent implements OnInit {
  guides: TourGuide[] = [];
  loading = false;
  shownPhone: Record<string, string> = {};
  shownEmail: Record<string, string> = {};

  constructor(private tourismService: TourismService, public i18n: I18nService) {}

  ngOnInit() {
    this.loading = true;
    this.tourismService.getTourGuides().subscribe((g: any[]) => {
      this.guides = g || [];
      this.loading = false;
    });
  }

  mapsHref(g: TourGuide) {
    const lat = g.location?.latitude;
    const lng = g.location?.longitude;
    if (typeof lat === 'number' && typeof lng === 'number') {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lat + ',' + lng)}`;
    }
    const fallback = typeof g.name === 'string' ? g.name : g.name?.en || '';
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fallback)}`;
  }

  pickText(v: any) {
    return this.i18n.pick(v);
  }

  showPhone(g: TourGuide) {
    const phone = g.phone ? this.i18n.pick(g.phone) : '';
    if (!phone) return;
    try {
      navigator.clipboard?.writeText(phone);
    } catch (e) {
      // ignore clipboard failures
    }
    this.shownPhone[g.id] = phone;
    setTimeout(() => delete this.shownPhone[g.id], 6000);
  }

  showEmail(g: TourGuide) {
    const email = g.email ? this.i18n.pick(g.email) : '';
    if (!email) return;
    try { navigator.clipboard?.writeText(email); } catch (e) {}
    this.shownEmail[g.id] = email;
    setTimeout(() => delete this.shownEmail[g.id], 6000);
  }
}
