from flask import Blueprint
from ..models import db, Club, School
from flask_login import current_user
# from sqlalchemy.orm import sessionmaker
# Session = sessionmaker(bind = engine)
# session = Session()
# from sqlalchemy.orm import sessionmaker
# session = sessionmaker()()
# session = Session()

club_route = Blueprint('clubs', __name__, url_prefix='')


@club_route.route('/clubs')
def get_clubs():
    allClubs = Club.query.filter(current_user.school_id == Club.school_id).all()
    # allClubs = session.query(Club).join(School).filter(current_user.school_id == Club.school_id).all()

    # print("==============================", {'clubs': [club.to_dict() for club in allClubs]})
    return {'clubs': [club.to_dict() for club in allClubs]}
