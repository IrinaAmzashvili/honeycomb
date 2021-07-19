from .db import db
from sqlalchemy.ext.declarative import declarative_base
# from .__init__ import *

Base = declarative_base()

user_clubs = db.Table(
    'user_clubs',
    Base.metadata,
    db.Column('user_id', db.ForeignKey('users.id'), primary_key=True),
    db.Column('club_id', db.ForeignKey('clubs.id'), primary_key=True)
)
# Ask about joins table
