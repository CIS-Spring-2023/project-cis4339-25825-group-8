--app
<script>
import axios from "axios";
const apiURL = import.meta.env.VITE_ROOT_API;
import loginPage from "./components/loginPage.vue";
export default {
  components: {
    loginPage,
  },
  name: "App",

  data() {
    return {
      orgName: "Dataplatform",
      username: "",
      password: "",
      authenticated: false,
    };
  },

  methods: {
    login() {
      this.$emit("login", { username: this.username, password: this.password });
    },
  },
};
</script>
<template>
  <main class="flex flex-row" id="test">
    <div id="_container">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <li>
              <router-link to="/">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >dashboard</span
                >
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/findclient">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Client
              </router-link>
            </li>
            <li>
              <router-link to="/findevents">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Event
              </router-link>
            </li>
            <div v-if="$root.authenticated">
              <li>
                <router-link to="/services">
                  <span
                    style="position: relative; top: 6px"
                    class="material-icons"
                    >search</span
                  >
                  Services
                </router-link>
              </li>
              <br />
              <li>
                <router-link to="/intakeform">
                  <span
                    style="position: relative; top: 6px"
                    class="material-icons"
                    >people</span
                  >
                  Client Intake Form
                </router-link>
              </li>
              <br />
              <li>
                <router-link to="/eventform">
                  <span
                    style="position: relative; top: 6px"
                    class="material-icons"
                    >event</span
                  >
                  Create Event
                </router-link>
              </li>
            </div>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)"
      >
        <h1 class="mr-20 text-3xl text-white">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>
