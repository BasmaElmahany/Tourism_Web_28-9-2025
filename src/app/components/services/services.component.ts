import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { ServiceItem } from 'src/app/models/tourism.models';
import { services } from 'src/app/data/services';

// Extended interface for services with clinic/pharmacy support
interface ExtendedServiceItem extends ServiceItem {
  specialty?: string;
  specialtyAr?: string;
}

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
    { key: 'clinic', name: 'Clinics', nameAr: 'عيادات' },
    { key: 'pharmacy', name: 'Pharmacies', nameAr: 'صيدليات' },
    { key: 'ambulance', name: 'Ambulances', nameAr: 'إسعاف' },
    { key: 'police', name: 'Police', nameAr: 'شرطة' },
    { key: 'fire', name: 'Fire Dept.', nameAr: 'الدفاع المدني' },
    { key: 'bank', name: 'Banks', nameAr: 'بنوك' },
    { key: 'exchange', name: 'Currency Exchange', nameAr: 'صرف عملات' },
  ];

  clinicTypes = [
    { key: 'general', name: 'General Practice', nameAr: 'عيادة عامة' },
    { key: 'dental', name: 'Dental', nameAr: 'أسنان' },
    { key: 'pediatric', name: 'Pediatric', nameAr: 'أطفال' },
    { key: 'cardiology', name: 'Cardiology', nameAr: 'قلب' },
    { key: 'dermatology', name: 'Dermatology', nameAr: 'جلدية' },
    { key: 'orthopedic', name: 'Orthopedic', nameAr: 'عظام' },
    { key: 'ophthalmology', name: 'Ophthalmology', nameAr: 'عيون' },
    { key: 'gynecology', name: 'Gynecology', nameAr: 'نساء وتوليد' },
  ];

  services: ExtendedServiceItem[] = [];
  filteredServices: ExtendedServiceItem[] = [];
  featuredServices: ExtendedServiceItem[] = [];
  
  // Separate arrays for clinics and pharmacies
  clinics: ExtendedServiceItem[] = [];
  filteredClinics: ExtendedServiceItem[] = [];
  pharmacies: ExtendedServiceItem[] = [];
  filteredPharmacies: ExtendedServiceItem[] = [];

  selectedType = '';
  selectedClinicType = '';
  onlyEmergency = false;
  only24h = false;
  only24hPharmacy = false;

  private translations: Record<string, Record<string, string>> = {
    en: {
      title: 'Public Services in Minya',
      subtitle: 'Find essential services nearby — hospitals, clinics, pharmacies, ambulances, police and fire departments',
      findServices: 'Find Services',
      type: 'Type',
      allTypes: 'All Types',
      availability: 'Availability',
      emergencyOnly: 'Emergency only',
      open24h: 'Open 24/7',
      featured: 'Featured Services',
      all: 'All Services',
      clinicsSection: 'Medical Clinics',
      clinicsDescription: 'Find specialized medical clinics near you',
      clinicType: 'Specialty',
      allSpecialties: 'All Specialties',
      pharmaciesSection: 'Pharmacies',
      pharmaciesDescription: 'Find pharmacies and drugstores near you',
      viewDetails: 'View Details',
      callNow: 'Call Now',
      getDirections: 'Get Directions',
      noFound: 'No services found',
      noClinicsFound: 'No clinics found',
      noPharmaciesFound: 'No pharmacies found',
      tryDifferent: 'Try different filters or check back later',
      tips: 'Safety & Tips',
      tipPlan: 'Know your nearest emergency facilities',
      tipPlanDesc: 'Save the numbers of nearby hospital, police and fire stations.',
      tipVerify: 'Verify details before you go',
      tipVerifyDesc: 'Call ahead to confirm availability and exact location.',
      tipTime: 'Check Hours',
      tipTimeDesc: 'Always verify operating hours before visiting',
      distance: 'km away',
      rating: 'Rating'
    },
    ar: {
      title: 'الخدمات العامة في المنيا',
      subtitle: 'اعثر على الخدمات الأساسية القريبة — مستشفيات، عيادات، صيدليات، إسعاف، شرطة ودفاع مدني',
      findServices: 'البحث عن الخدمات',
      type: 'النوع',
      allTypes: 'جميع الأنواع',
      availability: 'التوافر',
      emergencyOnly: 'حالات الطوارئ فقط',
      open24h: 'متاح 24/7',
      featured: 'الخدمات المميزة',
      all: 'جميع الخدمات',
      clinicsSection: 'العيادات الطبية',
      clinicsDescription: 'اعثر على العيادات الطبية المتخصصة بالقرب منك',
      clinicType: 'التخصص',
      allSpecialties: 'جميع التخصصات',
      pharmaciesSection: 'الصيدليات',
      pharmaciesDescription: 'اعثر على الصيدليات بالقرب منك',
      viewDetails: 'عرض التفاصيل',
      callNow: 'اتصال الآن',
      getDirections: 'الاتجاهات',
      noFound: 'لم يتم العثور على خدمات',
      noClinicsFound: 'لم يتم العثور على عيادات',
      noPharmaciesFound: 'لم يتم العثور على صيدليات',
      tryDifferent: 'جرّب مرشحات مختلفة أو تحقق لاحقاً',
      tips: 'السلامة والنصائح',
      tipPlan: 'اعرف أقرب مرافق الطوارئ',
      tipPlanDesc: 'احفظ أرقام المستشفى والشرطة والدفاع المدني القريبة.',
      tipVerify: 'تحقق قبل الذهاب',
      tipVerifyDesc: 'اتصل مسبقاً للتأكد من التوافر والموقع الدقيق.',
      tipTime: 'تحقق من المواعيد',
      tipTimeDesc: 'تحقق دائماً من أوقات العمل قبل الزيارة',
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
    // Cast to extended type to handle clinic/pharmacy types
    this.services = services as ExtendedServiceItem[];

    // Separate clinics and pharmacies using string comparison
    this.clinics = this.services.filter(s => (s.type as string) === 'clinic');
    this.pharmacies = this.services.filter(s => (s.type as string) === 'pharmacy');
    
    // Filter out clinics and pharmacies from main services
    this.filteredServices = this.services.filter(s => 
      (s.type as string) !== 'clinic' && (s.type as string) !== 'pharmacy'
    );
    
    this.featuredServices = this.services.filter(s => 
      s.isFeatured && 
      (s.type as string) !== 'clinic' && 
      (s.type as string) !== 'pharmacy'
    );
    
    // Initialize filtered arrays
    this.filteredClinics = this.clinics;
    this.filteredPharmacies = this.pharmacies;
  }

  filterServices() {
    this.filteredServices = this.services.filter(s => {
      // Exclude clinics and pharmacies from main services
      const serviceType = s.type as string;
      if (serviceType === 'clinic' || serviceType === 'pharmacy') return false;
      
      const matchesType = !this.selectedType || s.type === this.selectedType;
      const matchesEmergency = !this.onlyEmergency || s.isEmergency;
      const matches24h = !this.only24h || s.is24h;
      return matchesType && matchesEmergency && matches24h;
    });
  }

  filterClinics() {
    this.filteredClinics = this.clinics.filter(c => {
      const matchesType = !this.selectedClinicType || c.specialty === this.selectedClinicType;
      return matchesType;
    });
  }

  filterPharmacies() {
    this.filteredPharmacies = this.pharmacies.filter(p => {
      const matches24h = !this.only24hPharmacy || p.is24h;
      return matches24h;
    });
  }

  clearFilters() {
    this.selectedType = '';
    this.onlyEmergency = false;
    this.only24h = false;
    this.filteredServices = this.services.filter(s => 
      (s.type as string) !== 'clinic' && (s.type as string) !== 'pharmacy'
    );
  }

  clearClinicFilters() {
    this.selectedClinicType = '';
    this.filteredClinics = this.clinics;
  }

  clearPharmacyFilters() {
    this.only24hPharmacy = false;
    this.filteredPharmacies = this.pharmacies;
  }

  telHref(phone: string) {
    return `tel:${phone.replace(/\s+/g, '')}`;
  }

  mapsHref(item: ExtendedServiceItem) {
    // Use coordinates if available, otherwise use name and address
    if (item.latitude && item.longitude) {
      return `https://www.google.com/maps/dir/?api=1&destination=${item.latitude},${item.longitude}`;
    }
    const q = encodeURIComponent(`${item.name} ${item.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }

  formatDistance(km?: number) {
    if (km == null) return '';
    const lang = this.i18nService.getCurrentLanguage();
    return lang === 'ar' ? `${km.toFixed(1)} ${this.getTranslation('distance')}` : `${km.toFixed(1)} ${this.getTranslation('distance')}`;
  }
}

