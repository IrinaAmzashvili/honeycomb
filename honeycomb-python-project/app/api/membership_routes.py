from flask import Blueprint
from flask_login import current_user
from app.models import db, User, Club

membership_routes = Blueprint('membership', __name__)


@membership_routes.route('/<int:id>', methods=['POST'])
def join_club(id):
    print('-----------------> in backend route')
    member = User.query.get_or_404(current_user.id)
    print('-----------------> AFTER GRAB MEMBER')
    club = Club.query.get_or_404(id)
    print('-----------------> AFTER GRAB CLUB')
    club.users.append(member)
    print('-----------------> AFTER APPEND CLUB')
    db.session.add(club)
    db.session.commit()
    print('----------------->', club)
    return {'club': club.to_dict()}
