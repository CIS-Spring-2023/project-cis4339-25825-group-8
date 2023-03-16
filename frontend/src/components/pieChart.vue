<<<<<<< HEAD
<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="attendancePie"></canvas>
  </div>
</template>
<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
=======
<!-- Add piechart with hard-coded data-->
<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
>>>>>>> d273118138d5543137d31aebce41041b336de3be

export default {
  props: {
    label: {
<<<<<<< HEAD
      type: Array,
    },
    chartData: {
      type: Array,
    },
  },
  async mounted() {
    const backgroundColor = this.chartData.map(() => this.getColor());
    const borderColor = backgroundColor.map((e) =>
      e.replace(/[\d\.]+\)$/g, "1)")
    );
    await new Chart(this.$refs.attendancePie, {
      type: "pie",
      data: {
        labels: this.label,
        datasets: [
          {
            borderWidth: 11,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: this.chartData,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              stepSize: 1,
            },
          },
          x: {
            gridLines: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: true,
      },
    });
  },
  methods: {
    getColor() {
      let channel = () => Math.random() * 255;
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`;
    },
  },
};
</script>
=======
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
  
>>>>>>> d273118138d5543137d31aebce41041b336de3be
