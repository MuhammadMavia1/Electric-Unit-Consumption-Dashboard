from flask import Flask, render_template, jsonify, request
import requests
from datetime import datetime

app = Flask(__name__)

# reformat date to DD/MM/YYYY
def reformat_date(date_input):
    try:
        parsed_date = datetime.strptime(date_input, "%Y-%m-%d")
        return parsed_date.strftime("%d/%m/%Y")
    except ValueError:
        return None

# Route for the index page
@app.route('/')
def home():
    return render_template('index.html')

# fetch data from the API
@app.route('/fetch-data', methods=['GET'])
def fetch_data():
    API_BASE_URL = "http://desktop-uqr4cb6:7080/electricconsumptionapi/v1/consumption"

    raw_start_date = request.args.get('start_date', '2025-01-01')
    raw_end_date = request.args.get('end_date', '2025-01-01')
    threshold = request.args.get('unit_cost_threshold', '')

    start_date = reformat_date(raw_start_date)
    end_date = reformat_date(raw_end_date)

    if not start_date or not end_date:
        return jsonify({"status": "error", "message": "Invalid date format. Use YYYY-MM-DD."}), 400

    try:
        response = requests.get(
            API_BASE_URL,
            params={
                "start_date": start_date,
                "end_date": end_date,
                "threshold": threshold
            }
        )
        response.raise_for_status()
        data = response.json()
        if not data or 'status' not in data:
            return jsonify({"status": "error", "message": "Invalid API response"}), 500
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Invalid routes
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({"status": "error", "message": "Resource not found"}), 404

# Invalid input
@app.errorhandler(400)
def bad_request_error(error):
    return jsonify({"status": "error", "message": error.description}), 400

if __name__ == '__main__':
    app.run(debug=True)
