from app.models import category, db, Club


def seed_club():
    club1 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://www.yc.edu/v6/campus-activities/img/club-header.jpg', category_id=1, host_id=1, school_id=1)
    club2 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://www.yc.edu/v6/campus-activities/img/club-header.jpg', category_id=1, host_id=1, school_id=1)
    club3 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://www.yc.edu/v6/campus-activities/img/club-header.jpg', category_id=1, host_id=1, school_id=1)
    club4 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://www.yc.edu/v6/campus-activities/img/club-header.jpg', category_id=1, host_id=1, school_id=1)
    db.session.add(club1)
    db.session.add(club2)
    db.session.add(club3)
    db.session.add(club4)
    db.session.commit()


def undo_club():
    db.session.execute('TRUNCATE clubs RESTART IDENTITY CASCADE;')
    db.session.commit()
