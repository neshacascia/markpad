import os
from dotenv import load_dotenv
from datetime import timedelta

# load environment variables from .env file
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS', False)
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'anothersecret')
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_COOKIE_CSRF_PROTECT = True  
    JWT_COOKIE_SAMESITE = 'None'     
    JWT_COOKIE_SECURE = True   
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=4)