from flask import Blueprint
from ..controllers import auth_controller

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/api/auth/signup', methods=['POST'])
def post_signup():
    return auth_controller.post_signup

@auth_bp.route('/api/auth/login', methods=['POST'])
def post_login():
    return auth_controller.post_login

@auth_bp.route('/api/auth/logout', methods=['GET'])
def logout():
    return auth_controller.logout

