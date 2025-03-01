from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt, get_jwt_identity, jwt_required

chat_bp = Blueprint("chat", __name__)


@chat_bp.route("/chat", methods=["GET"])
@jwt_required()
def chat():
    user_id = get_jwt_identity()
    claims = get_jwt()

    return (
        jsonify(
            {
                "message": f"Welcome {claims.get('email', 'Unknown User')}!",
                "user_id": user_id,
            }
        ),
        200,
    )
