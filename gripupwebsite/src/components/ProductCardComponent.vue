<template>
  <div>
    <div v-if="product" @click="navigateDetails">
      <img :src="product.afbeelding" alt="Product afbeelding" />
      <h3>{{ product.titel }}</h3>
      <p>Price: €{{ product.prijs }}</p>
    </div>
    <div v-else>
      Geen producten beschikbaar.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  methods: {
    navigateDetails() {
      console.log('Navigating to details with cardId:', this.product.cardId);
      this.$router.push({ name: 'product-detail', params: { cardId: this.product.cardId } });
    }
  }
};
</script>
