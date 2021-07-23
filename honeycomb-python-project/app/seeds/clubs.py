from app.models import category, db, Club, User


def seed_club():
    club1 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://www.yc.edu/v6/campus-activities/img/club-header.jpg', category_id=1, host_id=1, school_id=1)
    club2 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://www.yc.edu/v6/campus-activities/img/club-header.jpg', category_id=1, host_id=2, school_id=1)
    club3 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://www.yc.edu/v6/campus-activities/img/club-header.jpg', category_id=1, host_id=3, school_id=1)
    club4 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://www.yc.edu/v6/campus-activities/img/club-header.jpg', category_id=1, host_id=1, school_id=1)
    club5 = Club(name='Chess Club', description='We love playing chess! Come join us!', img_url='https://upload.wikimedia.org/wikipedia/commons/6/6f/ChessSet.jpg', category_id=1, host_id=1, school_id=1)
    club6 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://secure-content.meetupstatic.com/images/https%3A%2F%2Fsecure.meetupstatic.com%2Fphotos%2Fevent%2Fd%2F9%2F4%2Fd%2F600_485635629.jpeg', category_id=1, host_id=1, school_id=1)
    club7 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://secure-content.meetupstatic.com/images/https%3A%2F%2Fsecure.meetupstatic.com%2Fphotos%2Fevent%2Fd%2F9%2F4%2Fd%2F600_485635629.jpeg', category_id=1, host_id=1, school_id=1)


    db.session.add(club1)
    db.session.add(club2)
    db.session.add(club3)
    db.session.add(club4)
    db.session.add(club5)
    db.session.add(club6)
    db.session.add(club7)
    db.session.commit()

    user1 = User.query.get_or_404(1)
    user2 = User.query.get_or_404(2)
    user3 = User.query.get_or_404(3)

    print('----------->', user1)

    user1Clubs = [club1.id, club4.id, club5.id, club6.id, club7.id]
    user2Clubs = [club2.id]
    user3Clubs = [club3.id]

    user1.clubs.extend(user1Clubs)
    user2.clubs.extend(user2Clubs)
    user3.clubs.extend(user3Clubs)

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.commit()


    # db.bulk_save_objects(list)
    # db.session.add_all(list?)



def undo_club():
    db.session.execute('TRUNCATE clubs RESTART IDENTITY CASCADE;')
    db.session.commit()
