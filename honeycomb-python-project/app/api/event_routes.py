from flask import Blueprint, request
from flask import Blueprint
from ..models import db, Event, Club
from flask_login import current_user


event_route = Blueprint('events', __name__, url_prefix='')


@event_route.route('/api/clubs/<int:id>/events')
def get_events(id):
    allEvents = Event.query.filter(Event.club_id == id).all()
    return {'events': [event.to_dict() for event in allEvents]}
