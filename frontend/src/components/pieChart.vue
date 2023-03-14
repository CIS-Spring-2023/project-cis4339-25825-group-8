<!-- Add piechart with hard-coded data-->
<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  props: {
    label: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },
  async mounted() {
    new Chart(this.$refs.zipChart, {
        type: 'doughnut',
        data: {
        labels:[    
            '77001',
            '77002',
            '77084',
            '77008',
            '77011'
        ],
        datasets: [{
        radius: 150,
        label: 'Clients by Zip Code',
        data: [30, 22, 19, 38, 22],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(0,128,0)',
            'rgb(238,130,238)'
            ],
            hoverOffset: 4
            }]
        }
    })
},
}
</script>

<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="zipChart"></canvas>
  </div>
</template>
  