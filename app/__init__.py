from flask import Flask, send_from_directory
from flask_cors import CORS
from app.config import Config
from app.extensions import db, bcrypt, jwt
from app.routes import register_routes
import os
from datetime import datetime
from datetime import timedelta
from datetime import timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, set_access_cookies


def create_app():
    app = Flask(__name__, static_folder='../client/dist')
    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    with app.app_context():
        db.create_all()
        register_routes(app)
    
    # enable CORS with credentials
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

    # refresh JWT tokens if they are about to expire
    @app.after_request
    def refresh_expiring_jwts(response):
        try:
            jwt_data = get_jwt()
            exp_timestamp = jwt_data["exp"] if "exp" in jwt_data else None
            now = datetime.now(timezone.utc)
            target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token)
            return response
        except (RuntimeError, KeyError):
            return response

    # serve the React static files
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app