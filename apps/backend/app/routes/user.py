from flask import Blueprint, jsonify, abort
from app.models.user import User
from flask import Blueprint, request, jsonify, abort
from app.extensions import db

user_bp = Blueprint("user", __name__)

@user_bp.route("/user/<int:user_id>", methods=["GET"])
def get_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"msg": "No se encontro el Usuario", "errors": {"user": "No se encontro el Usuario"}, "success": False}), 401

        return jsonify({
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "lastname": user.lastname,
            "nickname": user.nickname,
            "pic_profile": user.pic_profile
        })
    except Exception as e:
        print(f"El error ha ocurrido: {e}")
        return jsonify({"msg": "Se produjo un error fatal", "errors": {}, "success": False}), 500

@user_bp.route("/user/", methods=["GET"])
def get_users():
    try:
        users = User.query.all()
        if not users:
            return jsonify({"msg": "No se encontraron usuarios", "errors": {"usuarios": "No se encontraron Usuarios"}, "success": False}), 404

        return jsonify({
            "msg": "Se encontraron los usuarios",
            "success": True,
            "users": [user.formatSelf() for user in users]
        })
    except Exception as e:
        print(f"El error ha ocurrido: {e}")
        return jsonify({"msg": "Se produjo un error fatal", "errors": {}, "success": False}), 500


@user_bp.route("/user/Update", methods=["PUT"])
def update_user():
    try:
        errors = []
        data = request.get_json()
        user = User.query.get(data["id"])

        if not user:
            errors.append("Usuario no existe")

        if errors:
            return jsonify({"msg": "Fallo la Actualización", "errors": errors, "success": False}), 400

        user.update(data["name"], data["lastname"], data["nickname"], data["password"])
        db.session.commit()

        return jsonify({"msg": "Usuario actualizado correctamente", "success": True, "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "lastname": user.lastname,
            "nickname": user.nickname,
            "pic_profile": user.pic_profile
        }}), 200
    except Exception as e:
        print(f"El error ha ocurrido: {e}")
        return jsonify({"msg": "Se produjo un error fatal", "errors": {}, "success": False}), 500

