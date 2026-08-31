// ============================================================
// ORDERING CONFIGURATION
// ============================================================
// WhatsApp number for receiving customer orders.
// Currently set to a TESTING number — replace this with the
// restaurant's real WhatsApp number when going live.
export const ORDER_WHATSAPP_NUMBER = "01015641363";
// ============================================================

export const restaurantInfo = {
  name: "دلعين الدمشقي",
  tagline: "طعم الشام... في قلب العبور",
  description:
    "أشهى الشاورما والمأكولات السورية، محضّرة بحب وبنكهة أصيلة ترجعك لأجواء الشام.",
  rating: 4.1,
  reviewCount: 4546,
  priceRange: "1 - 200 ج.م",
  phone: "01123142919",
  phoneDisplay: "011 23142919",
  whatsapp: "", // Restaurant's own WhatsApp (not used for ordering — see ORDER_WHATSAPP_NUMBER)
  address: "محور السادات، العبور، محافظة القليوبية",
  addressLine2: "داخل سنتر مكة مول",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=محور+السادات+العبور+القليوبية+مكة+مول",
  openingHours: "7:00 صباحاً – 2:00 صباحاً",
  openHour: 7, // 7 AM
  closeHour: 26, // 2 AM next day (26 = 2 AM in 24h representation)
  services: ["تناول في المطعم", "تيك أواي", "توصيل"],
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },
};

export const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "المنيو", href: "#menu" },
  { label: "عن دلعين", href: "#about" },
  { label: "آراء العملاء", href: "#reviews" },
  { label: "موقعنا", href: "#location" },
  { label: "تواصل معنا", href: "#contact" },
];

export type FeaturedDish = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  priceValue: number;
};

export const featuredDishes: FeaturedDish[] = [
  {
    id: "shawarma-meal",
    name: "وجبة شاورما عربي فراخ",
    description: "شاورما فراخ سورية بطعم أصيل مع البطاطس والمشروب",
    image:
      "https://images.pexels.com/photos/18177332/pexels-photo-18177332.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    price: "85",
    priceValue: 85,
  },
  {
    id: "fattet-shawarma",
    name: "فتة شاورما",
    description: "فتة شاورما بالفراخ بصلصة الكريمة والخبز المقرمش",
    image:
      "https://images.pexels.com/photos/36879216/pexels-photo-36879216.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    price: "75",
    priceValue: 75,
  },
  {
    id: "shawarma-chicken",
    name: "شاورما فراخ",
    description: "شاورما فراخ سورية أصيلة بالثوم والمخلل والصوص الخاص",
    image:
      "https://images.pexels.com/photos/5779364/pexels-photo-5779364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    price: "45",
    priceValue: 45,
  },
  {
    id: "borek-cheese",
    name: "برك بالجبنة",
    description: "فطائر سورية مقرمشة محشية بالجبنة الطازجة",
    image:
      "https://images.pexels.com/photos/38356208/pexels-photo-38356208.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    price: "40",
    priceValue: 40,
  },
  {
    id: "grilled-chicken",
    name: "دجاج مشوي",
    description: "دجاج مشوي على الفحم مع البهارات السورية الأصيلة",
    image:
      "https://images.pexels.com/photos/15388079/pexels-photo-15388079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    price: "120",
    priceValue: 120,
  },
  {
    id: "fattoush",
    name: "فتوش",
    description: "سلطة شامية طازجة بالخبز المقلّي ودبس الرمان",
    image:
      "https://images.pexels.com/photos/36879177/pexels-photo-36879177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    price: "35",
    priceValue: 35,
  },
];

export type MenuCategory = {
  id: string;
  label: string;
  icon: string;
};

export const menuCategories: MenuCategory[] = [
  { id: "shawarma", label: "الشاورما", icon: "🌯" },
  { id: "meals", label: "الوجبات", icon: "🍽️" },
  { id: "fatta", label: "الفتة", icon: "🥘" },
  { id: "appetizers", label: "المقبلات", icon: "🧆" },
  { id: "salads", label: "السلطات", icon: "🥗" },
  { id: "grills", label: "المشويات", icon: "🍢" },
  { id: "drinks", label: "المشروبات", icon: "🥤" },
  { id: "desserts", label: "الحلويات", icon: "🍮" },
];

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  image: string;
};

export const menuItems: MenuItem[] = [
  // الشاورما
  {
    id: "m1",
    category: "shawarma",
    name: "شاورما فراخ عربي",
    description: "شاورما فراخ سورية بالثوم والمخلل في خبز عربي طازج",
    price: "45",
    priceValue: 45,
    image:
      "https://images.pexels.com/photos/5779364/pexels-photo-5779364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: "m2",
    category: "shawarma",
    name: "شاورما لحم عربي",
    description: "شاورما لحم بتتبيلة دمشقية خاصة مع الطحينة والمخلل",
    price: "55",
    priceValue: 55,
    image:
      "https://images.pexels.com/photos/18177330/pexels-photo-18177330.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: "m3",
    category: "shawarma",
    name: "شاورما صاج فراخ",
    description: "شاورما فراخ ملفوفة في خبز الصاج مع الخضار والصوص الخاص",
    price: "50",
    priceValue: 50,
    image:
      "https://images.pexels.com/photos/16022887/pexels-photo-16022887.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  // الوجبات
  {
    id: "m4",
    category: "meals",
    name: "وجبة شاورما عربي فراخ",
    description: "شاورما فراخ عربي + بطاطس + مشروب غازي",
    price: "85",
    priceValue: 85,
    image:
      "https://images.pexels.com/photos/18177332/pexels-photo-18177332.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: "m5",
    category: "meals",
    name: "وجبة شاورما لحم",
    description: "شاورما لحم عربي + بطاطس + مشروب غازي",
    price: "95",
    priceValue: 95,
    image:
      "https://images.pexels.com/photos/36879216/pexels-photo-36879216.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: "m6",
    category: "meals",
    name: "وجبة دجاج مشوي",
    description: "ربع دجاج مشوي + بطاطس + سلطة + خبز",
    price: "120",
    priceValue: 120,
    image:
      "https://images.pexels.com/photos/15388079/pexels-photo-15388079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  // الفتة
  {
    id: "m7",
    category: "fatta",
    name: "فتة شاورما فراخ",
    description: "فتة بالخبز المقرمش وصلصة الثوم وشاورما الفراخ",
    price: "75",
    priceValue: 75,
    image:
      "https://images.pexels.com/photos/36879216/pexels-photo-36879216.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: "m8",
    category: "fatta",
    name: "فتة شاورما لحم",
    description: "فتة بشاورما اللحم والطحينة والخبز المقرمش",
    price: "85",
    priceValue: 85,
    image:
      "https://images.pexels.com/photos/18177327/pexels-photo-18177327.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  // المقبلات
  {
    id: "m9",
    category: "appetizers",
    name: "برك بالجبنة",
    description: "فطائر سورية مقرمشة محشية بالجبنة الطازجة",
    price: "40",
    priceValue: 40,
    image:
      "https://images.pexels.com/photos/38356208/pexels-photo-38356208.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: "m10",
    category: "appetizers",
    name: "بطاطس مقلية",
    description: "بطاطس ذهبية مقرمشة مع الصوص الخاص",
    price: "25",
    priceValue: 25,
    image:
      "https://images.pexels.com/photos/8272619/pexels-photo-8272619.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: "m11",
    category: "appetizers",
    name: "متبل باذنجان",
    description: "متبل باذنجان بالطحينة وزيت الزيتون",
    price: "30",
    priceValue: 30,
    image:
      "https://images.pexels.com/photos/4899786/pexels-photo-4899786.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  // السلطات
  {
    id: "m12",
    category: "salads",
    name: "فتوش",
    description: "سلطة شامية طازجة بالخبز المقلّي ودبس الرمان",
    price: "35",
    priceValue: 35,
    image:
      "https://images.pexels.com/photos/36879177/pexels-photo-36879177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: "m13",
    category: "salads",
    name: "تبولة",
    description: "بقدونس وبرغل وطماطم ونعناع بزيت الزيتون والليمون",
    price: "30",
    priceValue: 30,
    image:
      "https://images.pexels.com/photos/4768991/pexels-photo-4768991.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  // المشويات
  {
    id: "m14",
    category: "grills",
    name: "دجاج مشوي",
    description: "دجاج متبل بالبهارات السورية ومشوي على الفحم",
    price: "120",
    priceValue: 120,
    image:
      "https://images.pexels.com/photos/15388079/pexels-photo-15388079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: "m15",
    category: "grills",
    name: "شيش طاووق",
    description: "قطع فراخ متبيلة ومشوية على الفحم مع الخضار",
    price: "130",
    priceValue: 130,
    image:
      "https://images.pexels.com/photos/5175631/pexels-photo-5175631.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: "m16",
    category: "grills",
    name: "كباب مشوي",
    description: "كباب لحم مفروم متبل ومشوي على الفحم",
    price: "140",
    priceValue: 140,
    image:
      "https://images.pexels.com/photos/17303312/pexels-photo-17303312.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  // المشروبات
  {
    id: "m17",
    category: "drinks",
    name: "شوربة الدجاج بالكريمة",
    description: "شوربة فراخ كريمية غنية بالنكهة",
    price: "35",
    priceValue: 35,
    image:
      "https://images.pexels.com/photos/28896610/pexels-photo-28896610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: "m18",
    category: "drinks",
    name: "عصير طازج",
    description: "عصائر طبيعية طازجة (برتقال، ليمون نعناع، فراولة)",
    price: "20",
    priceValue: 20,
    image:
      "https://images.pexels.com/photos/30906051/pexels-photo-30906051.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: "m19",
    category: "drinks",
    name: "شاي بالنعناع",
    description: "شاي ساخن بالنعناع الطازج",
    price: "15",
    priceValue: 15,
    image:
      "https://images.pexels.com/photos/6769518/pexels-photo-6769518.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  // الحلويات
  {
    id: "m20",
    category: "desserts",
    name: "بقلاوة",
    description: "بقلاوة بالفستق الحلبي والعسل",
    price: "45",
    priceValue: 45,
    image:
      "https://images.pexels.com/photos/17688137/pexels-photo-17688137.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: "m21",
    category: "desserts",
    name: "كنافة بالقشطة",
    description: "كنافة ناعمة طازجة بالقشطة والقطر",
    price: "50",
    priceValue: 50,
    image:
      "https://images.pexels.com/photos/36355420/pexels-photo-36355420.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: "m22",
    category: "desserts",
    name: "حلى شامية مشكلة",
    description: "تشكيلة حلويات شامية فاخرة بالفستق والجوز",
    price: "55",
    priceValue: 55,
    image:
      "https://images.pexels.com/photos/27088089/pexels-photo-27088089.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
];

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "أحمد م.",
    rating: 4,
    text: "الشاورما من أحسن اللي أكلتها في العبور، الطعم أصيل والأسعار ممتازة. التوصيل سريع والتعامل محترم.",
    date: "قبل أسبوع",
  },
  {
    id: "r2",
    name: "سارة ع.",
    rating: 5,
    text: "فتة الشاورما تحفة! المكان نظيف والخدمة سريعة. بنروح هناك كتير مع العائلة.",
    date: "قبل أسبوعين",
  },
  {
    id: "r3",
    name: "محمود ك.",
    rating: 4,
    text: "البرك بالجبنة لذيذ والبطاطس مقرمشة. المكان مناسب للعائلات والأسعار في المتناول.",
    date: "قبل شهر",
  },
  {
    id: "r4",
    name: "نورا ح.",
    rating: 4,
    text: "الدجاج المشوي طري وطعمه ممتاز. الفتوش طازة والكميات كريمة. تجربة كويسة جداً.",
    date: "قبل شهر",
  },
];

export const features = [
  {
    icon: "Flame",
    title: "نكهة سورية أصيلة",
    description: "أطباق مستوحاة من المطبخ الدمشقي.",
  },
  {
    icon: "Leaf",
    title: "مكونات طازة",
    description: "نهتم بجودة المكونات وطريقة التحضير.",
  },
  {
    icon: "UtensilsCrossed",
    title: "اختيارات لكل الأذواق",
    description: "شاورما، فتة، مشويات، مقبلات وسلطات.",
  },
  {
    icon: "MapPin",
    title: "مكانك المفضل في العبور",
    description: "تجربة مناسبة للعائلات والأصدقاء والطلبات السريعة.",
  },
];
