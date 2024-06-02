<template>
  <div class="cartoverview">
    <div class="winkelkar">
      <div v-if="productenStore.winkelwagen.length > 0">
        <div>
          <h3>Products from your build</h3>
          <div v-for="product in productsFromBuildUpView" :key="product.cardId" class="cart">
            <div class="smallerdiv">
              <img :src="product.afbeelding" alt="Product afbeelding" />
            </div>
            <div class="marginchange">
              <div>
                <h2>{{ product.titel }}</h2>
              </div>
              <div class="calculateprod">
                <div class="amount">
                  <button @click="countQuantity(product.cardId, 'BuildUpView')">+</button>
                  <p>{{ product.quantity }}</p>
                  <button @click="removeFromCart(product.cardId, 'BuildUpView')">-</button>
                </div>
                <p>x €{{ product.prijs.toFixed(2) }}</p>
                <hr>
                <p class="priceproduct">€{{ (product.prijs * product.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <hr>
          <h3>Products from the shop </h3>
          <div v-for="product in productsFromDetailView" :key="product.cardId" class="cart">
            <div class="smallerdiv">
              <img :src="product.afbeelding" alt="Product afbeelding" />
            </div>
            <div class="marginchange">
              <div>
                <h2>{{ product.titel }}</h2>
              </div>
              <div class="calculateprod">
                <div class="amount">
                  <button @click="countQuantity(product.cardId, 'DetailView')">+</button>
                  <p>{{ product.quantity }}</p>
                  <button @click="removeFromCart(product.cardId, 'DetailView')">-</button>
                </div>
                <p>x €{{ product.prijs.toFixed(2) }}</p>
                <hr>
                <p class="priceproduct">€{{ (product.prijs * product.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="lijn">
          <hr>
        </div>

        <div class="totaal_bedrag">
          <h2>Total cost: <span class="eindprijs">€{{ getCartTotalPrice().toFixed(2) }}</span></h2>
          <h2>Total cost incl. VAT: <span class="eindprijs">€{{ getCartTotalPriceIncludingBTW().toFixed(2) }}</span></h2>
        </div>
        <router-link to="/checkout" class="nav-list-link">
          <button>Go to checkout</button>
        </router-link>
      </div>

      <div v-else>
        <h3>Your cart is currently empty.</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductenStore } from '@/stores/productStore';

export default {
  name: 'CartView',

  data() {
    return {
      productenStore: useProductenStore(),
    };
  },
  computed: {
    productsFromBuildUpView() {
      return this.productenStore.winkelwagen.filter(product => product.source === 'BuildUpView');
    },
    productsFromDetailView() {
      return this.productenStore.winkelwagen.filter(product => product.source === 'DetailView');
    }
  },
  methods: {
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

<style scoped>
h2, h3, p {
  color: white;
}
.flexdetail {
  display: flex;
}

</style>
