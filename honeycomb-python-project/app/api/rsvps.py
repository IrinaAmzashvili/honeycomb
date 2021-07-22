from flask import Blueprint
from flask_login import current_user
from app.models import db, User, Event


rsvp_routes = Blueprint('rsvps', __name__)

@rsvp_routes.route('/')
def all_rsvps():
    rsvps = current_user.to_dict()['rsvps']
    events = Event.query.filter(Event.id.in_(rsvps)).all()
    usersRsvps = [event.to_dict() for event in events]
    return {'rsvps': usersRsvps}

@rsvp_routes.route('/<int:id>', methods=['POST'])
def add_rsvps(id):
    user = User.query.get_or_404(current_user.id)
    event = Event.query.get_or_404(id)
    event.users.append(user)
    db.session.add(event)
    db.session.commit()
    return {'event': event.to_dict()}

# if these dont work, use "users" instead of rsvps in the queries!
@rsvp_routes.route('/<int:id>', methods=['DELETE'])
def remove_rsvp(id):
    user = User.query.get_or_404(current_user.id)
    event = Event.query.get_or_404(id)
    event.users.remove(user)
    db.session.add(event)
    db.session.commit()
    return {'message': 'Removed'}
