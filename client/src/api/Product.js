import axios from 'axios'

const url = '/api/product'

export default class ProductAPI {

  // search Product from database
  static async searchProduct(phrase) {
    const res = await axios.get(`${url}/search/products?q=${phrase}`);
    return res.data
  }

  // detailed search for product
  static async dSearchProduct(product) {
    const res = await axios.get(`${url}/dSearch/products?min=${product.minPrice}&max=${product.maxPrice}&category=${product.categoryId}`)
    return res.data
  }

   // search product by category
   static async searchProductByCategory(categoryId) {
    const res = await axios.get(`${url}/search/category/products?category=${categoryId}`)
    return res.data
  }

  // get all product from server for user page
  static async getAllProduct(page) {
    const res = await axios.get(`${url}?page=${page}`)
    return res.data
  }
  static async getAllProductAdmin() {
    const res = await axios.get(`${url}/admin`)
    return res.data
  }

  // get all product from server for admin page

  // to get single product by id
  static async getProductById(id) {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  }

  // to add product to database
  static async addProduct(product) {
    const res = await axios.post(url,product);
    return res.data;
  }

  // to update product into database
  static async updateProduct(id,product) {
    const res = await axios.patch(`${url}/${id}`,product);
    return res.data;
  }

  // to delete product into database
  static async deleteProduct(id) {
    const res = await axios.delete(`${url}/${id}`);
    return res.data
  }

}