from flask import Blueprint
from .controllers import login_controller, register_controller

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    return register_controller()


@auth_bp.route("/login", methods=["POST"])
def login():
    return login_controller()
