from app.models import category, db, Club, User


def seed_club():
    club1 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://www.yc.edu/v6/campus-activities/img/club-header.jpg', category_id=1, host_id=1, school_id=1)
    club2 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://www.yc.edu/v6/campus-activities/img/club-header.jpg', category_id=1, host_id=2, school_id=1)
    club3 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://www.yc.edu/v6/campus-activities/img/club-header.jpg', category_id=1, host_id=3, school_id=1)
    club4 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://www.yc.edu/v6/campus-activities/img/club-header.jpg', category_id=1, host_id=1, school_id=1)
    club5 = Club(name='Chess Club', description='We love playing chess! Come join us!', img_url='https://upload.wikimedia.org/wikipedia/commons/6/6f/ChessSet.jpg', category_id=1, host_id=1, school_id=1)
    club6 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://secure-content.meetupstatic.com/images/https%3A%2F%2Fsecure.meetupstatic.com%2Fphotos%2Fevent%2Fd%2F9%2F4%2Fd%2F600_485635629.jpeg', category_id=1, host_id=1, school_id=1)
    club7 = Club(name='Feisty! :3', description='A bunch of feisty old dinosaurs', img_url='https://secure-content.meetupstatic.com/images/https%3A%2F%2Fsecure.meetupstatic.com%2Fphotos%2Fevent%2Fd%2F9%2F4%2Fd%2F600_485635629.jpeg', category_id=1, host_id=1, school_id=1)


    # add and commit all clubs to database
    allClubs = [club1, club2, club3, club4, club5, club6, club7]
    db.session.add_all(allClubs)
    db.session.commit()

    # query for hosts
    user1 = User.query.get_or_404(1)
    user2 = User.query.get_or_404(2)
    user3 = User.query.get_or_404(3)

    # create lists of clubs hosted, add to user clubs (memberships)
    user1Clubs = [club1, club4, club5, club6, club7]
    user2Clubs = [club2]
    user3Clubs = [club3]

    user1.clubs.extend(user1Clubs)
    user2.clubs.extend(user2Clubs)
    user3.clubs.extend(user3Clubs)

    # add and commit users to database
    allUsers = [user1, user2, user3]
    db.session.add_all(allUsers)
    db.session.commit()



def undo_club():
    db.session.execute('TRUNCATE clubs RESTART IDENTITY CASCADE;')
    db.session.commit()
