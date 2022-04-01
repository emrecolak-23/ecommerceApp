<template>
<div class="container">
      <div class="heading_container heading_center">
        <h2>Our Product</h2>
      </div>
      <!-- Product Listed -->
      <div class="row">
        <div
          class="col-sm-6 col-lg-4"
          v-for="(product,index) in productList"
          v-bind:key="product.id"
        >
          <div class="box">
            <div class="img-box">
              <img v-bind:src="'/' + product.image" alt="" />
              <a
                class="add_cart_btn"
                data-toggle="modal"
                :data-target="'#exampleModal' + index"
              >
                <span> Detail </span>
              </a>
            </div>
            <div class="detail-box">
              <h5>
                {{ product.title }}
              </h5>
              <div class="product_info">
                <h5><span>TL</span> {{ product.price }}</h5>
              </div>
            </div>
          </div>
          <!-- Modal -->
          <div
            class="modal fade"
            :id="'exampleModal' + index"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    {{ product.title }}
                  </h5>
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
                  <div class="card" style="width: 18rem">
                    <img
                      class="card-img-top"
                      :src="'/' + product.image"
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <p class="card-text">{{ product.content }}</p>
                    </div>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      Price:<span class="badge badge-pill badge-primary">{{
                        product.price
                      }}</span>
                    </li>
                    <li class="list-group-item">
                      Quantity:<span class="badge badge-pill badge-primary">{{
                        product.quantity
                      }}</span>
                    </li>
                  </ul>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Product Listed -->
    
   <!-- 
      <div class="btn_box">
        <a href="" class="view_more-link"> View More </a>
      </div>  
  -->
   </div> 
</template>


<script>


export default {
  name:"ProductComp",
  props: ["productList"],

}
</script>

<style scoped>
.card {
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
}
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
  background-color: #5463FF;
  color: white;
}

.pagination a:hover:not(.active) {background-color: #ddd;}
</style>