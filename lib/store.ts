"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Cart item interface
export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    color: string;
    quantity: number;
}

// Favorite item interface
export interface FavoriteItem {
    id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
}

// App store interface
interface AppStore {
    // Cart
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size: string, color: string) => void;
    updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemCount: () => number;

    // Favorites
    favorites: FavoriteItem[];
    addFavorite: (item: FavoriteItem) => void;
    removeFavorite: (id: string) => void;
    toggleFavorite: (item: FavoriteItem) => void;
    isFavorite: (id: string) => boolean;
}

// Create store with persistence
export const useCartStore = create<AppStore>()(
    persist(
        (set, get) => ({
            // --- Cart State ---
            items: [],

            addItem: (item: CartItem) => {
                set((state) => {
                    const existingIndex = state.items.findIndex(
                        (i) => i.id === item.id && i.size === item.size && i.color === item.color
                    );

                    if (existingIndex !== -1) {
                        const updatedItems = [...state.items];
                        updatedItems[existingIndex].quantity += item.quantity;
                        return { items: updatedItems };
                    }

                    return { items: [...state.items, item] };
                });
            },

            removeItem: (id: string, size: string, color: string) => {
                set((state) => ({
                    items: state.items.filter(
                        (item) => !(item.id === id && item.size === size && item.color === color)
                    ),
                }));
            },

            updateQuantity: (id: string, size: string, color: string, quantity: number) => {
                set((state) => {
                    if (quantity <= 0) {
                        return {
                            items: state.items.filter(
                                (item) => !(item.id === id && item.size === size && item.color === color)
                            ),
                        };
                    }

                    return {
                        items: state.items.map((item) =>
                            item.id === id && item.size === size && item.color === color
                                ? { ...item, quantity }
                                : item
                        ),
                    };
                });
            },

            clearCart: () => set({ items: [] }),

            getTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },

            // --- Favorites State ---
            favorites: [],

            addFavorite: (item: FavoriteItem) => {
                set((state) => {
                    if (state.favorites.some((i) => i.id === item.id)) return state;
                    return { favorites: [...state.favorites, item] };
                });
            },

            removeFavorite: (id: string) => {
                set((state) => ({
                    favorites: state.favorites.filter((item) => item.id !== id),
                }));
            },

            toggleFavorite: (item: FavoriteItem) => {
                const { favorites } = get();
                const exists = favorites.some((f) => f.id === item.id);
                if (exists) {
                    set({ favorites: favorites.filter((f) => f.id !== item.id) });
                } else {
                    set({ favorites: [...favorites, item] });
                }
            },

            isFavorite: (id: string) => {
                return get().favorites.some((item) => item.id === id);
            },
        }),
        {
            name: 'novera-storage', // Updated name to reflect it stores both
        }
    )
);
