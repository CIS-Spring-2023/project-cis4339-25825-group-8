<script>
import useVuelidate from '@vuelidate/core'
import { required, email, alpha, numeric } from '@vuelidate/validators'
import VueMultiselect from 'vue-multiselect'
import axios from 'axios'
import { DateTime } from 'luxon'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  props: ['id'],
  components: { VueMultiselect },
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      // rename events arrays for added clarity
      eventsAll: [],
      eventsSelected: [],
      eventsRegistered: [],
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
    axios.get(`${apiURL}/clients/id/${this.$route.params.id}`).then((res) => {
      // simplified setting client
      this.client = res.data
    })
    axios.get(`${apiURL}/events`).then((res) => {
      // simplified setting eventsAll
      this.eventsAll = res.data
    })
    this.getEventsRegistered()
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    // better formattedDate function
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    nameWithDate({ name, date }) {
      return `${name} (${this.formattedDate(date)})`
    },
    getEventsRegistered() {
      axios
        .get(`${apiURL}/events/client/${this.$route.params.id}`)
        .then((res) => {
          // simplified setting eventsRegistered
          this.eventsRegistered = res.data
        })
    },
    async updateClient() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        axios
          .put(`${apiURL}/clients/update/${this.id}`, this.client)
          .then(() => {
            alert('Update has been saved.')
            this.$router.back()
          })
      }
    },
    addToEvent() {
      this.eventsSelected.forEach((event) => {
        axios
          .put(`${apiURL}/events/register`, null, {
            params: { event: event._id, client: this.id }
          })
          .then(() => this.getEventsRegistered())
          .catch((error) => {
            if (error.response.data) {
              alert(`${event.name}: ${error.response.data}`)
            }
          })
      })
      // clear events selection after attempting to register for events
      this.eventsSelected = []
    },
    // replaces client hard delete
    // find all events where client appears in attendees array and pull it
    // then pull org from client org array
    deregisterClient() {
      axios
        .get(`${apiURL}/events/client/${this.id}`)
        .then((res) => {
          res.data.forEach((e) => {
            axios.put(`${apiURL}/events/deregister`, null, {
              params: { event: e._id, client: this.id }
            })
          })
        })
        .finally(
          axios.put(`${apiURL}/clients/deregister/${this.id}`).then(() => {
            alert('Client has been deleted.')
            this.$router.push({ name: 'findclient' })
          })
        )
    },
    // unused hard delete method
    deleteClient() {
      axios.delete(`${apiURL}/clients/${this.id}`).then(() => {
        alert('Client has been deleted.')
        this.$router.push({ name: 'findclient' })
      })
    },
    // function to allow click through to event details
    editEvent(eventID) {
      this.$router.push({ name: 'eventdetails', params: { id: eventID } })
    }
  },
  validations() {
    return {
      client: {
        firstName: { required, alpha },
        lastName: { required, alpha },
        email: { email },
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
      Update Client
    </h1>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.prevent="handleSubmitForm">
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
                placeholder
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
        </div>

        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="updateClient"
              type="submit"
              class="bg-green-700 text-white rounded"
            >
              Update Client
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="deregisterClient"
              type="submit"
              class="bg-red-700 text-white rounded"
            >
              Delete Client
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              type="reset"
              class="border border-red-700 bg-white text-red-700 rounded"
              @click="$router.back()"
            >
              Go back
            </button>
          </div>
        </div>

        <hr class="mt-10 mb-10" />

        <!-- Client Event Information -->
        <div
          class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Events for Client</h2>

          <div class="flex flex-col col-span-2">
            <table class="min-w-full shadow-md rounded">
              <thead class="bg-gray-50 text-xl">
                <tr>
                  <th class="p-4 text-left">Event Name</th>
                  <th class="p-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-300">
                <!-- allow click through to event details -->
                <tr
                  @click="editEvent(event._id)"
                  v-for="event in eventsRegistered"
                  :key="event._id"
                >
                  <td class="p-2 text-left">{{ event.name }}</td>
                  <td class="p-2 text-left">
                    {{ formattedDate(event.date) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex flex-col">
            <!-- fixed weird selection duplication bug -->
            <VueMultiselect
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="eventsSelected"
              :options="eventsAll"
              :custom-label="nameWithDate"
              :multiple="true"
              :close-on-select="true"
              placeholder="Select Events to be added"
              label="date"
              track-by="name"
            />
            <div class="flex justify-between">
              <button
                @click="addToEvent"
                type="submit"
                class="mt-5 bg-red-700 text-white rounded"
              >
                Add Client to Selected Events
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
