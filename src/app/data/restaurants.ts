import { Restaurant } from "../models/tourism.models";

export const restaurants = [
  {
    id: "1",
    name: { en: "Nile Breeze Restaurant", ar: "مطعم نسيم النيل" },
    description: {
      en: "Authentic Egyptian cuisine with a modern twist, featuring fresh ingredients and traditional recipes passed down through generations.",
      ar: "مأكولات مصرية أصيلة بلمسة عصرية، مع مكونات طازجة ووصفات تقليدية متوارثة عبر الأجيال."
    },
    imageUrl: "/assets/images/nile_river.jpg",
    latitude: 28.1080,
    longitude: 30.7490,
    rating: 4.6,
    reviewCount: 187,
    cuisineType: { en: "Egyptian", ar: "مصري" },
    priceRange: { en: "150-300 EGP per person", ar: "١٥٠-٣٠٠ جنيه للفرد" },
    openingHours: { en: "12:00 PM - 11:00 PM", ar: "١٢:٠٠ ظهرًا - ١١:٠٠ مساءً" },
    specialties: [
      { en: "Koshari", ar: "كشري" },
      { en: "Molokhia", ar: "ملوخية" },
      { en: "Grilled Fish", ar: "سمك مشوي" },
      { en: "Om Ali", ar: "أم علي" }
    ],
    contactInfo: {
      phone: { en: "+20 86 234 1234", ar: "+٢٠ ٨٦ ٢٣٤ ١٢٣٤" },
      email: "info@nilebreeze.com"
    },
    features: [
      { en: "Nile View", ar: "إطلالة على النيل" },
      { en: "Outdoor Seating", ar: "مقاعد خارجية" },
      { en: "Live Music", ar: "موسيقى حية" },
      { en: "Vegetarian Options", ar: "خيارات نباتية" }
    ]
  },
  {
    id: "2",
    name: { en: "Al Minya Traditional Kitchen", ar: "المطبخ التقليدي بالمنيا" },
    description: {
      en: "Family-owned restaurant serving traditional Upper Egyptian dishes in a cozy, authentic atmosphere.",
      ar: "مطعم عائلي يقدم أطباق صعيدية تقليدية في أجواء دافئة وأصيلة."
    },
    imageUrl: "/assets/images/hero_banner.png",
    latitude: 28.1120,
    longitude: 30.7510,
    rating: 4.4,
    reviewCount: 98,
    cuisineType: { en: "Traditional Egyptian", ar: "مصري تقليدي" },
    priceRange: { en: "80-200 EGP per person", ar: "٨٠-٢٠٠ جنيه للفرد" },
    openingHours: { en: "11:00 AM - 10:00 PM", ar: "١١:٠٠ صباحًا - ١٠:٠٠ مساءً" },
    specialties: [
      { en: "Fattah", ar: "فتة" },
      { en: "Bamia", ar: "بامية" },
      { en: "Roz Bel Laban", ar: "أرز باللبن" },
      { en: "Fresh Bread", ar: "خبز طازج" }
    ],
    contactInfo: {
      phone: { en: "+20 86 234 5555", ar: "+٢٠ ٨٦ ٢٣٤ ٥٥٥٥" }
    },
    features: [
      { en: "Family Friendly", ar: "مناسب للعائلات" },
      { en: "Traditional Decor", ar: "ديكور تقليدي" },
      { en: "Local Ingredients", ar: "مكونات محلية" },
      { en: "Takeaway", ar: "تيك أواي" }
    ]
  }
] satisfies Restaurant[];
