from flask import request, jsonify
from app.models.document import Document
from app.extensions import db

def save_document():
    try:
        data = request.get_json()
        document_data = data['documentData']
        new_document = Document(user_id=document_data['userId'], created_at=document_data['createdAt'], name=document_data['name'], content=document_data['content'])
        db.session.add(new_document)
        db.session.commit()
        return jsonify('Document has been saved.'), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500