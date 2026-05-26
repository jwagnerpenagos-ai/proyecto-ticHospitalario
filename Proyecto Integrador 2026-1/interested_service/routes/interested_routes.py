from flask import Blueprint, request, jsonify
from controllers.interested_controller import *

interested_bp = Blueprint('interested_bp', __name__)


# Roles

@interested_bp.route('/roles', methods=['GET'])
def get_roles_route():
    result, status = get_all_roles()
    return jsonify(result), status

@interested_bp.route('/roles/<int:role_id>', methods=['GET'])
def get_role_route(role_id):
    result, status = get_role_by_id(role_id)
    return jsonify(result), status

@interested_bp.route('/roles', methods=['POST'])
def create_role_route():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = create_role(data)
    return jsonify(result), status

@interested_bp.route('/roles/<int:role_id>', methods=['PUT'])
def update_role_route(role_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = update_role(role_id, data)
    return jsonify(result), status

@interested_bp.route('/roles/<int:role_id>', methods=['DELETE'])
def delete_role_route(role_id):
    result, status = delete_role(role_id)
    return jsonify(result), status


# Interested

@interested_bp.route('/', methods=['GET'])
def get_interested_route():
    result, status = get_all_interested()
    return jsonify(result), status

@interested_bp.route('/<int:interested_id>', methods=['GET'])
def get_interested_by_id_route(interested_id):
    result, status = get_interested_by_id(interested_id)
    return jsonify(result), status

@interested_bp.route('/', methods=['POST'])
def create_interested_route():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = create_interested(data)
    return jsonify(result), status

@interested_bp.route('/<int:interested_id>', methods=['PUT'])
def update_interested_route(interested_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos JSON requeridos"}), 400

    result, status = update_interested(interested_id, data)
    return jsonify(result), status

@interested_bp.route('/<int:interested_id>', methods=['DELETE'])
def delete_interested_route(interested_id):
    result, status = delete_interested(interested_id)
    return jsonify(result), status