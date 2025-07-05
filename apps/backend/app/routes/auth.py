from flask import Blueprint, request, jsonify, abort
from app.models.user import User
from app.extensions import db

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        errors = {}

        if User.query.filter(User.email == data["email"]).first():
            errors["email"] = "Email ya fue registrada"

        if errors:
            return jsonify({"msg": "Ocurrio un error al crear el Usuario", "errors": errors, "success": False}), 401

        nuevo_usuario = User(
            email=data["email"],
            name=data["name"],
            lastname=data["lastname"],
            nickname=data["nickname"],
            pic_profile=data.get("pic_profile"),
            password=data.get("password")
        )
        db.session.add(nuevo_usuario)
        db.session.commit()

        return jsonify({"msg": "Se registro correctamente", "success": True, "user": {
            "id": nuevo_usuario.id,
            "email": nuevo_usuario.email,
            "name": nuevo_usuario.name,
            "lastname": nuevo_usuario.lastname,
            "nickname": nuevo_usuario.nickname,
            "pic_profile": nuevo_usuario.pic_profile
        }}), 201
    except Exception as e:
        print(f"El error ha ocurrido: {e}")
        return jsonify({"msg": "Se produjo un error fatal", "errors": {}, "success": False}), 500


@auth_bp.route("/LogIn", methods=["POST"])
def log_in():
    try:
        data = request.get_json()
        errors = {}
        user = User.query.filter(User.email == data["email"]).first()

        if not user:
            errors["email"] = "Usuario no existe"
        else:
            if not user.check_password(data["password"]):
                errors["password"] = "Credenciales incorrectas"

        if errors:
            return jsonify({"msg": "Inicio de Sesión Fallido", "errors": errors, "success": False}), 401

        return jsonify({"msg": "Se inicio sesión correctamente", "success": True, "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "lastname": user.lastname,
            "nickname": user.nickname,
            "pic_profile": user.pic_profile
        }}), 201
    except Exception as e:
        print(f"El error ha ocurrido: {e}")
        return jsonify({"msg": "Se produjo un error fatal", "errors": {}, "success": False}), 500





