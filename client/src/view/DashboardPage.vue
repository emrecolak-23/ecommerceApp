<template>
<h1>Dashboard Page</h1>

  <!-- Create Product Section Start-->
  <button
    class="btn btn-lg btn-primary"
    data-toggle="modal"
    data-target="#exampleModal"
  >
    <span> Add Product </span>
  </button>
  <!-- Create Product Modal Start -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control mb-2"
            name="title"
            placeholder="Enter product name"
            v-model="productData.title"
          />
          <input
            type="text"
            class="form-control mb-2"
            name="quantity"
            placeholder="Enter product quantity"
            v-model="productData.quantity"
          />
          <input
            type="text"
            class="form-control mb-2"
            name="content"
            placeholder="Enter product content"
            v-model="productData.content"
          />
          <input
            type="file"
            class="form-control mb-2"
            name="image"
            placeholder="Upload product image"
            @change="onFileSelected"
          />
          <input
            type="text"
            class="form-control mb-2"
            name="price"
            placeholder="Enter product content"
            v-model="productData.price"
          />
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="productData.categoryId"
          >
            <option
              v-for="category in categoryList.categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <button
            v-on:click="addProduct"
            type="button"
            class="btn btn-success"
            data-dismiss="modal"
          >
            Add
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Create Product Modal End -->

  <!-- Product Update And Delete List Start -->
 <h1 class="mt-5">Produtcs</h1>
 <table class="table">
  <thead>
    <tr>
      <th scope="col">ID#</th>
      <th scope="col">Product Name</th>
      <th scope="col">UPDATE</th>
      <th scope="col">DELETE</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="product in productList" 
        v-bind:key="product.id">
      <th scope="row">{{product.id}}</th>
      <td>{{product.title}}</td>
      <td><button class="btn btn-warning btn-sm" data-toggle="modal" :data-target="'#exampleModal'+product.id">
                <span>
                  Update
                </span>
              </button></td>
      <td><button v-on:click="deleteProduct(product.id)" class="btn btn-sm btn-danger">Delete</button></td>
      <!-- Update Modal Start -->
      <div class="modal fade" :id="'exampleModal'+product.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">{{product.title}}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                <h3>New Price</h3>
                  <input
                    type="text"
                    class="form-control mb-2"
                    name="price"
                    placeholder="Enter new product price"
                    v-model="updatedPrice"
                  />
                 
                </div>
                <div class="modal-footer">
                  <button v-on:click="updateProduct(product.id)" type="button" class="btn btn-success" data-dismiss="modal">Update</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Update Modal End -->
    </tr>
  </tbody>
</table>
  <!-- Product Update And Delete List End -->
  
  <!-- Category Delete List Start -->
  <h1 class="mt-5">Categories</h1>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">ID#</th>
      <th scope="col">Name</th>
      <th scope="col">DELETE</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="category in categoryList.categories" 
        v-bind:key="category.id">
      <th scope="row">{{category.id}}</th>
      <td>{{category.name}}</td>
      <td><button v-on:click="deleteCategory(category.id)" class="btn btn-sm btn-danger">Delete</button></td>
    </tr>
  </tbody>
</table>

</template>

<script>
import CategoryAPI from "../api/Category";
import ProductAPI from "../api/Product";

export default {
  name: "DashboardPage",
  data() {
    return {
      productData: {
        title: "",
        quantity: 0,
        content: "",
        image: "",
        price: 0,
        categoryId: 1,
      },
      categoryData: {
        name: ""
      },
      categoryList: [],
      productList: [],
      selectedFile: null,
      updatedPrice: 0,
    };
  },
  async created() {
    this.categoryList = await CategoryAPI.getAllCategories();
    this.productList = await ProductAPI.getAllProductAdmin();
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    async addProduct() {
      const fd = new FormData();
      fd.append("title", this.productData.title);
      fd.append("quantity", this.productData.quantity);
      fd.append("content", this.productData.content);
      fd.append("image", this.selectedFile);
      fd.append("price", this.productData.price);
      fd.append("categoryId", this.productData.categoryId);

      await ProductAPI.addProduct(fd);
      this.$router.push("/dashboard");
    },
    async updateProduct(id) {
      const price = {
        price: this.updatedPrice
      }
      await ProductAPI.updateProduct(id,price);
    },
    async deleteProduct(id) {
        const isDeleted = confirm("Are you sure?");
        if (isDeleted) await ProductAPI.deleteProduct(id);     
    },
    async deleteCategory(id) {
      const isDeleted = confirm("Are you sure");
      if (isDeleted)  await CategoryAPI.deleteCategory(id)
    },
    async addCategory() {
      const fd = new FormData();
      fd.append("name",this.categoryData.name);
      await CategoryAPI.addCategory(fd);
      this.$router.push("/dashboard");
    }

  },
};
</script>
