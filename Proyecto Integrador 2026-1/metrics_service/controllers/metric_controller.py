from models.metricModel import Metric, MetricType
from extensions import db
import datetime

def serialize_metric_type(metric_type):
    return {
        "id": metric_type.id,
        "name": metric_type.name,
        "unit": metric_type.unit,
        "description": metric_type.description
    }

def serialize_metric(metric):
    return {
        "id": metric.id,
        "device_id": metric.device_id,
        "metric_type_id": metric.metric_type_id,
        "value": metric.value,
        "recorded_at": metric.recorded_at.isoformat()
    }


# Metric Types

def get_all_metric_types():
    types = MetricType.query.order_by(MetricType.id.asc()).all()
    return [serialize_metric_type(t) for t in types], 200

def get_metric_type_by_id(type_id):
    metric_type = MetricType.query.get(type_id)

    if not metric_type:
        return {"message": "Tipo de métrica no encontrado"}, 404

    return serialize_metric_type(metric_type), 200

def create_metric_type(data):
    if MetricType.query.filter_by(name=data['name']).first():
        return {"error": "El tipo de métrica ya existe"}, 400

    new_type = MetricType(
        name=data['name'],
        unit=data.get('unit'),
        description=data.get('description')
    )
    db.session.add(new_type)
    db.session.commit()
    return {"message": "Tipo de métrica creado exitosamente", "metric_type": serialize_metric_type(new_type)}, 200

def update_metric_type(type_id, data):
    metric_type = MetricType.query.get(type_id)

    if not metric_type:
        return {"message": "Tipo de métrica no encontrado"}, 404

    existing = MetricType.query.filter(
        MetricType.name == data['name'],
        MetricType.id != type_id
    ).first()

    if existing:
        return {"error": "Ya existe un tipo de métrica con ese nombre"}, 400

    metric_type.name = data['name']
    metric_type.unit = data.get('unit')
    metric_type.description = data.get('description')
    db.session.commit()
    return {"message": "Tipo de métrica actualizado exitosamente", "metric_type": serialize_metric_type(metric_type)}, 200

def delete_metric_type(type_id):
    metric_type = MetricType.query.get(type_id)

    if not metric_type:
        return {"message": "Tipo de métrica no encontrado"}, 404

    db.session.delete(metric_type)
    db.session.commit()
    return {"message": "Tipo de métrica eliminado exitosamente"}, 200


# Metrics

def get_all_metrics():
    metrics = Metric.query.order_by(Metric.recorded_at.desc()).all()
    return [serialize_metric(m) for m in metrics], 200

def get_metric_by_id(metric_id):
    metric = Metric.query.get(metric_id)

    if not metric:
        return {"message": "Métrica no encontrada"}, 404

    return serialize_metric(metric), 200

def get_metrics_by_device(device_id):
    metrics = Metric.query.filter_by(device_id=device_id).order_by(Metric.recorded_at.desc()).all()
    return [serialize_metric(m) for m in metrics], 200

def create_metric(data):
    new_metric = Metric(
        device_id=data['device_id'],
        metric_type_id=data['metric_type_id'],
        value=data['value'],
        recorded_at=datetime.datetime.utcnow()
    )
    db.session.add(new_metric)
    db.session.commit()
    return {"message": "Métrica registrada exitosamente", "metric": serialize_metric(new_metric)}, 200

def update_metric(metric_id, data):
    metric = Metric.query.get(metric_id)

    if not metric:
        return {"message": "Métrica no encontrada"}, 404

    metric.device_id = data['device_id']
    metric.metric_type_id = data['metric_type_id']
    metric.value = data['value']
    db.session.commit()
    return {"message": "Métrica actualizada exitosamente", "metric": serialize_metric(metric)}, 200

def delete_metric(metric_id):
    metric = Metric.query.get(metric_id)

    if not metric:
        return {"message": "Métrica no encontrada"}, 404

    db.session.delete(metric)
    db.session.commit()
    return {"message": "Métrica eliminada exitosamente"}, 200