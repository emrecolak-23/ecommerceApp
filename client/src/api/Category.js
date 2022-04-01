import axios from 'axios';

const url = '/api/category'

export default class CategoryAPI {

  // get all categories from server
  static async getAllCategories() {
    const res = await axios.get(url);
    return res.data;
  }
  
  // get Category By ID
  static async getCategoryById(id) {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  }

  // delete Category By ID
  static async deleteCategory(id) {
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
  }


}