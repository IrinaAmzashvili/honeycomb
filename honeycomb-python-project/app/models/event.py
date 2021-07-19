from .db import db


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date_and_time = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'), nullable=False)

    users = db.relationship('User', back_populates="events")
    clubs = db.relationship('Club', back_populates='events')
    rsvps = db.relationship('Rsvp', back_populates="events")

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'date_and_time': self.date_and_time,
            'location': self.location,
            'host_id': self.host_id,
            'club_id': self.club_id,
        }
