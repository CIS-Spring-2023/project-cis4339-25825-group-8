<!-- This code was created by using the chartJS example found at https://www.chartjs.org/docs/latest/charts/doughnut.html. 
I also used the existing code in order to successfully implement the chart onto the homepage of the application. 
I named the chart zipChart and the current data is hardcoded as required for sprint 2.
Sprint 3 update: The zipchart has been updated to read the data from the mongoDB using axios and a GET function.
The solution was pretty simple for this feature. I simply connected the route to the GET function that gets all clients
and then I worked through the collection to get each clients zip. Clients without a zip will still be shown but they will not have a 
label for their zipcode. This is due to the fact that zip is not a required field on the client intake form.-->
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

    // Aggregate the clients by zip code
    const clientsByZipcode = {}
    clients.forEach((Client) => {
      if (Client.address.zip in clientsByZipcode) {
        clientsByZipcode[Client.address.zip] += 1
      } else {
        clientsByZipcode[Client.address.zip] = 1
      }
    })

    // Transform the data to match the format expected by Chart.js
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
