from flask import Blueprint
from app.routes.user_routes import user_bp
from app.routes.auth_routes import auth_bp
from app.routes.document_routes import document_bp


def register_routes(app):
    app.register_blueprint(user_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(document_bp)