from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import DataRequired
from app.models import Event


class EventForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    date_and_time = DateTimeField('date_and_time', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    
