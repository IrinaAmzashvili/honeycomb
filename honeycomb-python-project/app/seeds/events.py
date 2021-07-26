from app.models import db, Event


# Adds a demo user, you can add other users here if you want
def seed_events():
    event1 = Event(name='Meet and Greet', description='A get together to meet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="Quad", host_id=1, club_id=1)

    event2 = Event(name='Meet', description='meet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="library", host_id=1, club_id=1)

    event3 = Event(name='Greet', description='A greet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="dorm room 302", host_id=1, club_id=1)

    event4 = Event(name='Meet and Greet', description='A get together to meet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="Quad", host_id=1, club_id=7)

    event5 = Event(name='Meet', description='meet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="library", host_id=1, club_id=7)

    event6 = Event(name='Greet', description='A greet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="dorm room 302", host_id=1, club_id=7)

    event7 = Event(name='Meet and Greet', description='A get together to meet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="Quad", host_id=2, club_id=8)

    event8 = Event(name='Meet', description='meet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="library", host_id=2, club_id=8)

    event9 = Event(name='Greet', description='A greet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="dorm room 302", host_id=2, club_id=8)

    event10 = Event(name='Meet and Greet', description='A get together to meet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="Quad", host_id=3, club_id=9)

    event11 = Event(name='Meet', description='meet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="library", host_id=3, club_id=9)

    event12 = Event(name='Greet', description='A greet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="dorm room 302", host_id=3, club_id=9)

    event13 = Event(name='Meet and Greet', description='A get together to meet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="Quad", host_id=1, club_id=10)

    event14 = Event(name='Meet', description='meet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="library", host_id=1, club_id=10)

    event15 = Event(name='Greet', description='A greet everyone in the club',
                   date_and_time='2021-06-02 21:28:10.328-04', location="dorm room 302", host_id=1, club_id=10)
    allEvents = [event1, event2, event3, event4, event5, event6, event7, event8, event9, event10, event11, event12, event13, event14, event15]
    db.session.add_all(allEvents)
    # db.session.add(event2)
    # db.session.add(event3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
