from extensions import db
import datetime

class MetricType(db.Model):
    __tablename__ = "metric_types"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    unit = db.Column(db.String(30), nullable=True)
    description = db.Column(db.String(200), nullable=True)

    metrics = db.relationship("Metric", backref="metric_type", lazy=True)


class Metric(db.Model):
    __tablename__ = "metrics"

    id = db.Column(db.Integer, primary_key=True)
    device_id = db.Column(db.Integer, nullable=False)
    metric_type_id = db.Column(db.Integer, db.ForeignKey("metric_types.id"), nullable=False)
    value = db.Column(db.Float, nullable=False)
    recorded_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)