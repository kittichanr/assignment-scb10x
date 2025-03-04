from datetime import datetime
import inspect
from .. import db


class ChatSession(db.Model):
    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey("user.id"), nullable=False)
    created = db.Column(db.DateTime(timezone=True), default=datetime.now)
    updated = db.Column(
        db.DateTime(timezone=True), default=datetime.now, onupdate=datetime.now
    )


class Message(db.Model):
    id = db.Column(db.String, primary_key=True)
    session_id = db.Column(db.String, db.ForeignKey("chat_session.id"), nullable=False)
    role = db.Column(db.Enum("user", "assistant", name="role_enum"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    response_time = db.Column(db.Float)
    token_count = db.Column(db.Integer)
    created = db.Column(db.DateTime(timezone=True), default=datetime.now)
    updated = db.Column(
        db.DateTime(timezone=True), default=datetime.now, onupdate=datetime.now
    )
    like_status = db.Column(
        db.Enum("like", "dislike", "none", name="like_enum"), default="none"
    )

    def toDict(self):
        return {
            "id": self.id,
            "session_id": self.session_id,
            "role": self.role,
            "content": self.content,
            "token_count": self.token_count,
            "response_time": self.response_time,
            "content": self.content,
            "created": self.created.isoformat(),
            "updated": self.updated.isoformat(),
            "like_status": self.like_status,
        }
