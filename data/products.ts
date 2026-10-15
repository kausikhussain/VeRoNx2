import type { Product, Outfit } from "@/types";
import { assetManifest } from "./manifest";

const metadataDetails: Record<
  string,
  {
    materials: string[];
    description: string;
    badge?: string;
    isNew?: boolean;
    isSale?: boolean;
  }
> = {
  "veron-1": {
    badge: "New Arrival",
    isNew: true,
    materials: ["Lightweight Rayon Twill", "Camp Collar Construction", "Pearlized Buttons"],
    description: "A relaxed resort-cut crossover shirt featuring an airy drape and nuanced coastal texture.",
  },
  "veron-2": {
    isNew: false,
    materials: ["100% Brushed Cotton Flannel", "Dual Flap Pockets", "Horn Buttons"],
    description: "Classic oversized check flannel shirt tailored with structured drop shoulders and clean dual pockets.",
  },
  "veron-3": {
    isNew: false,
    materials: ["Technical Ripstop Nylon", "Water-repellent Coating", "YKK Matte Zips"],
    description: "Precision-tailored black technical jacket with concealed zip closure and architectural silhouette.",
  },
  "veron-4": {
    isNew: false,
    materials: ["420gsm Organic Cotton Fleece", "Reinforced Rib Cuffs", "Custom Metal Aglets"],
    description: "Structured heavyweight sweatpants cut with clean tapered lines and tonal metal-tipped drawstrings.",
  },
  "veron-5": {
    badge: "Bestseller",
    isNew: true,
    materials: ["280gsm Compact Combed Cotton", "High-density Rib Collar", "Pre-shrunk Weave"],
    description: "Substantial heavyweight oversized t-shirt with dropped shoulders and relaxed boxy drape.",
  },
  "veron-6": {
    isNew: false,
    materials: ["Wool-blend Gabardine", "Interior Satin Waistband", "Concealed Trouser Hook"],
    description: "Enduring tailored trousers designed with a clean front crease and relaxed straight silhouette.",
  },
  "veron-7": {
    badge: "Atelier Edition",
    isNew: true,
    materials: ["Italian Virgin Wool Blend", "Hand-stitched Peak Lapels", "Bemberg Cupro Lining"],
    description: "Single-breasted structured blazer crafted with sharp peak lapels and a sculptural modern silhouette.",
  },
  "veron-8": {
    isNew: false,
    materials: ["120s Egyptian Cotton Poplin", "Semi-spread Collar", "Single-needle Tailoring"],
    description: "Refined poplin dress shirt tailored for versatile layering under tailoring or worn cleanly open.",
  },
  "veron-9": {
    isNew: false,
    materials: ["Heavy Cotton Canvas", "Brushed Antique Brass Hardware", "Storm Flap Pockets"],
    description: "Durable military-inspired field jacket equipped with storm-flap pockets and an adjustable cinch hem.",
  },
  "veron-10": {
    badge: "Essential",
    isNew: false,
    materials: ["14oz Selvedge Denim", "Custom Engraved Rivets", "Classic 5-pocket Styling"],
    description: "Classic straight-leg denim jeans rendered in a subtle vintage wash with authentic fade characteristics.",
  },
  "veron-11": {
    badge: "Limited Drop",
    isNew: true,
    materials: ["Heavyweight Wool Melange", "Contrasting Leather Sleeves", "Striped Rib Knit"],
    description: "Heritage collegiate bomber jacket modernized in high-contrast monochrome with premium rib knit trims.",
  },
  "veron-12": {
    isNew: false,
    materials: ["Cotton Twill Shell", "Tonal Tartan Lining", "Double-button Funnel Neck"],
    description: "Timeless Harrington blouson cut with raglan sleeves, double-button funnel collar, and ribbed cuffs.",
  },
  "veron-13": {
    badge: "Atelier Leather",
    isNew: false,
    materials: ["100% Top-Grain Distressed Leather", "Heavyweight YKK Zippers", "Quilted Lining"],
    description: "Supple brown leather jacket with aged patina detailing, asymmetric zip front, and zipped cuffs.",
  },
  "veron-14": {
    isNew: false,
    materials: ["280gsm French Terry Jersey", "Reinforced Crewneck", "Garment Dyed"],
    description: "Heavyweight streetwear staple tee with dropped shoulder seam and garment-dyed earth tone.",
  },
  "veron-15": {
    isNew: false,
    materials: ["Poly-viscose Twill", "Pressed Front Pleats", "Deep Angled Pockets"],
    description: "Relaxed tailored trousers with single pleats and a slight taper towards the ankle hem.",
  },
  "veron-16": {
    isNew: false,
    materials: ["Soft Brushed Cotton", "Twin Patch Flap Pockets", "Chalk Buttons"],
    description: "Heavyweight plaid overshirt that layers effortlessly over tees or underneath outerwear.",
  },
  "veron-17": {
    badge: "Flagship",
    isNew: true,
    materials: ["Full-grain Lambskin Leather", "Quilted Viscose Lining", "Action Back Pleats"],
    description: "Streamlined cafe racer jacket crafted from butter-soft lambskin leather in a deep roasted coffee hue.",
  },
  "veron-18": {
    isNew: false,
    materials: ["Satin Flight Nylon", "Thermal Quilted Core", "Heavy Rib Trim"],
    description: "Contemporary MA-1 flight jacket with tonal ribbed collar, sleeve utility pocket, and clean proportions.",
  },
  "veron-19": {
    isNew: false,
    materials: ["Fine Oxford Weave", "Structured French Placket", "Mother-of-pearl Buttons"],
    description: "Sophisticated monochrome formal shirt with minimalist placket and refined semi-cutaway collar.",
  },
  "veron-20": {
    isNew: false,
    materials: ["Wool-touch Suiting Fabric", "Deep Inverted Pleats", "Wide-leg Silhouette"],
    description: "Contemporary fluid trousers tailored with generous drape, comfortable mid-rise, and clean break.",
  },
  "veron-21": {
    badge: "Iconic",
    isNew: false,
    materials: ["100% Rigid Cotton Denim", "Brass Shank Buttons", "Adjustable Waist Tabs"],
    description: "Authentic Type III trucker jacket featuring chest flap pockets, waist adjuster tabs, and hand-finished wash.",
  },
  "veron-22": {
    isNew: false,
    materials: ["Technical Stretch Twill", "Two-way Dual Zip", "Storm Collar"],
    description: "Clean architectural blouson jacket engineered for all-weather commuting with understated detailing.",
  },
  "veron-23": {
    badge: "New Arrival",
    isNew: true,
    materials: ["Heavy Mercerized Cotton Gabardine", "Silvertone Hardware", "Ribbed Waist"],
    description: "Modern tonal bomber jacket in chalk ecru, punctuated with matte metallic zips and tailored waist ribbing.",
  },
  "veron-24": {
    badge: "Bestseller",
    isNew: false,
    materials: ["Durable Cotton Ripstop", "Expandable Bellows Pockets", "Articulated Knees"],
    description: "Tactical cargo trousers with ergonomic knee darts, reinforced seat, and streamlined flap pockets.",
  },
  "veron-25": {
    isNew: false,
    materials: ["Waxed Weather-resistant Cotton", "Corduroy Lined Collar", "Dual Handwarmer Pockets"],
    description: "Rugged yet refined transitional jacket featuring gusseted shoulders and soft-touch corduroy accents.",
  },
  "veron-26": {
    isNew: true,
    materials: ["380gsm Loopback Terry", "High-definition Screenprint", "Ribbed Hem & Cuffs"],
    description: "Statement warm-tone crewneck with artistic avian graphic motif and ultra-soft loopback cotton interior.",
  },
  "veron-27": {
    isNew: false,
    materials: ["Peach-finish Cotton Twill", "Horn Button Fastening", "Slim-straight Leg"],
    description: "Subtle warm-toned casual chinos featuring a tailored slim-straight cut and garment-washed softness.",
  },
  "veron-28": {
    badge: "Winter Flagship",
    isNew: true,
    materials: ["800gsm Double-faced Wool Cashmere", "Horn Button Closure", "Deep Center Vent"],
    description: "Monumental winter overcoat cut in an enveloping longline silhouette with structured shoulders and center vent.",
  },
  "veron-29": {
    badge: "Fresh Drop",
    isNew: true,
    materials: ["Heavy Cotton Drill", "Modular Utility Pockets", "Reinforced Bar-tacking"],
    description: "Striking monochrome cargo pants tailored with wide straight legs and clean inset utility compartments.",
  },
  "veron-30": {
    isNew: false,
    materials: ["480gsm French Terry", "Double-layered Crossover Hood", "Seamless Kangaroo Pocket"],
    description: "Architectural streetwear hoodie with double-needle construction, ribbed side gussets, and seamless kangaroo pocket.",
  },
  "veron-31": {
    isNew: false,
    materials: ["Linen-cotton Blend", "Tailored Split Waistband", "Clean Front Crease"],
    description: "Effortless straight-leg trousers cut from breathable linen-cotton with refined front seam creasing.",
  },
  "veron-32": {
    isNew: true,
    materials: ["Fluid Crepe Suiting", "Double Reverse Pleats", "Clean Hook & Bar Closure"],
    description: "Dramatic drape wide-leg trousers designed with elegant flow, deep reverse pleating, and a clean hook closure.",
  },
};

export const products: Product[] = assetManifest.map((entry, index) => {
  const details = metadataDetails[entry.id] || {
    materials: ["Premium natural fibres", "Responsible European finishing"],
    description: "A considered wardrobe essential from the VeRoN Atelier collection.",
  };

  const isSale = !details.isNew && (index % 4 === 0);
  const slug = entry.name
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/-$/g, "");

  return {
    id: entry.id,
    slug,
    name: entry.name,
    category: entry.category,
    slot: entry.slot,
    price: entry.price,
    originalPrice: isSale ? Math.round(entry.price * 1.25) : undefined,
    rating: Number((4.6 + (index % 4) * 0.1).toFixed(1)),
    reviewCount: 16 + index * 5,
    cardImageUrl: entry.essentialsUrl,
    outfitImageUrl: entry.outfitUrl,
    modelLayerUrl: entry.outfitUrl,
    color: entry.color,
    colors: [entry.color],
    sizes: entry.slot === "bottom" ? ["28", "30", "32", "34", "36"] : ["S", "M", "L", "XL"],
    description: details.description,
    materials: details.materials,
    badge: details.badge,
    isNew: Boolean(details.isNew),
    isSale,
    tags: [entry.slot, entry.category, entry.color],
    matchConfidence: entry.matchConfidence,
  };
});

// Clean initial outfit state: intentional empty fitting studio (Awaiting user selection)
export const defaultOutfit: Outfit = {
  outerwear: null,
  top: null,
  bottom: null,
  footwear: null,
  headwear: null,
  accessories: null,
};

export const bySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const byId = (id: string): Product | undefined =>
  products.find((p) => p.id === id);
