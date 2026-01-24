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

// Cart store interface
interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size: string, color: string) => void;
    updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemCount: () => number;
}

// Create cart store with persistence
export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item: CartItem) => {
                set((state) => {
                    // Check if item with same id, size, and color exists
                    const existingIndex = state.items.findIndex(
                        (i) => i.id === item.id && i.size === item.size && i.color === item.color
                    );

                    if (existingIndex !== -1) {
                        // Update quantity if item exists
                        const updatedItems = [...state.items];
                        updatedItems[existingIndex].quantity += item.quantity;
                        return { items: updatedItems };
                    }

                    // Add new item
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
        }),
        {
            name: 'novera-cart-storage',
        }
    )
);
