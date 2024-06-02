<template>

  <div class="line" id="firstline"></div>
  <div class="line" id="secondline"></div>
  <div class="line" id="thirdline"></div>
  <div class="line" id="fourthline"></div>
  <div class="line" id="fifthline"></div>

</template>

<script>
export default {
  name: "linesComponent"
}
</script>

<style scoped>
.line {
  z-index: -1;
  width: 2%;
  height: 30vh;
  background: rgba(218,253,0, 1);
  filter: blur(15px);
  box-shadow: 0 0 20px 7px rgba(218,253,0, 1);
}
#firstline {
  position: absolute;
  margin: 20% 0 0 5%;
}
#secondline {
  position: absolute;
  height: 15vh;
  margin: 0 0 0 47%;
}
#thirdline {
  position: absolute;
  margin: 32% 0 0 65%;
}#fourthline {
   position: absolute;
  height: 17vh;
   box-shadow: 0 0 20px 7px rgba(218,253,0, 0.6);
   margin: 35% 0 0 27%;
 }
#fifthline {
  position: absolute;
  height: 15vh;
  box-shadow: 0 0 20px 7px rgba(218,253,0, 0.7);
  margin: 10% 0 0 90%;
}
</style>