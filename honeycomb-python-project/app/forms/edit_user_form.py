from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user != current_user:
        raise ValidationError('.......is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user != current_user:
        raise ValidationError('.......is already in use.')


class EditForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    school_id = StringField('school_id', validators=[DataRequired()])
    profile_img_url = FileField('profile_img_url')
