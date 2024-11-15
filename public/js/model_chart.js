document.getElementById('submitBtn').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent form submission to show the elements

  // Toggle visibility of prediction_div and charts_div
  document.getElementById('prediction_div').classList.remove('hidden');
  document.getElementById('charts_div').classList.remove('hidden');

  document.getElementById('prediction_div').classList.add('flex');
  document.getElementById('charts_div').classList.add('flex');

  // Initialize the charts only after divs are made visible
  const ctx_doughnut = document.getElementById("myDonutChart").getContext("2d");
  const myDonutChart = new Chart(ctx_doughnut, {
    type: "doughnut",
    data: {
      labels: ["Chrome", "Firefox"],
      datasets: [
        {
          label: "Browser Usage",
          data: [100, 25],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          borderWidth: 1,
          borderColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label + ": " + tooltipItem.raw + "%";
            },
          },
        },
      },
      cutout: "70%",
    },
  });

  const ctx_bar = document.getElementById("myChart").getContext("2d");
  new Chart(ctx_bar, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [112, 109, 30, 50, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});