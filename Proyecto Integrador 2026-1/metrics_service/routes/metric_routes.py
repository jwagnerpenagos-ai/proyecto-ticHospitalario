from flask import Blueprint, request, jsonify
from controllers.metric_controller import *

metric_bp = Blueprint('metric_bp', __name__)


# Metric Types

@metric_bp.route('/types', methods=['GET'])
def get_metric_types_route():
    result, status = get_all_metric_types()
    return jsonify(result), status

@metric_bp.route('/types/<int:type_id>', methods=['GET'])
def get_metric_type_route(type_id):
    result, status = get_metric_type_by_id(type_id)
    return jsonify(result), status

@metric_bp.route('/types', methods=['POST'])
def create_metric_type_route():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = create_metric_type(data)
    return jsonify(result), status

@metric_bp.route('/types/<int:type_id>', methods=['PUT'])
def update_metric_type_route(type_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = update_metric_type(type_id, data)
    return jsonify(result), status

@metric_bp.route('/types/<int:type_id>', methods=['DELETE'])
def delete_metric_type_route(type_id):
    result, status = delete_metric_type(type_id)
    return jsonify(result), status


# Metrics

@metric_bp.route('/', methods=['GET'])
def get_metrics_route():
    result, status = get_all_metrics()
    return jsonify(result), status

@metric_bp.route('/<int:metric_id>', methods=['GET'])
def get_metric_route(metric_id):
    result, status = get_metric_by_id(metric_id)
    return jsonify(result), status

@metric_bp.route('/device/<int:device_id>', methods=['GET'])
def get_metrics_by_device_route(device_id):
    result, status = get_metrics_by_device(device_id)
    return jsonify(result), status

@metric_bp.route('/', methods=['POST'])
def create_metric_route():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = create_metric(data)
    return jsonify(result), status

@metric_bp.route('/<int:metric_id>', methods=['PUT'])
def update_metric_route(metric_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = update_metric(metric_id, data)
    return jsonify(result), status

@metric_bp.route('/<int:metric_id>', methods=['DELETE'])
def delete_metric_route(metric_id):
    result, status = delete_metric(metric_id)
    return jsonify(result), status