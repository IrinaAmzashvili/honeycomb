from .db import db
from .user_club import user_clubs


class Club(db.Model):
    __tablename__ = "clubs"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    img_url = db.Column(db.Text, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        'categories.id'), nullable=False)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    school_id = db.Column(db.Integer, db.ForeignKey(
        'schools.id'), nullable=False)

    categories = db.relationship('Category', back_populates="clubs")
    host = db.relationship('User', back_populates="hosted_clubs")
    schools = db.relationship('School', back_populates="clubs")
    events = db.relationship('Event', back_populates="clubs")
    users = db.relationship('User', secondary=user_clubs,
                            back_populates="clubs")

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'img_url': self.img_url,
            'category_id': self.category_id,
            'host_id': self.host_id,
            'school_id': self.school_id,
        }
