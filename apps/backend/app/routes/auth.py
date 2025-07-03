from flask import Blueprint, request, jsonify
from app.models.user import User
from app.extensions import db

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    nuevo_usuario = User(
        email=data["email"],
        name=data["name"],
        lastname=data["lastname"],
        nickname=data["nickname"],
        pic_profile=data.get("pic_profile")
    )

    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({"message": "Usuario creado correctamente", "user": {
        "id": nuevo_usuario.id,
        "email": nuevo_usuario.email,
        "name": nuevo_usuario.name,
        "lastname": nuevo_usuario.lastname,
        "nickname": nuevo_usuario.nickname,
        "pic_profile": nuevo_usuario.pic_profile
    }}), 201
