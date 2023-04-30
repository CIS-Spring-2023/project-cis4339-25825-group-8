<!-- Sprint 2: This code was created by using the chartJS example found at https://www.chartjs.org/docs/latest/charts/doughnut.html. 
The preexisting code and chartJS tutorial were heavily referenced.
Sprint 3 update: The zipChart has been updated to read the data from the mongoDB client collection using axios and a GET function.
The solution for this feature required connecting the route to the GET function that gets all clients and then creating 
a function to separate and collect the clients by their zip code. Clients without a zip will still be shown but they will 
not have a label for their zip code. This is due to the fact that zip is not a required field on the client intake form.-->
<script>
import axios from 'axios'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  props: {
    label: {
      type: Array
    }
  },
  data() {
    return {
      chartData: []
    }
  },
  async mounted() {
    const response = await axios.get('http://localhost:3000/clients')
    const clients = response.data

    // seperate and collect clients by zip code
    const clientsByZipcode = {}
    clients.forEach((Client) => {
      if (Client.address.zip in clientsByZipcode) {
        clientsByZipcode[Client.address.zip] += 1
      } else {
        clientsByZipcode[Client.address.zip] = 1
      }
    })

    // put data into chart.js format
    const labels = Object.keys(clientsByZipcode)
    const data = Object.values(clientsByZipcode)

    new Chart(this.$refs.zipChart, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            radius: 150,
            label: 'Clients by Zip Code',
            data: data,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(0,128,0)',
              'rgb(238,130,238)'
            ],
            hoverOffset: 4
          }
        ]
      }
    })
  }
}
</script>

<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="zipChart"></canvas>
  </div>
</template>
