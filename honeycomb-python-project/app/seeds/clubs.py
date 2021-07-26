from app.models import category, db, Club, User


def seed_club():
    club1 = Club(name='Film-a-holics', description='Interested in films?',
                 img_url='https://i.imgur.com/j2a9XP7.jpg', category_id=1, host_id=1, school_id=1)
    club2 = Club(name='Food Club', description='no vegans allowed',
                 img_url='https://i.imgur.com/GDR0jSs.jpg', category_id=2, host_id=2, school_id=1)
    club3 = Club(name='Golfers Unite', description='Hows your backswing?',
                 img_url='https://i.imgur.com/yTsFwaa.jpg', category_id=3, host_id=3, school_id=1)
    club4 = Club(name='Knit pickers', description='We are VERY picky...',
                 img_url='https://i.imgur.com/aqoPTDy.jpg', category_id=4, host_id=1, school_id=1)
    club5 = Club(name='Chess Club', description='We love playing chess! Come join us!',
                 img_url='https://upload.wikimedia.org/wikipedia/commons/6/6f/ChessSet.jpg', category_id=7, host_id=2, school_id=1)
    club6 = Club(name='Computer Club', description='Processing entry...please wait..',
                 img_url='https://i.imgur.com/wJoCdwv.jpg', category_id=5, host_id=3, school_id=1)
    club7 = Club(name='Study Club', description='Find others who want to study too!',
                 img_url='https://i.imgur.com/3TBYtOs.jpg', category_id=6, host_id=1, school_id=1)

    club8 = Club(name='music Club', description='Find others who want to study too!',
                 img_url='https://cdnp0.stackassets.com/fdfe029162b1e81e1e9a8c07a34d4ae133b1dfdb/store/fed545fb028c56bde01ab09fe8f7c9ad9cd21cb534cd37f2daa36d86d8f5/product_36853_product_shot_wide.jpg', category_id=6, host_id=2, school_id=1)

    club9 = Club(name='Film-a-holics', description='Interested in films?',
                 img_url='https://i.imgur.com/j2a9XP7.jpg', category_id=1, host_id=3, school_id=1)
    club10 = Club(name='Food Club', description='no vegans allowed',
                  img_url='https://i.imgur.com/GDR0jSs.jpg', category_id=2, host_id=1, school_id=2)
    club11 = Club(name='Golfers Unite', description='Hows your backswing?',
                  img_url='https://i.imgur.com/yTsFwaa.jpg', category_id=3, host_id=2, school_id=3)
    club12 = Club(name='Knit pickers', description='We are VERY picky...',
                  img_url='https://i.imgur.com/aqoPTDy.jpg', category_id=4, host_id=3, school_id=5)
    club13 = Club(name='Chess Club', description='We love playing chess! Come join us!',
                  img_url='https://upload.wikimedia.org/wikipedia/commons/6/6f/ChessSet.jpg', category_id=7, host_id=1, school_id=6)
    club14 = Club(name='Computer Club', description='Processing entry...please wait..',
                  img_url='https://i.imgur.com/wJoCdwv.jpg', category_id=5, host_id=2, school_id=1)

    # Adding club host as member of club:
    # add and commit all clubs to database
    allClubs = [club1, club2, club3, club4, club5, club6, club7,
                club8, club9, club10, club11, club12, club13, club14]
    db.session.add_all(allClubs)
    db.session.commit()

    # query for hosts
    user1 = User.query.get_or_404(1)
    user2 = User.query.get_or_404(2)
    user3 = User.query.get_or_404(3)

    # create lists of clubs hosted, add to user clubs (memberships)
    user1Clubs = [club1, club4, club7, club10, club13]
    user2Clubs = [club2, club5, club8, club11, club14]
    user3Clubs = [club3, club6, club9, club12]

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
