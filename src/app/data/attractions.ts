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
    latitude: 27.662056,
    longitude: 30.905524,
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
    imageGallery: ['/assets/images/tuna/tunaelgabel.jpeg', '/assets/images/tuna/tuna14.jpg', '/assets/images/tuna/tuna12.jpg', '/assets/images/tuna/tuna6.jpg', '/assets/images/tuna/tuna5.jpg', '/assets/images/tuna/tuna3.jpg', '/assets/images/tuna/tuna1.jpg'],
    latitude: 27.773628,
    longitude: 30.738468,
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
      en: "Akhenaten's Capital The first to call for monotheism, King Amenhotep IV (c. 1351-1336 BC) carried out what is often described as a religious revolution, primarily targeting the god Amun, whose main cult center was in Thebes (present-day Luxor). During his reign, Aten became the only deity worshipped. These changes coincided with the king changing his name to Akhenaten, followed by the establishment of a new capital in Middle Egypt (present-day Minya Governorate) called Akhetaten (Horizon of Aten). Akhetaten is located on the east bank of the Nile River, surrounded by hills where the tombs of prominent statesmen were carved. It was divided into two groups: the north and the south of the valley, leading to the site of the royal cemetery. Akhenaten is characterized by a clear layout: the Royal Road extends from the north to the south of the city, with the most important royal, religious, and administrative buildings located on both sides. At the southern end of the Royal Road is the Royal Palace, followed by the Great Temple of Aten. The senior officials of Akhenaten lived in luxurious houses surrounded by gardens. Artists' homes and workshops have also been discovered there. After the death of Akhenaten, the city was abandoned and destroyed. The Northern Palace: Located north of the city, the foundations and the large courtyard of the palace can still be seen, as well as the palace annexes (houses for servants and harem men). The floors of the palace were covered with colored tiles, parts of which are in the Egyptian Museum in Cairo. The Great and Small Temples of Aten: Akhenaten built two temples for the god Aten at Tell el-Amarna. It is worth noting that the Aten temples were distinguished from other temples of the other gods by their lack of roofs, allowing the sun's rays to penetrate them. The Northern Tombs Group: There are 6 tombs (the Tomb of Huya, the Tomb of Mery-Ra II, the Tomb of Ahmose, the Tomb of Mery-Ra, the Tomb of Bentu, and the Tomb of Panhesy). They are the tombs of princes and ministers. The Southern Tombs Group: There are 19 tombs, the most important of which is the Tomb of Ay, the High Priest of the god Aten. The tomb contains a hall with 15 columns in the form of papyrus belts. Among the most important scenes contained there are Akhenaten's hymns.",

      ar: "عاصمة أخناتون أول من نـادى بالتوحيـد قــام المــلك أمنحتب الرابـــع (حوالي ١٣٥١ - ١٣٣٦ ق.م)  بما يوصف غالبـــا بـــأنها ثـــــــورة دينيــــــة، استهــــدفت بشكــل أســاسي المعبود أمون، والذي كان مركز عبادته الرئيسي  في طيبــة (الأقصــر حاليا). خلال فتــرة حكمه أصبـح أتــــون المعبـــــود الوحيـــد الذي عبد. تــزامنت هذه التغييــــرات مع تغيير الملك اسمـــــه إلى أخنــــــاتون، وتبع ذلك تــــــأسيس عاصمــــة جديـــــدة في مصر الوسطى (في محافظة المنيا حاليا) بــاسم آخت أتون (أفـــق أتون). تقـــع آخت أتون على الضفـــة الشرقيــة لنهر النيل، حيث تحيط بها التلال، التي نحتت فيها مقابر كبار رجال الدولة. وقد تم تقسيمها إلى مجموعتين: شمــــال وجنـــــوب الوادي، المــــؤدي إلى موقع المقبــــرة الملكيــــة. تتميز آخـــت أتـــون بتصميـم واضح: حيث يمتـــــد الطريـــق الملكي من الشمــــــال إلى الجنــــــوب من المدينـــــــة، حيث تقع على جانبيــــه أهم المباني الملكيــــــة والدينيـــــــة والإداريـــــة. وفي الطرف الجنوبي من الطريق الملكي يوجد القصـــر الملكي، ثم معبد أتون الكبير. عاش كبار  الموظفين  بآخت  أتون  في  منازل  فاخرة، محاطة  بالحدائق،  كما  تم  الكشف  فيها  عن منازل  الفنانين،  وورش  العمل  الخاصة  بهم. وبعد وفاة أخناتون، هجرت المدينة ودمرت .القصر الشمالي: يقع شمال المدينة ويمكن حتى الآن رؤية الأساسات والفناء الكبير للقصر، كذلك ملحقات القصر ( منزل الخدم والحريم)، وقد كانت أرضيات القصر مغطاة بالبلاط الملون ويوجد أجزاء منها بالمتحف المصري بالقاهرة. معبدي آتون الكبير والصغير: أقام إخناتون في تل العمارنة معبدين للآله آتون، ومن الجدير بالذكر أن معابد آتون كانت تتميز عن غيرها من معابد الآلهة الأخرى بأنها بلا سقف حتى تتخللها أشعة الشمس. مجموعة المقابر الشمالية: وعددها 6 مقابر ( مقبرة حويا – مقبرة مرى رع الثانى – مقبرة أحموزا – مقبرة مرى رع – مقبرة بنتو – مقبرة بانحسى ) وهى مقابر للأمراء والوزراء. مجموعة المقابر الجنوبية: وعددها 19 مقبرة وأهمها مقبرة (آي) كبير كهنة الآله آتون يوجد بالمقبرة صالة بها 15 عمود على شكل أحزمة البردي ومن أهم المناظر الموجودة بها أناشيد إخناتون."
    },
    imageUrl: '/assets/images/tel_amarna/tel_amarna3.jpg',
    imageGallery: ['/assets/images/tel_amarna/tel_amarna1.jpg', '/assets/images/tel_amarna/tel_amarna2.jpg', '/assets/images/tel_amarna/tel_amarna3.jpg', '/assets/images/tel_amarna/tel_amarna4.jpg', '/assets/images/tel_amarna/tel_amarna5.jpg', '/assets/images/tel_amarna/tel_amarna6.jpg'],
    latitude: 27.662056,
    longitude: 30.905524,
    openingHours: { en: '8:00 AM - 5:00 PM', ar: '٨:٠٠ ص - ٥:٠٠ م' },
    ticketPrice: { en: '120 EGP', ar: '١٢٠ جنيه' },
    rating: 4.6,
    reviewCount: 156,
    category: { en: 'Archaeological Site', ar: 'موقع أثري' },
    features: [
      { en: 'Archaeological Tours', ar: 'جولات أثرية' },
      { en: 'Museum', ar: 'متحف' },
      { en: 'Gift Shop', ar: 'متجر هدايا' }
    ],
    historicalPeriod: {
      en: 'New Kingdom – Amarna Period (1351–1334 BC)',
      ar: 'الدولة الحديثة – فترة العمارنة (١٣٥١ - ١٣٣٤ ق.م)'
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
