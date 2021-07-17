from .db import db


class School(db.Model):
    __tablename__ = "schools"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    users = db.relationship('User', back_populates='schools')
    clubs = db.relationship('Club', back_populates='schools')

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name
        }
