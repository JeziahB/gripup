<script >
import NavigatieComponent from "./components/NavigatieComponent.vue";
import footerComponent from "./components/footerComponent.vue";
export default {
  data() {
    return {

    }
  },
  components: {
    NavigatieComponent,
    footerComponent
  }
}
</script>

<template>

  <NavigatieComponent></NavigatieComponent>
  <router-view></router-view>
  <footer-component></footer-component>



</template>

<style >

</style>
