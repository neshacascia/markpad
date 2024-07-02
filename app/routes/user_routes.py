from flask import Blueprint
from app.controllers import user_controller

user_bp = Blueprint('users', __name__)

@user_bp.route('/api/users', methods=['GET'])
def get_users():
    return user_controller.get_users()

@user_bp.route('/api/users', methods=['POST'])
def create_user():
    return user_controller.create_user()