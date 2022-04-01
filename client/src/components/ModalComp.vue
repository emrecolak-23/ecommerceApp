<template>
<div v-if="isVisibility" class="box">
<div class="d-flex justify-content-center container mt-5">
    <div class="card p-3 bg-white">
        <div class="about-product text-center mt-2"><img :src="'/'+item.image" width="300">
            <div>
                <h4>{{item.title}}</h4>
                <h6 class="mt-0 text-black-50">{{item.content}}</h6>
            </div>
        </div>
        <div class="d-flex justify-content-between total font-weight-bold mt-4"><span>Price</span><span>TL {{item.price}}</span></div>
        
        <button type="button"
                class="btn btn-danger"
                v-on:click="close"
                >
                Close
        </button>
    </div>
</div>
</div>
</template>

<script>
export default {
  name: "ModalComp",
  props: ["isVisibility", "item"],
  data() {
    return {
      visible: true
    }
  },
  setup(props, {emit}) {
    const close = () => {
      emit("close")
    }
    return {close}
  }
};
</script>

<style scoped>

.box {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  background-color: rgba(0,0,0,0.5)
}
.card {
    width: 444px
}
</style>
