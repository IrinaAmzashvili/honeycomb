from flask import Blueprint
from ..models import db, Club, School
from flask_login import current_user

school_route = Blueprint('schools', __name__, url_prefix='')

print("============================== Before")


@school_route.route('/api/schools')
def get_school():

    print("============================== after def ")

    school = School.query.filter(School.id == current_user.school_id).first()
    # allClubs = session.query(Club).join(School).filter(current_user.school_id == Club.school_id).all()

    print("==============================", {'school': school.to_dict()})
    return school.to_dict()
