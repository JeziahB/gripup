<template>
  <div class="test">
    <div class="buildup">
      <div class="tekstbuildup">
        <h2>Build Up</h2>
        <p>Build your route and add the products you need to your cart!</p>
        <div id="container">
          <div v-for="(image, index) in grid.images" :key="index" class="square" @click="selectProduct(index)">
            <img v-if="image" :src="image.imageURL" alt="Selected Image">
          </div>

          <div v-if="showModal" class="modal">
            <div class="modal-content">
              <span class="close" @click="closeModal">&times;</span>
              <h2>Select a Product</h2>
              <div class="product-list">
                <div v-for="product in filteredProducts" :key="product.cardId" class="product-item" @click="addProductToGrid(product)">
                  <img :src="product.afbeelding" alt="Product Image">
                  <p>{{ product.titel }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sum_selected_products">
        <h3 v-if="productSummary.length === 0">You didn't choose any grips yet.</h3>
        <div v-else>
          <h3>You selected the following products:</h3>
          <div class="product-summary">
            <div v-for="product in productSummary" :key="product.cardId" class="product-summary-item">
              <img :src="product.afbeelding" alt="Product Image">
              <p>{{ product.titel }} ({{ product.count }}x)</p>
              <p>Prijs: €{{ (product.prijs * product.count).toFixed(2) }}</p>
            </div>
          </div>
          <h4>Total Price: €{{ totalPrice.toFixed(2) }}</h4>
          <h4>Total Price incl. BTW: €{{ totalPriceIncludingBTW.toFixed(2) }}</h4>
          <button @click="moveSelectedToCart">Add Selected Products to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useGridStore } from '@/stores/gridStore';
import { useProductenStore } from '@/stores/productStore';
import { computed } from 'vue';

export default {
  data() {
    return {
      selectedIndex: null,
      showModal: false,
    };
  },
  setup() {
    const productenStore = useProductenStore();

    const filteredProducts = computed(() => productenStore.getFilteredProducts);

    return {
      productenStore,
      filteredProducts,
    };
  },
  computed: {
    grid() {
      return useGridStore();
    },
    productSummary() {
      const summary = {};
      this.grid.images.forEach((item) => {
        if (item && item.productId) {
          if (summary[item.productId]) {
            summary[item.productId].count++;
          } else {
            const product = this.productenStore.getProductById(item.productId);
            summary[item.productId] = { ...product, count: 1 };
          }
        }
      });
      return Object.values(summary);
    },
    totalPrice() {
      return this.productSummary.reduce((total, product) => total + product.prijs * product.count, 0);
    },
    totalPriceIncludingBTW() {
      const total = this.totalPrice;
      const btwRate = this.calculateAverageBtwRate(this.productSummary);
      return total * (1 + btwRate);
    }
  },
  methods: {
    calculateAverageBtwRate(products) {
      const totalBtwRate = products.reduce((total, product) => total + product.btwTarief / 100, 0);
      return totalBtwRate / products.length;
    },
    selectProduct(index) {
      this.selectedIndex = index;
      this.showModal = true;
    },
    addProductToGrid(product) {
      this.grid.setImage(this.selectedIndex, product.afbeelding, product.cardId);
      this.showModal = false;
    },
    moveSelectedToCart() {
      const productsToAdd = this.grid.images.filter(item => item && item.productId).map(item => {
        const product = this.productenStore.getProductById(item.productId);
        return { ...product, source: 'BuildUpView' };
      });

      this.productenStore.addMultipleToCart(productsToAdd);
    },
    closeModal() {
      this.showModal = false;
    }
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
