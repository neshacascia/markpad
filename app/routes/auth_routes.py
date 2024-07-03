from flask import Blueprint
from ..controllers.auth_controller import post_signup, post_login

auth_bp = Blueprint('auth_bp', __name__)

auth_bp.route('/api/auth/signup', methods=['POST'])(post_signup)
auth_bp.route('/api/auth/login', methods=['POST'])(post_login)