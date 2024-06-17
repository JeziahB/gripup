<script>
export default {
  data() {
    return {
      navItems: [
        { path: "/", name: "HOME" },
        { path: "/product", name: "PRODUCT" },
        { path: "/buildup", name: "BUILD UP" },
        { path: "/cart", name: "CART" },
        { path: "/contact", name: "CONTACT" }
      ],
      menuOpened: false // Initialize menu state to closed by default
    };
  },
  methods: {
    toggleMenu() {
      // Toggle menu state
      this.menuOpened = !this.menuOpened;

      // Optionally, you can directly manipulate DOM elements using Vue refs
      this.$refs.menu.classList.toggle('opened');
      this.$refs.menu.setAttribute('aria-expanded', this.menuOpened);

      // Toggle display property of .navknoppe
      let navknoppe = this.$refs.navknoppe;
      let navigatie = this.$refs.navigatie;
      if (this.menuOpened) {
        navknoppe.style.display = 'block';
        navigatie.style.backgroundColor = 'black';
        navigatie.style.width = '50%'; // Cover right side
      } else {
        navknoppe.style.display = 'none';
        navigatie.style.backgroundColor = 'rgba(0,0,0,0)';
        navigatie.style.width = '0';
      }
    }
  }
};
</script>


<template>
  <nav>
    <div class="flex">
      <div class="logo">
        <router-link to="/">
        <img src="../assets/images/GripUpLogo.png" alt="GripUpLogo">
        </router-link>
      </div>
      <div class="menu" ref="menu">
        <button class="menubutton" @click="toggleMenu" aria-label="Main Menu">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path class="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
            <path class="line line2" d="M 20,50 H 80" />
            <path class="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
          </svg>
        </button>
      </div>
      <div class="navigatie" ref="navigatie" :class="{ opened: menuOpened }">
        <div class="navknoppe" ref="navknoppe">
          <ul class="nav-list">
            <li v-for="navItem in navItems" class="nav-list-item" :key="navItem.name">
              <router-link :to="navItem.path" class="nav-list-link">{{ navItem.name }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
