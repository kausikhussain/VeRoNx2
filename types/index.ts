export type OutfitSlot = "top" | "outerwear" | "bottom" | "footwear" | "headwear" | "accessories";
export type Category = "outerwear" | "tops" | "bottoms" | "pants" | "shoes" | "headwear" | "accessories";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  slot: OutfitSlot;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  cardImageUrl: string;       // Web URL to Essentials image
  outfitImageUrl: string;     // Web URL to matching Outfit model image
  modelLayerUrl?: string;
  color?: string;
  colors: string[];
  sizes: string[];
  description: string;
  materials?: string[];
  badge?: string;
  isNew?: boolean;
  isSale?: boolean;
  tags?: string[];
  matchConfidence?: "verified" | "review";
}

export type Outfit = Record<OutfitSlot, Product | null>;

