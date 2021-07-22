from flask import Blueprint
from flask_login import current_user
from app.models import db, User, Event


rsvp_routes = Blueprint('rsvps', __name__)


@rsvp_routes.route('/<int:id>')
def get_rsvps(id):
    user = User.query.get_or_404(current_user.id)
    event = Event.query.get_or_404(id)
    event.rsvps.append(user)
    db.session.add(event)
    db.session.commit()
    return {'event': event.to_dict()}


@rsvp_routes.route('/<int:id>')
def remove_rsvp(id):
    user = User.query.get_or_404(current_user.id)
    event = Event.query.get_or_404(id)
    event.rsvps.remove(user)
    db.session.add(event)
    db.session.commit()
    return {'message': 'Removed'}
