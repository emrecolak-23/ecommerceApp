import ProductAPI from "@/api/Product"

const moduleSearch = {
  namespaced: true,
  state: {
    products: []
  },
  getters: {
    products: (state)=> {
        return state.products
    },
    isFiltered: (state) => {
      return state.products.length > 0
    }
  },
  mutations: {
    SET_PRODUCTS (state,data) {
      state.products = data
    },
    RESET_PRODUCTS (state) {
      state.products = []
    }
  },
  actions: {
    
    async searchD({commit},data) {
      let response = await ProductAPI.dSearchProduct(data);

      commit('SET_PRODUCTS', response.hits)
    }

  }

}

export default moduleSearch