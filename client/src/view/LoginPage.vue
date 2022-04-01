<template>
  <!-- Login -->
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
              {{ errorMessage }}
            </div>
            <div class="form-group">
              <label></label>
              <div class="input-group">
                <div class="input-group-addon bg-light">
                  <i class="fa fa-envelope text-primary"></i>
                </div>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="Email Adresiniz"
                  v-model="userData.email"
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
                  placeholder="Kullanıcı Şifreniz"
                  v-model="userData.password"
                />
              </div>
            </div>

            <div class="text-center">
              <a
                v-on:click="loginUser"
                class="btn btn-primary btn-lg rounded-0 py-2"
              >
                Login
              </a>
            </div>
          </div>
        </div>
        <!--Form with header-->
      </div>
    </div>
  </section>
  <!-- Login -->
  <InfoSection />
</template>

<script>
import InfoSection from "../components/InfoSection.vue";
import { mapActions } from "vuex";

export default {
  name: "LoginPage",
  components: {
    InfoSection,
  },
  data() {
    return {
      userData: {
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  computed: {},
  methods: {
    ...mapActions(["signIn"]),
    async loginUser() {
      if (this.userData.email && this.userData.password) {
        const x = confirm("Welcome to Dashboard");
        if (x) {
          try {
            await this.signIn(this.userData);
            this.$router.push("/dashboard");
          } catch (error) {
            this.errorMessage = "Please check your password and email adress";
          }
        }
      } else if (!this.userData.email) {
        this.errorMessage = "Please enter your email";
      } else if (!this.userData.password) {
        this.errorMessage = "Please enter your password";
      }
    },
  },
};
</script>
