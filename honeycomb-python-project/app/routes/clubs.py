from flask import Blueprint, request
from app.models import club
from flask import Blueprint
from ..models import db, Club, School
from flask_login import current_user
from app.forms import ClubForm
from app.forms.edit_club_form import EditClubForm

club_route = Blueprint('clubs', __name__, url_prefix='')


@club_route.route('/clubs')
def get_clubs():
    allClubs = Club.query.filter(current_user.school_id == Club.school_id).all()
    return {'clubs': [club.to_dict() for club in allClubs]}


@club_route.route('/clubs', methods=['POST'])
def post_club():
    form = ClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        club = Club(
            name=form.name.data,
            description=form.description.data,
            img_url=form.img_url.data,
            category_id=form.category_id.data,
            host_id=current_user.id,
            school_id=current_user.school_id
        )
        db.session.add(club)
        db.session.commit()
        return club.to_dict()
    return{'errors': 'Failed to submit club form'}

# @club_route.route('/clubs/<int:id>', methods=['PUT'])
# def edit_one_club(id):
#     clubToEdit = Club.query.get(id)
#     form = EditClubForm()
#     if form.validate_on_submit():
#         print('==========================>', form.name.data)
#         print('==========================>', form.description.data)
#         print('==========================>', form.img_url.data)
#         print('==========================>', form.category_id.data)

#         clubToEdit.name=form.name.data,
#         clubToEdit.description=form.description.data,
#         clubToEdit.img_url=form.img_url.data,
#         clubToEdit.category_id=form.category_id.data,
#         clubToEdit.host_id=current_user.id,
#         clubToEdit.school_id=current_user.school_id
#         db.session.add(clubToEdit)
#         db.session.commit()
#     return clubToEdit.to_dict()
#         # return{'errors': 'Failed to edit club'}


@club_route.route('/clubs/<int:id>', methods=['GET'])
def get_one_club(id):
    oneClub = Club.query.get(id)
    return oneClub.to_dict()


@club_route.route('/clubs/<int:id>', methods=['DELETE'])
def delete_club(id):
    club = Club.query.get_or_404(id)
    db.session.delete(club)
    db.session.commit()
    return {'message': True}
