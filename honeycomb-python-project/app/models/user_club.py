# from .db import db
# # from sqlalchemy.ext.declarative import declarative_base
# # # from .__init__ import *

# # Base = declarative_base()

# user_clubs = db.Table(
#     'user_clubs',
#     # Base.metadata,
#     db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#     db.Column('club_id', db.Integer, db.ForeignKey('clubs.id'), primary_key=True)
# )


# # class User_club(db.Model):
# #     __tablename__ = "user_clubs"

# #     id = db.Column(db.Integer, primary_key=True)
# #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
# #     club_id = db.Column(db.Integer, db.ForeignKey('clubs.id'), nullable=False)

# #     users = db.relationship('User', back_populates="user_clubs")
# #     clubs = db.relationship('Club', back_populates="user_clubs")
# # Ask about joins table
