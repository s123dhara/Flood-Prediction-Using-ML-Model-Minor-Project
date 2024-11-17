import Chart from '/js/chart.js';

let doughnutChart;
let barChart;
const PORT = 3000;
async function predictFlood(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally
    // Validate subdivision
    const subdivisionInput = document.getElementById("subdivision");
    const subdivisionError = document.getElementById("eror-subdivision");
    if (!subdivisionInput.value.trim()) {
        subdivisionError.textContent = "Please select a subdivision";
        return;
    } else {
        subdivisionError.textContent = "";
    }

    // Validate all rainfall inputs
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    let hasError = false;

    months.forEach(month => {
        const input = document.getElementById(month);
        const error = document.getElementById(`eror-${month}`);
        const value = input.value.trim();

        if (!value) {
            error.textContent = "This field is required";
            hasError = true;
        } else if (isNaN(value)) {
            error.textContent = "Please enter a valid number";
            hasError = true;
        } else if (parseFloat(value) < 0) {
            error.textContent = "Value cannot be negative";
            hasError = true;
        } else {
            error.textContent = "";
        }
    });

    if (hasError) {
        return;
    }
    const rainfall = {
        jan: parseFloat(document.getElementById("jan").value) || 0,
        feb: parseFloat(document.getElementById("feb").value) || 0,
        mar: parseFloat(document.getElementById("mar").value) || 0,
        apr: parseFloat(document.getElementById("apr").value) || 0,
        may: parseFloat(document.getElementById("may").value) || 0,
        jun: parseFloat(document.getElementById("jun").value) || 0,
        jul: parseFloat(document.getElementById("jul").value) || 0,
        aug: parseFloat(document.getElementById("aug").value) || 0,
        sep: parseFloat(document.getElementById("sep").value) || 0,
        oct: parseFloat(document.getElementById("oct").value) || 0,
        nov: parseFloat(document.getElementById("nov").value) || 0,
        dec: parseFloat(document.getElementById("dec").value) || 0,
    };

    const subdivision = document.getElementById("subdivision").value;
    console.log(subdivision);
    console.log(rainfall);

    try {
        // Send data to the Node.js server
        const response = await fetch(`http://localhost:3000/model/predict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                subdivision,
                rainfall
            }),
        });

        const result = await response.json();

        const model_result = document.getElementById("model_result");
        const model_probability = document.getElementById("model_probability");
        console.log("Result probability:", result.probability);
        console.log("Result prediction:", result.prediction);
        model_result.innerText = "Model Prediction: " + result.prediction;
        model_probability.innerText =
            "Model Flood Probability: " + result.probability + "%";

        document.getElementById("prediction_div").classList.remove("hidden");
        document.getElementById("prediction_div").classList.add("flex");
        document.getElementById("charts_div").classList.remove("hidden");
        document.getElementById("charts_div").classList.add("flex");
        // Doughnut Chart
        const ctx_doughnut = document
            .getElementById("myDonutChart")
            .getContext("2d");
        if (doughnutChart) {
            doughnutChart.data.datasets[0].data = [
                result.probability,
                100 - result.probability,
            ];
            doughnutChart.update();
        } else {
            doughnutChart = new Chart(ctx_doughnut, {
                type: "doughnut",
                data: {
                    labels: ["Yes", "No"],
                    datasets: [{
                        label: "Flood Probability",
                        data: [result.probability, 100 - result.probability],
                        backgroundColor: ["#FF6384", "#36A2EB"],
                        borderWidth: 1,
                    },],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top"
                        }
                    },
                    cutout: "70%",
                },
            });
        }

        // Bar Chart
        const ctx_bar = document.getElementById("myChart").getContext("2d");
        if (barChart) {
            barChart.data.datasets[0].data = Object.values(rainfall);
            barChart.update();
        } else {
            barChart = new Chart(ctx_bar, {
                type: "bar",
                data: {
                    labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ],
                    datasets: [{
                        label: "Monthly Rainfall (mm)",
                        data: Object.values(rainfall),
                        backgroundColor: "#4BC0C0",
                        borderWidth: 1,
                    },],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        },
                    },
                },
            });
        }
    } catch (error) {
        console.error("Error in fetch:", error);
        alert("An error occurred. Please try again.");
    }
}