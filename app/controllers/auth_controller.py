from flask import request, jsonify
from flask_jwt_extended import create_access_token
from ..models.user import User
from ..extensions import db

def post_signup():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'msg': 'Account with that already exists.'}), 409
    
    new_user = User(
        email=data['email']
    )
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(new_user.to_dict()), 201

def post_login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token, 'msg': 'Success! You are logged in.'}), 200
    return jsonify({'msg': 'Invalid credentials'}), 401