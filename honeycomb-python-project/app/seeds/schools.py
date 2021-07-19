from app.models import db, School


# Adds a demo user, you can add other users here if you want
def seed_schools():
    school1 = School(name='Harvard')

    db.session.add(school1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_schools():
    db.session.execute('TRUNCATE schools RESTART IDENTITY CASCADE;')
    db.session.commit()
