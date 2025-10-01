import { Attraction } from '../models/tourism.models';

export const ATTRACTIONS /*: Attraction[]*/ = [
  {
    id: '1',
    name: { en: 'Beni Hassan Tombs', ar: 'مقابر بني حسن' },
    description: {
      en: 'Ancient Egyptian tombs dating back to the Middle Kingdom, featuring well-preserved wall paintings and hieroglyphs that tell stories of daily life in ancient Egypt.',
      ar: 'مقابر مصرية قديمة تعود إلى الدولة الوسطى، تتميز برسوم جدارية ونقوش هيروغليفية محفوظة جيدًا تصوّر جوانب من الحياة اليومية في مصر القديمة.'
    },
    imageUrl: '/assets/images/hero_banner.png',
    imageGallery: [
      '/assets/images/hero_banner.png',
      '/assets/images/beni_hassan.webp',
      '/assets/images/nile_river.jpg'
    ],
    latitude: 27.9158,
    longitude: 30.8739,
    openingHours: { en: '8:00 AM - 5:00 PM', ar: '٨:٠٠ ص - ٥:٠٠ م' },
    ticketPrice: { en: '100 EGP', ar: '١٠٠ جنيه' },
    rating: 4.7,
    reviewCount: 324,
    category: { en: 'Historical Site', ar: 'موقع تاريخي' },
    features: [
      { en: 'Guided Tours', ar: 'جولات إرشادية' },
      { en: 'Photography Allowed', ar: 'يسمح بالتصوير' },
      { en: 'Wheelchair Accessible', ar: 'مناسب لذوي الاحتياجات الخاصة' }
    ],
    historicalPeriod: {
      en: 'Middle Kingdom (2055–1650 BC)',
      ar: 'الدولة الوسطى (٢٠٥٥–١٦٥٠ قبل الميلاد)'
    },
    significance: {
      en: 'One of the most important Middle Kingdom burial sites in Egypt',
      ar: 'واحد من أهم مواقع الدفن في الدولة الوسطى بمصر'
    }
  },
  {
    id: '2',
    name: { en: 'Tuna el-Gebel', ar: 'تونة الجبل' },
    description: {
      en: 'An ancient necropolis and archaeological site featuring Greco-Roman tombs, catacombs, and the famous tomb of Petosiris.The name of the region is derived from the Egyptian word (Ta-Huni), meaning (lake), referring to the lake that formed in the area during the Nile River s annual flood. In Greek, it became known as (Tounis), then (Tuna) in Arabic, with the addition of (Jebel) (meaning (mountain)) due to its location in a mountainous desert region. Tuna el-Jebel is of significant historical and artistic importance, showcasing the fusion of ancient Egyptian and Greek art. The site includes a boundary stele from the city of Akhetaten, as well as the Tuna el-Jebel tunnels, rock-cut passageways used for burying mummified sacred ibis birds and monkeys, symbols of the god Thoth. The area also features the tomb of Petosiris, the high priest of Thoth, renowned for its unique architecture and artwork,and the tomb of Isadora,a symbol of eternal love.',
      ar: 'يُشتق اسم المنطقة من الكلمة المصرية (تا-هوني) التي تعني (البحيرة)، إشارةً إلى البحيرة التي كانت تتشكل في المنطقة خلال الفيضان السنوي لنهر النيل. وفي اللغة اليونانية، أصبحت تُعرف باسم (توني) ثم (تونا) باللغة العربية، مع إضافة كلمة (جبل) لوقوعها في منطقة صحراوية جبلية. تتميز منطقة تونا الجبل بأهمية تاريخية وفنية كبيرة، حيث تُظهر مزيجاً فريداً من الفن المصري القديم والفن اليوناني. ويضم الموقع لوحة حدودية من مدينة أختاتون، بالإضافة إلى أنفاق تونا الجبل، وهي ممرات منحوتة في الصخور استخدمت لدفن طيور الإبيس المقدسة والقرود، وهما من رموز إله الحكمة المصري ثوته. كما تضم ​​المنطقة مقبرة بيتو سيريس، الكاهن الأكبر لثوت، المشهورة ببنائها المعماري الفريد ونقوشها الفنية الرائعة، بالإضافة إلى مقبرة إيزادورا، التي تُعد رمزاً للحب الخالد.جبانة وموقع أثري يضم مقابر وممرات تحت الأرض من العصرين اليوناني والروماني، ومن أشهرها مقبرة بتوسيريس.'
    },
    imageUrl: '/assets/images/tuna/tunaelgabel.jpeg',
    imageGallery: ['/assets/images/tuna/tunaelgabel.jpeg', '/assets/images/tuna/tuna14.jpg', '/assets/images/tuna/tuna12.jpg','/assets/images/tuna/tuna6.jpg','/assets/images/tuna/tuna5.jpg','/assets/images/tuna/tuna3.jpg','/assets/images/tuna/tuna1.jpg'],
    latitude: 27.7667,
    longitude: 30.7333,
    openingHours: { en: '8:00 AM - 4:00 PM', ar: '٨:٠٠ ص - ٤:٠٠ م' },
    ticketPrice: { en: '80 EGP', ar: '٨٠ جنيه' },
    rating: 4.5,
    reviewCount: 198,
    category: { en: 'Archaeological Site', ar: 'موقع أثري' },
    features: [
      { en: 'Guided Tours', ar: 'جولات إرشادية' },
      { en: 'Museum', ar: 'متحف' },
      { en: 'Gift Shop', ar: 'متجر هدايا' }
    ],
    historicalPeriod: {
      en: 'Greco-Roman Period (332 BC – 395 AD)',
      ar: 'العصران اليوناني والروماني (٣٣٢ ق.م – ٣٩٥ م)'
    },
    significance: {
      en: 'Important Greco-Roman necropolis with a unique architectural blend',
      ar: 'جبانة مهمة من العصرين اليوناني والروماني بطابع معماري مميز'
    }
  },
  {
    id: '3',
    name: { en: 'Tell el-Amarna', ar: 'تل العمارنة' },
    description: {
      en: 'The ancient city of Akhetaten, capital of Egypt during the reign of Akhenaten, offering insights into the Amarna Period.',
      ar: 'مدينة أخيتاتون القديمة، عاصمة مصر في عهد إخناتون، وتكشف الكثير عن فترة العمارنة.'
    },
    imageUrl: '/assets/images/hero_banner.png',
    imageGallery: ['/assets/images/hero_banner.png'],
    latitude: 27.65,
    longitude: 30.9,
    openingHours: { en: '8:00 AM - 5:00 PM', ar: '٨:٠٠ ص - ٥:٠٠ م' },
    ticketPrice: { en: '120 EGP', ar: '١٢٠ جنيه' },
    rating: 4.6,
    reviewCount: 156,
    category: { en: 'Ancient City', ar: 'مدينة قديمة' },
    features: [
      { en: 'Archaeological Tours', ar: 'جولات أثرية' },
      { en: 'Research Center', ar: 'مركز بحوث' },
      { en: 'Educational Programs', ar: 'برامج تعليمية' }
    ],
    historicalPeriod: {
      en: 'New Kingdom – Amarna Period (1353–1336 BC)',
      ar: 'الدولة الحديثة – فترة العمارنة (١٣٥٣–١٣٣٦ ق.م)'
    },
    significance: {
      en: 'Capital city of Pharaoh Akhenaten and center of a monotheistic revolution',
      ar: 'عاصمة الفرعون إخناتون ومركز التحول إلى التوحيد'
    }
  },
  {
    id: '4',
    name: { en: 'Minya Corniche', ar: 'كورنيش المنيا' },
    description: {
      en: 'A beautiful waterfront promenade along the Nile River, perfect for evening walks and enjoying sunset views.',
      ar: 'ممشى جميل على ضفاف النيل، مثالي للتنزه مساءً والاستمتاع بغروب الشمس.'
    },
    imageUrl: '/assets/images/nile_river.jpg',
    imageGallery: ['/assets/images/nile_river.jpg'],
    latitude: 28.1099,
    longitude: 30.7503,
    openingHours: { en: '24 hours', ar: 'على مدار ٢٤ ساعة' },
    ticketPrice: { en: 'Free', ar: 'مجاني' },
    rating: 4.3,
    reviewCount: 89,
    category: { en: 'Scenic Area', ar: 'منطقة طبيعية' },
    features: [
      { en: 'Walking Path', ar: 'ممر مشاة' },
      { en: 'Cafes', ar: 'مقاهي' },
      { en: 'Boat Rides', ar: 'نزهات بالقوارب' },
      { en: 'Photography Spots', ar: 'أماكن للتصوير' }
    ],
    significance: {
      en: 'Modern recreational area showcasing the beauty of the Nile River',
      ar: 'منطقة ترفيهية حديثة تُبرز جمال نهر النيل'
    }
  }
] satisfies Attraction[];
