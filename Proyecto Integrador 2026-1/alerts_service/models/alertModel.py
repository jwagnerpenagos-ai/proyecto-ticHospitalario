from extensions import db
import datetime

class AlertSeverity(db.Model):
    __tablename__ = "alert_severities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(200), nullable=True)

    alerts = db.relationship("Alert", backref="severity", lazy=True)


class AlertStatus(db.Model):
    __tablename__ = "alert_statuses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.String(200), nullable=True)

    alerts = db.relationship("Alert", backref="alert_status", lazy=True)


class Alert(db.Model):
    __tablename__ = "alerts"

    id = db.Column(db.Integer, primary_key=True)
    device_id = db.Column(db.Integer, nullable=False)
    severity_id = db.Column(db.Integer, db.ForeignKey("alert_severities.id"), nullable=False)
    alert_status_id = db.Column(db.Integer, db.ForeignKey("alert_statuses.id"), nullable=False)
    message = db.Column(db.String(300), nullable=False)
    triggered_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    resolved_at = db.Column(db.DateTime, nullable=True)