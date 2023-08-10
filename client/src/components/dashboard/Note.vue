<script setup>
defineProps({
  note: {
    type: Object,
  },
});
</script>
<script>
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Notification from "../utilities/notification.vue";
export default {
  components: {},
  emits: ["refresh", "notify"],
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
    this.quill.setContents(JSON.parse(this.note.note));
  },
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
    async saveData(id) {
      const noteModal = document.getElementById(id);
      const bodyNote = JSON.stringify(this.quill.getContents());
      const bodyTitle = noteModal.querySelector("#title").value;
      const targets = document.getElementsByName("targets" + id);
      const bodyTargets = [];
      for (let i = 0; i < targets.length; i++) {
        bodyTargets.push(targets[i].value);
      }
      const targetID = document.getElementsByName("targetID" + id);
      const bodyTargetIDs = [];
      for (let i = 0; i < targetID.length; i++) {
        bodyTargetIDs.push(targetID[i].value);
      }
      const bodyCompletes = [];
      const completes = document.getElementsByName("complete" + id);
      for (let i = 0; i < completes.length; i++) {
        bodyCompletes.push(completes[i].checked);
      }
      const session = await this.getCookie("Token");
      const reqBody = {
        id: id,
        title: bodyTitle,
        note: bodyNote,
        targets: bodyTargets,
        targetIDs: bodyTargetIDs,
        completes: bodyCompletes,
        session: session,
      };

      this.postData("http://localhost:3000/v1/update/", reqBody).then(
        (data) => {
          this.$emit("refresh");
          if (this.newNoteTargets > 0) {
            this.newNoteTargets--;
          }
          this.message = data.success;
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 3000);
        }
      );
    },
    convert(dateString) {
      const dateComponents = dateString.split("T")[0].split("-");
      const timeComponents = dateString.split("T")[1].split(":");

      const year = parseInt(dateComponents[0]);
      const month = parseInt(dateComponents[1]) - 1; // Months in JavaScript are zero-based
      const day = parseInt(dateComponents[2]);
      const hour = parseInt(timeComponents[0]);
      const minute = parseInt(timeComponents[1]);
      const second = parseInt(timeComponents[2].split(".")[0]);

      const dateObject = new Date(
        Date.UTC(year, month, day, hour, minute, second)
      );

      return dateObject.toUTCString();
    },
    setNotifTarget(x) {
      document.getElementById("targetNotif").value = x;
    },
    async setNotif() {
      const session = await this.getCookie("Token");
      const reqBody = {
        session: session,
        target: document.getElementById("targetNotif").value,
        time: document.getElementById("time").value,
      };
      this.postData("http://78.141.235.37:3000/v1/notify/", reqBody).then(
        (data) => {
          if (data.error) {
            this.$emit("notify", { data });
          } else {
            document.getElementById("targetNotif").value = "";
            document.getElementById("time").value = "";
            var modal = document.getElementById("exampleModalToggle2");
            if (modal) {
              modal.classList.remove("show");
              modal.setAttribute("aria-hidden", "true");
              modal.style.display = "none";
              document.body.classList.remove("modal-open");
              var backdrop =
                document.getElementsByClassName("modal-backdrop")[0];
              if (backdrop) {
                backdrop.parentNode.removeChild(backdrop);
              }
            }
            this.$emit("notify", { data });
          }
        }
      );
    },
  },
};
</script>

<template>
  <div>
    <button
      class="w-100 p-0"
      style="height: 175px"
      data-bs-toggle="modal"
      :data-bs-target="'#' + note.id"
    >
      <div class="frosted p-3 rounded-3 text-start">
        <h3>{{ note.title }}</h3>
        <sub>{{ convert(note.lastEdit) }}</sub>
        <p
          class="px-3"
          style="
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3; /* number of lines to show */
            line-clamp: 3;
            -webkit-box-orient: vertical;
          "
        ></p>
      </div>
    </button>
  </div>
  <div
    class="modal fade"
    id="exampleModalToggle2"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel2"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content frosted">
        <div class="modal-body">
          <input type="datetime-local" class="mb-2" id="time" />
          <input class="visually-hidden" id="targetNotif" type="number" />
          <button class="btn btn-primary w-100" @click.prevent="setNotif()">
            Set Notification
          </button>
        </div>
        <div class="modal-footer" style="border: none !important">
          <button
            class="btn btn-primary"
            :data-bs-target="'#' + note.id"
            data-bs-toggle="modal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" :id="note.id" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content frosted">
        <form action="">
          <div class="modal-body rounded-3">
            <div class="row w-100">
              <div class="col-8">
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  required
                  :value="note.title"
                />
                <div>
                  <div ref="editor"></div>
                </div>
              </div>
              <div class="col-4 p-1 targets">
                <h4>Targets</h4>
                <div v-for="target in note.targets">
                  <div v-if="target.complete">
                    <div
                      class="row g-0 mb-1 rounded-2"
                      style="background-color: #4bb543 !important"
                    >
                      <div class="col-10">
                        <input
                          type="text"
                          :name="'targets' + note.id"
                          class="target"
                          placeholder="Set Target"
                          :value="target.target"
                          style="background-color: #4bb543 !important"
                        />
                        <input
                          type="text"
                          :name="'targetID' + note.id"
                          class="target visually-hidden"
                          placeholder="Set Target"
                          :value="target.id"
                        />
                      </div>
                      <div
                        class="col-2 d-flex align-items-center justify-content-center"
                      >
                        <input
                          type="checkbox"
                          :name="'complete' + note.id"
                          class="tick m-3"
                          v-bind:checked="target.complete"
                          @click="saveData(note.id)"
                        />
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div
                      class="row g-0 mb-1 rounded-2"
                      style="background-color: #181c1c !important"
                    >
                      <div class="col-8">
                        <input
                          type="text"
                          :name="'targets' + note.id"
                          class="target"
                          placeholder="Set Target"
                          :value="target.target"
                        />
                        <input
                          type="text"
                          :name="'targetID' + note.id"
                          class="target visually-hidden"
                          placeholder="Set Target"
                          :value="target.id"
                        />
                      </div>
                      <div
                        class="col-2 d-flex align-items-center justify-content-center"
                      >
                        <button
                          class="w-100 h-100"
                          style="background-color: inherit"
                          @click.prevent="setNotifTarget(target.id)"
                          data-bs-target="#exampleModalToggle2"
                          data-bs-toggle="modal"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            class="bi bi-bell-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div
                        class="col-2 d-flex align-items-center justify-content-center"
                      >
                        <input
                          type="checkbox"
                          :name="'complete' + note.id"
                          class="tick m-3"
                          v-bind:checked="target.complete"
                          @click="saveData(note.id)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div v-for="i in newNoteTargets">
                  <div
                    class="row g-0 mb-1 rounded-2"
                    style="background-color: #181c1c !important"
                  >
                    <div class="col-10">
                      <input
                        type="text"
                        :name="'targets' + note.id"
                        class="target"
                        placeholder="Set Target"
                      />
                    </div>
                    <div
                      class="col-2 d-flex align-items-center justify-content-center"
                    >
                      <input
                        type="checkbox"
                        :name="'complete' + note.id"
                        class="tick m-3"
                        @click="saveData(note.id)"
                      />
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
            <button @click.prevent="saveData(note.id)" class="btn btn-primary">
              Save Changes
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

.target,
input[type="datetime-local"] {
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

.ql-picker-options {
  background-color: #302c2c !important;
}

.ql-toolbar {
  border-top: 2px solid #181c1c !important;
  border-left: 2px solid #181c1c !important;
  border-right: 2px solid #181c1c !important;
  border-bottom: none !important;
}

.ql-container {
  border: 2px solid #181c1c !important;
  min-height: 300px;
}
.ql-tooltip {
  background-color: #181c1c !important;
  box-shadow: none !important;
  border: none !important;
  color: white !important;
}
.v-toast {
  z-index: 10000;
}
input[type="checkbox"] {
  accent-color: #4bb543;
  border: none !important;
}
</style>
