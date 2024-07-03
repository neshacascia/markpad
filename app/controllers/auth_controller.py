from flask import request, jsonify
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
