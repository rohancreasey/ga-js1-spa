## SPA to allow simple management of player lists

## PLANNING
### Issue: 
My wife coordinates her school basketball program. Along with the 22 team coaches there is a lot of manual paperwork to complete around player registration and attendance, for every training session & match.

### Solution:
Simple app to organise players into team lists, allow each coach to complete a simple attendance record direct from their phone for a given date.

### Initial thoughts:
- Attendance records - present (P), explained absence (EA) or unexplained absence (UA)
- selecting date pulls list of expected players
- coach need only access their own list

### Evolution/Future
- Lists allow for updates throughout season (e.g. player moves to another team)
- List to include medical alerts
- Email notifications to coaches
- Trigger alert to coordinator upon unexplained absences
- Export lists & entries to Word/Excel

### Are Final Project Requirements Covered?
- Structure your application to be a SPA (YES)
- Make HTTP requests to your own Firebase URL (YES)
- Make at least one HTTP request to a third-party server (YES)
- CRUD functionality should be present (YES)
- Perform DOM manipulation via JS (YES)
- Listen for events and add interactivity based on user input (YES)
- App must be hosted on a third party server (YES)

## DEPLOYMENT
App deployed to Firebase:
https://console.firebase.google.com/project/rohancreasey-project1/overview

## INSTRUCTIONS
On load, select a team from the red drop down menu.

This pulls some summary team info and renders the player list for that team.

It also presents some options:
- *Create a new game date* allows you to set up a new roster date. Selecting a date and clicking, will render an attendance form for the team. Radio buttons are used to log attendeed (P for present), explained absences (EA) and unexplained absence. The attendance roster can then be submitted (see below).
- *View games* is currently non-functioning but will be used to list the game list records for a selected team .
- *Delete a game date* allows a user to remove a selected date record from the system. It will check, and double check that you mean to do it before allowing you to do so...

Once an attendance roster is filled out, using the 'Submit Attendance Record' button will submit the roster to Firebase, thank you for your submission, and leave you with a motivational speech to take to your team!