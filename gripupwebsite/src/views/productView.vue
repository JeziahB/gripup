<template>
  <div class="filter_and_products">
    <div class="producten_incol">
      <!-- Iterate over each color group -->
      <div v-for="(group, category) in groupedProducts" :key="category" class="color-group">
        <h3>{{ category }}</h3>
        <div class="producten">
          <!-- Iterate over products in the current color group -->
          <div v-for="product in group" :key="product.cardId" class="product detail">
            <ProductCardComponent :product="product" />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import ProductCardComponent from '../components/ProductCardComponent.vue';
import { useProductenStore } from '@/stores/productStore';

export default {
  components: {
    ProductCardComponent,
  },
  setup() {
    const productenStore = useProductenStore();

    // Compute grouped products by color
    const groupedProducts = computed(() => {
      const grouped = {};
      productenStore.getFilteredProducts.forEach(product => {
        const category = product.categorie; // Assuming you have a property `kleur` in your product object
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(product);
      });
      return grouped;
    });

    return {
      productenStore,
      groupedProducts,
    };
  },
};

</script>

<style>
/* Add your CSS styles here */
</style>
