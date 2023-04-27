<template>
  <div>
    <h2>Services</h2>
    <ul>
      <li v-for="services in services" :key="services._id">
        <span>{{ services.name }}</span>
        <span>{{ services.status }}</span>
        <button @click="editService(services)">Edit</button>
        <button @click="deleteService(services)">Delete</button>
      </li>
    </ul>
    <form v-if="showForm">
      <label>Name:</label>
      <input type="text" v-model="newService.name" />
      <label>Status:</label>
      <select v-model="newService.status">
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button @click.prevent="createService">Create</button>
    </form>
    <button v-if="!showForm" @click="showForm = true">Add Service</button>
    <div v-if="editServiceData">
      <label>Name:</label>
      <input type="text" v-model="editServiceData.name" />
      <label>Status:</label>
      <select v-model="editServiceData.status">
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button @click="updateService">Save</button>
      <button @click="editServiceData = null">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      services: [],
      newService: { name: '', status: 'active' },
      editServiceData: null,
      showForm: false
    }
  },
  mounted() {
    this.getServices()
  },
  methods: {
    getServices() {
      fetch('http://localhost:3000/services')
        .then((response) => response.json())
        .then((data) => {
          this.services = data
        })
        .catch((error) => console.log(error))
    },
    createService() {
      fetch('http://localhost:3000/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newService)
      })
        .then((response) => response.json())
        .then((data) => {
          this.services.push(data)
          this.newService.name = ''
          this.newService.status = ''
          this.showForm = false
        })
        .catch((error) => console.log(error))
    },
    editService(services) {
      this.editServiceData = { ...services }
    },
    updateService() {
            fetch(`http://localhost:3000/services/update/${this.editServiceData._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.editServiceData)
            })
                .then(response => response.json())
        .then((data) => {
          const index = this.services.findIndex((s) => s._id === data._id)
          this.services.splice(index, 1, data)
          this.editServiceData = null
        })
        .catch((error) => console.log(error))
    },
    deleteService(services) {
      fetch(`http://localhost:3000/services/${services._id}`, {
        method: 'DELETE'
      })
        .then(() => {
          const index = this.services.findIndex((s) => s._id === services._id)
          this.services.splice(index, 1)
        })
        .catch((error) => console.log(error))
    }
  }
}
</script>
