from flask import Blueprint
from flask_login import current_user
from app.models import db, User, Club

membership_routes = Blueprint('membership', __name__)


@membership_routes.route('/<int:id>')
def get_memberships(id):
    # get all user membership ids
    memberships = current_user.to_dict()['memberships']
    # query for all clubs if id is in memberships
    clubs = Club.query.filter(Club.id.in_(memberships)).all()
    # iterate through clubs list to call to_dict method on each club
    memberClubs = [club.to_dict() for club in clubs]
    return {'clubs': memberClubs}


@membership_routes.route('/<int:id>', methods=['POST'])
def join_club(id):
    # queries to find user and club
    user = User.query.get_or_404(current_user.id)
    club = Club.query.get_or_404(id)
    # append member to club users list
    club.users.append(user)
    # add to and update database
    db.session.add(club)
    db.session.commit()
    return {'club': club.to_dict()}


@membership_routes.route('/<int:id>', methods=['DELETE'])
def leave_club(id):
    user = User.query.get_or_404(current_user.id)
    club = Club.query.get_or_404(id)
    club.users.remove(user)
    db.session.add(club)
    db.session.commit()
    return {'message': True}
