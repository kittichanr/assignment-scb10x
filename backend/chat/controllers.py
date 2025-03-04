from datetime import datetime
import os
import time
from flask_jwt_extended import get_jwt_identity
from flask import Response, json, request, jsonify, stream_with_context
import uuid
from flask import current_app

from openai import OpenAI

from backend.chat.models import ChatSession, Message

from .. import db, app

client = OpenAI(
    api_key=os.getenv("TYPHOON_API_KEY"), base_url="https://api.opentyphoon.ai/v1"
)


def chat_stream_controller():
    start_time = time.time()

    user_id = get_jwt_identity()

    data = request.get_json()
    user_message = data.get("message")
    session_id = data.get("sessionId")
    model = data.get("model")
    max_tokens = data.get("maxTokens")
    temperature = data.get("temperature")
    top_p = data.get("topP")
    repetition_penalty = data.get("repetitionPenalty")

    print(model, max_tokens, temperature, top_p, repetition_penalty)

    session = db.session.get(ChatSession, session_id)
    if session is None:
        session = ChatSession(id=session_id, user_id=user_id)
        db.session.add(session)

    msg_id = str(uuid.uuid4())
    user_msg = Message(
        id=msg_id, session_id=session_id, role="user", content=user_message
    )
    db.session.add(user_msg)
    db.session.commit()

    def stream_response():
        with app.app.app_context():
            token_count = 0
            stream = client.chat.completions.create(
                messages=[{"role": "user", "content": user_message}],
                model=model,
                max_tokens=max_tokens,
                temperature=temperature,
                top_p=top_p,
                # repetition_penalty=repetition_penalty,
                stream=True,
            )
            ai_response = ""
            ai_msg_id = str(uuid.uuid4())
            for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    ai_response += chunk.choices[0].delta.content

                    token_count += len(chunk.choices[0].delta.content.split())

                    data_to_send = {
                        "id": ai_msg_id,
                        "session_id": session_id,
                        "role": "assistant",
                        "like_status": "none",
                        "content": chunk.choices[0].delta.content,
                        "response_time": f"{time.time() - start_time:.4f}",
                        "token_count": token_count,
                    }

                    yield f"data: {json.dumps(data_to_send)}\n\n"

            ai_msg = Message(
                id=ai_msg_id,
                session_id=session_id,
                role="assistant",
                content=ai_response,
                response_time=f"{time.time() - start_time:.4f}",
                token_count=token_count,
            )
            db.session.add(ai_msg)
            db.session.commit()

    return Response(stream_response(), content_type="text/event-stream")


def chat_regenerate_controller():
    data = request.get_json()

    session_id = data.get("sessionId")
    message_id = data.get("messageId")
    new_message = data.get("message")
    model = data.get("model")
    max_tokens = data.get("maxTokens")
    temperature = data.get("temperature")
    top_p = data.get("topP")

    message = (
        db.session.query(Message)
        .filter_by(id=message_id, session_id=session_id)
        .first()
    )
    if not message:
        return {"error": "Message not found"}, 404

    start_time = time.time()
    ai_msg_id = str(uuid.uuid4())

    def generate():
        with app.app.app_context():
            ai_response = ""
            token_count = 0

            stream = client.chat.completions.create(
                messages=[{"role": "user", "content": new_message}],
                model=model,
                max_tokens=max_tokens,
                temperature=temperature,
                top_p=top_p,
                # repetition_penalty=repetition_penalty,
                stream=True,
            )

            for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    content_piece = chunk.choices[0].delta.content
                    ai_response += content_piece
                    token_count += len(content_piece.split())

                    yield f"data: {json.dumps({
                    'id': ai_msg_id,
                    'session_id': session_id,
                    'role': 'assistant',
                    'content': content_piece,
                    'response_time': f'{time.time() - start_time:.4f}',
                    'token_count': token_count,
                })}\n\n"

            message.content = ai_response
            message.response_time = f"{time.time() - start_time:.4f}"
            message.token_count = token_count
            db.session.add(message)
            db.session.commit()

    return Response(generate(), content_type="text/event-stream")


def like_message_controller():
    data = request.get_json()
    message_id = data.get("message_id")
    like_status = data.get("like_status")

    message = Message.query.filter_by(id=message_id).first()
    if not message:
        return jsonify({"error": "Message not found"}), 404
    message.like_status = like_status
    message.updated = datetime.now()

    db.session.commit()
    return jsonify({"success": True})


def chat_history_controller():
    user_id = get_jwt_identity()

    sessions = (
        ChatSession.query.filter_by(user_id=user_id)
        .order_by(ChatSession.created.desc())
        .all()
    )

    first_messages = []

    for session in sessions:
        first_message = (
            Message.query.filter_by(session_id=session.id)
            .order_by(Message.created.asc())
            .first()
        )

        if first_message:
            first_messages.append(first_message.toDict())

    return jsonify(first_messages)


def get_chat_history_by_session_controller(session_id):
    if not session_id:
        return jsonify({"error": "Session ID is required"}), 400

    messages = (
        Message.query.filter_by(session_id=session_id)
        .order_by(Message.created.asc())
        .all()
    )

    if not messages:
        return jsonify([])

    return jsonify([msg.toDict() for msg in messages])
