import { Hotel } from "../models/tourism.models";

export const hotels: Hotel[] = [
  {
    id: "1",
    name: { en: "MG Nefertiti", ar: "إم جي نفرتيتي" },
    description: { en: "Hotel on the Corniche (Minya).", ar: "فندق على الكورنيش (المنيا)." },
    imageUrl: "/assets/images/hotels/mgHotel.jpg",
    imageGallery: [
      "/assets/images/hotels/mg3.jpg",
      "/assets/images/hotels/mgHotel2",
      "/assets/images/hotels/mgHotel.jpg",

    ],
    latitude: 28.11391331310829,
    longitude: 30.74967797116394,
    rating: 3.8,
    reviewCount: 1800,
    priceRange: { en: "45$", ar: "٤٥ دولار" },
    amenities: [
      { en: "Swimming Pool", ar: "حمام سباحة" },
      { en: "Wi-Fi Access", ar: "خدمة واي فاي" },
      { en: "Free", ar: "مجاني" },
      { en: "Air Conditioning", ar: "تكييف" },
      { en: "Breakfast", ar: "إفطار" }
    ],
    roomTypes: [],
    contactInfo: {
      phone: { en: "01220883347", ar: "٠١٢٢٠٨٨٣٣٤٧" },
      email: { en: "reservations@mgnefertiti.com", ar: "reservations@mgnefertiti.com" },
      website: { en: "https://www.mgnefertiti.com", ar: "https://www.mgnefertiti.com" }
    },
    starRating: 4
  },
  {
    id: "2",
    name: { en: "Cleopatra Hotel", ar: "فندق كليوباترا" },
    description: { en: "Budget-friendly hotel in Minya.", ar: "فندق اقتصادي في المنيا." },
    imageUrl: "/assets/images/hotels/cleo.webp",
    imageGallery: [
      "/assets/images/hotels/cleo.webp"
    ],
    latitude: 28.1172,
    longitude: 30.7409,
    rating: 3.5,
    reviewCount: 650,
    priceRange: { en: "30$", ar: "٣٠ دولار" },
    amenities: [
      { en: "Wi-Fi Access", ar: "خدمة واي فاي" },
      { en: "Breakfast", ar: "إفطار" }
    ],
    roomTypes: [],
    contactInfo: {
      phone: { en: "01001234567", ar: "٠١٠٠١٢٣٤٥٦٧" },
      email: { en: "info@cleopatra.com", ar: "info@cleopatra.com" },
      website: { en: "https://www.cleopatrahotel.com", ar: "https://www.cleopatrahotel.com" }
    },
    starRating: 3
  },
  {
    id: "3",
    name: { en: "Holy Family Hotel", ar: "فندق العائلة المقدسة" },
    description: { en: "Modern hotel close to the city center.", ar: "فندق حديث بالقرب من وسط المدينة." },
    imageUrl: "/assets/images/hotels/mokadas/mokadas.jpg",
    imageGallery: [
      "/assets/images/hotels/mokadas/mokadas23.jpg",
      "/assets/images/hotels/mokadas/mokadas14.jpg",
      "/assets/images/hotels/mokadas/mokadas1.jpg",
      "/assets/images/hotels/mokadas/mokadas12.jpg",
      "/assets/images/hotels/mokadas/mokadas4.jpg",
      "/assets/images/hotels/mokadas/mokadas1.jpg"

    ],
    latitude: 28.1199,
    longitude: 30.7501,
    rating: 4.0,
    reviewCount: 1200,
    priceRange: { en: "50$", ar: "٥٠ دولار" },
    amenities: [
      { en: "Gym", ar: "جيم" },
      { en: "Swimming Pool", ar: "حمام سباحة" },
      { en: "Breakfast", ar: "إفطار" }
    ],
    roomTypes: [],
    contactInfo: {
      phone: { en: "01005551234", ar: "٠١٠٠٥٥٥١٢٣٤" },
      email: { en: "contact@holyfamilyhotel.com", ar: "contact@holyfamilyhotel.com" },
      website: { en: "https://www.holyfamilyhotel.com", ar: "https://www.holyfamilyhotel.com" }
    },
    starRating: 4
  },
  {
    id: "4",
    name: { en: "New Minya Hotel", ar: "فندق المنيا الجديد" },
    description: { en: "Business hotel located in New Minya.", ar: "فندق لرجال الأعمال يقع في المنيا الجديدة." },
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/210987331.jpg?k=72e2...",
    imageGallery: [],
    latitude: 28.094,
    longitude: 30.7502,
    rating: 4.2,
    reviewCount: 980,
    priceRange: { en: "55$", ar: "٥٥ دولار" },
    amenities: [
      { en: "Conference Rooms", ar: "قاعات مؤتمرات" },
      { en: "Wi-Fi Access", ar: "خدمة واي فاي" },
      { en: "Breakfast", ar: "إفطار" }
    ],
    roomTypes: [],
    contactInfo: {
      phone: { en: "01002223344", ar: "٠١٠٠٢٢٢٣٣٤٤" },
      email: { en: "info@newminyahotel.com", ar: "info@newminyahotel.com" },
      website: { en: "https://www.newminyahotel.com", ar: "https://www.newminyahotel.com" }
    },
    starRating: 4
  },
  {
    id: "5",
    name: { en: "Grand Aton Hotel", ar: "جراند أتون" },
    description: { en: "Luxury riverside hotel.", ar: "فندق فاخر على ضفاف النيل." },
    imageUrl: "/assets/images/hotels/Aton/aton1.jpg",
    imageGallery: ["/assets/images/hotels/Aton/aton1.jpg", "/assets/images/hotels/Aton/aton2.jpg", "/assets/images/hotels/Aton/aton3.jpg", "/assets/images/hotels/Aton/aton4.jpg"],
    latitude: 28.1055,
    longitude: 30.7492,
    rating: 4.6,
    reviewCount: 2500,
    priceRange: { en: "70$", ar: "٧٠ دولار" },
    amenities: [
      { en: "Swimming Pool", ar: "حمام سباحة" },
      { en: "Spa", ar: "سبا" },
      { en: "Restaurant", ar: "مطعم" },
      { en: "Wi-Fi Access", ar: "خدمة واي فاي" }
    ],
    roomTypes: [],
    contactInfo: {
      phone: { en: "01007778899", ar: "٠١٠٠٧٧٧٨٨٩٩" },
      email: { en: "booking@grandaton.com", ar: "booking@grandaton.com" },
      website: { en: "https://www.grandaton.com", ar: "https://www.grandaton.com" }
    },
    starRating: 5
  },
  {
    id: "6",
    name: { en: "Queen Isis Hotel", ar: "فندق الملكة إيزيس" },
    description: { en: "Elegant hotel with traditional Egyptian decor.", ar: "فندق أنيق بديكور مصري تقليدي." },
    imageUrl: "/assets/images/hotels/Isis/isis2.jpg",
    imageGallery: ["/assets/images/hotels/Isis/isis2.jpg","/assets/images/hotels/Isis/isis11.webp","/assets/images/hotels/Isis/isis8.webp","/assets/images/hotels/Isis/isis3.webp"],
    latitude: 28.1102,
    longitude: 30.7511,
    rating: 4.1,
    reviewCount: 780,
    priceRange: { en: "48$", ar: "٤٨ دولار" },
    amenities: [
      { en: "Wi-Fi Access", ar: "خدمة واي فاي" },
      { en: "Restaurant", ar: "مطعم" },
      { en: "Breakfast", ar: "إفطار" }
    ],
    roomTypes: [],
    contactInfo: {
      phone: { en: "01009992233", ar: "٠١٠٠٩٩٩٢٢٣٣" },
      email: { en: "info@queenisis.com", ar: "info@queenisis.com" },
      website: { en: "https://www.queenisis.com", ar: "https://www.queenisis.com" }
    },
    starRating: 4
  },
 
] satisfies Hotel[];
