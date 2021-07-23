from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User, School

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>')
@login_required
def user_school():
    userSchool = User.query.join(School).filter(User.school_id == School.id).one()
    return userSchool.to_dict()
