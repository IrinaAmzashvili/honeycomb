from flask import Blueprint, request
from app.models import club
from flask import Blueprint
from ..models import db, Club
from flask_login import current_user
from app.forms import ClubForm

club_route = Blueprint('clubs', __name__, url_prefix='')


@club_route.route('/clubs')
def get_clubs():
    allClubs = Club.query.filter(
        current_user.school_id == Club.school_id).all()
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
@club_route.route('/clubs/<int:id>', methods=['GET'])
def get_one_club(id):
    print('HITTING THE INDIVIDUAL CLUB ROUTE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    oneClub = Club.query.get(id)
    return oneClub.to_dict()
