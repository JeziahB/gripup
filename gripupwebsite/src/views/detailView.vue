<template>
  <div class="filter_and_product">
    <div v-if="opvraagProduct" class="flexdetail">
      <div class="related">
        <h2>Related <span>Products</span></h2>
        <div class="related-products">
          <div v-for="product in relatedProducts" :key="product.cardId" class="related-product">
            <img :src="product.afbeelding" :alt="product.titel" />

          </div>
        </div>
      </div>
      <div class="infodetail">
        <h3>{{ opvraagProduct.titel }}</h3>
        <p class="omschrijving">{{ opvraagProduct.omschrijving }}</p>

        <div class="toevoegenproduct">
          <p class="prijs">€{{ opvraagProduct.prijs }}</p>

          <div class="counter">
            <button @click="decreaseQuantity" :disabled="quantity === 1">-</button>
            <span>{{ quantity }}</span>
            <button @click="increaseQuantity" :disabled="quantity >= opvraagProduct.stock">+</button>
          </div>

          <button @click="addToCart" :disabled="opvraagProduct.stock === 0">
            IN WINKELWAGEN
          </button>
        </div>
      </div>

      <div class="imgdetail">
        <img :src="opvraagProduct.afbeelding" alt="Product afbeelding" />
      </div>
    </div>
    <div v-else>
      Product not found.
    </div>
    <div v-if="showPopup" class="popup-overlay" @click="closePopup">
      <div class="popup" @click.stop>
        <span class="close" @click="closePopup">&times;</span>
        <p>{{ popupMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductenStore } from '@/stores/productStore';

export default {
  data() {
    return {
      productenStore: useProductenStore(),
      quantity: 1, // State for quantity
      showPopup: false, // State for showing popup
      popupMessage: '',
    };
  },
  computed: {
    opvraagProduct() {
      const productId = this.$route.params.cardId;
      return this.productenStore.getProductById(productId);
    },
    relatedProducts() {
      if (this.opvraagProduct) {
        const category = this.opvraagProduct.categorie;
        return this.productenStore.getFilteredProducts.filter(product =>
            product.categorie === category && product.cardId !== this.opvraagProduct.cardId
        ).slice(0, 3); // Limit to 3 related products
      }
      return [];
    },
  },
  methods: {
    increaseQuantity() {
      if (this.quantity < this.opvraagProduct.stock) {
        this.quantity++;
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart() {
      if (this.opvraagProduct && this.opvraagProduct.stock > 0) {
        const cartProduct = { ...this.opvraagProduct, source: 'DetailView' }; // Add source identifier

        const cartItem = this.productenStore.winkelwagen.find(
            (item) => item.cardId === cartProduct.cardId && item.source === 'DetailView'
        );

        if (cartItem) {
          cartItem.quantity += this.quantity;
        } else {
          cartProduct.quantity = this.quantity;
          this.productenStore.winkelwagen.push(cartProduct);
        }

        this.productenStore.updateStockQuantity(cartProduct.cardId, -this.quantity); // Update stock with the quantity

        const addedQuantity = this.quantity; // Store the quantity before resetting

        this.showPopup = true; // Show popup

        this.quantity = 1; // Reset quantity to 1

        this.$nextTick(() => { // Ensure popup message is updated
          this.popupMessage = `${this.opvraagProduct.titel} got added to your cart ${addedQuantity} times`;
        });
      }
    },
    closePopup() {
      this.showPopup = false;
    },
  },
};
</script>

<style scoped>
h2, h3, p {
  color: white;
}
.flexdetail {
  display: flex;
}
.counter {
  display: flex;
  align-items: center;
}
.counter button {
  margin: 0 5px;
}

</style>
