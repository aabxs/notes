<script>
import { RouterLink, RouterView } from "vue-router";
import Notification from "../components/utilities/notification.vue";
export default {
  components: { Notification },
  emits: ["logged"],
  data() {
    return {
      error: false,
      success: false,
      message: "",
    };
  },
  async mounted() {},
  methods: {
    async postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      return response.json();
    },
    login() {
      const reqBody = {
        email: document.getElementById("email").value,
        pass: document.getElementById("pass").value,
      };
      this.postData("http://localhost:3000/v1/login", reqBody).then((data) => {
        if (data.error) {
          this.message = data.error;
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 3000);
        } else {
          this.message = data.success;
          this.success = true;
          let d = new Date();
          d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          document.cookie = "Token=" + data.session + ";" + expires + ";path=/";
          this.$emit("logged");
          this.$router.push("/");
        }
      });
    },
  },
};
</script>
<script setup>
defineProps({
  width: {
    type: String,
  },
});
</script>
<template>
  <div>
    <div class="center">
      <div class="container-fluid">
        <div class="row">
          <div class="col-4"></div>
          <div class="col-4">
            <div class="frosted p-5 rounded">
              <div class="section text-center" id="LogIn">
                <h4 class="text-white fw-bold">Log In</h4>
                <img
                  class="w-50 py-3"
                  src="@/assets/images/logo.png"
                  style="filter: invert(1)"
                />
                <input
                  required
                  type="text"
                  class="form-style"
                  placeholder="Email"
                  id="email"
                  autocomplete="off"
                />
                <i class="input-icon uil uil-at"></i>
              </div>
              <div class="form-group mt-2">
                <input
                  required
                  type="password"
                  class="form-style"
                  placeholder="Password"
                  id="pass"
                  autocomplete="off"
                />
                <i class="input-icon uil uil-lock-alt"></i>
              </div>
              <button
                @click.prevent="login"
                class="btn btn-primary px-4 fw-bolder w-100 mt-2"
                id="btns"
              >
                Login
              </button>

              <div class="d-flex justify-content-center mt-2">
                <div>
                  <p class="text-center text-white m-0">
                    Don't have an account? Register
                    <RouterLink to="/register"> here </RouterLink>
                  </p>
                  <p class="text-center text-white m-0">
                    Forgot your password? Reset it
                    <RouterLink to="/reset-password"> here </RouterLink>
                  </p>
                </div>
              </div>
              <div class="d-flex justify-content-center"></div>
            </div>
          </div>
          <div class="col-4"></div>
        </div>
      </div>
      <div v-if="error">
        <Notification :message="message" :success="false" />
      </div>
      <div v-if="success">
        <Notification :message="message" :success="true" />
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <div>
        <RouterLink
          style="text-decoration: none !important"
          class="px-3"
          to="/about"
        >
          about
        </RouterLink>
        <RouterLink
          style="text-decoration: none !important"
          class="px-3"
          to="/contact"
        >
          contact
        </RouterLink>
        <RouterLink
          style="text-decoration: none !important"
          class="px-3"
          to="/terms"
        >
          terms
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  background-color: #181c1c !important;
  padding: 7.5px 15px;
  font-size: 1.15em;
  border-radius: 5px 5px;
}

.center {
  min-height: 90vh;
  display: flex;
  align-items: center;
}
</style>
