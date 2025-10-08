import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nService } from '../../services/i18n.service';

interface ServiceItem {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  type: 'hospital' | 'ambulance' | 'police' | 'fire' | 'bank' | 'exchange';
  typeAr: string;
  phone: string;
  address: string;
  addressAr: string;
  image: string;
  isEmergency: boolean;
  is24h: boolean;
  isFeatured: boolean;
  rating?: number;
  distanceKm?: number;
  features: string[];
  featuresAr: string[];
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
    this.services = [
      {
        id: 's1',
        name: 'Minya General Hospital',
        nameAr: 'مستشفى المنيا العام',
        description: 'Major public hospital with emergency and specialized departments.',
        descriptionAr: 'مستشفى حكومي رئيسي مع قسم طوارئ وأقسام تخصصية.',
        type: 'hospital',
        typeAr: 'مستشفى',
        phone: '+20 86 234 0000',
        address: 'Downtown Minya, Corniche El Nile',
        addressAr: 'وسط المنيا، كورنيش النيل',
        image: '/assets/images/hospital.jpg',
        isEmergency: true,
        is24h: true,
        isFeatured: true,
        rating: 4.3,
        distanceKm: 1.2,
        features: ['Emergency', 'ICU', 'Radiology', 'Pharmacy'],
        featuresAr: ['طوارئ', 'عناية مركزة', 'أشعة', 'صيدلية']
      },
      {
        id: 's2',
        name: 'Central Ambulance Station',
        nameAr: 'محطة الإسعاف المركزية',
        description: 'Rapid response ambulances covering Minya city and nearby districts.',
        descriptionAr: 'استجابة سريعة تغطي مدينة المنيا والمناطق القريبة.',
        type: 'ambulance',
        typeAr: 'إسعاف',
        phone: '123',
        address: 'El Gish St., Near Stadium',
        addressAr: 'شارع الجيش، قرب الاستاد',
        image: '/assets/images/ambulance.jpg',
        isEmergency: true,
        is24h: true,
        isFeatured: true,
        distanceKm: 2.0,
        features: ['Emergency Dispatch', 'Paramedics', '24/7'],
        featuresAr: ['بلاغات طوارئ', 'مسعفون', '24/7']
      },
      {
        id: 's3',
        name: 'Minya Police Station (No.1)',
        nameAr: 'قسم شرطة المنيا (1)',
        description: 'Primary police station handling public safety and reports.',
        descriptionAr: 'قسم شرطة رئيسي مسؤول عن الأمن العام وتلقي البلاغات.',
        type: 'police',
        typeAr: 'شرطة',
        phone: '122',
        address: 'Gamal Abdel Nasser St.',
        addressAr: 'شارع جمال عبد الناصر',
        image: '/assets/images/police.jpg',
        isEmergency: true,
        is24h: true,
        isFeatured: false,
        distanceKm: 1.8,
        features: ['Emergency', 'Reports', 'Patrol'],
        featuresAr: ['طوارئ', 'بلاغات', 'دوريات']
      },
      {
        id: 's4',
        name: 'Minya Fire Department HQ',
        nameAr: 'مقر الدفاع المدني بالمنيا',
        description: 'Fire & rescue services, incident response across Minya.',
        descriptionAr: 'خدمات الإطفاء والإنقاذ والاستجابة للحوادث في المنيا.',
        type: 'fire',
        typeAr: 'الدفاع المدني',
        phone: '180',
        address: 'Industrial Zone, East Minya',
        addressAr: 'المنطقة الصناعية، شرق المنيا',
        image: '/assets/images/firedept.jpg',
        isEmergency: true,
        is24h: true,
        isFeatured: true,
        distanceKm: 3.6,
        features: ['Firefighting', 'Rescue', 'Hazmat'],
        featuresAr: ['إطفاء', 'إنقاذ', 'مواد خطرة']
      },

      {
        id: 's6',
        name: 'National Bank of Egypt – Minya Branch',
        nameAr: 'البنك الأهلي المصري – فرع المنيا',
        description: 'Full-service branch on Corniche / Al Horreya St.',
        descriptionAr: 'فرع خدمات متكاملة على الكورنيش / شارع الحرية.',
        type: 'bank',
        typeAr: 'بنك',
        phone: '19623 / 086-2347491',
        address: 'Al Horreya St. – Corniche, Minya',
        addressAr: 'شارع الحرية – الكورنيش، المنيا',
        image: '/assets/images/banks/ahli.png',
        isEmergency: false,
        is24h: false,
        isFeatured: true,
        rating: 4.2,
        distanceKm: 1.1,
        features: ['ATM', 'Retail & Corporate', 'Foreign Currency'],
        featuresAr: ['ماكينة صراف', 'أفراد وشركات', 'عملات أجنبية']
      },
      {
        id: 's7',
        name: 'Banque Misr – Minya Branch',
        nameAr: 'بنك مصر – فرع المنيا',
        description: 'Major state bank branch with ATM and remittance.',
        descriptionAr: 'فرع بنك مصر مع ماكينة صراف وخدمات تحويل.',
        type: 'bank',
        typeAr: 'بنك',
        phone: '086-2296042',
        address: 'Downtown, Minya',
        addressAr: 'وسط البلد، المنيا',
        image: '/assets/images/bank.jpg',
        isEmergency: false,
        is24h: false,
        isFeatured: false,
        rating: 4.1,
        distanceKm: 1.4,
        features: ['ATM', 'Accounts', 'Remittance'],
        featuresAr: ['ماكينة صراف', 'حسابات', 'تحويلات']
      },
      {
        id: 's8',
        name: 'CIB – Minya Branch',
        nameAr: 'البنك التجاري الدولي CIB – فرع المنيا',
        description: 'On Corniche El Nile, beside Minya Security Directorate.',
        descriptionAr: 'على كورنيش النيل بجوار مديرية أمن المنيا.',
        type: 'bank',
        typeAr: 'بنك',
        phone: '19666',
        address: '195 Kornish El Nil / El Horreya St., Minya',
        addressAr: '195 كورنيش النيل / شارع الحرية، المنيا',
        image: '/assets/images/bank.jpg',
        isEmergency: false,
        is24h: false,
        isFeatured: true,
        rating: 4.3,
        distanceKm: 1.3,
        features: ['ATM', 'Retail & Corporate'],
        featuresAr: ['ماكينة صراف', 'أفراد وشركات']
      },
      {
        id: 's9',
        name: 'QNB ALAHLI – Minya Branch',
        nameAr: 'بنك QNB الأهلي – فرع المنيا',
        description: 'Ard Shalaby, Bldg. 76 – near Minya University (Arts).',
        descriptionAr: 'أرض شلبي، مبنى 76 – قرب جامعة المنيا (الآداب).',
        type: 'bank',
        typeAr: 'بنك',
        phone: '19700 / 086-2386300',
        address: '76 Taqseem Shalaby Sarofim, Minya',
        addressAr: '76 تقسيم شلبي صاروفيم، المنيا',
        image: '/assets/images/bank.jpg',
        isEmergency: false,
        is24h: false,
        isFeatured: false,
        rating: 4.0,
        distanceKm: 1.6,
        features: ['ATM', 'Accounts'],
        featuresAr: ['ماكينة صراف', 'حسابات']
      },
      {
        id: 's10',
        name: 'Banque du Caire – Minya (Downtown)',
        nameAr: 'بنك القاهرة – المنيا (وسط البلد)',
        description: 'Near Lotus Hotel, Downtown.',
        descriptionAr: 'قرب فندق لوتس، وسط البلد.',
        type: 'bank',
        typeAr: 'بنك',
        phone: '16990 / 086-2331730',
        address: '2 Saad Zaghloul St., Downtown, Minya',
        addressAr: '٢ شارع سعد زغلول، وسط البلد، المنيا',
        image: '/assets/images/bank.jpg',
        isEmergency: false,
        is24h: false,
        isFeatured: false,
        rating: 4.1,
        distanceKm: 1.0,
        features: ['ATM', 'Retail Banking'],
        featuresAr: ['ماكينة صراف', 'خدمات أفراد']
      },
      {
        id: 's11',
        name: 'Credit Agricole Egypt – Minya',
        nameAr: 'كريدي أجريكول مصر – المنيا',
        description: '23 Port Saeed St., Minya.',
        descriptionAr: '23 شارع بورسعيد، المنيا.',
        type: 'bank',
        typeAr: 'بنك',
        phone: '086-2316701',
        address: '23 Port Saeed, Qism Minya',
        addressAr: '23 شارع بورسعيد، قسم المنيا',
        image: '/assets/images/bank.jpg',
        isEmergency: false,
        is24h: false,
        isFeatured: false,
        rating: 3.9,
        distanceKm: 1.9,
        features: ['ATM', 'Accounts'],
        featuresAr: ['ماكينة صراف', 'حسابات']
      },
      {
        id: 's12',
        name: 'National Bank of Egypt - Minya Branch',
        nameAr: 'البنك الأهلي المصري - فرع المنيا',
        description: 'Full-service branch with ATM, account services, and foreign currency.',
        descriptionAr: 'فرع متكامل مع ماكينة صراف آلي وخدمات الحسابات والعملات الأجنبية.',
        type: 'bank',
        typeAr: 'بنك',
        phone: '+20 2 19623',
        address: 'El Gish St., Downtown Minya',
        addressAr: 'شارع الجيش، وسط المنيا',
        image: '/assets/images/bank.jpg',
        isEmergency: false,
        is24h: false,
        isFeatured: false,
        rating: 4.2,
        distanceKm: 1.1,
        features: ['ATM', 'Foreign Currency', 'Accounts'],
        featuresAr: ['ماكينة صراف', 'عملات أجنبية', 'حسابات']
      }

    ];

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
