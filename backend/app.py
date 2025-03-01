import os

from flask_cors import CORS

from . import create_app
from .auth.urls import auth_bp
from .chat.urls import chat_bp


app = create_app(os.getenv("CONFIG_MODE"))

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route("/")
def health():
    return "Health Check!"


app.register_blueprint(auth_bp)
app.register_blueprint(chat_bp)

if __name__ == "__main__":
    app.run()
