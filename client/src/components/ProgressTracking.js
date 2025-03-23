import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressTracking = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user2 = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`http://localhost:5129/api/ProgressTrackings/user/${user2.userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch progress data');
        }

        const data = await response.json();
        setProgressData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  // Define table columns
  const columns = [
    { name: "Progress ID", selector: row => row.progressId, sortable: true },
    { name: "User ID", selector: row => row.userId, sortable: true },
    { name: "Weight (KG)", selector: row => row.weightKG, sortable: true },
    { name: "BMI", selector: row => row.bmi, sortable: true },
    { name: "Body Fat %", selector: row => row.bodyFatPercentage, sortable: true },
    { name: "Checking Date", selector: row => new Date(row.checkingDate).toLocaleString(), sortable: true },
  ];

  // Prepare data for Chart.js
  const chartData = {
    labels: progressData.map(entry => new Date(entry.checkingDate).toLocaleDateString()), // X-axis (Date)
    datasets: [
      {
        label: "Weight (KG)",
        data: progressData.map(entry => entry.weightKG), // Y-axis (Weight)
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "BMI",
        data: progressData.map(entry => entry.bmi), // Y-axis (BMI)
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "Body Fat (%)",
        data: progressData.map(entry => entry.bodyFatPercentage), // Y-axis (Body Fat %)
        borderColor: "rgba(54, 162, 235, 1)",  // Blue
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Values" } },
    },
  };

  return (
    <div className="container ">
      <h2 className="mb-4">User Progress Details</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <DataTable
        columns={columns}
        data={progressData}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        customStyles={{
          headCells: {
            style: { backgroundColor: "#444749", color: "#ffffff", fontSize: "15px", fontWeight: "bold" },
          },
          cells: { style: { border: "0.4px solid #e0e0e0" } },
          pagination: { style: { fontSize: "12px", padding: "10px", justifyContent: "flex-end" } },
        }}
      />

      <div className="mt-5">
        <h3 className="text-center">Weight, BMI & Body Fat Progress</h3>
        <div style={{ height: "400px" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
