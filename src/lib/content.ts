export const languages = ["en", "fr", "zh"] as const;

export type Lang = (typeof languages)[number];

export const languageLabels: Record<Lang, string> = {
  en: "EN",
  fr: "FR",
  zh: "中文",
};

export const defaultLang: Lang = "en";

export const restaurant = {
  name: "The Dumpling Hut",
  altName: "La Maison Dumplings",
  hanzi: "饺子小屋",
  address: "3591 Rue Clark, Montréal, QC H2X 2R9",
  phone: "(514) 652-3897",
  phoneHref: "tel:+15146523897",
  instagram: "@thedumplinghut",
  instagramHref: "https://www.instagram.com/thedumplinghut/",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=3591%20Rue%20Clark%2C%20Montr%C3%A9al%2C%20QC%20H2X%202R9",
  mapEmbed:
    "https://www.google.com/maps?q=3591+Rue+Clark,+Montr%C3%A9al,+QC+H2X+2R9&output=embed",
  uberEatsHref:
    "https://www.ubereats.com/ca/store/the-dumpling-hut/3zZmcz7aVzaRk8etoaTE5Q",
  doorDashHref:
    "https://www.doordash.com/en/store/the-dumpling-hut-montr%C3%A9al-714824/",
} as const;

/**
 * The gallery. The first nine are real posts pulled from the public
 * @thedumplinghut Instagram feed; `shortcode` links each of those tiles back
 * to the original post so the account keeps full attribution. The rest are
 * house photos of the room, the storefront and the famous wall of notes —
 * they have no `shortcode` and simply show in the lightbox without an
 * Instagram link. Images live in /public/feed. Captions live per-language in
 * `feed.posts`, zipped against this list by index. Keep both arrays the same
 * length.
 */
export const feedImages: Array<{ src: string; shortcode?: string }> = [
  { src: "/feed/01-chili-oil-dumplings.jpg", shortcode: "CO6Mxk9DRqR" },
  { src: "/feed/02-steamed-plate.jpg", shortcode: "CMaZ33DjG18" },
  { src: "/feed/03-pan-fried-window.jpg", shortcode: "CQjaYzlDwxW" },
  { src: "/feed/04-chicken-coriander-combo.jpg", shortcode: "CMp0YqHDult" },
  { src: "/feed/05-dumplings-chili-chopsticks.jpg", shortcode: "CMcpem2jbhe" },
  { src: "/feed/06-hand-rolled-wrappers.jpg", shortcode: "CMpdDM1DKOq" },
  { src: "/feed/07-folding-the-filling.jpg", shortcode: "CNBMjLrhTpt" },
  { src: "/feed/08-fresh-dumpling-plate.jpg", shortcode: "CMcswb5DWTI" },
  { src: "/feed/09-cold-dessert.jpg", shortcode: "DZa3HrTlb5J" },
  { src: "/feed/10-wall-of-notes.jpg" },
  { src: "/feed/11-notes-from-everywhere.jpg" },
  { src: "/feed/12-plateau-mural.jpg" },
  { src: "/feed/13-the-front-door.jpg" },
  { src: "/feed/14-a-note-from-afar.jpg" },
  { src: "/feed/15-mixed-plate.jpg" },
  { src: "/feed/16-the-storefront.jpg" },
  { src: "/feed/17-steamed-open.jpg" },
  { src: "/feed/18-golden-panfried.jpg" },
  { src: "/feed/19-takeout-tray.jpg" },
  { src: "/feed/20-pan-fried-closeup.jpg" },
  { src: "/feed/21-haiqin-at-work.jpg" },
  { src: "/feed/22-the-sign.jpg" },
];

export const instagramPostHref = (shortcode: string) =>
  `https://www.instagram.com/p/${shortcode}/`;

export type DeliveryKey = "doordash" | "ubereats";

export type DeliveryPlatform = {
  key: DeliveryKey;
  name: string;
  href: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  logoClassName: string;
  tagline: Record<Lang, string>;
  color: string;
};

export const deliveryPlatforms: DeliveryPlatform[] = [
  {
    key: "ubereats",
    name: "Uber Eats",
    href: restaurant.uberEatsHref,
    logoSrc: "/uber-eats.png",
    logoWidth: 146,
    logoHeight: 24,
    logoClassName: "h-6 w-auto max-w-[9.5rem] object-contain object-left sm:h-7",
    tagline: {
      en: "Delivery to your door",
      fr: "Livraison à votre porte",
      zh: "送货上门",
    },
    color: "#06c167",
  },
  {
    key: "doordash",
    name: "DoorDash",
    href: restaurant.doorDashHref,
    logoSrc: "/doordash.png",
    logoWidth: 1024,
    logoHeight: 119,
    logoClassName: "h-9 w-auto max-w-[10rem] object-contain object-left sm:h-10 sm:max-w-[11rem]",
    tagline: {
      en: "Pickup or delivery",
      fr: "Cueillette ou livraison",
      zh: "自取或外送",
    },
    color: "#ef322a",
  },
];

export type NavKey = "menu" | "story" | "visit" | "feed";

export const navItems: Array<{ key: NavKey; href: string }> = [
  { key: "menu", href: "menu" },
  { key: "story", href: "about" },
  { key: "feed", href: "gallery" },
  { key: "visit", href: "location" },
];

/* ------------------------------------------------------------------ */
/*  Interactive menu data — richly tagged for filtering & sorting      */
/* ------------------------------------------------------------------ */

export type CookKey = "steamed" | "panfried" | "veg" | "side";
export type ProteinKey = "pork" | "lamb" | "chicken" | "veggie";
export type DietKey = "vegetarian" | "vegan" | "spicy" | "signature";

export type MenuItem = {
  id: string;
  cook: CookKey;
  protein: ProteinKey;
  diet: DietKey[];
  spice: 0 | 1 | 2 | 3;
  price: number;
  /** dumplings per order, null for sides */
  count: number | null;
  name: Record<Lang, string>;
  blurb: Record<Lang, string>;
  /** longer description for the detail modal */
  detail: Record<Lang, string>;
  pairs: Record<Lang, string>;
  emoji: string;
  /** dish photo in /public/dishes, shared across all languages */
  image: string;
};

export const menuItems: MenuItem[] = [
  {
    id: "lamb-coriander-steamed",
    cook: "steamed",
    protein: "lamb",
    diet: ["signature", "spicy"],
    spice: 2,
    price: 12.99,
    count: 15,
    emoji: "🥟",
    image: "/dishes/lamb-coriander-steamed.jpg",
    name: {
      en: "Lamb & Coriander",
      fr: "Agneau et coriandre",
      zh: "羊肉香菜水饺",
    },
    blurb: {
      en: "Aromatic lamb, bright coriander, scallion.",
      fr: "Agneau parfumé, coriandre vive, échalote.",
      zh: "羊肉鲜香，香菜与葱清爽提味。",
    },
    detail: {
      en: "The bold one. Cumin-warmed lamb folded with a fistful of fresh coriander and scallion, juicy enough to drink. Our most requested filling for guests who like flavour with a little adventure.",
      fr: "L'audacieux. Agneau parfumé au cumin, plié avec une poignée de coriandre fraîche et d'échalote, si juteux qu'on le boirait. Notre farce la plus demandée pour les curieux.",
      zh: "最有个性的一款。带孜然香气的羊肉，包入大把新鲜香菜和葱，多汁到几乎可以喝。喜欢重口味又爱尝鲜的客人最爱。",
    },
    pairs: {
      en: "Pairs with house chili oil + hot tea.",
      fr: "Avec l'huile pimentée maison et un thé chaud.",
      zh: "搭配自制辣油和热茶。",
    },
  },
  {
    id: "pork-chive-steamed",
    cook: "steamed",
    protein: "pork",
    diet: ["signature"],
    spice: 0,
    price: 12.99,
    count: 15,
    emoji: "🥟",
    image: "/dishes/pork-chive-steamed.jpg",
    name: {
      en: "Pork & Chive",
      fr: "Porc et ciboulette",
      zh: "猪肉韭菜水饺",
    },
    blurb: {
      en: "The house classic: pork, garlic chive, ginger.",
      fr: "Le classique: porc, ciboulette ail, gingembre.",
      zh: "店内经典：猪肉、韭菜、姜香平衡。",
    },
    detail: {
      en: "The one everyone orders first. Juicy ground pork, fragrant garlic chive and a whisper of ginger in a tender hand-rolled wrapper. If you only try one thing, make it this.",
      fr: "Celui que tout le monde commande en premier. Porc haché juteux, ciboulette à l'ail parfumée et un soupçon de gingembre dans une pâte tendre roulée à la main.",
      zh: "几乎人人第一份都点它。多汁猪肉、香气十足的韭菜，加一丝姜香，包进手擀的柔软面皮。只尝一样的话，就选它。",
    },
    pairs: {
      en: "Pairs with cucumber salad.",
      fr: "Avec la salade de concombre.",
      zh: "搭配拍黄瓜。",
    },
  },
  {
    id: "pork-dill-steamed",
    cook: "steamed",
    protein: "pork",
    diet: [],
    spice: 0,
    price: 12.99,
    count: 15,
    emoji: "🥟",
    image: "/dishes/pork-dill-steamed.jpg",
    name: {
      en: "Pork & Dill",
      fr: "Porc et aneth",
      zh: "猪肉茴香水饺",
    },
    blurb: {
      en: "Fragrant dill, clean and bright finish.",
      fr: "Aneth parfumé, finale fraîche et nette.",
      zh: "茴香清新，收口干净明亮。",
    },
    detail: {
      en: "A northern-China favourite. Fresh dill cuts through rich pork for something clean, herbal and quietly addictive. The regulars' secret order.",
      fr: "Un favori du nord de la Chine. L'aneth frais tranche le porc riche pour un résultat propre, herbacé et discrètement addictif.",
      zh: "中国北方的心头好。新鲜茴香化解猪肉的厚重，清爽、带草本香，让人悄悄上瘾。是熟客的隐藏点单。",
    },
    pairs: {
      en: "Pairs with hot tea.",
      fr: "Avec un thé chaud.",
      zh: "搭配热茶。",
    },
  },
  {
    id: "chicken-mushroom-steamed",
    cook: "steamed",
    protein: "chicken",
    diet: [],
    spice: 0,
    price: 12.99,
    count: 15,
    emoji: "🥟",
    image: "/dishes/chicken-mushroom-steamed.jpg",
    name: {
      en: "Chicken & Mushroom",
      fr: "Poulet et champignons",
      zh: "鸡肉蘑菇水饺",
    },
    blurb: {
      en: "Ground chicken, earthy mushroom, sesame.",
      fr: "Poulet haché, champignons terreux, sésame.",
      zh: "鸡肉、蘑菇与芝麻，鲜味十足。",
    },
    detail: {
      en: "The lighter pick. Tender ground chicken with earthy mushrooms and a drop of sesame oil: gentle, savoury, and very easy to keep eating.",
      fr: "Le choix plus léger. Poulet haché tendre, champignons terreux et une goutte d'huile de sésame : doux, savoureux et facile à enchaîner.",
      zh: "更清爽的选择。嫩鸡肉配上带泥土香的蘑菇和一点芝麻油，温和鲜香，一口接一口。",
    },
    pairs: {
      en: "Pairs with cucumber salad.",
      fr: "Avec la salade de concombre.",
      zh: "搭配拍黄瓜。",
    },
  },
  {
    id: "lamb-coriander-panfried",
    cook: "panfried",
    protein: "lamb",
    diet: ["signature", "spicy"],
    spice: 2,
    price: 13.99,
    count: 15,
    emoji: "🍳",
    image: "/dishes/lamb-coriander-panfried.jpg",
    name: {
      en: "Lamb & Coriander",
      fr: "Agneau et coriandre",
      zh: "羊肉香菜煎饺",
    },
    blurb: {
      en: "Crisp bottoms, rich and herb-forward.",
      fr: "Fond croustillant, riche et herbacé.",
      zh: "底部酥脆，浓郁带香草气息。",
    },
    detail: {
      en: "Everything you love about the lamb dumpling, with lacquered golden bottoms from the pan. Crackle, then juice. Best with chili oil.",
      fr: "Tout ce que vous aimez du dumpling à l'agneau, avec un fond doré et laqué à la poêle. Le croustillant, puis le jus. Idéal avec l'huile pimentée.",
      zh: "你爱的羊肉饺子，加上煎到金黄发亮的酥脆底。先是脆响，再是爆汁。配辣油最棒。",
    },
    pairs: {
      en: "Pairs with house chili oil.",
      fr: "Avec l'huile pimentée maison.",
      zh: "搭配自制辣油。",
    },
  },
  {
    id: "pork-chive-panfried",
    cook: "panfried",
    protein: "pork",
    diet: ["signature"],
    spice: 0,
    price: 13.99,
    count: 15,
    emoji: "🍳",
    image: "/dishes/pork-chive-panfried.jpg",
    name: {
      en: "Pork & Chive",
      fr: "Porc et ciboulette",
      zh: "猪肉韭菜煎饺",
    },
    blurb: {
      en: "Golden edges around the house favourite.",
      fr: "Bords dorés autour du favori maison.",
      zh: "金黄焦边，包裹店内最爱。",
    },
    detail: {
      en: "Our most-loved filling, pan-fried to crisp golden edges with a soft steamed top. The texture upgrade for the dumpling everyone already orders.",
      fr: "Notre farce la plus aimée, poêlée jusqu'à obtenir des bords dorés et croustillants avec un dessus tendre. La version texturée du dumpling que tout le monde commande déjà.",
      zh: "最受欢迎的馅料，煎出酥脆金边、上层依旧柔软。给大家本就常点的饺子来一次口感升级。",
    },
    pairs: {
      en: "Pairs with cucumber salad.",
      fr: "Avec la salade de concombre.",
      zh: "搭配拍黄瓜。",
    },
  },
  {
    id: "pork-dill-panfried",
    cook: "panfried",
    protein: "pork",
    diet: [],
    spice: 0,
    price: 13.99,
    count: 15,
    emoji: "🍳",
    image: "/dishes/pork-dill-panfried.jpg",
    name: {
      en: "Pork & Dill",
      fr: "Porc et aneth",
      zh: "猪肉茴香煎饺",
    },
    blurb: {
      en: "Comforting, bright, a delicate herbal lift.",
      fr: "Réconfortant, lumineux, légèrement herbacé.",
      zh: "温暖家常，带一点清新草本香。",
    },
    detail: {
      en: "Pork and dill with a crackling fried base. Comforting and bright at once, the kind of plate that disappears before you mean it to.",
      fr: "Porc et aneth avec une base poêlée croustillante. Réconfortant et lumineux à la fois, le genre d'assiette qui disparaît avant qu'on s'en rende compte.",
      zh: "猪肉茴香配酥脆煎底。既温暖又清新，是那种还没回过神就已经吃光的一盘。",
    },
    pairs: {
      en: "Pairs with hot tea.",
      fr: "Avec un thé chaud.",
      zh: "搭配热茶。",
    },
  },
  {
    id: "chicken-mushroom-panfried",
    cook: "panfried",
    protein: "chicken",
    diet: [],
    spice: 0,
    price: 13.99,
    count: 15,
    emoji: "🍳",
    image: "/dishes/chicken-mushroom-panfried.jpg",
    name: {
      en: "Chicken & Mushroom",
      fr: "Poulet et champignons",
      zh: "鸡肉蘑菇煎饺",
    },
    blurb: {
      en: "A lighter favourite with satisfying umami.",
      fr: "Un favori plus léger, plein d'umami.",
      zh: "更清爽的人气款，鲜味满满。",
    },
    detail: {
      en: "Light chicken and mushroom given a deep golden, crisp finish. All the umami, none of the heaviness.",
      fr: "Poulet et champignons légers avec une finition dorée et croustillante. Tout l'umami, sans la lourdeur.",
      zh: "清爽的鸡肉蘑菇，煎出深金酥脆的底。鲜味十足，却毫不油腻。",
    },
    pairs: {
      en: "Pairs with cucumber salad.",
      fr: "Avec la salade de concombre.",
      zh: "搭配拍黄瓜。",
    },
  },
  {
    id: "vegetable-mushroom",
    cook: "veg",
    protein: "veggie",
    diet: ["vegetarian", "vegan"],
    spice: 0,
    price: 12.99,
    count: 15,
    emoji: "🥬",
    image: "/dishes/vegetable-mushroom.jpg",
    name: {
      en: "Vegetable & Mushroom",
      fr: "Légumes et champignons",
      zh: "蔬菜蘑菇饺",
    },
    blurb: {
      en: "Cabbage, mushroom, tofu and sesame.",
      fr: "Chou, champignon, tofu et sésame.",
      zh: "白菜、蘑菇、豆腐与芝麻。",
    },
    detail: {
      en: "Proof that plant-based can be the main event. Cabbage, mushroom and tofu seasoned with sesame and ginger, folded with the same care as everything else. Fully vegan.",
      fr: "La preuve que le végétal peut être la vedette. Chou, champignon et tofu assaisonnés de sésame et de gingembre, pliés avec le même soin que tout le reste. Entièrement végétalien.",
      zh: "植物馅也能当主角。白菜、蘑菇、豆腐，用芝麻和姜调味，和其他饺子一样用心包制。纯素。",
    },
    pairs: {
      en: "Pairs with house chili oil.",
      fr: "Avec l'huile pimentée maison.",
      zh: "搭配自制辣油。",
    },
  },
  {
    id: "seasonal-greens",
    cook: "veg",
    protein: "veggie",
    diet: ["vegetarian", "vegan"],
    spice: 0,
    price: 12.99,
    count: 15,
    emoji: "🥬",
    image: "/dishes/seasonal-greens.jpg",
    name: {
      en: "Seasonal Greens",
      fr: "Verdure de saison",
      zh: "时令青菜饺",
    },
    blurb: {
      en: "Market greens, garlic and ginger.",
      fr: "Légumes du marché, ail et gingembre.",
      zh: "市场青菜，蒜香与姜香。",
    },
    detail: {
      en: "Whatever's freshest from the market, folded with garlic and ginger. It changes with the seasons, so ask what's in today. Vegan.",
      fr: "Ce qu'il y a de plus frais au marché, plié avec ail et gingembre. Ça change au fil des saisons, alors demandez ce qu'il y a aujourd'hui. Végétalien.",
      zh: "市场上最新鲜的青菜，配蒜与姜包制。随季节变化，欢迎问问今天用的是什么。纯素。",
    },
    pairs: {
      en: "Pairs with hot tea.",
      fr: "Avec un thé chaud.",
      zh: "搭配热茶。",
    },
  },
  {
    id: "cucumber-salad",
    cook: "side",
    protein: "veggie",
    diet: ["vegetarian", "vegan"],
    spice: 1,
    price: 5.99,
    count: null,
    emoji: "🥒",
    image: "/dishes/cucumber-salad.jpg",
    name: {
      en: "Smashed Cucumber Salad",
      fr: "Salade de concombre",
      zh: "拍黄瓜",
    },
    blurb: {
      en: "Cool, crisp, garlic vinegar dressing.",
      fr: "Frais, croquant, vinaigrette à l'ail.",
      zh: "清脆爽口，蒜香醋汁。",
    },
    detail: {
      en: "Smashed cucumber in a punchy garlic-vinegar dressing. The cooling counterpoint every dumpling order needs.",
      fr: "Concombre écrasé dans une vinaigrette à l'ail bien relevée. Le contrepoint rafraîchissant dont chaque commande de dumplings a besoin.",
      zh: "拍碎的黄瓜配上够味的蒜香醋汁。每一份饺子都需要这一抹清凉的平衡。",
    },
    pairs: {
      en: "Great with anything pan-fried.",
      fr: "Parfait avec tout ce qui est poêlé.",
      zh: "配任何煎饺都好。",
    },
  },
  {
    id: "chili-oil",
    cook: "side",
    protein: "veggie",
    diet: ["vegetarian", "vegan", "spicy"],
    spice: 3,
    price: 6.99,
    count: null,
    emoji: "🌶️",
    image: "/dishes/chili-oil.jpg",
    name: {
      en: "House Chili Oil",
      fr: "Huile pimentée maison",
      zh: "自制辣油",
    },
    blurb: {
      en: "A small jar of heat for dipping.",
      fr: "Un petit pot de chaleur pour tremper.",
      zh: "一小罐辣味，蘸食最佳。",
    },
    detail: {
      en: "Our slow-toasted chili oil in a jar to take home. Deep, fragrant, more savoury than scorching. Drizzle it on everything.",
      fr: "Notre huile pimentée lentement grillée, en pot à emporter. Profonde, parfumée, plus savoureuse que brûlante. À verser sur tout.",
      zh: "慢火炒香的自制辣油，装罐带回家。香气浓郁、咸鲜大于灼辣，淋什么都好吃。",
    },
    pairs: {
      en: "Goes on absolutely everything.",
      fr: "Se met sur absolument tout.",
      zh: "万物皆可淋。",
    },
  },
  {
    id: "hot-tea",
    cook: "side",
    protein: "veggie",
    diet: ["vegetarian", "vegan"],
    spice: 0,
    price: 5.99,
    count: null,
    emoji: "🍵",
    image: "/dishes/hot-tea.jpg",
    name: {
      en: "Hot Tea Service",
      fr: "Service de thé chaud",
      zh: "热茶",
    },
    blurb: {
      en: "Simple tea for a slower meal.",
      fr: "Thé simple pour un repas tranquille.",
      zh: "简单茶饮，慢慢吃一餐。",
    },
    detail: {
      en: "A pot of simple, comforting tea to slow the table down. Refills are part of the deal.",
      fr: "Une théière de thé simple et réconfortant pour ralentir la table. Les recharges font partie du deal.",
      zh: "一壶简单暖心的茶，让一桌人慢下来。续杯当然包含在内。",
    },
    pairs: {
      en: "Pairs with everything.",
      fr: "Avec tout.",
      zh: "配什么都合适。",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Trilingual UI copy                                                 */
/* ------------------------------------------------------------------ */

export const copy = {
  en: {
    metadata: {
      title: "The Dumpling Hut | Hand-folded Chinese dumplings in Montreal",
      description:
        "A cozy Chinese dumpling house on Rue Clark, Montreal. Hand-folded steamed and pan-fried dumplings from special homemade recipes, made fresh daily.",
    },
    locale: "en_CA",
    nav: {
      menu: "Menu",
      story: "Our Story",
      visit: "Visit",
      feed: "Feed",
      order: "Call to order",
      close: "Close",
      menuOpen: "Menu",
    },
    common: {
      order: "Call to order",
      directions: "Get directions",
      openKitchen: "Open kitchen",
      address: "Address",
      phone: "Phone",
      hours: "Hours",
      instagram: "Instagram",
      closed: "Closed",
      owners: "Haiqin",
      perOrder: "per order",
      from: "from",
    },
    hours: [
      ["Mon", "11:00 – 21:00"],
      ["Tue", "11:00 – 21:00"],
      ["Wed", "11:00 – 21:00"],
      ["Thu", "11:00 – 21:00"],
      ["Fri", "11:00 – 21:30"],
      ["Sat", "11:00 – 21:30"],
      ["Sun", "Closed"],
    ] as [string, string][],
    hero: {
      tag: "Hidden on Rue Clark · since the first fold",
      lead: "Fifteen folds",
      title: "to a perfect dumpling.",
      sub: "A tiny Montreal house where special homemade recipes become honest, steam-kissed dumplings, hand-folded in an open kitchen. No fuss. No pretension. Just the dumpling you'll think about tomorrow.",
      ctaMenu: "Explore the menu",
      ctaVisit: "Find the hut",
      scroll: "Scroll into the steam",
    },
    marquee: [
      "hand-folded daily",
      "open kitchen",
      "homemade recipes",
      "steamed or pan-fried",
      "a hidden gem on Clark",
      "15 to an order",
    ],
    story: {
      eyebrow: "Our story",
      title: "A hand-folded dumpling house with an open-kitchen heart.",
      lead: "Tucked inside a converted house on Rue Clark, The Dumpling Hut feels more like a neighbourhood secret than a restaurant built for show.",
      blocks: [
        {
          k: "01",
          h: "Haiqin's table",
          p: "Haiqin built the hut around special homemade recipes: hand-folded Chinese dumplings, served without ceremony, meant to be shared.",
        },
        {
          k: "02",
          h: "An open kitchen",
          p: "Nothing is hidden. You can watch the wrappers get rolled, the fillings spooned, the pleats pressed shut, and the dumplings hit the steam and the pan.",
        },
        {
          k: "03",
          h: "What it feels like",
          p: "Steam, a few close tables, the sound of dumplings hitting the pan, and plates that arrive ready for dipping. A hidden gem for casual dinners and friends who order too much on purpose.",
        },
      ],
      values: [
        "Hand-folded dumplings",
        "Special homemade recipes",
        "Cozy converted house",
        "No-pretension hospitality",
      ],
      stats: [
        ["15", "dumplings to a classic order"],
        ["100%", "hand-folded, every day"],
        ["1", "tiny house, big heart"],
      ] as [string, string][],
    },
    menu: {
      eyebrow: "The menu",
      title: "Folded to order. Filtered to taste.",
      lead: "Steamed for soft and juicy, pan-fried for crisp golden bottoms. Filter by what you're craving and we'll show you the way.",
      searchPlaceholder: "Search dumplings…",
      filtersTitle: "Filter",
      sortTitle: "Sort",
      clear: "Clear all",
      resultsOne: "plate matches",
      resultsMany: "plates match",
      none: "No plates match those filters. Loosen them up.",
      perOrder: "per order",
      cooks: {
        all: "Everything",
        steamed: "Steamed",
        panfried: "Pan-fried",
        veg: "Veg & Vegan",
        side: "Sides",
      } as Record<"all" | CookKey, string>,
      diets: {
        signature: "Signature",
        vegetarian: "Vegetarian",
        vegan: "Vegan",
        spicy: "Spicy",
      } as Record<DietKey, string>,
      proteins: {
        pork: "Pork",
        lamb: "Lamb",
        chicken: "Chicken",
        veggie: "Veggie",
      } as Record<ProteinKey, string>,
      sorts: {
        featured: "Featured",
        priceLow: "Price: low to high",
        priceHigh: "Price: high to low",
        spicy: "Spiciest first",
      } as Record<"featured" | "priceLow" | "priceHigh" | "spicy", string>,
      details: "Details",
      spiceLabel: "Heat",
      pairLabel: "Best with",
      countLabel: "per order",
    },
    feed: {
      eyebrow: "From the kitchen",
      title: "Steam, folds, and crisp bottoms, straight from our feed.",
      lead: "We post what's coming out of the pan. Follow along on Instagram.",
      follow: "Follow on Instagram",
      viewOnIg: "View on Instagram",
      prev: "Previous photo",
      next: "Next photo",
      close: "Close",
      posts: [
        ["Chili oil season", "A fresh batch of the house oil, spooned over hot dumplings."],
        ["Straight off the steam", "A full plate of hand-folded dumplings, the way Friday should look."],
        ["By the window", "Pan-fried, crisp bottoms, caught in the afternoon light."],
        ["Chicken & coriander combo", "Chicken-coriander and the egg-carrot fold, plated together."],
        ["Dip and go", "Steamed dumplings, chili oil, an egg, and the red chopsticks."],
        ["Rolled by hand", "Every wrapper rolled out one at a time, all day long."],
        ["Folding the filling", "Hands-deep in the prep. This is where each dumpling starts."],
        ["A fresh plate", "Just folded, just cooked, ready for the table."],
        ["Cold desserts now", "Ice cream and cold sweets are back for the hot season."],
        ["The wall of notes", "Years of guests have pinned up love letters to the dumplings."],
        ["Notes from everywhere", "Montreal, Vancouver, LA — messages from every table, wall to wall."],
        ["Around the corner", "Plateau street art, a short walk from the hut."],
        ["The front door", "Look closely: every inch around the glass is covered in notes."],
        ["A note from afar", "Gabriel and Osvaldo, all the way from the USA and Mexico."],
        ["Best of both", "Half steamed, half pan-fried: when you can't choose, get both."],
        ["The little brick hut", "Arched windows, an OPEN sign, and bikes parked out front."],
        ["Look inside", "A steamed dumpling split open on its golden egg-and-veg filling."],
        ["Crisp and golden", "A plate of pan-fried dumplings with lacquered, golden bottoms."],
        ["Packed to go", "A tray of dumplings boxed up and ready to travel home."],
        ["Right off the pan", "Plump dumplings, glistening, with crackling golden edges."],
        ["The hands behind the hut", "Haiqin folding tray after tray by hand — the heart of the kitchen."],
        ["Look up for the sign", "The hanging sign on Clark — you've found the hut."],
      ] as [string, string][],
    },
    visit: {
      eyebrow: "Visit",
      title: "Find the little dumpling house on Clark.",
      lead: "We're tucked into 3591 Rue Clark, between the Plateau and the Quartier des Spectacles. Walk in, call ahead, or stop by after an afternoon downtown.",
      hoursTitle: "Hours",
      findTitle: "Find us",
      callTitle: "Call to order",
      deliveryTitle: "Order delivery",
      todayOpen: "Open now",
      todayClosed: "Closed now",
      mapAlt: "Map to The Dumpling Hut on Rue Clark",
    },
    footer: {
      tag: "Hand-folded Chinese dumplings · Montréal",
      built: "A cozy hidden gem on Rue Clark.",
      rights: "All rights reserved.",
    },
    order: {
      cta: "Order Now",
      ctaShort: "Order",
      modalTitle: "Order online",
      modalLead: "Pick your favourite delivery app and we'll start folding.",
      orPhone: "Prefer to call?",
      callLabel: "Call to order",
      close: "Close",
      footerTitle: "Order online",
      footerLead: "Get our dumplings delivered.",
    },
  },

  fr: {
    metadata: {
      title: "La Maison Dumplings | Dumplings chinois faits main à Montréal",
      description:
        "Un restaurant chaleureux de dumplings chinois sur la rue Clark à Montréal. Dumplings vapeur et poêlés faits main à partir de recettes maison, frais chaque jour.",
    },
    locale: "fr_CA",
    nav: {
      menu: "Menu",
      story: "Notre histoire",
      visit: "Nous trouver",
      feed: "Galerie",
      order: "Appeler pour commander",
      close: "Fermer",
      menuOpen: "Menu",
    },
    common: {
      order: "Appeler pour commander",
      directions: "Itinéraire",
      openKitchen: "Cuisine ouverte",
      address: "Adresse",
      phone: "Téléphone",
      hours: "Heures",
      instagram: "Instagram",
      closed: "Fermé",
      owners: "Haiqin",
      perOrder: "par commande",
      from: "dès",
    },
    hours: [
      ["Lun", "11:00 à 21:00"],
      ["Mar", "11:00 à 21:00"],
      ["Mer", "11:00 à 21:00"],
      ["Jeu", "11:00 à 21:00"],
      ["Ven", "11:00 à 21:30"],
      ["Sam", "11:00 à 21:30"],
      ["Dim", "Fermé"],
    ] as [string, string][],
    hero: {
      tag: "Caché sur la rue Clark · depuis le premier pli",
      lead: "Quinze plis",
      title: "pour un dumpling parfait.",
      sub: "Une petite maison montréalaise où des recettes maison bien gardées deviennent des dumplings honnêtes et fumants, pliés à la main dans une cuisine ouverte. Sans chichi. Sans prétention. Juste le dumpling auquel vous penserez demain.",
      ctaMenu: "Explorer le menu",
      ctaVisit: "Trouver la maison",
      scroll: "Plongez dans la vapeur",
    },
    marquee: [
      "fait main chaque jour",
      "cuisine ouverte",
      "recettes maison",
      "vapeur ou poêlé",
      "un bijou caché sur Clark",
      "15 par commande",
    ],
    story: {
      eyebrow: "Notre histoire",
      title: "Une maison de dumplings faits main au cœur de cuisine ouverte.",
      lead: "Installée dans une maison convertie sur la rue Clark, La Maison Dumplings ressemble plus à un secret de quartier qu'à un restaurant de spectacle.",
      blocks: [
        {
          k: "01",
          h: "La table de Haiqin",
          p: "Haiqin a bâti la maison autour de recettes maison bien gardées : des dumplings chinois pliés à la main, servis sans cérémonie, pensés pour être partagés.",
        },
        {
          k: "02",
          h: "Une cuisine ouverte",
          p: "Rien n'est caché. On voit la pâte se rouler, la farce se déposer, les plis se fermer, et les dumplings rejoindre la vapeur et la poêle.",
        },
        {
          k: "03",
          h: "L'ambiance",
          p: "De la vapeur, quelques tables rapprochées, le son des dumplings dans la poêle et des assiettes prêtes à tremper. Un bijou caché pour les soupers décontractés et les amis qui commandent trop, exprès.",
        },
      ],
      values: [
        "Dumplings pliés à la main",
        "Recettes maison spéciales",
        "Maison convertie intime",
        "Accueil sans prétention",
      ],
      stats: [
        ["15", "dumplings par commande classique"],
        ["100%", "pliés à la main, chaque jour"],
        ["1", "petite maison, grand cœur"],
      ] as [string, string][],
    },
    menu: {
      eyebrow: "Le menu",
      title: "Pliés à la commande. Filtrés selon l'envie.",
      lead: "Vapeur pour tendre et juteux, poêlé pour des fonds dorés et croustillants. Filtrez selon votre envie et on vous guide.",
      searchPlaceholder: "Chercher un dumpling…",
      filtersTitle: "Filtrer",
      sortTitle: "Trier",
      clear: "Tout effacer",
      resultsOne: "assiette trouvée",
      resultsMany: "assiettes trouvées",
      none: "Aucune assiette ne correspond. Assouplissez les filtres.",
      perOrder: "par commande",
      cooks: {
        all: "Tout",
        steamed: "Vapeur",
        panfried: "Poêlés",
        veg: "Végé & Végane",
        side: "Accompagnements",
      } as Record<"all" | CookKey, string>,
      diets: {
        signature: "Signature",
        vegetarian: "Végétarien",
        vegan: "Végane",
        spicy: "Épicé",
      } as Record<DietKey, string>,
      proteins: {
        pork: "Porc",
        lamb: "Agneau",
        chicken: "Poulet",
        veggie: "Légumes",
      } as Record<ProteinKey, string>,
      sorts: {
        featured: "En vedette",
        priceLow: "Prix : croissant",
        priceHigh: "Prix : décroissant",
        spicy: "Les plus épicés",
      } as Record<"featured" | "priceLow" | "priceHigh" | "spicy", string>,
      details: "Détails",
      spiceLabel: "Piquant",
      pairLabel: "Idéal avec",
      countLabel: "par commande",
    },
    feed: {
      eyebrow: "De la cuisine",
      title: "Vapeur, plis et fonds croustillants, directement de notre fil.",
      lead: "On publie ce qui sort de la poêle. Suivez-nous sur Instagram.",
      follow: "Suivre sur Instagram",
      viewOnIg: "Voir sur Instagram",
      prev: "Photo précédente",
      next: "Photo suivante",
      close: "Fermer",
      posts: [
        ["Saison de l'huile pimentée", "Un nouveau lot d'huile maison, versé sur les dumplings chauds."],
        ["Tout droit de la vapeur", "Une pleine assiette de dumplings pliés à la main."],
        ["Près de la fenêtre", "Poêlés, fonds croustillants, saisis dans la lumière de l'après-midi."],
        ["Combo poulet-coriandre", "Poulet-coriandre et le pli œuf-carotte, servis ensemble."],
        ["On trempe et c'est parti", "Dumplings vapeur, huile pimentée, un œuf et les baguettes rouges."],
        ["Roulé à la main", "Chaque pâte étalée une à une, toute la journée."],
        ["On garnit le pli", "Les mains dans la prépa : c'est là que chaque dumpling commence."],
        ["Une assiette fraîche", "Tout juste plié, tout juste cuit, prêt pour la table."],
        ["Desserts froids de retour", "La crème glacée et les douceurs froides reviennent pour l'été."],
        ["Le mur de petits mots", "Des années de clients y ont épinglé leurs déclarations d'amour aux dumplings."],
        ["Des mots de partout", "Montréal, Vancouver, LA : des messages de chaque table, d'un mur à l'autre."],
        ["Au coin de la rue", "L'art urbain du Plateau, à deux pas de la maison."],
        ["La porte d'entrée", "Regardez bien : chaque centimètre autour de la vitre est couvert de petits mots."],
        ["Un mot venu de loin", "Gabriel et Osvaldo, venus des États-Unis et du Mexique."],
        ["Le meilleur des deux", "Moitié vapeur, moitié poêlé : quand on n'arrive pas à choisir."],
        ["La petite maison de brique", "Fenêtres en arc, une enseigne OUVERT et des vélos devant."],
        ["Vue de l'intérieur", "Un dumpling vapeur ouvert sur sa farce dorée d'œuf et de légumes."],
        ["Doré et croustillant", "Une assiette de dumplings poêlés aux fonds dorés et laqués."],
        ["Emporté", "Un plateau de dumplings emballé, prêt à rentrer à la maison."],
        ["Tout juste poêlés", "Des dumplings dodus et luisants, aux bords dorés et croustillants."],
        ["Les mains derrière la maison", "Haiqin plie plateau après plateau à la main — le cœur de la cuisine."],
        ["Levez les yeux vers l'enseigne", "L'enseigne suspendue sur Clark — vous avez trouvé la maison."],
      ] as [string, string][],
    },
    visit: {
      eyebrow: "Nous trouver",
      title: "Trouvez la petite maison de dumplings sur Clark.",
      lead: "Nous sommes au 3591 rue Clark, entre le Plateau et le Quartier des spectacles. Passez sans réserver, appelez d'avance, ou arrêtez-vous après une sortie au centre-ville.",
      hoursTitle: "Heures",
      findTitle: "Nous trouver",
      callTitle: "Appeler pour commander",
      deliveryTitle: "Commandez en livraison",
      todayOpen: "Ouvert maintenant",
      todayClosed: "Fermé maintenant",
      mapAlt: "Carte vers La Maison Dumplings sur la rue Clark",
    },
    footer: {
      tag: "Dumplings chinois faits main · Montréal",
      built: "Un bijou caché chaleureux sur la rue Clark.",
      rights: "Tous droits réservés.",
    },
    order: {
      cta: "Commander",
      ctaShort: "Commander",
      modalTitle: "Commander en ligne",
      modalLead: "Choisissez votre appli de livraison préférée et on commence à plier.",
      orPhone: "Vous préférez appeler?",
      callLabel: "Appeler pour commander",
      close: "Fermer",
      footerTitle: "Commander en ligne",
      footerLead: "Faites livrer nos dumplings.",
    },
  },

  zh: {
    metadata: {
      title: "饺子小屋 The Dumpling Hut | 蒙特利尔手工中式饺子",
      description:
        "位于蒙特利尔Clark街的温馨中式饺子小馆。每日以独家家常配方手工现包水饺与煎饺。",
    },
    locale: "zh_CN",
    nav: {
      menu: "菜单",
      story: "我们的故事",
      visit: "到店",
      feed: "动态",
      order: "电话点餐",
      close: "关闭",
      menuOpen: "菜单",
    },
    common: {
      order: "电话点餐",
      directions: "查看路线",
      openKitchen: "开放式厨房",
      address: "地址",
      phone: "电话",
      hours: "营业时间",
      instagram: "Instagram",
      closed: "休息",
      owners: "Haiqin",
      perOrder: "每份",
      from: "起",
    },
    hours: [
      ["周一", "11:00-21:00"],
      ["周二", "11:00-21:00"],
      ["周三", "11:00-21:00"],
      ["周四", "11:00-21:00"],
      ["周五", "11:00-21:30"],
      ["周六", "11:00-21:30"],
      ["周日", "休息"],
    ] as [string, string][],
    hero: {
      tag: "藏在 Clark 街 · 从第一个褶开始",
      lead: "十五个褶",
      title: "成就一只完美的饺子。",
      sub: "一间小小的蒙特利尔老房子，开放式厨房里用独家家常配方手工包制朴实、冒着热气的饺子。不张扬，不做作，只有让你明天还会想起的那只饺子。",
      ctaMenu: "查看菜单",
      ctaVisit: "找到小屋",
      scroll: "走进热气里",
    },
    marquee: [
      "每日手工现包",
      "开放式厨房",
      "独家家常配方",
      "水饺或煎饺",
      "Clark 街上的隐藏小店",
      "每份 15 只",
    ],
    story: {
      eyebrow: "我们的故事",
      title: "一家以开放式厨房为心脏的手工饺子小馆。",
      lead: "藏身于 Clark 街一栋改建的小房子里，饺子小屋更像一个街坊口口相传的隐藏小店，而非用来展示的餐厅。",
      blocks: [
        {
          k: "01",
          h: "Haiqin 的手艺",
          p: "Haiqin 把独家家常配方带到店里：手工包制的中式饺子，简单上桌，适合分享。",
        },
        {
          k: "02",
          h: "开放式厨房",
          p: "一切都看得见。你能看到擀皮、舀馅、捏褶，再看着饺子下锅入屉、上汽冒香。",
        },
        {
          k: "03",
          h: "这里的感觉",
          p: "热气、几张靠得很近的桌子、饺子下锅的声音，以及端上来就能直接蘸食的盘子。是适合随意晚餐、和朋友故意点太多的隐藏小店。",
        },
      ],
      values: ["手工包制饺子", "独家家常配方", "温馨改建老房", "朴实亲切服务"],
      stats: [
        ["15", "经典一份饺子数量"],
        ["100%", "每日手工包制"],
        ["1", "一间小屋，满满心意"],
      ] as [string, string][],
    },
    menu: {
      eyebrow: "菜单",
      title: "现点现包，按口味筛选。",
      lead: "水饺柔软多汁，煎饺底部金黄酥脆。按你想吃的来筛选，我们带你找到它。",
      searchPlaceholder: "搜索饺子…",
      filtersTitle: "筛选",
      sortTitle: "排序",
      clear: "全部清除",
      resultsOne: "款符合",
      resultsMany: "款符合",
      none: "没有符合条件的饺子。放宽一下筛选吧。",
      perOrder: "每份",
      cooks: {
        all: "全部",
        steamed: "水饺",
        panfried: "煎饺",
        veg: "素食",
        side: "小菜",
      } as Record<"all" | CookKey, string>,
      diets: {
        signature: "招牌",
        vegetarian: "素食",
        vegan: "纯素",
        spicy: "辣味",
      } as Record<DietKey, string>,
      proteins: {
        pork: "猪肉",
        lamb: "羊肉",
        chicken: "鸡肉",
        veggie: "素馅",
      } as Record<ProteinKey, string>,
      sorts: {
        featured: "推荐",
        priceLow: "价格：从低到高",
        priceHigh: "价格：从高到低",
        spicy: "最辣优先",
      } as Record<"featured" | "priceLow" | "priceHigh" | "spicy", string>,
      details: "详情",
      spiceLabel: "辣度",
      pairLabel: "最佳搭配",
      countLabel: "每份",
    },
    feed: {
      eyebrow: "来自厨房",
      title: "热气、褶子与酥脆锅底，直接来自我们的动态。",
      lead: "我们会发出锅的每一份。来 Instagram 关注我们。",
      follow: "在 Instagram 关注",
      viewOnIg: "在 Instagram 查看",
      prev: "上一张",
      next: "下一张",
      close: "关闭",
      posts: [
        ["辣油季", "新炒的一批自制辣油，浇在热腾腾的饺子上。"],
        ["刚出锅", "满满一盘手工包的饺子，周五就该是这样。"],
        ["窗边一盘", "煎饺，酥脆锅底，沐在午后的光里。"],
        ["鸡肉香菜套餐", "鸡肉香菜配上鸡蛋胡萝卜，一起装盘。"],
        ["蘸一口就开吃", "蒸饺、辣油、一颗蛋，还有那双红筷子。"],
        ["手工擀皮", "每一张皮都一张张擀出来，擀上一整天。"],
        ["手工调馅", "双手忙在备料里，每个饺子都从这里开始。"],
        ["新鲜一盘", "刚包好，刚煮好，上桌正当时。"],
        ["冷饮甜品回归", "冰淇淋和各式冷甜品，为这个夏天回归。"],
        ["留言墙", "多年来，客人把对饺子的情话一张张钉在墙上。"],
        ["来自世界各地的留言", "蒙特利尔、温哥华、洛杉矶——来自每一桌的留言，铺满整面墙。"],
        ["街角风景", "Plateau 的街头壁画，离小屋只有几步路。"],
        ["那扇前门", "仔细看——玻璃四周的每一寸都贴满了留言。"],
        ["远道而来的一张留言", "Gabriel 与 Osvaldo，从美国和墨西哥远道而来。"],
        ["两种都要", "一半水煮，一半煎香——选择困难时，就都来一点。"],
        ["红砖小屋", "拱形窗、亮着的 OPEN 招牌，门口停着几辆单车。"],
        ["咬开看看", "一只蒸饺掰开，露出金黄的蛋与蔬菜馅。"],
        ["金黄酥脆", "一盘煎饺，底部煎得金黄发亮。"],
        ["打包带走", "一盒装好的饺子，随时带回家。"],
        ["刚出锅", "饱满油亮的饺子，带着酥脆的金边。"],
        ["小屋背后的双手", "Haiqin 一盘接一盘手工包制——厨房的灵魂所在。"],
        ["抬头找招牌", "Clark 街上悬挂的招牌——你已经找到小屋了。"],
      ] as [string, string][],
    },
    visit: {
      eyebrow: "到店",
      title: "在 Clark 街找到这间小小的饺子屋。",
      lead: "我们位于 3591 Rue Clark，介于 Plateau 与 Quartier des Spectacles 之间。欢迎直接到店、提前电话点餐，或逛完市中心后来吃一盘热饺子。",
      hoursTitle: "营业时间",
      findTitle: "找到我们",
      callTitle: "电话点餐",
      deliveryTitle: "外卖配送",
      todayOpen: "正在营业",
      todayClosed: "现已打烊",
      mapAlt: "前往饺子小屋（Clark 街）的地图",
    },
    footer: {
      tag: "手工中式饺子 · 蒙特利尔",
      built: "Clark 街上一间温馨的隐藏小店。",
      rights: "版权所有。",
    },
    order: {
      cta: "现在订购",
      ctaShort: "订购",
      modalTitle: "在线订购",
      modalLead: "选择你喜欢的外送平台，我们这就开始包饺子。",
      orPhone: "想打电话？",
      callLabel: "电话点餐",
      close: "关闭",
      footerTitle: "在线订购",
      footerLead: "把我们的饺子送到家。",
    },
  },
} as const;

export type SiteCopy = (typeof copy)[Lang];

export function isLang(value: string): value is Lang {
  return languages.includes(value as Lang);
}

export function getCopy(lang: Lang): SiteCopy {
  return copy[lang];
}
