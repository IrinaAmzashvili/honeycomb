from app.models import category, db, Club


def seed_club():
    club1 = Club(name='Film-a-holics', description='Interested in films?', img_url='https://i.imgur.com/j2a9XP7.jpg', category_id=1, host_id=1, school_id=1)
    club2 = Club(name='Food Club', description='no vegans allowed', img_url='https://i.imgur.com/GDR0jSs.jpg', category_id=1, host_id=1, school_id=1)
    club3 = Club(name='Golfers Unite', description='Hows your backswing?', img_url='https://i.imgur.com/yTsFwaa.jpg', category_id=1, host_id=1, school_id=1)
    club4 = Club(name='Knit pickers', description='We are VERY picky...', img_url='https://i.imgur.com/aqoPTDy.jpg', category_id=1, host_id=1, school_id=1)
    club5 = Club(name='Chess Club', description='We love playing chess! Come join us!', img_url='https://upload.wikimedia.org/wikipedia/commons/6/6f/ChessSet.jpg', category_id=1, host_id=1, school_id=1)
    club6 = Club(name='Computer Club', description='Processing entry...please wait..', img_url='https://i.imgur.com/wJoCdwv.jpg', category_id=1, host_id=1, school_id=1)
    club7 = Club(name='Study Club', description='Find others who want to study too!', img_url='https://i.imgur.com/3TBYtOs.jpg', category_id=1, host_id=1, school_id=1)
    db.session.add(club1)
    db.session.add(club2)
    db.session.add(club3)
    db.session.add(club4)
    db.session.add(club5)
    db.session.add(club6)
    db.session.add(club7)
    db.session.commit()


def undo_club():
    db.session.execute('TRUNCATE clubs RESTART IDENTITY CASCADE;')
    db.session.commit()
