from flask import Blueprint, jsonify, abort
from app.models.user import User

user_bp = Blueprint("user", __name__)

@user_bp.route("/user/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(404, description="Usuario no encontrado")

    return jsonify({
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "lastname": user.lastname,
        "nickname": user.nickname,
        "pic_profile": user.pic_profile
    })
