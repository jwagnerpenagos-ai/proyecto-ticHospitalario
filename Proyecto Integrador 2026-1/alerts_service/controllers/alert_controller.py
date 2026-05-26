from models.alertModel import Alert, AlertSeverity, AlertStatus
from extensions import db
import datetime

def serialize_alert_severity(severity):
    return {
        "id": severity.id,
        "name": severity.name,
        "level": severity.level,
        "description": severity.description
    }

def serialize_alert_status(alert_status):
    return {
        "id": alert_status.id,
        "name": alert_status.name,
        "description": alert_status.description
    }

def serialize_alert(alert):
    return {
        "id": alert.id,
        "device_id": alert.device_id,
        "severity_id": alert.severity_id,
        "alert_status_id": alert.alert_status_id,
        "message": alert.message,
        "triggered_at": alert.triggered_at.isoformat(),
        "resolved_at": alert.resolved_at.isoformat() if alert.resolved_at else None
    }


# Alert Severities

def get_all_alert_severities():
    severities = AlertSeverity.query.order_by(AlertSeverity.level.asc()).all()
    return [serialize_alert_severity(s) for s in severities], 200

def get_alert_severity_by_id(severity_id):
    severity = AlertSeverity.query.get(severity_id)

    if not severity:
        return {"message": "Severidad no encontrada"}, 404

    return serialize_alert_severity(severity), 200

def create_alert_severity(data):
    if AlertSeverity.query.filter_by(name=data['name']).first():
        return {"error": "La severidad ya existe"}, 400

    new_severity = AlertSeverity(
        name=data['name'],
        level=data['level'],
        description=data.get('description')
    )
    db.session.add(new_severity)
    db.session.commit()
    return {"message": "Severidad creada exitosamente", "severity": serialize_alert_severity(new_severity)}, 200

def update_alert_severity(severity_id, data):
    severity = AlertSeverity.query.get(severity_id)

    if not severity:
        return {"message": "Severidad no encontrada"}, 404

    existing = AlertSeverity.query.filter(
        AlertSeverity.name == data['name'],
        AlertSeverity.id != severity_id
    ).first()

    if existing:
        return {"error": "Ya existe una severidad con ese nombre"}, 400

    severity.name = data['name']
    severity.level = data['level']
    severity.description = data.get('description')
    db.session.commit()
    return {"message": "Severidad actualizada exitosamente", "severity": serialize_alert_severity(severity)}, 200

def delete_alert_severity(severity_id):
    severity = AlertSeverity.query.get(severity_id)

    if not severity:
        return {"message": "Severidad no encontrada"}, 404

    db.session.delete(severity)
    db.session.commit()
    return {"message": "Severidad eliminada exitosamente"}, 200


# Alert Status

def get_all_alert_statuses():
    statuses = AlertStatus.query.order_by(AlertStatus.id.asc()).all()
    return [serialize_alert_status(s) for s in statuses], 200

def get_alert_status_by_id(status_id):
    alert_status = AlertStatus.query.get(status_id)

    if not alert_status:
        return {"message": "Estado no encontrado"}, 404

    return serialize_alert_status(alert_status), 200

def create_alert_status(data):
    if AlertStatus.query.filter_by(name=data['name']).first():
        return {"error": "El estado ya existe"}, 400

    new_status = AlertStatus(
        name=data['name'],
        description=data.get('description')
    )
    db.session.add(new_status)
    db.session.commit()
    return {"message": "Estado creado exitosamente", "alert_status": serialize_alert_status(new_status)}, 200

def update_alert_status(status_id, data):
    alert_status = AlertStatus.query.get(status_id)

    if not alert_status:
        return {"message": "Estado no encontrado"}, 404

    existing = AlertStatus.query.filter(
        AlertStatus.name == data['name'],
        AlertStatus.id != status_id
    ).first()

    if existing:
        return {"error": "Ya existe un estado con ese nombre"}, 400

    alert_status.name = data['name']
    alert_status.description = data.get('description')
    db.session.commit()
    return {"message": "Estado actualizado exitosamente", "alert_status": serialize_alert_status(alert_status)}, 200

def delete_alert_status(status_id):
    alert_status = AlertStatus.query.get(status_id)

    if not alert_status:
        return {"message": "Estado no encontrado"}, 404

    db.session.delete(alert_status)
    db.session.commit()
    return {"message": "Estado eliminado exitosamente"}, 200


# Alerts

def get_all_alerts():
    alerts = Alert.query.order_by(Alert.triggered_at.desc()).all()
    return [serialize_alert(a) for a in alerts], 200

def get_alert_by_id(alert_id):
    alert = Alert.query.get(alert_id)

    if not alert:
        return {"message": "Alerta no encontrada"}, 404

    return serialize_alert(alert), 200

def create_alert(data):
    new_alert = Alert(
        device_id=data['device_id'],
        severity_id=data['severity_id'],
        alert_status_id=data['alert_status_id'],
        message=data['message'],
        triggered_at=datetime.datetime.utcnow()
    )
    db.session.add(new_alert)
    db.session.commit()
    return {"message": "Alerta creada exitosamente", "alert": serialize_alert(new_alert)}, 200

def update_alert(alert_id, data):
    alert = Alert.query.get(alert_id)

    if not alert:
        return {"message": "Alerta no encontrada"}, 404

    alert.device_id = data['device_id']
    alert.severity_id = data['severity_id']
    alert.alert_status_id = data['alert_status_id']
    alert.message = data['message']

    status = AlertStatus.query.get(data['alert_status_id'])

    if status and status.name.lower() in ["resolved", "resuelta", "resuelto"]:
        if not alert.resolved_at:
            alert.resolved_at = datetime.datetime.utcnow()
    else:
        alert.resolved_at = None

    db.session.commit()
    return {"message": "Alerta actualizada exitosamente", "alert": serialize_alert(alert)}, 200
def delete_alert(alert_id):
    alert = Alert.query.get(alert_id)

    if not alert:
        return {"message": "Alerta no encontrada"}, 404

    db.session.delete(alert)
    db.session.commit()
    return {"message": "Alerta eliminada exitosamente"}, 200