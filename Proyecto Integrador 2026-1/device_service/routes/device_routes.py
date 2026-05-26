from flask import Blueprint, request, jsonify
from controllers.device_controller import *

device_bp = Blueprint('device_bp', __name__)


# Device Status

@device_bp.route('/statuses', methods=['GET'])
def get_device_statuses_route():
    result, status = get_all_device_statuses()
    return jsonify(result), status

@device_bp.route('/statuses/<int:status_id>', methods=['GET'])
def get_device_status_route(status_id):
    result, status = get_device_status_by_id(status_id)
    return jsonify(result), status

@device_bp.route('/statuses', methods=['POST'])
def create_device_status_route():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = create_device_status(data)
    return jsonify(result), status

@device_bp.route('/statuses/<int:status_id>', methods=['PUT'])
def update_device_status_route(status_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = update_device_status(status_id, data)
    return jsonify(result), status

@device_bp.route('/statuses/<int:status_id>', methods=['DELETE'])
def delete_device_status_route(status_id):
    result, status = delete_device_status(status_id)
    return jsonify(result), status


# Device Types

@device_bp.route('/types', methods=['GET'])
def get_device_types_route():
    result, status = get_all_device_types()
    return jsonify(result), status

@device_bp.route('/types/<int:type_id>', methods=['GET'])
def get_device_type_route(type_id):
    result, status = get_device_type_by_id(type_id)
    return jsonify(result), status

@device_bp.route('/types', methods=['POST'])
def create_device_type_route():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = create_device_type(data)
    return jsonify(result), status

@device_bp.route('/types/<int:type_id>', methods=['PUT'])
def update_device_type_route(type_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = update_device_type(type_id, data)
    return jsonify(result), status

@device_bp.route('/types/<int:type_id>', methods=['DELETE'])
def delete_device_type_route(type_id):
    result, status = delete_device_type(type_id)
    return jsonify(result), status


# Devices

@device_bp.route('/', methods=['GET'])
def get_devices_route():
    result, status = get_all_devices()
    return jsonify(result), status

@device_bp.route('/<int:device_id>', methods=['GET'])
def get_device_route(device_id):
    result, status = get_device_by_id(device_id)
    return jsonify(result), status

@device_bp.route('/', methods=['POST'])
def create_device_route():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = create_device(data)
    return jsonify(result), status

@device_bp.route('/<int:device_id>', methods=['PUT'])
def update_device_route(device_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = update_device(device_id, data)
    return jsonify(result), status

@device_bp.route('/<int:device_id>', methods=['DELETE'])
def delete_device_route(device_id):
    result, status = delete_device(device_id)
    return jsonify(result), status