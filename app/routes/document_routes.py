from flask import Blueprint
from app.controllers import document_controller

document_bp = Blueprint('document', __name__)

@document_bp.route('/api/document/saveDocument', methods=['POST'])
def save_document():
    return document_controller.save_document()