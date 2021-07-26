# Welcome To HoneyComb
Honeycomb is a social based academic platform that allows users to easily see available clubs located at their college or university. If the user sees a club that resinates with them they are able to Join that club as well as see events that the club has scheduled. If they do not see a club that they are looking for that user has the ability to create a new club. As a host of a club this gives that user rights to be able to manage different aspects of the club including editing or deleting the club, and creating and deleting events.

<br>

[Click here to see it in action!](https://app-honeycomb.herokuapp.com/)

<br>

## Splash Page

![home](https://user-images.githubusercontent.com/79552414/126921392-83dc609a-7a46-4791-991a-d15029d84f17.png)

<br>
# Technologies Used

The main logic of the backend of honeycomb was created using python and flask with all database aspects being initialized using flaskalchemy and handled with postgreSQL.The front end was created using Javascript and rendered using React. React was chosen for this project due to its lite foot print, quick response times to maximize user experience especially when there may be multiple query's happening per page, and strong ecosystem backing and support especially around library's and other recourses to help maximize efficiency . The Site was styled with the use of CSS modules.

<br>

# Components

## Browsing clubs
* On the main clubs page the application renders a list of available clubs that are available for the session users school. On these individual cards there is a club image, a title and a description so the user can see which clubs may be of interest to them. If There is no club of interest the user has the ability to Host a new club.

<br>

![image](https://user-images.githubusercontent.com/79552414/126921519-e841c431-daae-4d37-8df2-5093754cd510.png)

<br>

###  - Search and Filter
* In addition on the clubs page there is also a search feature and category filter feature that is used by running a filter query on the current state of clubs and returning only the cards that match the description ensuring a smoother user experiencing when attempting to find a club that is of interest to them.

<br>

```javascript
  //-------------------------------------------------Search-------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const editSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const dynamicSearch = () => {
    return clubs.filter((club) =>
      club?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  clubs = dynamicSearch();
//---------------------------------------------------------------filter-------------


  const handleFilter = (event)=>{
    const selectedIndex = event.target.options.selectedIndex;
    setSelectedCategory(event.target.options[selectedIndex].value)
  }

```

<br>

## Individual Club Page

### Club Features
* If the user goes into the individual club page without being the host the user will haver the option of reading more information about the club as well as Join the club. If the user has created the club they will be directed into this individual club page and automatically be added as a member of the club. As a host, the user will have the ability to update the name, description, and image for the club as well as delete the club all together if they wish.

<br>

![image](https://user-images.githubusercontent.com/79103461/126882863-21e91924-1e7d-4cf5-9454-0621b1b2a242.png)

### Club Forms
* All forms on the site from user sign up to club editing are protected from Cross-Site Request Forgery attacks using csrf tokens. In addition each  individual form contains a set of its own unique error handling. Routes on the backend that go through the  database are handled using flask wtfroms and queried using squalchemy to send the submit information into the database.

<br>

```javascript
@club_edit.route('/clubs/<int:id>', methods=['PUT'])
def edit_one_club(id):
    form = ClubForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        clubToEdit = Club.query.filter(Club.id == id).one()
        clubToEdit.name=form.name.data,
        clubToEdit.description=form.description.data,
        clubToEdit.img_url=form.img_url.data,
        clubToEdit.category_id=form.category_id.data,
        clubToEdit.host_id=current_user.id,
        clubToEdit.school_id=current_user.school_id
        db.session.commit()
        return clubToEdit.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace('_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return{'errors': errorMessages}

```
<br>

### Events
* As the host of a club another feature that is available to you is the ability to create new events for your club and have it render on your individual club page dynamically. On this event card you are able to display a time and date, location, and a description of the event that you have created. After the club has been created you then have the ability to edit the event in a similar fashion to the clubs page and also cancel the event if you need to.

<br>

![image](https://user-images.githubusercontent.com/79103461/126883339-4ab1cffd-93ed-480d-ad83-03bc606adabf.png)

<br>

### Rsvp
 * Once the host has created an event the user will have the option to RSVP to the newly created event. If the user wishes to redact their initial response to the rsvp they are able to respond that they will no longer be able to attend. One challenge that was faced when dealing with these routes is that the database relationship with users and rsvps is a many to many relationship so a very unique query had to be created to append the user onto the individual event and return that to the database.

 ```javascript
@rsvp_routes.route('/<int:id>', methods=['POST'])
def add_rsvps(id):
    user = User.query.get_or_404(current_user.id)
    event = Event.query.get_or_404(id)
    event.users.append(user)
    db.session.add(event)
    db.session.commit()
    return {'event': event.to_dict()}

# if these dont work, use "users" instead of rsvps in the queries!
@rsvp_routes.route('/<int:id>', methods=['DELETE'])
def remove_rsvp(id):
    user = User.query.get_or_404(current_user.id)
    event = Event.query.get_or_404(id)
    event.users.remove(user)
    db.session.add(event)
    db.session.commit()
    return {'message': 'Removed'}

 ```

 <br>



### Calender
 * Once an event has been created and or updated the event title and time is rendered onto a calender located on the individual club page. It serves as a useful display for the users to be able to see when events are scheduled and get a good visual for the month. The calender itself was created using the react-calender package for ease of use and smooth integration and experience for the user.

 <br>


![image](https://user-images.githubusercontent.com/79103461/126883553-f729c8db-c356-4890-a57b-7fb86cf2c7ed.png)

 <br>
