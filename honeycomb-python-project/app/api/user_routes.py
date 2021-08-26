from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, School
from app.forms import EditForm
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
    userSchool = User.query.join(School).filter(
        User.school_id == School.id).one()
    return userSchool.to_dict()


@user_routes.route('/edit', methods=['PUT'])
def edit_user():
    form = EditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editUser = User.query.filter(User.id == current_user.id).first()
        editUser.username = form.username.data,
        editUser.email = form.email.data,
        editUser.profile_img_url = form.profile_img_url.data,
        editUser.school_id = form.school_id.data,
        db.session.commit()
        return editUser.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace(
                '_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return {'errors': errorMessages}


@user_routes.route('/delete', methods=['DELETE'])
def delete_user():
    user = User.query.get(current_user.id)
    db.session.delete(user)
    db.session.commit()
    return {'message': True}
