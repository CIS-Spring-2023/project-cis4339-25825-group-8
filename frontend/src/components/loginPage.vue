--login
<!-- The <script> tag contains the Vue.js component code -->
<script>
// Importing dependencies
import { DateTime } from "luxon";
import axios from "axios";

// Getting the API URL from environment variables
const apiURL = import.meta.env.VITE_ROOT_API;

// Exporting the Vue.js component as the default export
export default {
  // Defining the component data
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
    };
  },
  // Running code when the component is mounted
  mounted() {
    // Focusing on the username input field
    this.$refs.usernameInput.focus();
  },
  // Defining component methods
  methods: {
    // Async method to validate the user's credentials
    async validate() {
      try {
        // Sending a POST request to the login endpoint with the user's credentials
        const response = await axios.post(`${apiURL}/org/login`, {
          username: this.input.username,
          password: this.input.password,
        });
        // If the response status is 200 OK, the login was successful
        if (response.status === 200) {
          // Logging the response data to the console
          console.log(response.data);
          // Alerting the user that the login was successful
          alert("Login successful!");
          // Checking the user's role to determine if they have access to edit content
          if (
            response.data.username === "orgAEditor" ||
            response.data.username === "orgBEditor" ||
            response.data.username === "orgCEditor"
          ) {
            // Setting the root Vue instance's "authenticated" property to true if the user has editing privileges
            this.$root.authenticated = true;
          } else if (
            response.data.username === "orgA" ||
            response.data.username === "orgB" ||
            response.data.username === "orgC"
          ) {
            // Setting the root Vue instance's "authenticated" property to false if the user does not have editing privileges
            this.$root.authenticated = false;
          } else {
            // Setting the root Vue instance's "authenticated" property to false if the user's role is not recognized
            this.$root.authenticated = false;
          }
          // Redirecting the user to the home page
          this.$router.push("/");
          console.log("pass");
        } else {
          // Reloading the page and alerting the user that the login failed
          location.reload();
          alert("Login failed.");
          console.log("failure");
        }
      } catch (error) {
        // Reloading the page and alerting the user that the login failed
        location.reload();
        alert("Login failed.");
      }
    },
    // Async method to log the user in
    async login() {
      try {
        // Sending a POST request to the login endpoint with the user's credentials
        const response = await axios.post(`${apiURL}/login`, {
          username: this.username,
          password: this.password,
        });
        // Extracting the username and orgName properties from the response data
        const { username, orgName } = response.data;
        // Emitting a "login" event with the username and orgName data
        this.$emit("login", { username, orgName });
      } catch (error) {
        // Logging any errors to the console
        console.error(error);
      }
    },
  },
};
</script>

<!-- This is the login form template -->
<template>
  <form id="form" method="post" @submit.prevent="onSubmit">
    <!-- Main content section -->
    <main class="w-1/2, flex justify-center">
      <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-x-6 gap-y-2"
      >
        <!-- Login header -->
        <h2
          class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
        >
          Login
        </h2>

        <!-- Username input field -->
        <label>
          <span class="text-gray-700">Username:</span>
          <input
            type="text"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="input.username"
            name="username"
            required
            autocomplete="off"
            ref="usernameInput"
          />
        </label>

        <!-- Password input field -->
        <label>
          <span class="text-gray-700">Password:</span>
          <input
            v-model="input.password"
            type="password"
            name="password"
            required
            autocomplete="off"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <br />

        <!-- Submit button -->
        <button
          type="submit"
          class="bg-red-550 text-white rounded"
          id="login-button"
          @click="validate(form)"
        >
          Submit
        </button>
      </div>
    </main>

    <!-- Blank space section -->
    <div class="blank"></div>
  </form>
</template>
<style>
.blank {
  width: 100%;
  height: 420px;
}
#login-button {
  background-color: rgb(200, 16, 46);
}
</style>
