from flask import Blueprint, request
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_from_s3)
from ..models import db, Club
from app.forms import ClubForm


club_route = Blueprint('clubs', __name__, url_prefix='')


@club_route.route('/api/clubs/<int:id>', methods=['PUT'])
def edit_one_club(id):
    form = ClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.img_url.data is True:
            url = ""
            if "img_url" in request.files:
                image = request.files['img_url']
                if not allowed_file(image.filename):
                    return {"errors": "file type not permitted"}, 400
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                if "url" not in upload:
                    return upload, 400
                url = upload["url"]
            clubToEdit.img_url = url,
        clubToEdit = Club.query.filter(Club.id == id).one()
        clubToEdit.name = form.name.data,
        clubToEdit.description = form.description.data,
        clubToEdit.category_id = form.category_id.data,
        clubToEdit.host_id = current_user.id,
        clubToEdit.school_id = current_user.school_id
        db.session.commit()
        return clubToEdit.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace(
                '_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return{'errors': errorMessages}


@club_route.route('/api/clubs/')
def get_clubs():
    allClubs = Club.query.filter(
        current_user.school_id == Club.school_id).all()
    return {'clubs': [club.to_dict() for club in allClubs]}


@club_route.route('/api/clubs/', methods=['POST'])
def post_club():
    form = ClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        url = ""
        if "img_url" in request.files:
            image = request.files['img_url']
            if not allowed_file(image.filename):
                return {"errors": "file type not permitted"}, 400
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return upload, 400
            url = upload["url"]
        club = Club(
            name=form.name.data,
            description=form.description.data,
            img_url=url,
            category_id=form.category_id.data,
            host_id=current_user.id,
            school_id=current_user.school_id
        )
        db.session.add(club)
        db.session.commit()
        return club.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace(
                '_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return {'errors': errorMessages}


@club_route.route('/api/clubs/<int:id>', methods=['GET'])
def get_one_club(id):
    oneClub = Club.query.get_or_404(id)
    return oneClub.to_dict()


@club_route.route('/api/clubs/<int:id>', methods=['DELETE'])
def delete_club(id):
    club = Club.query.get_or_404(id)
    # original_url = club.img_url
    # url = ""
    # delete in amazon
    delete = delete_from_s3(club.img_url)

    db.session.delete(club)
    db.session.commit()

    return {'message': True}
    # url = “”
    # # use original
    # else:
    #     url = original_url
