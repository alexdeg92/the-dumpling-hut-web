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
  address: "3591 Rue Clark, Montréal, QC H2X 2R9",
  phone: "(514) 652-3897",
  phoneHref: "tel:+15146523897",
  instagram: "@thedumplinghut",
  instagramHref: "https://www.instagram.com/thedumplinghut/",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=3591%20Rue%20Clark%2C%20Montr%C3%A9al%2C%20QC%20H2X%202R9",
};

export const imageUrls = {
  hero: "/images/hero-dumplings.svg",
  dumplings: "/images/dumplings.svg",
  kitchen: "/images/kitchen.svg",
  table: "/images/table.svg",
  steam: "/images/steam.svg",
  vegetables: "/images/vegetables.svg",
};

export type NavKey = "home" | "menu" | "about" | "location" | "gallery";

export const navItems: Array<{ key: NavKey; href: string }> = [
  { key: "home", href: "" },
  { key: "menu", href: "menu" },
  { key: "about", href: "about" },
  { key: "location", href: "location" },
  { key: "gallery", href: "gallery" },
];

const prices = {
  steamed: "$12.99 / 15",
  panFried: "$13.99 / 15",
  vegan: "$12.99 / 15",
  sides: "$5.99-$8.99",
};

export const copy = {
  en: {
    metadata: {
      title: "The Dumpling Hut | Hand-folded Chinese dumplings in Montreal",
      description:
        "A cozy Montreal dumpling restaurant serving authentic hand-folded Chinese dumplings on Rue Clark.",
    },
    nav: {
      home: "Home",
      menu: "Menu",
      about: "About Us",
      location: "Location & Hours",
      gallery: "Gallery",
      menuToggle: "Menu",
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
      owners: "Haiqin and family",
    },
    hours: [
      ["Monday", "11 AM-9 PM"],
      ["Tuesday", "11 AM-9 PM"],
      ["Wednesday", "11 AM-9 PM"],
      ["Thursday", "11 AM-9 PM"],
      ["Friday", "11 AM-9:30 PM"],
      ["Saturday", "11 AM-9:30 PM"],
      ["Sunday", "Closed"],
    ],
    home: {
      eyebrow: "Hand-folded on Rue Clark",
      title: "A small Montreal house filled with dumplings, steam, and family warmth.",
      intro:
        "The Dumpling Hut is a cozy Chinese dumpling spot where Haiqin and family fold honest, generous dumplings in an open kitchen. No fuss, no pretension, just comfort food worth finding.",
      ctaPrimary: "See the menu",
      ctaSecondary: "Plan your visit",
      stats: [
        ["15", "dumplings per classic order"],
        ["5", "signature fillings"],
        ["100%", "hand-folded daily"],
      ],
      featuredTitle: "House favorites",
      featuredIntro:
        "Start with the classics, then add a second plate for the table.",
      testimonialsTitle: "What regulars come back for",
      testimonials: [
        {
          quote:
            "A hidden gem with the kind of dumplings that taste like someone cared about every fold.",
          author: "Plateau regular",
        },
        {
          quote:
            "Warm service, a tiny room, and pork and chive dumplings that disappear fast.",
          author: "Clark Street diner",
        },
        {
          quote:
            "The lamb and coriander is the order I recommend to everyone.",
          author: "Weekend guest",
        },
      ],
    },
    menu: {
      eyebrow: "Menu",
      title: "Simple plates, big flavor, folded to order.",
      intro:
        "Choose steamed for soft, juicy dumplings or pan-fried for crisp bottoms and a deep golden finish.",
      sections: [
        {
          title: "Steamed dumplings",
          description: "Tender wrappers, juicy centers, classic comfort.",
          price: prices.steamed,
          items: [
            ["Lamb & Coriander", "Aromatic lamb with bright coriander and scallion."],
            ["Pork & Chive", "The house classic: savory pork, garlic chive, ginger."],
            ["Pork & Dill", "Fragrant dill gives this pork filling a clean finish."],
            ["Chicken & Mushroom", "Ground chicken with earthy mushrooms and sesame."],
          ],
        },
        {
          title: "Pan-fried dumplings",
          description: "Crisp bottoms, steamed tops, served hot from the pan.",
          price: prices.panFried,
          items: [
            ["Lamb & Coriander", "Rich, herb-forward, and perfect with chili oil."],
            ["Pork & Chive", "Golden edges around the most requested filling."],
            ["Pork & Dill", "Comforting and bright, with a delicate herbal lift."],
            ["Chicken & Mushroom", "A lighter favorite with satisfying umami."],
          ],
        },
        {
          title: "Vegetarian & vegan",
          description: "Plant-forward fillings with the same hand-folded care.",
          price: prices.vegan,
          items: [
            ["Vegetable Mushroom", "Cabbage, mushroom, tofu, and sesame."],
            ["Seasonal Greens", "Market greens folded with garlic and ginger."],
          ],
        },
        {
          title: "Sides & extras",
          description: "Round out the table.",
          price: prices.sides,
          items: [
            ["Cucumber salad", "Cool, crisp cucumber with garlic vinegar dressing."],
            ["House chili oil", "A small jar of heat for dipping and drizzling."],
            ["Hot tea", "Simple tea service for a slower meal."],
          ],
        },
      ],
    },
    about: {
      eyebrow: "About us",
      title: "A family-run dumpling house with an open kitchen heart.",
      intro:
        "Set inside a converted house on Rue Clark, The Dumpling Hut feels more like a neighborhood secret than a restaurant built for show.",
      storyTitle: "Haiqin's table",
      story:
        "Haiqin and family built the restaurant around the food they know best: Chinese dumplings made by hand, served without ceremony, and meant to be shared. The kitchen is open, the room is intimate, and the pace is warm.",
      atmosphereTitle: "What it feels like",
      atmosphere:
        "Expect steam, a few close tables, the sound of dumplings hitting the pan, and plates that arrive ready for dipping. It is a hidden gem for casual dinners, quick lunches, and friends who order too much on purpose.",
      values: ["Hand-folded dumplings", "Family ownership", "Cozy converted house", "No-pretension hospitality"],
    },
    location: {
      eyebrow: "Location & hours",
      title: "Find the little dumpling house on Clark.",
      intro:
        "We are tucked into 3591 Rue Clark in Montréal, close to the Plateau and Quartier des Spectacles.",
      mapTitle: "3591 Rue Clark",
      transit: "Walk in, call ahead, or stop by after an afternoon downtown.",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Steam, folds, crisp bottoms, and a room that feels close.",
      intro:
        "A quick look at the food and atmosphere that define The Dumpling Hut.",
      images: [
        ["Hand-folded dumplings", "Fresh dumplings prepared for service."],
        ["Open kitchen energy", "A small kitchen where the work stays visible."],
        ["A table for sharing", "Simple plates designed for passing around."],
        ["Pan-fried finish", "Golden bottoms, soft tops, hot from the pan."],
        ["Vegetarian plates", "Fresh vegetables and mushroom-forward fillings."],
        ["Cozy night service", "An intimate room with hidden-gem charm."],
      ],
    },
  },
  fr: {
    metadata: {
      title: "La Maison Dumplings | Dumplings chinois faits main a Montreal",
      description:
        "Un restaurant intime de dumplings chinois faits main sur la rue Clark a Montreal.",
    },
    nav: {
      home: "Accueil",
      menu: "Menu",
      about: "Notre histoire",
      location: "Adresse et heures",
      gallery: "Galerie",
      menuToggle: "Menu",
    },
    common: {
      order: "Appeler pour commander",
      directions: "Itineraire",
      openKitchen: "Cuisine ouverte",
      address: "Adresse",
      phone: "Telephone",
      hours: "Heures",
      instagram: "Instagram",
      closed: "Ferme",
      owners: "Haiqin et sa famille",
    },
    hours: [
      ["Lundi", "11 h-21 h"],
      ["Mardi", "11 h-21 h"],
      ["Mercredi", "11 h-21 h"],
      ["Jeudi", "11 h-21 h"],
      ["Vendredi", "11 h-21 h 30"],
      ["Samedi", "11 h-21 h 30"],
      ["Dimanche", "Ferme"],
    ],
    home: {
      eyebrow: "Dumplings faits main sur Clark",
      title: "Une petite maison montrealais remplie de dumplings, de vapeur et de chaleur familiale.",
      intro:
        "La Maison Dumplings est une adresse chinoise chaleureuse ou Haiqin et sa famille plient des dumplings genereux dans une cuisine ouverte. Sans pretention, simplement bon.",
      ctaPrimary: "Voir le menu",
      ctaSecondary: "Planifier la visite",
      stats: [
        ["15", "dumplings par commande classique"],
        ["5", "farces signatures"],
        ["100%", "plies a la main chaque jour"],
      ],
      featuredTitle: "Favoris de la maison",
      featuredIntro:
        "Commencez par les classiques, puis ajoutez une deuxieme assiette pour la table.",
      testimonialsTitle: "Pourquoi les habitues reviennent",
      testimonials: [
        {
          quote:
            "Un petit bijou cache avec des dumplings qui goutent le soin dans chaque pli.",
          author: "Habitue du Plateau",
        },
        {
          quote:
            "Service chaleureux, petite salle, et porc-ciboulette qui part tres vite.",
          author: "Client de la rue Clark",
        },
        {
          quote:
            "L'agneau-coriandre est le plat que je recommande a tout le monde.",
          author: "Invite du weekend",
        },
      ],
    },
    menu: {
      eyebrow: "Menu",
      title: "Des assiettes simples, beaucoup de gout, pliees a la commande.",
      intro:
        "Choisissez vapeur pour une texture tendre et juteuse, ou poele pour une base croustillante et doree.",
      sections: [
        {
          title: "Dumplings vapeur",
          description: "Pate tendre, centre juteux, pur reconfort.",
          price: prices.steamed,
          items: [
            ["Agneau et coriandre", "Agneau parfume, coriandre vive et echalote."],
            ["Porc et ciboulette", "Le classique: porc savoureux, ciboulette ail, gingembre."],
            ["Porc et aneth", "L'aneth apporte une finale fraiche et delicate."],
            ["Poulet et champignons", "Poulet hache, champignons terreux et sesame."],
          ],
        },
        {
          title: "Dumplings poeles",
          description: "Dessous croustillant, dessus vapeur, servis bien chauds.",
          price: prices.panFried,
          items: [
            ["Agneau et coriandre", "Riche, herbe, parfait avec l'huile pimentee."],
            ["Porc et ciboulette", "Bords dores autour de la farce la plus demandee."],
            ["Porc et aneth", "Reconfortant, lumineux, legerement herbace."],
            ["Poulet et champignons", "Un favori plus leger, plein d'umami."],
          ],
        },
        {
          title: "Vegetarien et vegetal",
          description: "Farces vegetales, meme soin dans chaque pli.",
          price: prices.vegan,
          items: [
            ["Legumes et champignons", "Chou, champignon, tofu et sesame."],
            ["Verdure de saison", "Legumes du marche avec ail et gingembre."],
          ],
        },
        {
          title: "Accompagnements",
          description: "Pour completer la table.",
          price: prices.sides,
          items: [
            ["Salade de concombre", "Concombre croquant, vinaigre a l'ail."],
            ["Huile pimentee maison", "Un petit pot de chaleur pour tremper."],
            ["The chaud", "Service de the simple pour ralentir le repas."],
          ],
        },
      ],
    },
    about: {
      eyebrow: "Notre histoire",
      title: "Une maison de dumplings familiale avec une cuisine ouverte au coeur.",
      intro:
        "Installee dans une maison convertie sur la rue Clark, La Maison Dumplings ressemble plus a un secret de quartier qu'a un restaurant de spectacle.",
      storyTitle: "La table de Haiqin",
      story:
        "Haiqin et sa famille ont bati le restaurant autour de ce qu'ils connaissent le mieux: des dumplings chinois faits main, servis sans ceremonie, et penses pour etre partages.",
      atmosphereTitle: "L'ambiance",
      atmosphere:
        "Attendez-vous a de la vapeur, quelques tables rapprochees, le son des dumplings dans la poele, et des assiettes pretes a tremper.",
      values: ["Dumplings plies a la main", "Entreprise familiale", "Maison convertie intime", "Accueil sans pretention"],
    },
    location: {
      eyebrow: "Adresse et heures",
      title: "Trouvez la petite maison de dumplings sur Clark.",
      intro:
        "Nous sommes au 3591 rue Clark a Montreal, pres du Plateau et du Quartier des spectacles.",
      mapTitle: "3591 rue Clark",
      transit: "Passez sans reservation, appelez d'avance, ou arretez-vous apres une sortie au centre-ville.",
    },
    gallery: {
      eyebrow: "Galerie",
      title: "Vapeur, plis, fonds croustillants, et une salle intime.",
      intro:
        "Un apercu de la nourriture et de l'ambiance de La Maison Dumplings.",
      images: [
        ["Dumplings faits main", "Dumplings frais prepares pour le service."],
        ["Cuisine ouverte", "Une petite cuisine ou le travail reste visible."],
        ["Table a partager", "Des assiettes simples a passer autour de la table."],
        ["Finition poelee", "Dessous dores, dessus tendres, servis chauds."],
        ["Options vegetales", "Legumes frais et farces aux champignons."],
        ["Service du soir", "Une salle intime avec le charme d'un secret local."],
      ],
    },
  },
  zh: {
    metadata: {
      title: "The Dumpling Hut | 蒙特利尔手工中式饺子",
      description:
        "位于蒙特利尔Clark街的温馨中式饺子小馆，主打每日手工包制饺子。",
    },
    nav: {
      home: "首页",
      menu: "菜单",
      about: "关于我们",
      location: "地址时间",
      gallery: "相册",
      menuToggle: "菜单",
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
      owners: "Haiqin和家人",
    },
    hours: [
      ["周一", "11:00-21:00"],
      ["周二", "11:00-21:00"],
      ["周三", "11:00-21:00"],
      ["周四", "11:00-21:00"],
      ["周五", "11:00-21:30"],
      ["周六", "11:00-21:30"],
      ["周日", "休息"],
    ],
    home: {
      eyebrow: "Clark街手工饺子",
      title: "一间小小的蒙特利尔老房子，装满饺子、热气和家的味道。",
      intro:
        "The Dumpling Hut是一家温馨的中式饺子馆。Haiqin和家人在开放式厨房里每天手工包制饺子，朴实、热乎、没有距离感。",
      ctaPrimary: "查看菜单",
      ctaSecondary: "计划到店",
      stats: [
        ["15", "经典一份饺子数量"],
        ["5", "招牌馅料"],
        ["100%", "每日手工包制"],
      ],
      featuredTitle: "店内人气",
      featuredIntro: "从经典口味开始，再为整桌多加一盘。",
      testimonialsTitle: "熟客喜欢这里的原因",
      testimonials: [
        {
          quote: "像是藏在街角的小宝藏，每一个褶子都吃得出用心。",
          author: "Plateau熟客",
        },
        {
          quote: "服务温暖，空间小而亲切，猪肉韭菜饺子总是不够吃。",
          author: "Clark街客人",
        },
        {
          quote: "羊肉香菜是我最常推荐给朋友的一款。",
          author: "周末客人",
        },
      ],
    },
    menu: {
      eyebrow: "菜单",
      title: "简单的一盘饺子，扎实的味道，现点现做。",
      intro: "水饺柔软多汁，煎饺底部金黄酥脆，都适合蘸上辣油一起吃。",
      sections: [
        {
          title: "水饺",
          description: "面皮柔软，馅料多汁，经典家常味。",
          price: prices.steamed,
          items: [
            ["羊肉香菜", "羊肉鲜香，香菜和葱带来清爽香气。"],
            ["猪肉韭菜", "店内经典，猪肉、韭菜、姜香平衡。"],
            ["猪肉茴香", "茴香让猪肉馅更清新。"],
            ["鸡肉蘑菇", "鸡肉配蘑菇和芝麻，鲜味十足。"],
          ],
        },
        {
          title: "煎饺",
          description: "底部酥脆，上层柔软，热锅出餐。",
          price: prices.panFried,
          items: [
            ["羊肉香菜", "浓郁又带香草气息，适合配辣油。"],
            ["猪肉韭菜", "最受欢迎的馅料，煎到底部金黄。"],
            ["猪肉茴香", "温暖家常，带一点清新的草本香。"],
            ["鸡肉蘑菇", "更清爽的选择，蘑菇鲜味突出。"],
          ],
        },
        {
          title: "素食及纯素",
          description: "植物馅料，同样手工包制。",
          price: prices.vegan,
          items: [
            ["蔬菜蘑菇", "白菜、蘑菇、豆腐和芝麻。"],
            ["时令青菜", "市场青菜，加入蒜香和姜香。"],
          ],
        },
        {
          title: "小菜与加点",
          description: "让一桌更完整。",
          price: prices.sides,
          items: [
            ["拍黄瓜", "清脆黄瓜配蒜香醋汁。"],
            ["自制辣油", "适合蘸饺子，也适合淋在小菜上。"],
            ["热茶", "简单茶饮，让一餐慢下来。"],
          ],
        },
      ],
    },
    about: {
      eyebrow: "关于我们",
      title: "一家家人经营的饺子小馆，开放式厨房就是它的心。",
      intro:
        "The Dumpling Hut位于Clark街一栋改建的小房子里，更像一个街坊之间口口相传的隐藏小店。",
      storyTitle: "Haiqin家的餐桌",
      story:
        "Haiqin和家人把最熟悉的味道带到店里：手工包制的中式饺子，简单上桌，适合分享，也适合一个人安静吃完一盘。",
      atmosphereTitle: "这里的感觉",
      atmosphere:
        "你会看到厨房里的热气，听到饺子下锅的声音。空间不大，桌子靠得近，气氛亲切，没有多余的包装。",
      values: ["手工包制饺子", "家人经营", "温馨改建老房", "朴实亲切服务"],
    },
    location: {
      eyebrow: "地址时间",
      title: "在Clark街找到这间小小的饺子屋。",
      intro:
        "我们位于蒙特利尔3591 Rue Clark，靠近Plateau和Quartier des Spectacles。",
      mapTitle: "3591 Rue Clark",
      transit: "欢迎直接到店，也可以先打电话点餐，逛完市中心后来吃一盘热饺子。",
    },
    gallery: {
      eyebrow: "相册",
      title: "热气、褶子、酥脆锅底，还有靠得很近的小餐厅。",
      intro: "看看The Dumpling Hut的食物和空间。",
      images: [
        ["手工饺子", "每天为出餐准备的新鲜饺子。"],
        ["开放式厨房", "小厨房里的手工过程清楚可见。"],
        ["适合分享的一桌", "简单的盘子，适合大家一起夹。"],
        ["煎饺出锅", "底部金黄，上层柔软，热气腾腾。"],
        ["素食选择", "新鲜蔬菜和蘑菇馅料。"],
        ["夜晚小店", "空间亲密，有隐藏小馆的魅力。"],
      ],
    },
  },
} as const;

export function isLang(value: string): value is Lang {
  return languages.includes(value as Lang);
}

export function getCopy(lang: Lang) {
  return copy[lang];
}

export const featuredDishes = [
  {
    name: {
      en: "Lamb & Coriander",
      fr: "Agneau et coriandre",
      zh: "羊肉香菜",
    },
    text: {
      en: "Bold, aromatic, and the house specialty for adventurous tables.",
      fr: "Parfume, genereux, et la specialite maison pour les curieux.",
      zh: "香气浓郁，是喜欢重口味客人的招牌选择。",
    },
  },
  {
    name: {
      en: "Pork & Chive",
      fr: "Porc et ciboulette",
      zh: "猪肉韭菜",
    },
    text: {
      en: "The classic order: juicy pork, garlic chive, ginger, and warmth.",
      fr: "Le classique: porc juteux, ciboulette ail, gingembre et chaleur.",
      zh: "最经典的一款：猪肉多汁，韭菜和姜香刚好。",
    },
  },
  {
    name: {
      en: "Vegetable Mushroom",
      fr: "Legumes et champignons",
      zh: "蔬菜蘑菇",
    },
    text: {
      en: "A satisfying vegetarian option with cabbage, tofu, and sesame.",
      fr: "Une option vegetale rassasiante avec chou, tofu et sesame.",
      zh: "白菜、豆腐、蘑菇和芝麻，素食也很扎实。",
    },
  },
] as const;
