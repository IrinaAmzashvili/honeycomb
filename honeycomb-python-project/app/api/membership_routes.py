from flask import Blueprint
from flask_login import current_user
from app.models import db, User, Club

membership_routes = Blueprint('membership', __name__)


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
