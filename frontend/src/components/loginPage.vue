--login
<script>
import { DateTime } from "luxon";
import axios from "axios";

const apiURL = import.meta.env.VITE_ROOT_API;

export default {
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    this.$refs.usernameInput.focus();
  },
  methods: {
    async validate() {
      try {
        const response = await axios.post(`${apiURL}/org/login`, {
          username: this.input.username,
          password: this.input.password,
        });
        if (response.status === 200) {
          console.log(response.data);
          alert("Login successful!");
          this.$root.authenticated = true;
          this.$router.push("/");
          console.log("pass");
        } else {
          location.reload();
          alert("Login failed.");
          console.log("failure");
        }
      } catch (error) {
        location.reload();
        alert("Login failed.");
      }
    },
  },
};
</script>

<template>
  <form id="form" method="post" @submit.prevent="onSubmit">
    <main class="w-1/2, flex justify-center">
      <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-x-6 gap-y-2"
      >
        <h2
          class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
        >
          Login
        </h2>

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
