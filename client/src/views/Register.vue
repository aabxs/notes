<script>
import { RouterLink, RouterView } from "vue-router";
import Notification from "../components/utilities/notification.vue";
export default {
  components: { Notification },
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
    register() {
      const reqBody = {
        email: document.getElementById("email").value,
        pass: document.getElementById("pass").value,
        confirmationPass: document.getElementById("confPass").value,
      };
      this.postData("http://localhost:3000/v1/register", reqBody).then(
        (data) => {
          if (data.error) {
            this.message = data.error;
            this.error = true;
            setTimeout(() => {
              this.error = false;
            }, 3000);
          } else {
            this.message = data.success;
            this.success = true;
            setTimeout(() => {
              this.success = false;
            }, 3000);
            this.$router.push("login");
            document.getElementById("email").value = "";
            document.getElementById("pass").value = "";
            document.getElementById("confPass").value = "";
          }
        }
      );
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
              <div class="section text-center">
                <h4 class="text-white fw-bold">Register</h4>
                <img
                  class="w-50 py-3"
                  src="@/assets/images/logo.png"
                  style="filter: invert(1)"
                />
                <div id="p1">
                  <div class="form-group mt-2">
                    <input
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
                      type="password"
                      class="form-style"
                      placeholder="Create Password"
                      id="pass"
                      autocomplete="off"
                    />
                    <i class="input-icon uil uil-lock-alt"></i>
                  </div>
                  <div class="form-group mt-2">
                    <input
                      type="password"
                      class="form-style"
                      placeholder="Confirm Password"
                      id="confPass"
                      autocomplete="off"
                    />
                    <i class="input-icon uil uil-lock-alt"></i>
                  </div>
                  <button
                    class="btn btn-primary px-4 fw-bolder w-100 mt-2 px-2"
                    id="btns"
                    @click.prevent="register"
                  >
                    Sign Up
                  </button>
                </div>
                <div class="d-flex justify-content-center mt-2">
                  <p class="w-75 text-center text-white">
                    Already have an account? Login
                    <RouterLink to="/login"> here </RouterLink>
                  </p>
                </div>
              </div>
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
