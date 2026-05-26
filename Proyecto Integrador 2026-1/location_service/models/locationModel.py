from extensions import db

class Location(db.Model):
    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    building = db.Column(db.String(100), nullable=True)
    room = db.Column(db.String(20), nullable=True)
    description = db.Column(db.String(200), nullable=True)