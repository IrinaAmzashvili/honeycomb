from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
# from app.models import Club

class EditClubForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    img_url = StringField('img_url', validators=[DataRequired()])
    category_id = StringField('category_id', validators=[DataRequired()])
