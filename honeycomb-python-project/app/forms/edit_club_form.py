from flask_wtf import FlaskForm
from wtforms import StringField
# from wtforms.validators import DataRequired
# from app.models import Club

class EditClubForm(FlaskForm):
    name = StringField('name')
    description = StringField('description')
    img_url = StringField('img_url')
    category_id = StringField('category_id')
