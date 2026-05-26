from models.interestedModel import Interested, Role
from extensions import db

def serialize_role(role):
    return {
        "id": role.id,
        "name": role.name,
        "description": role.description
    }

def serialize_interested(interested):
    return {
        "id": interested.id,
        "full_name": interested.full_name,
        "email": interested.email,
        "role_id": interested.role_id,
        "auth_user_id": interested.auth_user_id
    }


# Roles

def get_all_roles():
    roles = Role.query.order_by(Role.id.asc()).all()
    return [serialize_role(r) for r in roles], 200

def get_role_by_id(role_id):
    role = Role.query.get(role_id)

    if not role:
        return {"message": "Rol no encontrado"}, 404

    return serialize_role(role), 200

def create_role(data):
    if Role.query.filter_by(name=data['name']).first():
        return {"error": "El rol ya existe"}, 400

    new_role = Role(
        name=data['name'],
        description=data.get('description')
    )
    db.session.add(new_role)
    db.session.commit()
    return {"message": "Rol creado exitosamente", "role": serialize_role(new_role)}, 200

def update_role(role_id, data):
    role = Role.query.get(role_id)

    if not role:
        return {"message": "Rol no encontrado"}, 404

    existing = Role.query.filter(
        Role.name == data['name'],
        Role.id != role_id
    ).first()

    if existing:
        return {"error": "Ya existe un rol con ese nombre"}, 400

    role.name = data['name']
    role.description = data.get('description')
    db.session.commit()
    return {"message": "Rol actualizado exitosamente", "role": serialize_role(role)}, 200

def delete_role(role_id):
    role = Role.query.get(role_id)

    if not role:
        return {"message": "Rol no encontrado"}, 404

    db.session.delete(role)
    db.session.commit()
    return {"message": "Rol eliminado exitosamente"}, 200


# Interested

def get_all_interested():
    interested_list = Interested.query.order_by(Interested.id.asc()).all()
    return [serialize_interested(i) for i in interested_list], 200

def get_interested_by_id(interested_id):
    interested = Interested.query.get(interested_id)

    if not interested:
        return {"message": "Usuario no encontrado"}, 404

    return serialize_interested(interested), 200

def create_interested(data):
    if Interested.query.filter_by(email=data['email']).first():
        return {"error": "El email ya está en uso"}, 400

    if Interested.query.filter_by(auth_user_id=data.get('auth_user_id')).first():
        return {"error": "El auth_user_id ya está vinculado a otro usuario"}, 400

    new_interested = Interested(
        full_name=data['full_name'],
        email=data['email'],
        role_id=data.get('role_id'),
        auth_user_id=data.get('auth_user_id')
    )
    db.session.add(new_interested)
    db.session.commit()
    return {"message": "Usuario creado exitosamente", "interested": serialize_interested(new_interested)}, 200

def update_interested(interested_id, data):
    interested = Interested.query.get(interested_id)

    if not interested:
        return {"message": "Usuario no encontrado"}, 404

    existing_email = Interested.query.filter(
        Interested.email == data['email'],
        Interested.id != interested_id
    ).first()

    if existing_email:
        return {"error": "El email ya está en uso por otro usuario"}, 400

    existing_auth = Interested.query.filter(
        Interested.auth_user_id == data.get('auth_user_id'),
        Interested.id != interested_id
    ).first()

    if existing_auth:
        return {"error": "El auth_user_id ya está vinculado a otro usuario"}, 400

    interested.full_name = data['full_name']
    interested.email = data['email']
    interested.role_id = data.get('role_id')
    interested.auth_user_id = data.get('auth_user_id')
    db.session.commit()
    return {"message": "Usuario actualizado exitosamente", "interested": serialize_interested(interested)}, 200

def delete_interested(interested_id):
    interested = Interested.query.get(interested_id)

    if not interested:
        return {"message": "Usuario no encontrado"}, 404

    db.session.delete(interested)
    db.session.commit()
    return {"message": "Usuario eliminado exitosamente"}, 200