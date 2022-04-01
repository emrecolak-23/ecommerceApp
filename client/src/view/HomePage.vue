<template>
<CategoryComp/>
<ProductSection/>
<InfoSection/>
</template>

<script>

import CategoryComp from '../components/ProductComponents/CategoryComp.vue'
import ProductSection from '../components/ProductSection.vue'
import InfoSection from '../components/InfoSection.vue'
export default {
  name: 'HomePage',
  components: {
    CategoryComp,
    ProductSection,
    InfoSection,
  }
}

</script>