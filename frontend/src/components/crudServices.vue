<template>
    <div class="services-container">
        <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
            Services
        </h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="service in services" :key="service._id">
                    <td>{{ service.name }}</td>
                    <td>{{ service.status }}</td>
                    <td>
                        <button class="edit-button" @click="editService(service)">
                            Edit
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-button" @click="deleteService(service)">
                            Delete
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="form-container">
            <button class="add-button" v-if="!showForm" @click="showForm = true">
                <i class="fas fa-plus"></i> Add Service
            </button>
            <form v-if="showForm">
                <h3>Add Service</h3>
                <label>Name: </label>
                <input type="text" v-model="newService.name" />
                <label> Status: </label>
                <select v-model="newService.status">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button class="create-button" @click.prevent="createService">
                    Create
                </button>
                <button class="cancel-button" @click.prevent="showForm = false">
                    Cancel
                </button>
            </form>
            <div class="modal" v-if="editServiceData">
                <div class="modal-content">
                    <h3>Edit Service</h3>
                    <label>Name: </label>
                    <input type="text" v-model="editServiceData.name" />
                    <label> Status: </label>
                    <select v-model="editServiceData.status">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <button class="save-button" @click="updateService">Save</button>
                    <button class="cancel-button" @click="editServiceData = null">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
/* styling to the component */
.services-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

tr:hover {
    background-color: #f5f5f5;
}

.add-button {
    background-color: green;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.edit-button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 6px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 5px;
    cursor: pointer;
}

.delete-button {
    background-color: #f44336;
    border: none;
    color: white;
    padding: 6px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 5px;
    cursor: pointer;
}

.save-button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 6px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 5px;
    cursor: pointer;
}

.cancel-button {
    background-color: #f44336;
    border: none;
    color: white;
    padding: 6px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 5px;
    cursor: pointer;
}

.create-button {
    background-color: #3649f4;
    border: none;
    color: white;
    padding: 6px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 5px;
    cursor: pointer;
}
</style>

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
        // methods to perform crud operations on services data
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
            fetch(
                `http://localhost:3000/services/update/${this.editServiceData._id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.editServiceData)
                }
            )
                .then((response) => response.json())
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
