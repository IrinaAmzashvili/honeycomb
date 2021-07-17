from .db import db


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)

    clubs = db.relationship('Club', back_populates='categories')

    def to_dict(self):
        return{
            'id': self.id,
            'type': self.type
        }
