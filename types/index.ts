export type OutfitSlot = "headwear" | "top" | "outerwear" | "bottom" | "footwear" | "accessories";
export type Category = "outerwear" | "tops" | "pants" | "shoes" | "headwear" | "accessories";
export interface Product { id:string; slug:string; name:string; category:Category; slot:OutfitSlot; price:number; originalPrice?:number; rating:number; reviewCount:number; cardImageUrl:string; modelLayerUrl:string; colors:string[]; sizes:string[]; description:string; materials?:string[]; badge?:string; isNew?:boolean; isSale?:boolean; tags?:string[]; }
export type Outfit = Record<OutfitSlot, Product | null>;
