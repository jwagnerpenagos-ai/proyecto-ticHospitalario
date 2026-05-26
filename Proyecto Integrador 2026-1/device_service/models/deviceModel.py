from extensions import db

class DeviceStatus(db.Model):
    __tablename__ = "device_statuses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.String(200), nullable=True)

    devices = db.relationship("Device", backref="device_status", lazy=True)


class DeviceType(db.Model):
    __tablename__ = "device_types"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.String(200), nullable=True)

    devices = db.relationship("Device", backref="device_type", lazy=True)


class Device(db.Model):
    __tablename__ = "devices"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    ip_address = db.Column(db.String(45), unique=True, nullable=True)
    device_type_id = db.Column(db.Integer, db.ForeignKey("device_types.id"), nullable=True)
    device_status_id = db.Column(db.Integer, db.ForeignKey("device_statuses.id"), nullable=True)
    location_id = db.Column(db.Integer, nullable=True)