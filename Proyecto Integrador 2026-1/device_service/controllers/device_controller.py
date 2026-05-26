from models.deviceModel import Device, DeviceType, DeviceStatus
from extensions import db


def serialize_device_status(device_status):
    return {
        "id": device_status.id,
        "name": device_status.name,
        "description": device_status.description
    }

def serialize_device_type(device_type):
    return {
        "id": device_type.id,
        "name": device_type.name,
        "description": device_type.description
    }

def serialize_device(device):
    return {
        "id": device.id,
        "name": device.name,
        "ip_address": device.ip_address,
        "device_type_id": device.device_type_id,
        "device_status_id": device.device_status_id,
        "location_id": device.location_id
    }


# Device Status

def get_all_device_statuses():
    statuses = DeviceStatus.query.order_by(DeviceStatus.id.asc()).all()
    return [serialize_device_status(s) for s in statuses], 200

def get_device_status_by_id(status_id):
    device_status = DeviceStatus.query.get(status_id)

    if not device_status:
        return {"message": "Estado no encontrado"}, 404

    return serialize_device_status(device_status), 200

def create_device_status(data):
    if DeviceStatus.query.filter_by(name=data['name']).first():
        return {"error": "El estado ya existe"}, 400

    new_status = DeviceStatus(
        name=data['name'],
        description=data.get('description')
    )
    db.session.add(new_status)
    db.session.commit()
    return {"message": "Estado creado exitosamente", "device_status": serialize_device_status(new_status)}, 200

def update_device_status(status_id, data):
    device_status = DeviceStatus.query.get(status_id)

    if not device_status:
        return {"message": "Estado no encontrado"}, 404

    existing = DeviceStatus.query.filter(
        DeviceStatus.name == data['name'],
        DeviceStatus.id != status_id
    ).first()

    if existing:
        return {"error": "Ya existe un estado con ese nombre"}, 400

    device_status.name = data['name']
    device_status.description = data.get('description')
    db.session.commit()
    return {"message": "Estado actualizado exitosamente", "device_status": serialize_device_status(device_status)}, 200

def delete_device_status(status_id):
    device_status = DeviceStatus.query.get(status_id)

    if not device_status:
        return {"message": "Estado no encontrado"}, 404

    db.session.delete(device_status)
    db.session.commit()
    return {"message": "Estado eliminado exitosamente"}, 200


# Device Types

def get_all_device_types():
    types = DeviceType.query.order_by(DeviceType.id.asc()).all()
    return [serialize_device_type(t) for t in types], 200

def get_device_type_by_id(type_id):
    device_type = DeviceType.query.get(type_id)

    if not device_type:
        return {"message": "Tipo de dispositivo no encontrado"}, 404

    return serialize_device_type(device_type), 200

def create_device_type(data):
    if DeviceType.query.filter_by(name=data['name']).first():
        return {"error": "El tipo de dispositivo ya existe"}, 400

    new_type = DeviceType(
        name=data['name'],
        description=data.get('description')
    )
    db.session.add(new_type)
    db.session.commit()
    return {"message": "Tipo de dispositivo creado exitosamente", "device_type": serialize_device_type(new_type)}, 200

def update_device_type(type_id, data):
    device_type = DeviceType.query.get(type_id)

    if not device_type:
        return {"message": "Tipo de dispositivo no encontrado"}, 404

    existing = DeviceType.query.filter(
        DeviceType.name == data['name'],
        DeviceType.id != type_id
    ).first()

    if existing:
        return {"error": "Ya existe un tipo de dispositivo con ese nombre"}, 400

    device_type.name = data['name']
    device_type.description = data.get('description')
    db.session.commit()
    return {"message": "Tipo de dispositivo actualizado exitosamente", "device_type": serialize_device_type(device_type)}, 200

def delete_device_type(type_id):
    device_type = DeviceType.query.get(type_id)

    if not device_type:
        return {"message": "Tipo de dispositivo no encontrado"}, 404

    db.session.delete(device_type)
    db.session.commit()
    return {"message": "Tipo de dispositivo eliminado exitosamente"}, 200


# Devices

def get_all_devices():
    devices = Device.query.order_by(Device.id.asc()).all()
    return [serialize_device(d) for d in devices], 200

def get_device_by_id(device_id):
    device = Device.query.get(device_id)

    if not device:
        return {"message": "Dispositivo no encontrado"}, 404

    return serialize_device(device), 200

def create_device(data):
    if Device.query.filter_by(ip_address=data.get('ip_address')).first():
        return {"error": "La dirección IP ya está en uso"}, 400

    new_device = Device(
        name=data['name'],
        ip_address=data.get('ip_address'),
        device_type_id=data.get('device_type_id'),
        device_status_id=data.get('device_status_id'),
        location_id=data.get('location_id')
    )
    db.session.add(new_device)
    db.session.commit()
    return {"message": "Dispositivo creado exitosamente", "device": serialize_device(new_device)}, 200

def update_device(device_id, data):
    device = Device.query.get(device_id)

    if not device:
        return {"message": "Dispositivo no encontrado"}, 404

    existing = Device.query.filter(
        Device.ip_address == data.get('ip_address'),
        Device.id != device_id
    ).first()

    if existing:
        return {"error": "La dirección IP ya está en uso por otro dispositivo"}, 400

    device.name = data['name']
    device.ip_address = data.get('ip_address')
    device.device_type_id = data.get('device_type_id')
    device.device_status_id = data.get('device_status_id')
    device.location_id = data.get('location_id')
    db.session.commit()
    return {"message": "Dispositivo actualizado exitosamente", "device": serialize_device(device)}, 200

def delete_device(device_id):
    device = Device.query.get(device_id)

    if not device:
        return {"message": "Dispositivo no encontrado"}, 404

    db.session.delete(device)
    db.session.commit()
    return {"message": "Dispositivo eliminado exitosamente"}, 200