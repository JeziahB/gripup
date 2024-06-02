<template>
  <div class="checkout">
    <div class="checkout-left">
      <h2>Billing Information</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name<span>*</span></label>
          <input type="text" id="name" v-model="billingInfo.name" required>
        </div>
        <div class="form-group">
          <label for="email">Email<span>*</span></label>
          <input type="email" id="email" v-model="billingInfo.email" required>
        </div>
        <div class="form-group">
          <label for="address">Address<span>*</span></label>
          <input type="text" id="address" v-model="billingInfo.address" required>
        </div>
        <div class="form-group">
          <label for="company">Company<span>*</span></label>
          <input type="text" id="company" v-model="billingInfo.company" required>
        </div>
        <div class="form-group">
          <label for="paymentMethod">Payment Method<span>*</span></label>
          <select id="paymentMethod" v-model="billingInfo.paymentMethod" required>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <div class="checkout-right">
      <h2>Order Summary</h2>
      <h2>Total price inclusive VAT: €{{ getCartTotalPriceIncludingBTW().toFixed(2) }}</h2>
    </div>
  </div>
</template>

<script>
import { useProductenStore } from '@/stores/productStore';

export default {
  name: 'Checkout',
  data() {
    return {
      billingInfo: {
        name: '',
        email: '',
        address: '',
        company: '',
        paymentMethod: 'creditCard'
      },
      productenStore: useProductenStore()
    };
  },
  computed: {

  },
  methods: {
    submitForm() {
      console.log('Form submitted:', this.billingInfo);
      // Add form submission logic here
    },
    getCartTotalPrice() {
      return this.productenStore.winkelwagen.reduce((total, product) => total + product.prijs * product.quantity, 0);
    },
    getCartTotalPriceIncludingBTW() {
      const totalPrice = this.getCartTotalPrice();
      const btwRate = this.calculateAverageBtwRate(this.productenStore.winkelwagen);
      return totalPrice * (1 + btwRate);
    },
    calculateAverageBtwRate(products) {
      const totalBtwRate = products.reduce((total, product) => total + product.btwTarief / 100, 0);
      return totalBtwRate / products.length;
    },
    removeFromCart(cardId, source) {
      this.productenStore.removeFromCart(cardId, source);
    },
    countQuantity(cardId, source) {
      const product = this.productenStore.winkelwagen.find(item => item.cardId === cardId && item.source === source);

      if (product) {
        this.productenStore.addToCart({ ...product, source });
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>


