import { Photographer } from '../models/tourism.models';

export const photographers: Photographer[] = [
  {
    id: 'ph-1',
    name: { en: 'Ayman Hassan', ar: 'أيمن حسن' },
    bio: { en: 'Local photographer specializing in Nile and heritage portraits.', ar: 'مصور محلي متخصص في صور النيل والتراث.' },
    specialties: ['Portraits', { en: 'Heritage', ar: 'التراث' }, 'Landscape'],
    imageUrl: '/assets/images/mohmed.jpg',
    phone: { en: '+20 100 123 4567', ar: '٠١٠٠١٢٣٤٥٦٧' },
    email: { en: 'ayman.photo@example.com', ar: 'ayman.photo@example.com' },
    social: { instagram: 'ayman_photo', facebook: 'ayman.hassan' },
    location: { latitude: 28.1030, longitude: 30.7490, address: { en: 'Minya', ar: 'المنيا' } },
    rating: 4.8
  },
  {
    id: 'ph-2',
    name: { en: 'Salma Nabil', ar: 'سلمى نبيل' },
    bio: { en: 'Wedding and event photographer with a cinematic touch.', ar: 'مصور حفلات وأعراس بطابع سينمائي.' },
    specialties: ['Weddings', 'Events', { en: 'Cinematic', ar: 'سينمائي' }],
    imageUrl: '/assets/images/neven.jpg',
    phone: { en: '+20 122 333 4455', ar: '٠١٢٢٣٣٣٤٤٥٥' },
    email: { en: 'salma.photo@example.com', ar: 'salma.photo@example.com' },
    social: { instagram: 'salma_shoots' },
    location: { latitude: 28.1025, longitude: 30.7485, address: { en: 'Minya Old Town', ar: 'المنيا القديمة' } },
    rating: 4.7
  }
];
