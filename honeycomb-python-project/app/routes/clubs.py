from app.models import club
from flask import Blueprint
from ..models import db, Club
from flask_login import current_user

club_route = Blueprint('clubs', __name__, url_prefix='')


@club_route.route('/clubs')
def get_clubs():
    allClubs = Club.query.filter(current_user.school_id == Club.school_id).all()
    return {'clubs': [club.to_dict() for club in allClubs]}


@club_route.route('/clubs/<int:id>', methods=['GET'])
def get_one_club(id):
    oneClub = Club.query.get(id)
    return oneClub.to_dict()


@club_route.route('/clubs/<int:id>', methods=['DELETE'])
def delete_club(id):
    club = Club.query.get_or_404(id)
    db.session.delete(club)
    print('------------------> after delete')
    db.session.commit()
    print('------------------> after commit')
    return {'message': 'success'}
