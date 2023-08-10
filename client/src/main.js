import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import ToastPlugin from "vue-toast-notification";

import "vue-toast-notification/dist/theme-bootstrap.css";
import "./assets/main.css";

const app = createApp(App);

const state = reactive({
  refreshFlag: false,
});

app.provide("state", state);

app.mixin({
  computed: {
    refreshFlag: {
      get() {
        return this.$root.$data.state.refreshFlag;
      },
      set(value) {
        this.$root.$data.state.refreshFlag = value;
      },
    },
  },
});

app.use(router);
app.use(ToastPlugin);

app.mount("#app");
