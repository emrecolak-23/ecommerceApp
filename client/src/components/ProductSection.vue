<template>
  <!-- start product section -->
  <div class="product_section layout_padding">
    <ProductComp
      v-if="!$route.query.category && !isFiltered"
      :productList="paginateProduct"
    />
    <ProductComp v-if="$route.query.category" :productList="filteredProduct" />
    <ProductComp v-if="isFiltered" :productList="products" />
  </div>
  <!-- end product section -->

  <div v-if="!$route.query.category && !isFiltered" class="pagination">
    <a
      v-for="pages in paginatePages"
      v-bind:key="pages"
      @click="paginate(pages)"
      :class="{ active: pages == page }"
      >{{ pages }}</a
    >
  </div>
</template>

<script>
import ProductComp from "./ProductComponents/ProductComp.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
// import ProductAPI from '../api/Product'
export default {
  name: "ProductSection",
  props: ["id"],
  components: {
    ProductComp,
  },
  data() {
    return {};
  },
  async created() {
    await this.getProduct(this.page);
  },
  computed: {
    ...mapGetters({
      products: "moduleSearch/products",
      isFiltered: "moduleSearch/isFiltered",
      paginateProduct: "paginate/products",
      paginatePages: "paginate/pages",
      page: "paginate/page",
      filteredProduct: "searchByCategory/products"
    }),
  },
  methods: {
    ...mapActions({
      getProduct: "paginate/getProduct",
    }),
    ...mapMutations({
      setPage: "paginate/SET_PAGE",
    }),
    async paginate(page) {
      this.setPage(page);
      await this.getProduct(page);
    },
  },
};
</script>

<style scoped>
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination a.active {
  background-color: #325288;
  color: white;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>
