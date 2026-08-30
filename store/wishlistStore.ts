"use client";
import { create } from "zustand"; import { persist } from "zustand/middleware";
type State={ids:string[];toggleWishlist:(id:string)=>void;isWishlisted:(id:string)=>boolean;clearWishlist:()=>void}; export const useWishlistStore=create<State>()(persist((set,get)=>({ids:[],toggleWishlist:id=>set(s=>({ids:s.ids.includes(id)?s.ids.filter(x=>x!==id):[...s.ids,id]})),isWishlisted:id=>get().ids.includes(id),clearWishlist:()=>set({ids:[]})}),{name:"aurelia-wishlist"}));
