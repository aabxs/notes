<script>
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Notification from "../utilities/notification.vue";
export default {
  components: { Notification },
  data() {
    return {
      newNoteTargets: 0,
      error: false,
      success: false,
      message: "",
    };
  },
  mounted() {
    this.quill = new Quill(this.$refs.editor, {
      theme: "snow",
    });
  },
  emits: ["reload"],
  methods: {
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
    async getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
    async saveData() {
      const noteModal = document.getElementById("exampleModal");
      const bodyNote = JSON.stringify(this.quill.getContents());
      const bodyTitle = noteModal.querySelector("#title").value;
      const targets = document.getElementsByName("targets");
      const bodyTargets = [];
      for (let i = 0; i < targets.length; i++) {
        bodyTargets.push(targets[i].value);
      }
      const targetID = document.getElementsByName("targetID");
      const bodyTargetIDs = [];
      for (let i = 0; i < targetID.length; i++) {
        bodyTargetIDs.push(targetID[i].value);
      }
      const bodyCompletes = [];
      const completes = document.getElementsByName("complete");
      for (let i = 0; i < completes.length; i++) {
        bodyCompletes.push(completes[i].checked);
      }
      const session = await this.getCookie("Token");
      const reqBody = {
        session: session,
        title: bodyTitle,
        note: bodyNote,
        targets: bodyTargets,
        targetIDs: bodyTargetIDs,
        completes: bodyCompletes,
      };
      this.postData("http://localhost:3000/v1/create/", reqBody).then(
        (data) => {
          var modal = document.getElementById("exampleModal");
          if (modal) {
            modal.classList.remove("show");
            modal.setAttribute("aria-hidden", "true");
            modal.style.display = "none";
            document.body.classList.remove("modal-open");
            var backdrop = document.getElementsByClassName("modal-backdrop")[0];
            if (backdrop) {
              backdrop.parentNode.removeChild(backdrop);
            }
          }
          this.$emit("reload");
          window.location.reload();
        }
      );
    },
  },
};
</script>
<script setup></script>
<template>
  <div class="col-3">
    <button
      class="w-100 p-0"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      <div
        class="frosted p-5 rounded-3 d-flex justify-content-center align-items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="currentColor"
          class="bi bi-journal-plus my-3"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
          />
          <path
            d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"
          />
          <path
            d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"
          />
        </svg>
      </div>
    </button>
  </div>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content frosted">
        <form action="">
          <div class="modal-body rounded-3">
            <div class="row w-100">
              <div class="col-8">
                <input type="text" id="title" placeholder="Title" required />
                <div>
                  <div ref="editor"></div>
                </div>
              </div>
              <div class="col-4 p-1 targets">
                <h4>Targets</h4>
                <div v-for="i in newNoteTargets">
                  <div
                    class="row g-0 mb-1 rounded-2"
                    style="background-color: #181c1c !important"
                  >
                    <div class="col-10">
                      <input
                        type="text"
                        name="targets"
                        class="target"
                        placeholder="Set Target"
                      />
                    </div>
                    <div
                      class="col-2 d-flex align-items-center justify-content-center"
                    >
                      <input type="checkbox" name="complete" class="tick m-3" />
                    </div>
                  </div>
                </div>
                <button
                  @click.prevent="newTarget()"
                  class="w-100 px-3 py-2 fw-bolder"
                >
                  New Target
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer border-top-0">
            <button @click.prevent="saveData()" class="btn btn-primary">
              Save New Note
            </button>
          </div>
        </form>
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

<style>
button .frosted:hover {
  opacity: 0.8;
}

textarea {
  background-color: transparent;
  border: none;
  width: 100%;
  resize: none;
  padding: 5px;
  border-radius: 5px;
  outline: 2px solid transparent;
}

textarea:focus {
  border: none;
  outline: none;
  outline: 2px solid #181c1c;
}

input {
  background-color: transparent !important;
  backdrop-filter: blur(0px);
  font-size: 1.5em;
  width: 100%;
}

.targets h4 {
  color: #6e6f6e;
}

.targets button {
  background-color: #111111;
  border-radius: 5px;
}

.target {
  background-color: #181c1c !important;
  padding: 7.5px 15px;
  font-size: 1.15em;
  border-radius: 5px 5px;
}

.tick {
  background-color: #181c1c !important;
  width: 100%;
  height: 89%;
  border-radius: 5px 5px;
}
/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.ql-tooltip {
  background-color: #181c1c !important;
  box-shadow: none !important;
  border: none !important;
  color: white !important;
}
</style>
