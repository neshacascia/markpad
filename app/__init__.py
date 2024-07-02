from flask import Flask, send_from_directory
from app.config import Config
from app.extensions import db
from app.routes import register_routes
import os

def create_app():
    app = Flask(__name__, static_folder='../client/dist')
    app.config.from_object(Config)

    db.init_app(app)

    with app.app_context():
        db.create_all()
        register_routes(app)

    # serve the React static files
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app