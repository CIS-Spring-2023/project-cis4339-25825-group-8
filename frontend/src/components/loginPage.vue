 <!-- I still need to add comments to this code/functionality and the Donught Chart. I also need to add refrences. 
This functionality is not completed it needs to be added to the create events page. -->
<template> 
  <div>
    <h1>Services</h1>
    <form @submit.prevent="createService">
      <label for="name">Service name:</label>
      <input type="text" id="name" v-model="newServiceName" required>
      <button type="submit">Create service</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(service, index) in services" :key="service.id">
          <td>
            <input type="text" v-model="service.name" :disabled="service.status === 'inactive'" required>
          </td>
          <td>
            <select v-model="service.status" :disabled="service.status === 'inactive'">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </td>
          <td>
            <button @click="updateService(index)" :disabled="service.status === 'inactive'">Save</button>
            <button @click="deleteService(index)">{{ service.status === 'inactive' ? 'Restore' : 'Delete' }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      services: [
        { id: 1, name: 'Service 1', status: 'active' },
        { id: 2, name: 'Service 2', status: 'active' },
        { id: 3, name: 'Service 3', status: 'inactive' },
      ],
      newServiceName: '',
    }
  },
  methods: {
    createService() {
      const newService = { id: Date.now(), name: this.newServiceName, status: 'active' }
      this.services.push(newService)
      this.newServiceName = ''
    },
    updateService(index) {
      const service = this.services[index]
      // send service to server or update in local storage
    },
    deleteService(index) {
      const service = this.services[index]
      if (service.status === 'inactive') {
        this.services.splice(index, 1)
      } else {
        service.status = 'inactive'
      }
      // send service to server or update in local storage
    },
  },
}
</script>