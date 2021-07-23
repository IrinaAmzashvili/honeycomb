from app.models import db, Category


def seed_category():
    category1 = Category(type='Social')
    category2 = Category(type='Academic')
    category3 = Category(type='Political')
    category4 = Category(type='Theater and Art')
    category5 = Category(type='Cultural')
    category6 = Category(type='Sports and Recreation')
    category7 = Category(type='Religious')
    category8 = Category(type='Community Service')
    category9 = Category(type='Media and Publication')

    db.session.add(category1)
    db.session.add(category2)
    db.session.add(category3)
    db.session.add(category4)
    db.session.add(category5)
    db.session.add(category6)
    db.session.add(category7)
    db.session.add(category8)
    db.session.add(category9)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_category():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
