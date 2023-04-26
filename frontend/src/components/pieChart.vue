<!-- This code was created by using the chartJS example found at https://www.chartjs.org/docs/latest/charts/doughnut.html. 
I also used the existing code in order to successfully implement the chart onto the homepage of the application. 
I named the chart zipChart and the current data is hardcoded as required for sprint 2-->
<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  props: {
    label: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
  },
  async mounted() {
    new Chart(this.$refs.zipChart, {
      type: "doughnut",
      data: {
        labels: ["77001", "77002", "77084", "77008", "77011"],
        datasets: [
          {
            radius: 150,
            label: "Clients by Zip Code",
            data: [30, 22, 19, 38, 22],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(0,128,0)",
              "rgb(238,130,238)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  },
};
</script>

<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="zipChart"></canvas>
  </div>
</template>
