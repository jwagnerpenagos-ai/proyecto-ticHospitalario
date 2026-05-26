from flask import Blueprint, request, jsonify
from controllers.alert_controller import *

alert_bp = Blueprint('alert_bp', __name__)


# Alert Severities

@alert_bp.route('/severities', methods=['GET'])
def get_alert_severities_route():
    result, status = get_all_alert_severities()
    return jsonify(result), status

@alert_bp.route('/severities/<int:severity_id>', methods=['GET'])
def get_alert_severity_route(severity_id):
    result, status = get_alert_severity_by_id(severity_id)
    return jsonify(result), status

@alert_bp.route('/severities', methods=['POST'])
def create_alert_severity_route():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = create_alert_severity(data)
    return jsonify(result), status

@alert_bp.route('/severities/<int:severity_id>', methods=['PUT'])
def update_alert_severity_route(severity_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = update_alert_severity(severity_id, data)
    return jsonify(result), status

@alert_bp.route('/severities/<int:severity_id>', methods=['DELETE'])
def delete_alert_severity_route(severity_id):
    result, status = delete_alert_severity(severity_id)
    return jsonify(result), status


# Alert Status

@alert_bp.route('/statuses', methods=['GET'])
def get_alert_statuses_route():
    result, status = get_all_alert_statuses()
    return jsonify(result), status

@alert_bp.route('/statuses/<int:status_id>', methods=['GET'])
def get_alert_status_route(status_id):
    result, status = get_alert_status_by_id(status_id)
    return jsonify(result), status

@alert_bp.route('/statuses', methods=['POST'])
def create_alert_status_route():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = create_alert_status(data)
    return jsonify(result), status

@alert_bp.route('/statuses/<int:status_id>', methods=['PUT'])
def update_alert_status_route(status_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = update_alert_status(status_id, data)
    return jsonify(result), status

@alert_bp.route('/statuses/<int:status_id>', methods=['DELETE'])
def delete_alert_status_route(status_id):
    result, status = delete_alert_status(status_id)
    return jsonify(result), status


# Alerts

@alert_bp.route('/', methods=['GET'])
def get_alerts_route():
    result, status = get_all_alerts()
    return jsonify(result), status

@alert_bp.route('/<int:alert_id>', methods=['GET'])
def get_alert_route(alert_id):
    result, status = get_alert_by_id(alert_id)
    return jsonify(result), status

@alert_bp.route('/', methods=['POST'])
def create_alert_route():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = create_alert(data)
    return jsonify(result), status

@alert_bp.route('/<int:alert_id>', methods=['PUT'])
def update_alert_route(alert_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = update_alert(alert_id, data)
    return jsonify(result), status

@alert_bp.route('/<int:alert_id>', methods=['DELETE'])
def delete_alert_route(alert_id):
    result, status = delete_alert(alert_id)
    return jsonify(result), status