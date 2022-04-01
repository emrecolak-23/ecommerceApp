<template>
<div class="hero_area">
    <!-- header section strats -->
    <NavBar/>
    <!-- end header section -->
    <!-- slider section strats -->
    <SliderComp/>
    <!-- end slider section -->
</div>
    
<router-view></router-view>
</template>

<script>

import NavBar from './HomeComponents/NavBar.vue'
import SliderComp from './HomeComponents/SliderComp.vue'

export default {
  name: 'HeaderSection',
  components: {
    NavBar,
    SliderComp
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>