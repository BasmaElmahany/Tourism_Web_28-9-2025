import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { ServiceItem } from 'src/app/models/tourism.models';
import { services } from 'src/app/data/services';



@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  serviceTypes = [
    { key: 'hospital', name: 'Hospitals', nameAr: 'مستشفيات' },
    { key: 'ambulance', name: 'Ambulances', nameAr: 'إسعاف' },
    { key: 'police', name: 'Police', nameAr: 'شرطة' },
    { key: 'fire', name: 'Fire Dept.', nameAr: 'الدفاع المدني' },
    { key: 'bank', name: 'Banks', nameAr: 'بنوك' },
    { key: 'exchange', name: 'Currency Exchange', nameAr: 'صرف عملات' },
  ];


  services: ServiceItem[] = [];
  filteredServices: ServiceItem[] = [];
  featuredServices: ServiceItem[] = [];

  selectedType = '';
  onlyEmergency = false;
  only24h = false;

  private translations: Record<string, Record<string, string>> = {
    en: {
      title: 'Public Services in Minya',
      subtitle: 'Find essential services nearby — hospitals, ambulances, police and fire departments',
      findServices: 'Find Services',
      type: 'Type',
      allTypes: 'All Types',
      availability: 'Availability',
      emergencyOnly: 'Emergency only',
      open24h: 'Open 24/7',
      featured: 'Featured Services',
      all: 'All Services',
      viewDetails: 'View Details',
      callNow: 'Call Now',
      getDirections: 'Get Directions',
      noFound: 'No services found',
      tryDifferent: 'Try different filters or check back later',
      tips: 'Safety & Tips',
      tipPlan: 'Know your nearest emergency facilities',
      tipPlanDesc: 'Save the numbers of nearby hospital, police and fire stations.',
      tipVerify: 'Verify details before you go',
      tipVerifyDesc: 'Call ahead to confirm availability and exact location.',
      distance: 'km away',
      rating: 'Rating'
    },
    ar: {
      title: 'الخدمات العامة في المنيا',
      subtitle: 'اعثر على الخدمات الأساسية القريبة — مستشفيات، إسعاف، شرطة ودفاع مدني',
      findServices: 'البحث عن الخدمات',
      type: 'النوع',
      allTypes: 'جميع الأنواع',
      availability: 'التوافر',
      emergencyOnly: 'حالات الطوارئ فقط',
      open24h: 'متاح 24/7',
      featured: 'الخدمات المميزة',
      all: 'جميع الخدمات',
      viewDetails: 'عرض التفاصيل',
      callNow: 'اتصال الآن',
      getDirections: 'الاتجاهات',
      noFound: 'لم يتم العثور على خدمات',
      tryDifferent: 'جرّب مرشحات مختلفة أو تحقق لاحقاً',
      tips: 'السلامة والنصائح',
      tipPlan: 'اعرف أقرب مرافق الطوارئ',
      tipPlanDesc: 'احفظ أرقام المستشفى والشرطة والدفاع المدني القريبة.',
      tipVerify: 'تحقق قبل الذهاب',
      tipVerifyDesc: 'اتصل مسبقاً للتأكد من التوافر والموقع الدقيق.',
      distance: 'كم',
      rating: 'التقييم'
    }
  };

  constructor(public i18nService: I18nService) { }

  ngOnInit(): void {
    this.loadServices();
  }

  getTranslation(key: string): string {
    const lang = this.i18nService.getCurrentLanguage();
    return this.translations[lang]?.[key] || this.translations['en'][key] || key;
  }

  private loadServices() {
    this.services = services ;

    this.filteredServices = this.services;
    this.featuredServices = this.services.filter(s => s.isFeatured);
  }

  filterServices() {
    this.filteredServices = this.services.filter(s => {
      const matchesType = !this.selectedType || s.type === this.selectedType;
      const matchesEmergency = !this.onlyEmergency || s.isEmergency;
      const matches24h = !this.only24h || s.is24h;
      return matchesType && matchesEmergency && matches24h;
    });
  }

  clearFilters() {
    this.selectedType = '';
    this.onlyEmergency = false;
    this.only24h = false;
    this.filteredServices = this.services;
  }

  telHref(phone: string) {
    return `tel:${phone.replace(/\s+/g, '')}`;
  }

  mapsHref(item: ServiceItem) {
    // Simple maps link; replace with lat/lng if you have coordinates
    const q = encodeURIComponent(`${item.name} ${item.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }

  formatDistance(km?: number) {
    if (km == null) return '';
    const lang = this.i18nService.getCurrentLanguage();
    return lang === 'ar' ? `${km.toFixed(1)} ${this.getTranslation('distance')}` : `${km.toFixed(1)} ${this.getTranslation('distance')}`;
  }
}
