from flask import Blueprint, request
from ..models import db, Club
from flask_login import current_user
from app.forms.edit_club_form import EditClubForm
from app.forms import ClubForm


club_edit = Blueprint('clubsedit', __name__, url_prefix='')


@club_edit.route('/clubs/<int:id>', methods=['PUT'])
def edit_one_club(id):
    form = EditClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        clubToEdit = Club.query.filter(Club.id == id).one()
        clubToEdit.name=form.name.data,
        clubToEdit.description=form.description.data,
        clubToEdit.img_url=form.img_url.data,
        clubToEdit.category_id=form.category_id.data,
        clubToEdit.host_id=current_user.id,
        clubToEdit.school_id=current_user.school_id
        db.session.commit()
        return clubToEdit.to_dict()
    return{'errors': form.errors}

        # print('==========================>', form.name.data)
        # print('==========================>', form.description.data)
        # print('==========================>', form.img_url.data)
        # print('==========================>', form.category_id.data)
