// Import packages
import { createStore } from 'vuex';
import axios from "axios";
import VuexPersistence from 'vuex-persist'

// Import User Api
import UserAPI from "@/api/User"

// Import Modules 
import moduleSearch from './searchDetailed';
import paginate from './paginate';
import searchByCategory from './searchByCategory';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = createStore({
  namespaced: true,
  state: {
    token: null,
    user: null,
  },
  plugins: [vuexLocal.plugin],
  getters: {
    isLoggedIn(state){
      return state.user && state.token
    },
    user: (state) => {
      return state.user
    },

  },
  mutations: {
    SET_TOKEN (state,token) {
      state.token = token
    },
    SET_USER (state,data) {
      state.user = data
    },

  },
  actions: {
    async signIn( {dispatch} , credentials) {
      let response = await UserAPI.loginUser(credentials)
      
      dispatch('attempt', response.token);        
      
    },
    // Check Token isvalid
    async attempt ({commit}, token) {
      commit('SET_TOKEN',token)
      try{
        let response = await axios.get('/api/user/me', {
          headers: {
            'Authorization': 'Bearer '+ token 
          }
        })
        commit('SET_USER', response.data.decode)
      } catch(e) {
        commit('SET_TOKEN',null);
        commit('SET_USER',null)
      }
    },
  },
  modules: {
    moduleSearch,
    paginate,
    searchByCategory
  }
})

export default store