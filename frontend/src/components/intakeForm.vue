<script>
import useVuelidate from '@vuelidate/core'
import { required, email, alpha, numeric } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      org: '',
      client: {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: {
          primary: '',
          alternate: ''
        },
        address: {
          line1: '',
          line2: '',
          city: '',
          county: '',
          zip: ''
        }
      }
    }
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.org = res.data._id
    })
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    // if valid:
    //  if client with phonenumber exists in db:
    //    if client already registered with org:
    //      do nothing
    //    else add org to client org array
    //  else create client document
    registerClient() {
      this.v$.$validate().then((valid) => {
        if (valid) {
          axios
            .get(`${apiURL}/clients/lookup/${this.client.phoneNumber.primary}`)
            .then((res) => {
              if (res.data) {
                if (res.data.orgs.includes(this.org)) {
                  alert('Client phone number has already been registered.')
                  this.$router.push({ name: 'findclient' })
                } else {
                  axios
                    .put(`${apiURL}/clients/register/${res.data._id}`)
                    .then(() => {
                      alert('Client registered')
                      this.$router.push({ name: 'findclient' })
                    })
                    .catch((error) => {
                      console.log(error)
                    })
                }
              } else {
                axios
                  .post(`${apiURL}/clients`, this.client)
                  .then(() => {
                    alert('Client added')
                    this.$router.push({ name: 'findclient' })
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              }
            })
        }
      })
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      client: {
        firstName: { required, alpha },
        lastName: { required, alpha },
        email: { email },
        address: {
          city: { required }
        },
        phoneNumber: {
          primary: { required, numeric }
        }
      }
    }
  }
}
</script>
<template>
  <main>
    <h1
      class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
    >
      Client Intake Form
    </h1>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.prevent="registerClient">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Personal Details</h2>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">First Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.firstName"
              />
              <span class="text-black" v-if="v$.client.firstName.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.client.firstName.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>

          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Middle Name</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="client.middleName"
              />
            </label>
          </div>

          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Last Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="client.lastName"
              />
              <span class="text-black" v-if="v$.client.lastName.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.client.lastName.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>

          <div></div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Email</span>
              <input
                type="email"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                v-model="client.email"
              />
              <span class="text-black" v-if="v$.client.email.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.client.email.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Phone Number</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                v-model="client.phoneNumber.primary"
              />
              <span
                class="text-black"
                v-if="v$.client.phoneNumber.primary.$error"
              >
                <p
                  class="text-red-700"
                  v-for="error of v$.client.phoneNumber.primary.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Alternative Phone Number</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                v-model="client.phoneNumber.alternate"
              />
            </label>
          </div>
        </div>

        <!-- grid container -->
        <div
          class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Address Details</h2>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 1</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.line1"
              />
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 2</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.line2"
              />
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">City</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.city"
              />
              <span class="text-black" v-if="v$.client.address.city.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.client.address.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">County</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.county"
              />
            </label>
          </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Zip Code</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.zip"
              />
            </label>
          </div>
          <div></div>
          <!-- submit button -->
          <div class="flex justify-between mt-10 mr-20">
            <button class="bg-red-700 text-white rounded" type="submit">
              Add Client
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
