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
  methods: {
    test() {
      var un = form.elements["username"].value;
      var pw = form.elements["password"].value;
      alert(`${pw} hello`);
    },
    validate() {
      var un = form.elements["username"].value;
      var pw = form.elements["password"].value;
      if (un == "admin" && pw == "password") {
        alert("Successful Login!");
        return;
      } else {
        alert("Login failed");
      }
    },
  },
};
</script>

<template>
  <form id="form" method="post">
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
        <button
          class="bg-red-700 text-white rounded"
          id="loginBTN"
          @click="validate(form)"
        >
          Submit
        </button>
      </div>
    </main>
  </form>
</template>
