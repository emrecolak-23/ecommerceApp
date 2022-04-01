<template>

<!-- header section strats -->
    <header class="header_section">
      <div class="header_top">
        <div class="container-fluid">
          <div class="top_nav_container">
            <div class="contact_nav">
              <a href="">
                <i class="fa fa-phone" aria-hidden="true"></i>
                <span>
                  Call : +90 505 997 91 61
                </span>
              </a>
              <a href="">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <span>
                  Email : colakkemre@gmail.com
                </span>
              </a>
            </div>
            <from class="search_form">
                  <div class="container">
                    <div class="row">
                      <input type="text" class="form-control" placeholder="Search here..." v-model="query">
                      <button class="" type="submit">
                        <i class="fa fa-search" aria-hidden="true"></i>
                      </button>
                    </div>
                    <ul class="list-group" id="searchResults" v-if="product.length>0">
                        <a v-on:click="showModal(item)" v-for="item in product" v-bind:key="item">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                         
                          {{item.title}}
                       
                          <span class="badge badge-primary badge-pill">{{item.price}} TL</span>
                        </li>
                        </a>
                        <!-- Modal -->
                        <ModalComp @close="showModal" :item="modalData" :isVisibility="modalVisibilty" />

                    </ul>
                  </div>
            </from>
            <div class="user_option_box">
            <router-link v-if="!isLoggedIn" to="/login" class="account-link">
                <i class="fa fa-user" aria-hidden="true"></i>
                <span>
                  Login
                </span>
            </router-link>
            <a v-if="isLoggedIn" href="/" v-on:click="logOut" class="account-link">
                <i class="fa fa-user" aria-hidden="true"></i>
                <span>
                 LogOut 
                </span>
            </a>
            </div>
          </div>

        </div>
      </div>
      <div class="header_bottom">
        <div class="container-fluid">
          <nav class="navbar navbar-expand-lg custom_nav-container ">
            
            <router-link to="/" class="navbar-brand">
              <span>
                DIGICOM <span v-if="isLoggedIn">{{user.name}}</span>
              </span>
            </router-link>
            

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class=""> </span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ">
                <li class="nav-item">
                <router-link to="/">Home</router-link>  
                </li>
                <li v-if="!isLoggedIn" class="nav-item">
                <router-link to="/register">Register</router-link>
                </li>
                <li v-if="isLoggedIn" class="nav-item">
                <router-link  to="/dashboard">Dashboard</router-link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
<!-- end header section -->
</template>

<script>

import ProductAPI from '../../api/Product.js'
import ModalComp from '../ModalComp.vue'
import {mapGetters, mapState} from 'vuex'
export default {
  name: 'NavBar',
  components: {
    ModalComp
  },
  data() {
    return {
      query: "",
      product: [],
      modalVisibilty: false,
      modalData: null
    }
  },
  created() {
    console.log(this.isLoggedIn)
  },
  computed: {
    ...mapGetters(["isLoggedIn","user"]),
    ...mapState(["user","token"])
  },
  methods: {
    logOut() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("vuex")
      this.$router.push("/");
    },
    search: async function() {
      const tempProduct = await ProductAPI.searchProduct(this.query)
      this.product = tempProduct.hits
      console.log(this.product)
    },
    showModal(item) {
      this.modalVisibilty = !this.modalVisibilty;
      this.modalData = item
    }
  },
  watch: {
    query: async function() {
      await this.search();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-item a {
  color: grey;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
}

.nav-item a.router-link-exact-active {
  color: white;
  font-weight: bold;
  font-size: 18px;
  background: #97DBAE;
}

#searchResults
{
    position: absolute;
    max-width: 350px;
    min-width: 250px; 
    max-height: 250px;
    overflow-y: auto;
    border: 1px solid gray;

    /*This is relative to the navbar now*/
}


</style>