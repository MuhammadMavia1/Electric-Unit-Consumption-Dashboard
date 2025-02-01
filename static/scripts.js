let isDarkMode = false;
let fetchedData = null; // Store fetched data for download Purpose

function fetchData() {
    const start_date = document.getElementById("start_date").value;
    const end_date = document.getElementById("end_date").value;
    const unit_cost_threshold = document.getElementById("unit_cost_threshold").value;

    if (!start_date || !end_date) {
        alert("Please enter valid inputs for all fields.");
        return;
    }

    const loadingIndicator = document.getElementById("loading");
    loadingIndicator.style.display = "block";

    fetch(`/fetch-data?start_date=${start_date}&end_date=${end_date}&unit_cost_threshold=${unit_cost_threshold}`)
        .then(response => response.json())
        .then(data => {
            loadingIndicator.style.display = "none";
            if (data.status === "success") {
                fetchedData = data.data; // Storing data for download
                renderChart(data.data);
                renderDailyComparisonChart(data.data);
                updateSummary(data.summary);
            } else {
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => {
            loadingIndicator.style.display = "none";
            console.error('Error fetching data:', error);
        });
}

function renderChart(data) {
    data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const uniqueData = data.filter(
        (record, index, self) => index === 0 || record.timestamp !== self[index - 1].timestamp
    );

    const timestamps = uniqueData.map(record => record.timestamp);
    const unitCosts = uniqueData.map(record => record.unit_cost);

    const trace = {
        x: timestamps,
        y: unitCosts,
        mode: 'lines+markers',
        name: 'Unit Cost',
        hoverinfo: 'x+y'
    };

    const layout = {
        title: 'Unit Cost Over Time',
        xaxis: { title: 'Timestamp', rangeslider: { visible: true }, type: 'date' },
        yaxis: { title: 'Unit Cost', rangemode: 'tozero' },
        hovermode: 'closest',
        margin: { t: 50, b: 40, l: 50, r: 30 }
    };

    Plotly.newPlot('chart', [trace], layout);
}

function renderDailyComparisonChart(data) {
    const dailyData = {};
    data.forEach(record => {
        const date = record.timestamp.split(' ')[0];
        if (!dailyData[date]) {
            dailyData[date] = { totalUnits: 0, totalCost: 0 };
        }
        dailyData[date].totalUnits += record.per_unit;
        dailyData[date].totalCost += record.unit_cost;
    });

    const dates = Object.keys(dailyData);
    const dailyUnits = dates.map(date => dailyData[date].totalUnits);
    const dailyCosts = dates.map(date => dailyData[date].totalCost);

    const unitsTrace = { x: dates, y: dailyUnits, type: 'bar', name: 'Daily Units' };
    const costsTrace = { x: dates, y: dailyCosts, type: 'line', name: 'Daily Costs' };

    const layout = {
        title: 'Daily Unit Consumption and Costs',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Values' },
        barmode: 'group'
    };

    Plotly.newPlot('chart2', [unitsTrace, costsTrace], layout);
}

function updateSummary(summary) {
    document.getElementById('totalUnits').innerText = summary.total_units;
    document.getElementById('totalCost').innerText = summary.total_cost;
    document.getElementById('averageCost').innerText = summary.average_cost_per_unit;
}

function toggleDarkMode() {
    const body = document.body;
    const container = document.querySelector('.container');
    const footer = document.querySelector('.footer');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Toggle dark mode classes
    body.classList.toggle('dark-mode');
    container.classList.toggle('dark-mode');
    footer.classList.toggle('dark-mode');

    // Update the button text based on the current mode
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.innerText = 'Toggle Light Mode';
    } else {
        darkModeToggle.innerText = 'Toggle Dark Mode';
    }
}

function downloadData() {
    if (!fetchedData) {
        alert("No data available to download. Please fetch data first.");
        return;
    }

    const blob = new Blob([JSON.stringify(fetchedData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "electric_unit_consumption_data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
