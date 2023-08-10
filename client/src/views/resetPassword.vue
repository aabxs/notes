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
      sentPass: false,
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
    sendOTP() {
      const reqBody = {
        email: document.getElementById("email").value,
      };
      this.postData("http://localhost:3000/v1/send-otp", reqBody).then(
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
            this.sentPass = true;
            setTimeout(() => {
              this.success = false;
            }, 3000);
          }
        }
      );
    },
    resetPass() {
      const reqBody = {
        code: document.getElementById("code").value,
        pass: document.getElementById("pass").value,
        confirmationPass: document.getElementById("confPass").value,
      };
      this.postData("http://localhost:3000/v1/reset-pass", reqBody).then(
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
            this.$router.push("/");
            setTimeout(() => {
              this.success = false;
            }, 3000);
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
  <div class="center">
    <div class="container-fluid">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4">
          <div class="frosted p-5 rounded">
            <div class="section text-center" id="LogIn">
              <h4 class="mb-4 pb-3 text-white fw-bold">Reset Password</h4>
              <div v-if="!sentPass">
                <input
                  required
                  type="text"
                  class="form-style"
                  placeholder="Email"
                  id="email"
                  autocomplete="off"
                />
                <button
                  @click.prevent="sendOTP"
                  class="btn btn-primary px-4 fw-bolder w-100 mt-2"
                  id="btns"
                >
                  Send OTP
                </button>
              </div>
              <div v-else>
                <input
                  type="text"
                  class="form-style"
                  placeholder="OTP"
                  id="code"
                  autocomplete="off"
                />
                <input
                  type="password"
                  class="form-style mt-2"
                  placeholder="New Password"
                  id="pass"
                  autocomplete="off"
                />
                <input
                  type="password"
                  class="form-style mt-2"
                  placeholder="Confirm Password"
                  id="confPass"
                  autocomplete="off"
                />
                <button
                  @click.prevent="resetPass"
                  class="btn btn-primary px-4 fw-bolder w-100 mt-2"
                  id="btns"
                >
                  Reset Password
                </button>
              </div>
            </div>

            <div class="d-flex justify-content-center mt-2">
              <p class="w-75 text-center text-white">
                <RouterLink to="/login"> Back to login </RouterLink>
              </p>
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
</template>

<style scoped>
input {
  background-color: #181c1c !important;
  padding: 7.5px 15px;
  font-size: 1.15em;
  border-radius: 5px 5px;
}

.center {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
