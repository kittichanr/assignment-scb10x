import re
from sqlalchemy import inspect
from datetime import datetime
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash, check_password_hash

from .. import db


class User(db.Model):
    id = db.Column(db.String(50), primary_key=True, nullable=False, unique=True)
    created = db.Column(db.DateTime(timezone=True), default=datetime.now)
    updated = db.Column(
        db.DateTime(timezone=True), default=datetime.now, onupdate=datetime.now
    )

    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(256), nullable=False)

    @validates("email")
    def validate_email(self, key, email):
        if not re.match(r"^[\w\.-]+@[\w\.-]+\.\w+$", email):
            raise ValueError("The email is not valid. Please check it.")
        return email

    @validates("name")
    def empty_string_to_null(self, key, value):
        if isinstance(value, str) and value == "":
            return None
        else:
            return value

    def toDict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

    def __repr__(self):
        return "<%r>" % self.email

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
