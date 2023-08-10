<script>
import newNote from "../components/dashboard/newNote.vue";
import Note from "../components/dashboard/Note.vue";
import Nav from "../components/dashboard/navbar.vue";
import Notification from "../components/utilities/notification.vue";

export default {
  components: {
    newNote,
    Note,
    Nav,
    Notification,
  },
  data() {
    return {
      counter: 0,
      notes: [],
      refreshed: true,
      error: false,
      success: false,
      message: "",
    };
  },
  async mounted() {
    const session = await this.getCookie("Token");
    this.postData("http://localhost:3000/v1/authenticate", {
      session: session,
    }).then((data) => {
      if (data.error) {
        document.cookie =
          "Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.$router.push("/login");
      }
    });
    this.getNotes();
  },
  methods: {
    async getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
    newTarget() {
      this.newNoteTargets++;
    },
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
    async getNotes() {
      const session = await this.getCookie("Token");
      const reqBody = {
        session: session,
      };
      this.postData("http://localhost:3000/v1/notes", reqBody).then((data) => {
        this.notes = data;
      });
    },
    handleRefresh() {
      this.refreshed = false;
      this.getNotes();
      this.refreshed = true;
    },
    logout() {
      document.cookie =
        "Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.$router.push("/login");
    },
    notify(msg) {
      if (msg.data.success) {
        this.success = true;
        this.message = msg.data.success;
        setTimeout(() => {
          this.success = false;
        }, 3000);
      } else {
        this.error = true;
        this.message = msg.data.error;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    },
  },
};
</script>

<template>
  <div class="main p-5">
    <Nav @logout="logout()"></Nav>
    <div class="rounded-5">
      <div class="container-fluid content rounded-5">
        <div class="row g-2">
          <newNote @reload="handleRefresh" />
          <div v-for="noteItem in notes" class="col-3">
            <Note
              v-if="refreshed"
              :note="noteItem"
              @refresh="handleRefresh"
              @notify="notify"
            />
          </div>
        </div>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
