from flask import Blueprint
from app.controllers import document_controller

document_bp = Blueprint('document', __name__)

@document_bp.route('/api/document/getAllDocuments', methods=['GET'])
def get_all_documents():
    return document_controller.get_all_documents()

@document_bp.route('/api/document/<int:document_id>', methods=["GET"])
def get_document(document_id):
    return document_controller.get_document(document_id)

@document_bp.route('/api/document/saveDocument', methods=['POST'])
def save_document():
    return document_controller.save_document()

@document_bp.route('/api/document/updateDocument', methods=["PUT"])
def update_document():
    return document_controller.update_document()

@document_bp.route('/api/document/deleteDocument/<int:document_id>', methods=["DELETE"])
def delete_document(document_id):
    return document_controller.delete_document(document_id)