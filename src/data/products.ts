import { Product } from "@/types";

export const products: Product[] = [
  // EXTERIOR - Spoilers
  {
    id: "spoiler-001",
    sku: "BZA-SPO-00001",
    name: "M Performance Carbon Fiber Rear Spoiler",
    slug: "m-performance-carbon-fiber-rear-spoiler-f30",
    description:
      "Enhance your BMW's aerodynamics and style with this premium carbon fiber rear spoiler. Designed to perfectly match the F30 trunk lid contours for a seamless OEM+ look. Features UV-resistant clear coat for long-lasting shine.",
    shortDescription: "Premium carbon fiber spoiler for F30 3 Series",
    category: "exterior",
    subcategory: "spoilers",
    price: 4599,
    compareAtPrice: 5499,
    images: [
      {
        id: "img-001",
        url: "/images/products/spoiler-carbon-f30.jpg",
        alt: "Carbon Fiber Rear Spoiler F30",
        isPrimary: true,
        order: 1,
      },
    ],
    fitment: [
      {
        seriesId: "3-series",
        generationId: "f30-f31-f34",
        modelIds: [],
        yearStart: 2012,
        yearEnd: 2019,
      },
    ],
    isUniversal: false,
    inStock: true,
    stockQuantity: 15,
    specifications: {
      Material: "Carbon Fiber (2x2 Twill Weave)",
      Finish: "Gloss Clear Coat",
      Weight: "1.2kg",
      Installation: "3M VHB Tape + Screws",
    },
    features: [
      "Genuine carbon fiber construction",
      "UV-resistant clear coat finish",
      "Perfect OEM fitment",
      "Includes all mounting hardware",
      "Professional installation recommended",
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "spoiler-002",
    sku: "BZA-SPO-00002",
    name: "Gloss Black Lip Spoiler - G20 3 Series",
    slug: "gloss-black-lip-spoiler-g20",
    description:
      "Sleek gloss black lip spoiler designed specifically for the G20 3 Series. Made from high-quality ABS plastic with a durable gloss finish that matches BMW's factory black trim.",
    shortDescription: "Gloss black ABS lip spoiler for G20",
    category: "exterior",
    subcategory: "spoilers",
    price: 1899,
    images: [
      {
        id: "img-002",
        url: "/images/products/spoiler-black-g20.jpg",
        alt: "Gloss Black Lip Spoiler G20",
        isPrimary: true,
        order: 1,
      },
    ],
    fitment: [
      {
        seriesId: "3-series",
        generationId: "g20-g21",
        modelIds: [],
        yearStart: 2019,
      },
    ],
    isUniversal: false,
    inStock: true,
    stockQuantity: 22,
    specifications: {
      Material: "ABS Plastic",
      Finish: "Gloss Black",
      Weight: "0.8kg",
      Installation: "3M VHB Tape",
    },
    features: [
      "OEM-quality ABS construction",
      "Factory-matched gloss black",
      "Easy tape installation",
      "No drilling required",
    ],
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },

  // EXTERIOR - Mirror Caps
  {
    id: "mirror-001",
    sku: "BZA-MIR-00001",
    name: "M Style Carbon Fiber Mirror Caps (Pair)",
    slug: "m-style-carbon-fiber-mirror-caps",
    description:
      "Transform your BMW's mirrors with these stunning carbon fiber mirror cap replacements. Direct replacement for factory mirror caps with perfect fitment. Available for multiple BMW series.",
    shortDescription: "Carbon fiber mirror cap replacements",
    category: "exterior",
    subcategory: "mirror-caps",
    price: 2499,
    compareAtPrice: 2999,
    images: [
      {
        id: "img-003",
        url: "/images/products/mirror-caps-carbon.jpg",
        alt: "Carbon Fiber Mirror Caps",
        isPrimary: true,
        order: 1,
      },
    ],
    fitment: [
      {
        seriesId: "3-series",
        generationId: "f30-f31-f34",
        modelIds: [],
      },
      {
        seriesId: "4-series",
        generationId: "f32-f33-f36",
        modelIds: [],
      },
    ],
    isUniversal: false,
    inStock: true,
    stockQuantity: 30,
    specifications: {
      Material: "Carbon Fiber",
      Finish: "Gloss Clear Coat",
      Fitment: "Direct Replacement",
      Contents: "1 x Left, 1 x Right",
    },
    features: [
      "Direct OEM replacement",
      "Real carbon fiber",
      "Sold as a pair",
      "Easy clip-on installation",
      "No modification needed",
    ],
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },

  // EXTERIOR - Grilles
  {
    id: "grille-001",
    sku: "BZA-GRI-00001",
    name: "Gloss Black Kidney Grille Set - F30",
    slug: "gloss-black-kidney-grille-f30",
    description:
      "Upgrade from chrome to sleek gloss black kidney grilles. Direct replacement for the factory grilles with perfect OEM fitment. Instantly modernizes your F30's front end appearance.",
    shortDescription: "Gloss black kidney grille replacement",
    category: "exterior",
    subcategory: "grilles",
    price: 899,
    images: [
      {
        id: "img-004",
        url: "/images/products/grille-black-f30.jpg",
        alt: "Gloss Black Kidney Grille F30",
        isPrimary: true,
        order: 1,
      },
    ],
    fitment: [
      {
        seriesId: "3-series",
        generationId: "f30-f31-f34",
        modelIds: [],
        yearStart: 2012,
        yearEnd: 2019,
      },
    ],
    isUniversal: false,
    inStock: true,
    stockQuantity: 45,
    specifications: {
      Material: "ABS Plastic",
      Finish: "Gloss Black",
      Style: "Double Slat",
      Contents: "Left + Right Grille",
    },
    features: [
      "Direct OEM replacement",
      "Clip-on installation",
      "No modifications required",
      "Sold as a set",
    ],
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
  },

  // INTERIOR - Gearknobs
  {
    id: "gearknob-001",
    sku: "BZA-GEA-00001",
    name: "Crystal Gear Selector - F Series",
    slug: "crystal-gear-selector-f-series",
    description:
      "Luxurious crystal-style gear selector replacement for automatic BMWs. Features premium quality crystal-effect construction that catches the light beautifully. Direct replacement for factory gear selector.",
    shortDescription: "Crystal-style automatic gear selector",
    category: "interior",
    subcategory: "gearknobs",
    price: 1299,
    images: [
      {
        id: "img-005",
        url: "/images/products/gearknob-crystal.jpg",
        alt: "Crystal Gear Selector",
        isPrimary: true,
        order: 1,
      },
    ],
    fitment: [
      {
        seriesId: "3-series",
        generationId: "f30-f31-f34",
        modelIds: [],
      },
      {
        seriesId: "4-series",
        generationId: "f32-f33-f36",
        modelIds: [],
      },
      {
        seriesId: "5-series",
        generationId: "f10-f11",
        modelIds: [],
      },
    ],
    isUniversal: false,
    inStock: true,
    stockQuantity: 25,
    specifications: {
      Material: "Crystal Acrylic",
      Compatibility: "Automatic Only",
      Fitment: "Direct Replacement",
    },
    features: [
      "Premium crystal-effect finish",
      "Plug-and-play installation",
      "Ambient light compatible",
      "OEM quality feel",
    ],
    createdAt: "2024-02-05T00:00:00Z",
    updatedAt: "2024-02-05T00:00:00Z",
  },
  {
    id: "gearknob-002",
    sku: "BZA-GEA-00002",
    name: "Carbon Fiber Manual Shift Knob",
    slug: "carbon-fiber-manual-shift-knob",
    description:
      "Lightweight carbon fiber shift knob for manual BMW transmissions. Features a weighted insert for improved shift feel and real carbon fiber exterior with comfortable ergonomic shape.",
    shortDescription: "Real carbon fiber manual shift knob",
    category: "interior",
    subcategory: "gearknobs",
    price: 799,
    images: [
      {
        id: "img-006",
        url: "/images/products/gearknob-carbon-manual.jpg",
        alt: "Carbon Fiber Manual Shift Knob",
        isPrimary: true,
        order: 1,
      },
    ],
    fitment: [
      {
        seriesId: "3-series",
        generationId: "e90-e91-e92-e93",
        modelIds: [],
      },
      {
        seriesId: "3-series",
        generationId: "f30-f31-f34",
        modelIds: [],
      },
    ],
    isUniversal: false,
    inStock: true,
    stockQuantity: 18,
    specifications: {
      Material: "Carbon Fiber + Weighted Core",
      Thread: "Standard BMW Manual",
      Weight: "180g",
    },
    features: [
      "Real carbon fiber construction",
      "Weighted for improved shifting",
      "Ergonomic design",
      "Direct thread-on fitment",
    ],
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
  },

  // INTERIOR - Boot Covers
  {
    id: "boot-001",
    sku: "BZA-BOO-00001",
    name: "Alcantara Shift Boot - M Stitching",
    slug: "alcantara-shift-boot-m-stitching",
    description:
      "Premium Alcantara shift boot with tri-color M stitching. Adds a luxurious sporty touch to your interior. Direct replacement that fits over the existing boot frame.",
    shortDescription: "Alcantara boot with M-color stitching",
    category: "interior",
    subcategory: "boot-covers",
    price: 499,
    images: [
      {
        id: "img-007",
        url: "/images/products/boot-alcantara.jpg",
        alt: "Alcantara Shift Boot",
        isPrimary: true,
        order: 1,
      },
    ],
    fitment: [
      {
        seriesId: "3-series",
        generationId: "e90-e91-e92-e93",
        modelIds: [],
      },
      {
        seriesId: "3-series",
        generationId: "f30-f31-f34",
        modelIds: [],
      },
    ],
    isUniversal: false,
    inStock: true,
    stockQuantity: 35,
    specifications: {
      Material: "Genuine Alcantara",
      Stitching: "M Tri-Color (Blue/Purple/Red)",
      Installation: "Slide-on replacement",
    },
    features: [
      "Genuine Alcantara material",
      "Hand-stitched M colors",
      "OEM frame compatible",
      "Luxury feel and appearance",
    ],
    createdAt: "2024-02-15T00:00:00Z",
    updatedAt: "2024-02-15T00:00:00Z",
  },

  // INTERIOR - Door Lights
  {
    id: "light-001",
    sku: "BZA-LIG-00001",
    name: "BMW Logo LED Door Projectors (Pair)",
    slug: "bmw-logo-led-door-projectors",
    description:
      "Project the iconic BMW logo onto the ground when you open your doors. Easy plug-and-play installation that replaces your existing door lights. Bright LED with crisp projection.",
    shortDescription: "LED door projector lights with BMW logo",
    category: "interior",
    subcategory: "door-lights",
    price: 399,
    images: [
      {
        id: "img-008",
        url: "/images/products/door-light-logo.jpg",
        alt: "BMW Logo Door Projector",
        isPrimary: true,
        order: 1,
      },
    ],
    fitment: [],
    isUniversal: true,
    inStock: true,
    stockQuantity: 50,
    specifications: {
      Type: "LED Projector",
      Power: "5W per unit",
      Contents: "2 x Projector Units",
      Projection: "BMW Roundel",
    },
    features: [
      "Plug-and-play installation",
      "High-brightness LED",
      "Crystal clear projection",
      "Universal BMW fitment",
    ],
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z",
  },
  {
    id: "light-002",
    sku: "BZA-LIG-00002",
    name: "M Performance Door Projectors (Pair)",
    slug: "m-performance-door-projectors",
    description:
      "Show your M Pride with these M Performance logo door projectors. Bright LED units that project the M Performance logo when doors are opened.",
    shortDescription: "M Performance logo door projectors",
    category: "interior",
    subcategory: "door-lights",
    price: 449,
    images: [
      {
        id: "img-009",
        url: "/images/products/door-light-m.jpg",
        alt: "M Performance Door Projector",
        isPrimary: true,
        order: 1,
      },
    ],
    fitment: [],
    isUniversal: true,
    inStock: true,
    stockQuantity: 40,
    specifications: {
      Type: "LED Projector",
      Power: "5W per unit",
      Contents: "2 x Projector Units",
      Projection: "M Performance Logo",
    },
    features: [
      "Plug-and-play installation",
      "High-brightness LED",
      "M Performance branding",
      "Universal BMW fitment",
    ],
    createdAt: "2024-02-22T00:00:00Z",
    updatedAt: "2024-02-22T00:00:00Z",
  },

  // INTERIOR - Trim
  {
    id: "trim-001",
    sku: "BZA-TRI-00001",
    name: "Carbon Fiber Interior Trim Set - F30",
    slug: "carbon-fiber-interior-trim-set-f30",
    description:
      "Complete carbon fiber interior trim set to replace the factory wood or aluminum trim. Includes dash trim, door trim panels, and center console pieces. Direct replacement with clip-on installation.",
    shortDescription: "Complete carbon fiber interior trim upgrade",
    category: "interior",
    subcategory: "interior-trim",
    price: 3999,
    compareAtPrice: 4799,
    images: [
      {
        id: "img-010",
        url: "/images/products/trim-carbon-f30.jpg",
        alt: "Carbon Fiber Interior Trim Set",
        isPrimary: true,
        order: 1,
      },
    ],
    fitment: [
      {
        seriesId: "3-series",
        generationId: "f30-f31-f34",
        modelIds: [],
        yearStart: 2012,
        yearEnd: 2019,
      },
    ],
    isUniversal: false,
    inStock: true,
    stockQuantity: 8,
    specifications: {
      Material: "Real Carbon Fiber",
      Pieces: "8 Piece Set",
      Finish: "Gloss Clear Coat",
      Installation: "Direct Replacement",
    },
    features: [
      "Real carbon fiber",
      "Complete 8-piece set",
      "Direct clip-on replacement",
      "UV-protected finish",
    ],
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },

  // CURATED KITS
  {
    id: "kit-001",
    sku: "BZA-KIT-00001",
    name: "Complete Gearknob Kit - Crystal Style",
    slug: "complete-gearknob-kit-crystal-style",
    description:
      "Everything you need to upgrade your automatic gear selector area. Includes the crystal gear selector, matching start/stop button surround, and premium Alcantara boot cover. Perfect plug-and-play solution.",
    shortDescription: "Crystal gearknob + boot + button surround",
    category: "kits",
    subcategory: "gearknob-kits",
    price: 1999,
    compareAtPrice: 2399,
    images: [
      {
        id: "img-011",
        url: "/images/products/kit-gearknob-crystal.jpg",
        alt: "Complete Gearknob Kit",
        isPrimary: true,
        order: 1,
      },
    ],
    fitment: [
      {
        seriesId: "3-series",
        generationId: "f30-f31-f34",
        modelIds: [],
      },
      {
        seriesId: "4-series",
        generationId: "f32-f33-f36",
        modelIds: [],
      },
    ],
    isUniversal: false,
    inStock: true,
    stockQuantity: 12,
    specifications: {
      Contents:
        "Crystal Gear Selector, Alcantara Boot, Start Button Surround",
      Compatibility: "Automatic Only",
      Installation: "Plug-and-play",
    },
    features: [
      "Complete 3-piece kit",
      "Perfectly matched components",
      "Save vs buying separately",
      "Easy installation",
    ],
    includedItems: [
      "1x Crystal Gear Selector",
      "1x Alcantara Shift Boot",
      "1x Crystal Start Button Surround",
      "Installation guide",
    ],
    createdAt: "2024-03-05T00:00:00Z",
    updatedAt: "2024-03-05T00:00:00Z",
  },
  {
    id: "kit-002",
    sku: "BZA-KIT-00002",
    name: "Exterior Blackout Kit - F30",
    slug: "exterior-blackout-kit-f30",
    description:
      "Transform your F30 with this complete gloss black exterior kit. Includes kidney grilles, mirror caps, and rear trunk badge overlay. Everything you need to delete the chrome.",
    shortDescription: "Complete gloss black exterior package",
    category: "kits",
    subcategory: "exterior-kits",
    price: 3499,
    compareAtPrice: 4299,
    images: [
      {
        id: "img-012",
        url: "/images/products/kit-blackout-f30.jpg",
        alt: "Exterior Blackout Kit",
        isPrimary: true,
        order: 1,
      },
    ],
    fitment: [
      {
        seriesId: "3-series",
        generationId: "f30-f31-f34",
        modelIds: [],
        yearStart: 2012,
        yearEnd: 2019,
      },
    ],
    isUniversal: false,
    inStock: true,
    stockQuantity: 6,
    specifications: {
      Contents: "Kidney Grilles, Mirror Caps, Badge Overlays",
      Finish: "Gloss Black",
      Material: "ABS Plastic",
    },
    features: [
      "Complete chrome delete solution",
      "OEM-quality fitment",
      "Matched gloss black finish",
      "No modification required",
    ],
    includedItems: [
      "1x Kidney Grille Set (L+R)",
      "1x Mirror Cap Set (L+R)",
      "1x Front Badge Overlay",
      "1x Rear Badge Overlay",
    ],
    createdAt: "2024-03-10T00:00:00Z",
    updatedAt: "2024-03-10T00:00:00Z",
  },

  // EXTERIOR - Badges
  {
    id: "badge-001",
    sku: "BZA-BAD-00001",
    name: "Gloss Black Roundel Badge Set",
    slug: "gloss-black-roundel-badge-set",
    description:
      "Replace your faded or chrome roundel badges with these sleek gloss black versions. Set includes front hood and rear trunk badges. Direct replacement with included mounting hardware.",
    shortDescription: "Front & rear gloss black BMW badges",
    category: "exterior",
    subcategory: "badges",
    price: 349,
    images: [
      {
        id: "img-013",
        url: "/images/products/badge-black-set.jpg",
        alt: "Gloss Black Badge Set",
        isPrimary: true,
        order: 1,
      },
    ],
    fitment: [],
    isUniversal: true,
    inStock: true,
    stockQuantity: 60,
    specifications: {
      Contents: "Front 82mm + Rear 74mm",
      Finish: "Gloss Black & White",
      Material: "ABS with Enamel",
    },
    features: [
      "Universal BMW fitment",
      "Front and rear badges included",
      "Premium quality finish",
      "Easy installation",
    ],
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2024-03-15T00:00:00Z",
  },
  {
    id: "badge-002",
    sku: "BZA-BAD-00002",
    name: "M Performance Side Badges (Pair)",
    slug: "m-performance-side-badges",
    description:
      "Authentic-style M Performance fender badges to show your BMW pride. High-quality construction with chrome accents and M tri-color stripe. Includes 3M adhesive backing.",
    shortDescription: "M Performance side fender emblems",
    category: "exterior",
    subcategory: "badges",
    price: 299,
    images: [
      {
        id: "img-014",
        url: "/images/products/badge-m-performance.jpg",
        alt: "M Performance Side Badge",
        isPrimary: true,
        order: 1,
      },
    ],
    fitment: [],
    isUniversal: true,
    inStock: true,
    stockQuantity: 75,
    specifications: {
      Size: "55mm x 15mm each",
      Contents: "2 Badges",
      Finish: "Chrome with M Colors",
      Mounting: "3M Adhesive",
    },
    features: [
      "Universal fitment",
      "Premium chrome finish",
      "M tri-color stripe",
      "3M VHB adhesive included",
    ],
    createdAt: "2024-03-18T00:00:00Z",
    updatedAt: "2024-03-18T00:00:00Z",
  },
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return products.filter((p) => p.subcategory === subcategory);
}

export function getFeaturedProducts(limit: number = 8): Product[] {
  return products.slice(0, limit);
}

export function getRelatedProducts(
  product: Product,
  limit: number = 4
): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.subcategory === product.subcategory)
    )
    .slice(0, limit);
}
