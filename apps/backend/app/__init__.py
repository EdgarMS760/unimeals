from flask import Flask
from app.config import Config
from app.extensions import db
from app.routes.auth import auth_bp
from app.routes.user import user_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensiones
    db.init_app(app)

    # Registrar blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)

    return app
