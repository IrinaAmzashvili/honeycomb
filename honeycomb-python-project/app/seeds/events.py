from app.models import db, Event


# Adds a demo user, you can add other users here if you want
def seed_events():
    event1 = Event(name='Meet and Greet', description='A get together to meet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="Quad", host_id=1, club_id=1)

    event2 = Event(name='Meet', description='meet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="library", host_id=1, club_id=1)

    event3 = Event(name='Greet', description='A greet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="dorm room 302", host_id=1, club_id=1)

    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
