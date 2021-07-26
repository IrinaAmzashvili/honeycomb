from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', profile_img_url='https://bsp-static.playbill.com/dims4/default/dd4749f/2147483647/resize/x250%3C/quality/90/?url=http%3A%2F%2Fpb-asset-replication.s3.amazonaws.com%2F3a%2Fd3%2F4434c1124f8cad03063399a34420%2Fbuddy-hackett.jpg', email='demo@aa.io', school_id=1, password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', school_id=2, password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', school_id=3, password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
