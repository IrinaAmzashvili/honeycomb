from flask.cli import AppGroup
from .users import seed_users, undo_users
from .schools import seed_schools, undo_schools
from .clubs import seed_club, undo_club
from .category import seed_category, undo_category

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_category()
    seed_schools()
    seed_users()
    seed_club()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_category()
    undo_schools()
    undo_users()
    undo_club()
    # Add other undo functions here
