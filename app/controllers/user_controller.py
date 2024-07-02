from flask import request, jsonify
from app.models.user import User
from app.extensions import db

def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

def create_user():
    data = request.get_json()
    new_user = User(first_name=data['firstName'], last_name=data['lastName'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201