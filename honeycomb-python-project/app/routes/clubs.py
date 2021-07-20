from app.models import club
from flask import Blueprint
from ..models import db, Club
from flask_login import current_user

club_route = Blueprint('clubs', __name__, url_prefix='')


@club_route.route('/clubs')
def get_clubs():
    allClubs = Club.query.filter(current_user.school_id == Club.school_id).all()
    print('NBHYORBGBHJNBHYORBGBHJNBHYORBGBHJNBHYORBGBHJNBHYORBGBHJNBHYORBGBHJ', [club.to_dict() for club in allClubs])
    return {'clubs': [club.to_dict() for club in allClubs]}

@club_route.route('/clubs/<int:id>', methods=['GET'])
def get_one_club(id):
    print('HITTING THE INDIVIDUAL CLUB ROUTE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    oneClub = Club.query.get(id)
    return oneClub.to_dict()
