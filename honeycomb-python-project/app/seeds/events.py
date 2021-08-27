from app.models import db, Event


# Adds a demo user, you can add other users here if you want
def seed_events():
    event1 = Event(name='Meet and Greet', description='A get together to meet everyone in the club',
                   date_and_time='2023-06-02 21:28:10.328-04', location="Quad", host_id=1, club_id=1)

    event2 = Event(name='Pulp fiction screening', description='watch and discuss time',
                   date_and_time='2023-06-02 21:28:10.328-04', location="library", host_id=1, club_id=1)

    event3 = Event(name='Cooking Basics', description='Basic intro to cooking',
                   date_and_time='2023-06-02 21:28:10.328-04', location="dorm room 302", host_id=1, club_id=2)

    event4 = Event(name='Pitch and Putt Match', description='Bring your best putter and a nine iron',
                   date_and_time='2023-06-02 21:28:10.328-04', location="Quad", host_id=1, club_id=3)

    event5 = Event(name='Stitch and Snitch', description='Watch for crime while knitting',
                   date_and_time='2023-06-02 21:28:10.328-04', location="Quad", host_id=1, club_id=4)

    event6 = Event(name='Chess Tournament', description='12 round single elimination',
                   date_and_time='2023-06-02 21:28:10.328-04', location="dorm room 302", host_id=1, club_id=5)

    event7 = Event(name='Leetcode Challenge', description='Competition for best and fastest code',
                   date_and_time='2023-06-02 21:28:10.328-04', location="computer lab", host_id=2, club_id=6)

    event8 = Event(name='Study Time', description='Going over Physics problems',
                   date_and_time='2023-06-02 21:28:10.328-04', location="library", host_id=2, club_id=7)

    event9 = Event(name='Music History', description='From Mozart to Skrillex and everything in between ',
                   date_and_time='2023-06-02 21:28:10.328-04', location="dorm room 309", host_id=2, club_id=8)

    event10 = Event(name='Improv Night', description='Come with scene suggestions',
                   date_and_time='2023-06-02 21:28:10.328-04', location="Theater", host_id=3, club_id=9)

    event11 = Event(name='Sour Dough', description='Bring your dankest starter ',
                   date_and_time='2023-06-02 21:28:10.328-04', location="Dorm Kitchen", host_id=3, club_id=10)

    event12 = Event(name='Pitch and Putt Match', description='Bring your best putter and a nine iron',
                   date_and_time='2023-06-02 21:28:10.328-04', location="dorm room 302", host_id=3, club_id=11)

    event13 = Event(name='Stitch and Snitch', description='Watch for crime while knitting',
                   date_and_time='2023-06-02 21:28:10.328-04', location="Quad", host_id=1, club_id=12)

    event14 = Event(name='Open Debate', description='Bring your opinions and your best arguments',
                   date_and_time='2023-06-02 21:28:10.328-04', location="library", host_id=1, club_id=13)

    event15 = Event(name='Beef Wellington', description="Don't forget the lamb sauce",
                   date_and_time='2023-06-02 21:28:10.328-04', location="dorm room 302", host_id=1, club_id=2)
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
