        require('dotenv').config()
        const PORT = process.env.PORT || 4000
        let doughnutChart; // Declare global variable for doughnut chart
        let barChart; // Declare global variable for bar chart
        async function predictFlood(event) {
            event.preventDefault(); // Prevent the form from submitting traditionally

            // Gather input values
            // const subdivision = document.getElementById('subdivision').value;
            const rainfall = {
                jan: parseInt(document.getElementById('jan').value),
                feb: parseInt(document.getElementById('feb').value),
                mar: parseInt(document.getElementById('mar').value),
                apr: parseInt(document.getElementById('apr').value),
                may: parseInt(document.getElementById('may').value),
                jun: parseInt(document.getElementById('jun').value),
                jul: parseInt(document.getElementById('jul').value),
                aug: parseInt(document.getElementById('aug').value),
                sep: parseInt(document.getElementById('sep').value),
                oct: parseInt(document.getElementById('oct').value),
                nov: parseInt(document.getElementById('nov').value),
                dec: parseInt(document.getElementById('dec').value)
            };

            const subdivision = "Kerala";
            // Send data to the Node.js server
            const response = await fetch(`http://localhost:${PORT}/model/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ subdivision, rainfall })
            });

            const result = await response.json();
            console.log("Result probability : ", result.probability)
            console.log("Result prediction : ", result.prediction)

            // Display the result
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<h2 class="text-xl font-bold">${result.prediction}</h2><h3 class="text-lg">Probability of Flood: ${result.probability.toFixed(2)}%</h3>`;
            resultDiv.classList.remove("hidden");

            // Show chart container
            document.getElementById('charts_div').classList.remove('hidden');

            const ctx_doughnut = document.getElementById("myDonutChart").getContext("2d");
            if (doughnutChart) {
                // Update existing chart data if the chart already exists
                doughnutChart.data.datasets[0].data = [result.probability, 100 - result.probability];
                doughnutChart.update();
            } else {
                // Create a new chart if it doesn't exist
                doughnutChart = new Chart(ctx_doughnut, {
                    type: "doughnut",
                    data: {
                        labels: ["Yes", "No"],
                        datasets: [{
                            label: "Flood Probability",
                            data: [result.probability, 100 - result.probability],
                            backgroundColor: ["#FF6384", "#36A2EB"],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: { legend: { position: "top" } },
                        cutout: "70%"
                    }
                });
            }

            // Update Bar Chart
            const ctx_bar = document.getElementById("myChart").getContext("2d");
            if (barChart) {
                // Update existing bar chart data
                barChart.data.datasets[0].data = Object.values(rainfall);
                barChart.update();
            } else {
                // Create a new bar chart if it doesn't exist
                barChart = new Chart(ctx_bar, {
                    type: "bar",
                    data: {
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        datasets: [{
                            label: "Monthly Rainfall (mm)",
                            data: Object.values(rainfall),
                            backgroundColor: "#4BC0C0",
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });
            }
        }