from flask import Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required

from backend.chat.controllers import (
    chat_history_controller,
    chat_regenerate_controller,
    chat_stream_controller,
    get_chat_history_by_session_controller,
    like_message_controller,
)

chat_bp = Blueprint("chat", __name__)


@chat_bp.route("/chat/stream", methods=["POST"])
@jwt_required()
def chat_stream():
    return chat_stream_controller()


@chat_bp.route("/chat/regenerate", methods=["POST"])
@jwt_required()
def chat_regenerate():
    return chat_regenerate_controller()


@chat_bp.route("/chat/like", methods=["POST"])
@jwt_required()
def like_message():
    return like_message_controller()


@chat_bp.route("/chat/history", methods=["GET"])
@jwt_required()
def get_chat_history():
    return chat_history_controller()


@chat_bp.route("/chat/history/<session_id>", methods=["GET"])
@jwt_required()
def get_chat_history_by_session(session_id):
    return get_chat_history_by_session_controller(session_id)
