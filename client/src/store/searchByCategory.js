import ProductAPI from "@/api/Product"

const searchByCategory = {
  namespaced: true,
  state: {
    products: []
  },
  getters: {
    products: (state) => {
      return state.products
    }
  },
  mutations: {
    SET_PRODUCT (state,data) {
      state.products = data
    }
  },
  actions: {
    async getProductByCategory({commit},query) {
      let response = await ProductAPI.searchProductByCategory(query);
      commit('SET_PRODUCT',response.hits)
    }
  }
}

export default searchByCategory