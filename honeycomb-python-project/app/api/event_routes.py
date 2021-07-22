from flask import Blueprint, request
from flask import Blueprint
from ..models import db, Event, Club
from flask_login import current_user
from app.forms import EventForm


event_route = Blueprint('events', __name__, url_prefix='')


@event_route.route('/api/clubs/<int:id>/events')
def get_events(id):
    allEvents = Event.query.filter(Event.club_id == id).all()
    return {'events': [event.to_dict() for event in allEvents]}


@event_route.route('/api/clubs/<int:id>/events', methods=['POST'])
def post_event(id):
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event(
            name=form.name.data,
            description=form.description.data,
            date_and_time=form.date_and_time.data,
            location=form.location.data,
            host_id=current_user.id,
            club_id=id
        )
        db.session.add(event)
        db.session.commit()
        return event.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace('_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return{'errors': errorMessages}


@event_route.route('/api/events/<int:id>', methods=['PUT'])
def put_event(id):
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event.query.filter(Event.id == id).one()
        event.name = form.name.data,
        event.description = form.description.data,
        event.date_and_time = form.date_and_time.data,
        event.location = form.location.data,
        event.host_id = current_user.id,
        db.session.commit()
        return event.to_dict()
    return {'errors': 'Failed to submit Event form'}


@event_route.route('/api/events/<int:id>', methods=['DELETE'])
def delete_event(id):
    event = Event.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit()
    return {"id": event.id}
