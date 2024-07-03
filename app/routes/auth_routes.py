from flask import Blueprint
from ..controllers import auth_controller

auth_bp = Blueprint('auth_bp', __name__)

auth_bp.route('/api/auth/signup', methods=['POST'])(auth_controller.post_signup)
auth_bp.route('/api/auth/login', methods=['POST'])(auth_controller.post_login)
auth_bp.route('/api/auth/logout', methods=['GET'])(auth_controller.logout)