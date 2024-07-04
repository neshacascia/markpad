from flask import request, jsonify, make_response
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies
from ..models.user import User
from ..extensions import db

def post_signup():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'msg': 'Account with that email already exists.'}), 409
    
    new_user = User(
        email=data['email']
    )
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)
    response = make_response(jsonify({'msg': 'Account created successfully.'}), 201)
    set_access_cookies(response, access_token)
    
    return response

def post_login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        response = make_response(jsonify({'msg': 'Success! You are logged in.'}), 200)
        set_access_cookies(response, access_token)

        return response
    return jsonify({'msg': 'Invalid email or password. Please try again.'}), 401

def logout():
    response = make_response(jsonify({'msg': 'You are successfully logged out.'}), 200)
    unset_jwt_cookies(response)

    return response
