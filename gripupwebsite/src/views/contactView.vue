<template>
  <div class="contact-container">
    <div class="contact-info">
      <div>
        <a target="_blank" href="https://www.google.com/maps/place/PXL+University+of+Applied+Sciences+and+Arts/@50.937442,5.348148,15z/data=!4m6!3m5!1s0x47c12177528ced33:0x27d80a1d25c8505!8m2!3d50.9374416!4d5.3481482!16s%2Fg%2F12214nll3?hl=en&entry=ttu">
        <i class="fas fa-map-marker-alt"></i>
        <span>Elfde-Liniestraat 24, 3500 Hasselt</span>
        </a>
      </div>
      <div>
        <i class="fas fa-phone-alt"></i>
        <span>0444 44 44 44</span>
      </div>
      <div>
        <a target="_blank" href="mailto:gripup.climbing@gmail.com">
        <i class="fas fa-envelope"></i>
        <span>gripup.climbing@gmail.com</span>
        </a>
      </div>
    </div>
    <div class="contact-form">
      <h2>Contact Us</h2>
      <form @submit.prevent="submitForm">
        <input type="text" v-model="form.firstName" placeholder="First Name" required />
        <input type="text" v-model="form.lastName" placeholder="Last Name" required />
        <input type="email" v-model="form.email" placeholder="Email" required />
        <textarea v-model="form.message" placeholder="Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      }
    };
  },
  methods: {
    submitForm() {
      console.log("Form submitted:", this.form);
      // Handle form submission logic here
    }
  }
};
</script>

<style lang="scss">

</style>
