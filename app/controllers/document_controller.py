from flask import request, jsonify
from app.models.document import Document
from app.extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity

@jwt_required()
def get_all_documents():
    try:
        current_user = get_jwt_identity()
        documents = db.session.execute(db.select(Document).filter_by(user_id=current_user)).scalars().all()
        documents_data = [{
            'id': document.id,
            'created_at': document.created_at,
            'name': document.name,
            'content': document.content
        } for document in documents]
        
        return jsonify({"documents": documents_data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def get_document(document_id):
    try:
        current_user = get_jwt_identity()
        document = db.session.execute(db.select(Document).filter_by(user_id=current_user, id=document_id)).scalar()

        if document:
            document_data = {
             'id': document.id,
            'created_at': document.created_at,
            'name': document.name,
            'content': document.content
            }
            return jsonify({'document': document_data}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@jwt_required()
def save_document():
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        document_data = data['documentData']
        new_document = Document(user_id=current_user, created_at=document_data['createdAt'], name=document_data['name'], content=document_data['content'])
        db.session.add(new_document)
        db.session.commit()

        return jsonify({'msg': 'Document has been saved.', 'document_id': new_document.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@jwt_required()
def update_document():
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        document_data = data['updatedDocumentData']
        document = db.session.execute(db.select(Document).filter_by(user_id=current_user, id=document_data["id"])).scalar()
        document.name = document_data["name"]
        document.content = document_data["content"]
        db.session.commit()

        return jsonify('Document has been updated.'), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@jwt_required()
def delete_document(document_id):
    try:
        current_user = get_jwt_identity()
        document = db.session.execute(db.select(Document).filter_by(user_id=current_user, id=document_id)).scalar()
        db.session.delete(document)
        db.session.commit()

        return jsonify('Document has been deleted.'), 204
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    