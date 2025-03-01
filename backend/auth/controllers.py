from http.client import UNAUTHORIZED
from flask import request, jsonify
import uuid

from flask_jwt_extended import create_access_token

from .. import db
from .models import User


def register_controller():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already registered"}), 400

    id = str(uuid.uuid4())
    new_user = User(
        id=id,
        email=email,
        name=name,
    )
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201


def get_email_controller(email):
    response = User.query.get(email).toDict()
    return jsonify(response), 201


def login_controller():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password=password):
        access_token = create_access_token(
            identity=str(user.id),
            additional_claims={"id": user.id, "email": user.email, "name": user.name},
        )
        return (
            jsonify(
                {
                    "access_token": access_token,
                    "email": user.email,
                    "id": user.id,
                    "name": user.name,
                }
            ),
            200,
        )

    raise UNAUTHORIZED("Invalid credentials")
