from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, School, Club
from app.forms import EditForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_from_s3)


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

        if form.profile_img_url.data != editUser.profile_img_url:
            url = ""
            original_url = editUser.profile_img_url

            if "profile_img_url" in request.files:
                image = request.files['profile_img_url']
                if not allowed_file(image.filename):
                    return {"errors": "file type not permitted"}, 400
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                if "url" not in upload:
                    return upload, 400
                url = upload["url"]
                delete = delete_from_s3(original_url)
            editUser.profile_img_url = url

        editUser.username = form.username.data,
        editUser.email = form.email.data,
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
    usersClubs = Club.query.filter(Club.host_id == current_user.id)
    for club in usersClubs:
        db.session.delete(club)

    delete_from_s3(user.profile_img_url)

    db.session.delete(user)
    db.session.commit()
    return {'message': True}
