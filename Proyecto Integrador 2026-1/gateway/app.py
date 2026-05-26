from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
from functools import wraps
import jwt

app = Flask(__name__)
app.json.sort_keys = False
CORS(app)

SECRET_KEY = "super_secret_key"

INTERESTED_URL = "http://interested-service:5001/interested"
DEVICES_URL    = "http://device-service:5002/devices"
AUTH_URL       = "http://auth-service:5003/auth"
LOCATIONS_URL  = "http://location-service:5004/locations"
METRICS_URL    = "http://metrics-service:5005/metrics"
ALERTS_URL     = "http://alerts-service:5006/alerts"


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({"error": "Token requerido"}), 401

        try:
            token = auth_header.split(" ")[1]
            decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user = decoded

        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token inválido"}), 401
        except Exception:
            return jsonify({"error": "Error en el token"}), 401

        return f(*args, **kwargs)

    return decorated


def is_admin():
    return request.user.get("user_id") == 1


def require_admin_for_write(action="realizar esta acción"):
    if request.method in ["POST", "PUT", "DELETE"] and not is_admin():
        return jsonify({
            "error": f"Solo el administrador puede {action}"
        }), 403

    return None


# Auth

@app.route("/auth/register", methods=["POST"])
def register():
    response = requests.post(f"{AUTH_URL}/register", json=request.json)
    return jsonify(response.json()), response.status_code


@app.route("/auth/login", methods=["POST"])
def login():
    response = requests.post(f"{AUTH_URL}/login", json=request.json)
    return jsonify(response.json()), response.status_code


# Interested

@app.route("/interested/roles", methods=["GET", "POST"])
@token_required
def interested_roles():
    admin_error = require_admin_for_write("crear roles")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{INTERESTED_URL}/roles")
    else:
        response = requests.post(f"{INTERESTED_URL}/roles", json=request.json)

    return jsonify(response.json()), response.status_code


@app.route("/interested/roles/<int:id>", methods=["GET", "PUT", "DELETE"])
@token_required
def interested_role_detail(id):
    admin_error = require_admin_for_write("modificar roles")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{INTERESTED_URL}/roles/{id}")
    elif request.method == "PUT":
        response = requests.put(f"{INTERESTED_URL}/roles/{id}", json=request.json)
    else:
        response = requests.delete(f"{INTERESTED_URL}/roles/{id}")

    return jsonify(response.json()), response.status_code


@app.route("/interested", methods=["GET", "POST"])
@token_required
def interested():
    admin_error = require_admin_for_write("crear interesados")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{INTERESTED_URL}/")
    else:
        response = requests.post(f"{INTERESTED_URL}/", json=request.json)

    return jsonify(response.json()), response.status_code


@app.route("/interested/<int:id>", methods=["GET", "PUT", "DELETE"])
@token_required
def interested_detail(id):
    admin_error = require_admin_for_write("modificar interesados")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{INTERESTED_URL}/{id}")
    elif request.method == "PUT":
        response = requests.put(f"{INTERESTED_URL}/{id}", json=request.json)
    else:
        response = requests.delete(f"{INTERESTED_URL}/{id}")

    return jsonify(response.json()), response.status_code


# Locations

@app.route("/locations", methods=["GET", "POST"])
@token_required
def locations():
    admin_error = require_admin_for_write("crear ubicaciones")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{LOCATIONS_URL}")
    else:
        response = requests.post(f"{LOCATIONS_URL}", json=request.json)

    return jsonify(response.json()), response.status_code


@app.route("/locations/<int:id>", methods=["GET", "PUT", "DELETE"])
@token_required
def location_detail(id):
    admin_error = require_admin_for_write("modificar ubicaciones")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{LOCATIONS_URL}/{id}")
    elif request.method == "PUT":
        response = requests.put(f"{LOCATIONS_URL}/{id}", json=request.json)
    else:
        response = requests.delete(f"{LOCATIONS_URL}/{id}")

    return jsonify(response.json()), response.status_code


# Devices

@app.route("/devices/statuses", methods=["GET", "POST"])
@token_required
def device_statuses():
    admin_error = require_admin_for_write("crear estados de dispositivos")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{DEVICES_URL}/statuses")
    else:
        response = requests.post(f"{DEVICES_URL}/statuses", json=request.json)

    return jsonify(response.json()), response.status_code


@app.route("/devices/statuses/<int:id>", methods=["GET", "PUT", "DELETE"])
@token_required
def device_status_detail(id):
    admin_error = require_admin_for_write("modificar estados de dispositivos")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{DEVICES_URL}/statuses/{id}")
    elif request.method == "PUT":
        response = requests.put(f"{DEVICES_URL}/statuses/{id}", json=request.json)
    else:
        response = requests.delete(f"{DEVICES_URL}/statuses/{id}")

    return jsonify(response.json()), response.status_code


@app.route("/devices/types", methods=["GET", "POST"])
@token_required
def device_types():
    admin_error = require_admin_for_write("crear tipos de dispositivos")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{DEVICES_URL}/types")
    else:
        response = requests.post(f"{DEVICES_URL}/types", json=request.json)

    return jsonify(response.json()), response.status_code


@app.route("/devices/types/<int:id>", methods=["GET", "PUT", "DELETE"])
@token_required
def device_type_detail(id):
    admin_error = require_admin_for_write("modificar tipos de dispositivos")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{DEVICES_URL}/types/{id}")
    elif request.method == "PUT":
        response = requests.put(f"{DEVICES_URL}/types/{id}", json=request.json)
    else:
        response = requests.delete(f"{DEVICES_URL}/types/{id}")

    return jsonify(response.json()), response.status_code


@app.route("/devices", methods=["GET", "POST"])
@token_required
def devices():
    admin_error = require_admin_for_write("crear dispositivos")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{DEVICES_URL}/")
    else:
        response = requests.post(f"{DEVICES_URL}/", json=request.json)

    return jsonify(response.json()), response.status_code


@app.route("/devices/<int:id>", methods=["GET", "PUT", "DELETE"])
@token_required
def device_detail(id):
    admin_error = require_admin_for_write("modificar dispositivos")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{DEVICES_URL}/{id}")
    elif request.method == "PUT":
        response = requests.put(f"{DEVICES_URL}/{id}", json=request.json)
    else:
        response = requests.delete(f"{DEVICES_URL}/{id}")

    return jsonify(response.json()), response.status_code


# Metrics

@app.route("/metrics/types", methods=["GET", "POST"])
@token_required
def metric_types():
    admin_error = require_admin_for_write("crear tipos de métricas")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{METRICS_URL}/types")
    else:
        response = requests.post(f"{METRICS_URL}/types", json=request.json)

    return jsonify(response.json()), response.status_code


@app.route("/metrics/types/<int:id>", methods=["GET", "PUT", "DELETE"])
@token_required
def metric_type_detail(id):
    admin_error = require_admin_for_write("modificar tipos de métricas")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{METRICS_URL}/types/{id}")
    elif request.method == "PUT":
        response = requests.put(f"{METRICS_URL}/types/{id}", json=request.json)
    else:
        response = requests.delete(f"{METRICS_URL}/types/{id}")

    return jsonify(response.json()), response.status_code


@app.route("/metrics", methods=["GET", "POST"])
@token_required
def metrics():
    admin_error = require_admin_for_write("crear métricas")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{METRICS_URL}/")
    else:
        response = requests.post(f"{METRICS_URL}/", json=request.json)

    return jsonify(response.json()), response.status_code


@app.route("/metrics/<int:id>", methods=["GET", "PUT", "DELETE"])
@token_required
def metric_detail(id):
    admin_error = require_admin_for_write("modificar métricas")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{METRICS_URL}/{id}")
    elif request.method == "PUT":
        response = requests.put(f"{METRICS_URL}/{id}", json=request.json)
    else:
        response = requests.delete(f"{METRICS_URL}/{id}")

    return jsonify(response.json()), response.status_code


@app.route("/metrics/device/<int:device_id>", methods=["GET"])
@token_required
def metrics_by_device(device_id):
    response = requests.get(f"{METRICS_URL}/device/{device_id}")
    return jsonify(response.json()), response.status_code


# Alerts

@app.route("/alerts/severities", methods=["GET", "POST"])
@token_required
def alert_severities():
    admin_error = require_admin_for_write("crear severidades de alertas")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{ALERTS_URL}/severities")
    else:
        response = requests.post(f"{ALERTS_URL}/severities", json=request.json)

    return jsonify(response.json()), response.status_code


@app.route("/alerts/severities/<int:id>", methods=["GET", "PUT", "DELETE"])
@token_required
def alert_severity_detail(id):
    admin_error = require_admin_for_write("modificar severidades de alertas")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{ALERTS_URL}/severities/{id}")
    elif request.method == "PUT":
        response = requests.put(f"{ALERTS_URL}/severities/{id}", json=request.json)
    else:
        response = requests.delete(f"{ALERTS_URL}/severities/{id}")

    return jsonify(response.json()), response.status_code


@app.route("/alerts/statuses", methods=["GET", "POST"])
@token_required
def alert_statuses():
    admin_error = require_admin_for_write("crear estados de alertas")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{ALERTS_URL}/statuses")
    else:
        response = requests.post(f"{ALERTS_URL}/statuses", json=request.json)

    return jsonify(response.json()), response.status_code


@app.route("/alerts/statuses/<int:id>", methods=["GET", "PUT", "DELETE"])
@token_required
def alert_status_detail(id):
    admin_error = require_admin_for_write("modificar estados de alertas")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{ALERTS_URL}/statuses/{id}")
    elif request.method == "PUT":
        response = requests.put(f"{ALERTS_URL}/statuses/{id}", json=request.json)
    else:
        response = requests.delete(f"{ALERTS_URL}/statuses/{id}")

    return jsonify(response.json()), response.status_code


@app.route("/alerts", methods=["GET", "POST"])
@token_required
def alerts():
    admin_error = require_admin_for_write("crear alertas")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{ALERTS_URL}/")
    else:
        response = requests.post(f"{ALERTS_URL}/", json=request.json)

    return jsonify(response.json()), response.status_code


@app.route("/alerts/<int:id>", methods=["GET", "PUT", "DELETE"])
@token_required
def alert_detail(id):
    admin_error = require_admin_for_write("modificar alertas")
    if admin_error:
        return admin_error

    if request.method == "GET":
        response = requests.get(f"{ALERTS_URL}/{id}")
    elif request.method == "PUT":
        response = requests.put(f"{ALERTS_URL}/{id}", json=request.json)
    else:
        response = requests.delete(f"{ALERTS_URL}/{id}")

    return jsonify(response.json()), response.status_code


# Ruticas Val Prueba

@app.route("/")
def home():
    return jsonify({
        "message": "API Gateway funcionando correctamente",
        "auth": "/auth/login",
        "protected_routes": [
            "/locations",
            "/devices",
            "/metrics",
            "/alerts"
        ],
        "roles": {
            "admin": "user_id = 1",
            "user": "user_id diferente de 1"
        }
    })


@app.route("/dashboard")
def dashboard():
    return jsonify({
        "message": "Dashboard endpoint funcionando"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)