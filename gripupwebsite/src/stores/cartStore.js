import { defineStore } from "pinia";
import { useProductenStore } from "@/stores/productStore.js";

export const useShoppingCartStore = defineStore('shoppingCart', {
    //State
    state: () => ({
        cartItems: [],
        productStore: useProductenStore(),
        showPopUp: false,
        totalWithoutVAT: 0,
        totalWithVAT: 0,
    }),

    //Getters
    getters: {
        getCartItems: state => state.cartItems,
    },

    //Actions
    actions: {
        addToCart(cartItem) {
            this.productStore.updateStockQuantity(cartItem.product.id, -cartItem.quantity);
            const existingItem = this.cartItems.find(item => item.product.id === cartItem.product.id);

            if (existingItem) {
                existingItem.quantity += cartItem.quantity;
            } else {
                this.cartItems.push(cartItem);
            }
        },

        removeFromCart(index) {
            if (index >= 0 && index < this.cartItems.length) {
                const item = this.cartItems[index];
                this.productStore.updateStockQuantity(item.product.id, item.quantity);
                this.cartItems.splice(index, 1);
            }
        },

        clearCart() {
            this.cartItems = [];
        },

        calculateTotals() {
            this.totalWithoutVAT = this.calculateTotalWithoutVAT();
            this.totalWithVAT = this.calculateTotalWithVAT();
        },

    },
});