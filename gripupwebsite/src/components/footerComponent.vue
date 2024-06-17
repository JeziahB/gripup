<template>
  <div class="footer">
    <router-link to="/">
    <img src="../assets/images/GripUpLogo.png" alt="GripUpLogo">
    </router-link>
    <div class="footerflex">
      <div class="footerpart">
        <h4>Elfde-Liniestraat 24, 3500 Hasselt</h4>
        <h4>0444 44 44 44</h4>
        <h4>gripup.climbing@gmail.com</h4>
        <div class="privacy_terms">
          <router-link to="/terms">
          <h5>Terms and Conditions</h5>
          </router-link>
          <router-link to="/privacy">
          <h5>Privacy Policy</h5>
          </router-link>
          <a href="https://www.instagram.com/gripup.shop/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
          <a href="https://www.linkedin.com/in/gripup-shop-721537311/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
        </div>

      </div>
      <div class="footerpart">
        <ul class="nav-list">
          <li v-for="navItem in navItems" class="nav-list-item">
            <router-link :to="navItem.path" class="nav-list-link">{{navItem.name}}</router-link>
          </li>
        </ul>
      </div>
      <hr>
      <div class="footerpart">
        <iframe
          width="450"
          height="250"
          style="border:0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.883953287142!2d5.3432827!3d50.9374449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c12177528ced33%3A0x27d80a1d25c8505!2sPXL%20University%20of%20Applied%20Sciences%20and%20Arts!5e0!3m2!1sen!2sbe!4v1620050250000!5m2!1sen!2sbe"
          allowfullscreen>
      </iframe>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      navItems: [
        {
          path: "/",
          name: "HOME"
        },
        {
          path: "/product",
          name: "PRODUCT"
        },
        {
          path: "/buildup",
          name: "BUILD UP"
        },
        {
          path: "/cart",
          name: "CART"
        },
        {
          path: "/contact",
          name: "CONTACT"
        }
      ],
    }
  }
}
</script>

<style scoped>

</style>