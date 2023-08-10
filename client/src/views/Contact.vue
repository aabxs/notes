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
    sendMessage() {
      const reqBody = {
        email: document.getElementById("email").value,
        name: document.getElementById("name").value,
        message: document.getElementById("message").value,
      };
      this.postData("http://localhost:3000/v1/contact", reqBody).then(
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
            document.getElementById("email").value = "";
            document.getElementById("name").value = "";
            document.getElementById("message").value = "";
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
  <div>
    <div class="center p-5">
      <div class="container-fluid">
        <div class="container frosted p-5 rounded-3">
          <h3>Contact Us</h3>
          <input
            required
            type="text"
            class="form-style"
            placeholder="Your Name"
            id="name"
            autocomplete="off"
          />

          <input
            required
            type="text"
            class="form-style mt-2"
            placeholder="Your Email"
            id="email"
            autocomplete="off"
          />

          <textarea
            name=""
            id="message"
            cols="30"
            rows="10"
            class="mt-2 p-3"
            style="background-color: #181c1c; color: white"
            placeholder="Your Message"
          ></textarea>
          <button
            @click.prevent="sendMessage"
            class="btn btn-primary px-4 fw-bolder w-100 mt-2"
            id="btns"
          >
            Send Message
          </button>
        </div>
      </div>
      <div v-if="error">
        <Notification :message="message" :success="false" />
      </div>
      <div v-if="success">
        <Notification :message="message" :success="true" />
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center pb-5">
      <div>
        <RouterLink
          style="text-decoration: none !important"
          class="px-3"
          to="/"
        >
          home
        </RouterLink>
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
          to="/terms"
        >
          terms
        </RouterLink>
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
  min-height: 90vh;
  display: flex;
  align-items: center;
}
</style>
