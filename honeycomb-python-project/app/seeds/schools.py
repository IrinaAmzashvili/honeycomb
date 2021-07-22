from app.models import db, School
from app.school_data import university_list

# Adds a demo user, you can add other users here if you want


def seed_schools():

    i = 0
    while i < len(university_list):
        school = School(name=f"{university_list[i]}")
        db.session.add(school)
        db.session.commit()
        i += 1


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_schools():
    db.session.execute('TRUNCATE schools RESTART IDENTITY CASCADE;')
    db.session.commit()
