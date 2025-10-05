import { BlogPost } from "../models/tourism.models";


export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: { 
      en: 'Discovering the Hidden Treasures of Beni Hassan', 
      ar: 'اكتشاف الكنوز المخفية في بني حسن' 
    },
    content: { 
      en: 'The Beni Hassan tombs represent one of Egypt\'s most remarkable archaeological treasures...', 
      ar: 'تمثل مقابر بني حسن واحدة من أعظم الكنوز الأثرية في مصر...' 
    },
    excerpt: { 
      en: 'Explore the fascinating Middle Kingdom tombs that showcase daily life in ancient Egypt through stunning wall paintings and hieroglyphs.', 
      ar: 'استكشف مقابر الدولة الوسطى الرائعة التي تعرض تفاصيل الحياة اليومية في مصر القديمة من خلال لوحات جدارية ونقوش هيروغليفية مدهشة.' 
    },
    imageUrl: '/assets/images/hero_banner.png',
    author: { 
      en: 'Dr. Sarah Ahmed', 
      ar: 'الدكتورة سارة أحمد' 
    },
    publishDate: new Date('2024-09-15'),
    category: { 
      en: 'Archaeology', 
      ar: 'علم الآثار' 
    },
    tags: [
      [
        { en: 'Beni Hassan', ar: 'بني حسن' },
        { en: 'Middle Kingdom', ar: 'الدولة الوسطى' },
        { en: 'Tombs', ar: 'المقابر' },
        { en: 'Ancient Egypt', ar: 'مصر القديمة' }
      ]
    ],
    readTime: 8,
    featured: true
  },
  {
    id: '2',
    title: { 
      en: 'A Culinary Journey Through Minya', 
      ar: 'رحلة طهي عبر المنيا' 
    },
    content: { 
      en: 'Minya\'s cuisine reflects the rich agricultural heritage of Upper Egypt...', 
      ar: 'يعكس مطبخ المنيا التراث الزراعي الغني لصعيد مصر...' 
    },
    excerpt: { 
      en: 'Discover the authentic flavors of Upper Egyptian cuisine and the traditional dishes that make Minya a culinary destination.', 
      ar: 'اكتشف النكهات الأصيلة لمطبخ الصعيد والأطباق التقليدية التي تجعل من المنيا وجهة طهي مميزة.' 
    },
    imageUrl: '/assets/images/nile_river.jpg',
    author: { 
      en: 'Chef Mohamed Hassan', 
      ar: 'الشيف محمد حسن' 
    },
    publishDate: new Date('2024-09-10'),
    category: { 
      en: 'Food & Culture', 
      ar: 'الطعام والثقافة' 
    },
    tags: [
      [
        { en: 'Egyptian Cuisine', ar: 'المطبخ المصري' },
        { en: 'Traditional Food', ar: 'الأطعمة التقليدية' },
        { en: 'Local Restaurants', ar: 'المطاعم المحلية' }
      ]
    ],
    readTime: 6,
    featured: false
  }
];