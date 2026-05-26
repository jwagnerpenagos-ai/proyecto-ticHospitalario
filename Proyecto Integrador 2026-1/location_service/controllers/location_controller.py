from models.locationModel import Location
from extensions import db

def serialize_location(location):
    return {
        "id": location.id,
        "name": location.name,
        "building": location.building,
        "room": location.room,
        "description": location.description
    }

def get_all_locations():
    locations = Location.query.order_by(Location.id.asc()).all()
    return [serialize_location(l) for l in locations], 200

def get_location_by_id(location_id):
    location = Location.query.get(location_id)

    if not location:
        return {"message": "Ubicación no encontrada"}, 404

    return serialize_location(location), 200

def create_location(data):
    new_location = Location(
        name=data['name'],
        building=data.get('building'),
        room=data.get('room'),
        description=data.get('description')
    )
    db.session.add(new_location)
    db.session.commit()
    return {"message": "Ubicación creada exitosamente", "location": serialize_location(new_location)}, 200

def update_location(location_id, data):
    location = Location.query.get(location_id)

    if not location:
        return {"message": "Ubicación no encontrada"}, 404

    location.name = data['name']
    location.building = data.get('building')
    location.room = data.get('room')
    location.description = data.get('description')
    db.session.commit()
    return {"message": "Ubicación actualizada exitosamente", "location": serialize_location(location)}, 200

def delete_location(location_id):
    location = Location.query.get(location_id)

    if not location:
        return {"message": "Ubicación no encontrada"}, 404

    db.session.delete(location)
    db.session.commit()
    return {"message": "Ubicación eliminada exitosamente"}, 200