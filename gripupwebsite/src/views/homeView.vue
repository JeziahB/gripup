<template>
  <div class="home_page">
    <HeaderComponent></HeaderComponent>
    <div>
    <section class="twocards">
      <div class="cards">
        <div class="allproduct">
          <div class="imgcontainer">
            <img src="../assets/images/grip1.png" alt="grippicture">
          </div>
          <h4>All our products</h4>
          <p>Check out all the grips that we have to offer. We have different kinds of colors. From feet grips to hand grips and large grips</p>
          <router-link to="/product" >
            <button>GO TO SHOP</button>
          </router-link>
        </div>
        <div class="builditcard">
          <div class="imgcontainer">
            <img src="../assets/images/mockup.png" alt="builditpicture">
          </div>
          <h4>Build up your route</h4>
          <p>Try out our new 'building a route' tool. Here, you can build up and visualize your route before buying the grips.</p>
          <a href="buildupView.vue"><button>LETS BUILD</button></a>
        </div>
      </div>
    </section>
    <div class="stand_for">
      <h2>GripUp means...</h2>

      <div class="creativity">
        <div class="quoteadam">
          <div class="quote">
            <h3>Creativity</h3>
            <p class="crea_intro">At GripUp we want to expand further away from what is known. We want route builders to use their complete creativity to challenge climbers. To support this evolution of creative routes we made a Build Up system where route setters can work around with different climbing holds.</p>
            <p><span>“</span>The harder routes you climb, the more interesting the climbing gets and the more crazy moves you are forced to figure out.</p>
            <p class="adam_ondra">- Adam Ondra</p>
            <p class="prof_climber">Professional climber</p>
            <div class="passion">
              <h3 class="word">Passion</h3>
              <p>for <span id="dynamic-text">{{ currentWord }}</span></p>
            </div>
          </div>
          <div class="adampicture">
            <img src="../assets/images/adam_ondra.jpg" alt="adam ondra">
          </div>
        </div>
      </div>

    </div>
  </div>
  </div>
</template>


<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import CategorieComponent from "../components/CategorieComponent.vue";

export default {
  data() {
    return {
      words: ["climbing", "routes", "challenges", "you"],
      currentWordIndex: 0,
      currentWord: "climbing"
    };
  },
  components: {
    HeaderComponent,
    CategorieComponent
  },
  mounted() {
    this.startWordChange();
  },
  methods: {
    startWordChange() {
      setInterval(() => {
        this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
        this.currentWord = this.words[this.currentWordIndex];
      }, 2000);
    }
  }
}
</script>


<style scoped>

</style>