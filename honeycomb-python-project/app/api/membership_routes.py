from flask import Blueprint
from flask_login import current_user
from app.models import db, user_clubs, Club

membership_routes = Blueprint('membership', __name__)


@membership_routes.route('/<int:id>')
def join_club(id):
    print('-----------------> in backend route')
    member = user_clubs(
        user_id=current_user.id,
        club_id=id,
    )
    db.session.add(member)
    db.session.commit()
    club = Club.query.get_or_404(id)
    print('----------------->', club)
    return {'club': club}
