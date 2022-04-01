import ProductAPI from "@/api/Product"

const paginate = {
  namespaced: true,
  state: {
    products: [],
    pages: null,
    page: 1
  },
  getters: {
    products: (state) => {
      return state.products
    },
    pages: (state) => {
      return state.pages
    },
    page: (state) => {
      return state.page
    }
  },
  mutations: {
    SET_PRODUCTS (state,data) {
      state.products = data
    },
    SET_PAGES (state,pages) {
      state.pages = pages
    },
    SET_PAGE (state,page) {
      state.page = page
    }
  },
  actions: {
    async getProduct({commit},page) {
      let response = await ProductAPI.getAllProduct(page);

      commit("SET_PRODUCTS", response.products);
      commit("SET_PAGES", response.pages);
    }
  }
}

export default paginate