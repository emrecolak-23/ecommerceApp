<template>
  <!-- Deteailed Search -->
  <div class="col-md-12 mt-5 ml-5">
    <form action="#" method="post" novalidate="novalidate">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-12 pr-2">
              <input
                type="text"
                class="form-control search-slt"
                name="minPrice"
                placeholder="Enter Min Price"
                v-model="searchData.minPrice"
              />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 pr-2">
              <input
                type="text"
                name="maxPrice"
                class="form-control search-slt"
                placeholder="Enter Max Price"
                v-model="searchData.maxPrice"
              />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 pr-2">
              <select
                class="form-control search-slt"
                id="exampleFormControlSelect1"
                v-model="searchData.categoryId"
              >
                <option v-for="category in categoryList.categories"
              :key="category.id"
              :value="category.id" >{{category.name}}</option>
              </select>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 p-0">
              <button v-on:click="detailedSearch" type="button" class="btn btn-danger wrn-btn">
                Detailed Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <!-- End of Detailed Search-->
  <div class="col-md-12 mt-5 mb-0">
    <div class="filters">
      <ul>
        <li class="nav-item mr-2"><div @click="cleanSearh"> <router-link  to="/">Tümü</router-link></div></li>
        <li
          class="nav-item mr-2"
          v-for="category in categoryList.categories"
          v-bind:key="category.id"
        >
          <div @click="cleanSearh">
          <router-link :to="'/?category=' + category.id">
            {{ category.name }} <span>({{category.product.length}})</span>
          </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import CategoryAPI from "../../api/Category.js";

import { mapActions, mapMutations } from 'vuex'

export default {
  name: "CategoryComp",
  components: {},
  data() {
    return {
      categoryList: [],
      categoryId: 0,
      productList: [],
      searchData: {
        minPrice: 0,
        maxPrice: 0,
        categoryId: 1
      }
    };
  },
  async created() {
    this.categoryList = await CategoryAPI.getAllCategories();
  },
  methods: {
    ...mapActions({
      search: "moduleSearch/searchD",
      getProductByCategory: "searchByCategory/getProductByCategory"
    }),
    ...mapMutations({
      reset: "moduleSearch/RESET_PRODUCTS"
    }),
    async detailedSearch() {
      await this.search(this.searchData)
      this.$router.push("/filtered");
    },
    async cleanSearh() {
      this.getProductByCategory(this.$route.query.category)
      this.reset();
    }
  },
};
</script>

<style scoped>
.filters {
  text-align: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  margin-bottom: 5px;
}
.filters li {
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 700;
  display: inline-block;
  margin: 0px 0px;
  transition: all 0.3s;
  cursor: pointer;
}
.nav-item a {
  color: darkblue;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
  background: lightblue;
}

.nav-item a.router-link-exact-active {
  color: white;
  font-weight: bold;
  font-size: 12px;
  background: #5b7db1;
}
</style>
