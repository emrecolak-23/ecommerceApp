<template>
  <!-- Register -->
  <section class="container mt-5">
    <div class="row">
      <!--Grid column-->
      <div class="offset-2 col-md-8 col-sm-8 mb-4">
        <!--Form with header-->
        <div class="card border-primary rounded-0">
          <div class="card-header p-0">
            <div class="bg-primary text-white text-center py-2"></div>
          </div>
          <div class="card-body p-3">
            <!--Body-->
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{errorMessage}}
            </div>
            <div class="form-group">
              <label>Name/Surname</label>
              <div class="input-group">
                <div class="input-group-addon bg-light">
                  <i class="fa fa-user text-primary"></i>
                </div>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder="Enter your name"
                  v-model="userData.name"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label>Email</label>
              <div class="input-group">
                <div class="input-group-addon bg-light">
                  <i class="fa fa-envelope text-primary"></i>
                </div>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="Enter your email adress"
                  v-model="userData.email"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <div class="input-group mb-2 mb-sm-0">
                <div class="input-group-addon bg-light">
                  <i class="fa fa-key text-primary"></i>
                </div>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Enter your password"
                  v-model="userData.password"
                  required
                />
              </div>
            </div>

            <div class="text-center">
              <button
                v-on:click="registerUser"
                class="btn btn-primary btn-lg rounded-0 py-2"
              >
                Giriş
              </button>
            </div>
          </div>
        </div>
        <!--Form with header-->
      </div>
    </div>
  </section>
  <!-- Register -->
  <InfoSection />
</template>

<script>
import UserAPI from "../api/User";
import InfoSection from "../components/InfoSection.vue";

export default {
  name: "RegisterPage",
  components: {
    InfoSection,
  },
  data() {
    return {
      userData: {
        name: "",
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async registerUser() {
      if (this.userData.name && this.userData.password && this.userData.email) {
        try {
          await UserAPI.registerUser(this.userData);
          this.$router.push("/login");
        } catch (error) {
          this.errorMessage = "Please enter valid email adress and password";
        }
      } else {
        this.errorMessage = "Please enter required fields"
      }
    },
  },
};
</script>
