Readme
Electric Unit Consumption Dashboard
Overview
The Electric Unit Consumption Dashboard is a web-based application that helps users monitor and analyze electricity consumption over time. It fetches data from an API, processes it, and visualizes trends using interactive graphs. The application also includes features such as dark mode toggle and data export for further analysis.

Features
•	📊 Real-time Data Visualization: Displays electricity usage trends with interactive graphs.
•	🌙 Dark Mode Toggle: Switch between light and dark themes for better readability.
•	📥 Download Data: Export consumption data for offline analysis.
•	📅 Custom Date Range Selection: Fetch data for specific periods.
•	🔍 Interactive UI: Smooth and user-friendly design with dynamic updates.

Technologies Used
•	Frontend: HTML, CSS, JavaScript (Plotly.js for graphs)
•	Backend: Python Flask (Handles API requests and data processing)
•	Database: Oracle SQL Developer (Stores historical data)
•	External API: IBM ACE (Fetches electricity consumption data)

Installation & Setup
Prerequisites
Ensure you have the following installed on your system:
•	Python 3.x
•	Flask (pip install flask)
•	Any web browser (Chrome, Firefox, Edge, etc.)

Steps to Run the Project
1.	Clone the Repository:
git clone https://github.com/your-repository-link
cd electric-unit-consumption-dashboard
2.	Install Dependencies:
pip install -r requirements.txt
3.	Run the Flask Server:
python app.py
4.	Open the Application:
o	The application will run at http://127.0.0.1:5000/
o	Open this URL in your browser to access the dashboard.

Usage
1.	Enter Date Range: Select a start and end date to filter electricity consumption data.
2.	View Graphs: Analyze trends through interactive visualizations.
3.	Toggle Dark Mode: Click the "Toggle Dark Mode" button to switch between light and dark themes.
4.	Download Data: Click the "Download Data" button to export the dataset.

Troubleshooting
•	If Flask does not start, ensure Python and dependencies are installed properly.
•	If the API fails to fetch data, verify IBM ACE API credentials and connection.
•	For UI issues, check browser console (F12 -> Console) for errors.

Author
Developed by Muhammad Mavia Abrar – 3309-2023 © 2024 Hamdard University

License
This project is for educational purposes only and is not intended for commercial use.
