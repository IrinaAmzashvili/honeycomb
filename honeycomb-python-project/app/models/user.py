from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .user_club import user_clubs
from .rsvp import rsvps


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_img_url = db.Column(db.String)
    school_id = db.Column(db.Integer, db.ForeignKey(
        'schools.id'), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    schools = db.relationship('School', back_populates='users')
    hosted_clubs = db.relationship('Club', back_populates='club_host')
    hosted_events = db.relationship('Event', back_populates='event_host')
    events = db.relationship('Event', secondary=rsvps, back_populates='users')
    clubs = db.relationship(
        'Club', secondary=user_clubs, back_populates='users')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_img_url': self.profile_img_url,
            'school_id': self.school_id,
            'memberships': [club.id for club in self.clubs],
            'rsvps': [event.id for event in self.events],
        }
