/**
 * Project 3: SPA
 * ====
 *
 * See the README.md for instructions
 */

(function() {

  var container = document.querySelector('#container')
  var teamDetailsContainer = document.querySelector('#teamDetailsContainer')
  var playerContainer = document.querySelector('#playerContainer')
  var choiceButtonsContainer = document.querySelector('#choiceButtonsContainer')
  var header = document.querySelector('header')
  var state = {
    players : {},
    quoteOfDay : {},
    quoteOfDayArray : [],  
    groups : ['teamRED','teamBLUE','teamYELLOW'],
    teams: [],
    selectedTeam : [],
    selectedCoach : [],
    selectedDate: {},
    currentGameID : [],
    attendanceRecords : {}
    }

  // Initial Firebase call to populate menu with teams
  firebase.database().ref('teams/').once('value', function(snapshot) {
    state.teams = snapshot.val();
    console.log('Teams LOADED');
    console.log(state.teams);
  });


render(state, container)


function render(data, into) {



  // CALL FUNCTIONS
  renderHeader(state, header);    // render header

// 1a. HEADER - DROP DOWN MENU 
function renderDropDownItem(item) {
  return `<a href="#">${item.coach}</a>`     
}

// 1b. HEADER 
function renderHeader(state, header) {
  header.innerHTML = `
    <section class="wrapper">
      <div id="title"  style="float:right;">
        <a href="#"><h1>Roster Application</h1></a>
      </div>
      <nav>
       <!-- <section id="search"> -->
          <!-- <input type="text" name="name" value="">  -->
          <!-- <div id="search-icon"><img src="images/search.png" alt="" /></div> -->
        <!-- </section>  -->
        <ul>
          <li><a href="#">Team: <span></span></a>
            <ul id="drop-down-list">
              ${state.teams.map((item) => {
              //return renderDropDownItem function
              return `<li>${renderDropDownItem(item)}</li>`
              }).join('')}
            </ul>
          </li>
        </ul>
      </nav>
      <div class="clearfix"></div>
    </section>
    `
}

function renderTeamDetails(state, teamDetailsContainer){
  teamDetailsContainer.innerHTML = 
    `
                    <div id="team-name">Team List: <span class="team-name">${state.selectedTeam}</span></div>
                    <div id"coach-name>Coach: <strong>Coachy McCoach</strong></div>
    `
}

function renderGameChoices(state, choiceButtonsContainer){
  choiceButtonsContainer.innerHTML = `
    <p style="font-weight:bold;">What would you like to do?</p>
          <div class="gameChoicesDiv">
            <span style="">Roster new Game Date:&nbsp; </span>
            <input type="date" id="create-gameDate" />
            <button id="button1" class="gameChoiceButton">Create New Record</button><br/>
          </div>
          <div class="gameChoicesDiv">
            <span style="">Delete a Game Date:&nbsp; </span>
            <input type="date" id="delete-gameDate" />
            <button id="button3" class="gameChoiceButton">Delete a Game Record</button><br/>
          </div>
          <div class="gameChoicesDiv">
            <span style="">View Games:&nbsp; </span>
            
            <button id="button2" class="gameChoiceButton">View Team Games</button><br/>
          </div>
      `
}

function createNewGameDateFunction(gameDate) {
  console.log('create-called');
  var dateCreate = document.getElementById('create-gameDate').value;  // get selected date, assign to dateCreate 
  state.selectedDate = dateCreate;
  // console.log('Selected date: ' + dateCreate);  // check  
  if (dateCreate != '') {

    var newGame = firebase.database().ref('gameRecords/' + dateCreate + '/' + state.selectedTeam).set({ // set new game date
      // team: state.selectedTeam,
      players: state.players
    });
    state.currentGameID = newGame.key;
    console.log('state.currentGameID: ' + state.currentGameID);
    console.log('Date added to database: ' + dateCreate);
  } else {
    alert('Please select a new game date.');
  }

}

function deleteGameDateFunction(gameDate) {
  console.log('delete-called');
  var dateDelete = document.getElementById('delete-gameDate').value; // get value of delete date
    console.log('Selected date: ' + dateDelete);  // check
    if ((dateDelete != '') && confirm("Are you sure you want to delete this game date?") == true) {
      if (confirm("REALLY?") == true) {
        firebase.database().ref('gameRecords/' + dateDelete + '/' + state.selectedTeam).remove();
        console.log('Game data deleted from database: ' + dateDelete + state.selectedTeam);
      }
    } else if (dateDelete == '') {
        alert("Did you mean to select a game date to delete?");
    }
}

function renderPlayerListOnly(data, into) {
  var playerList = '';  // make empty playerList var
  Object.keys(data.players).forEach((element) => {
  // assign html to playerList
  playerList += `   
                <form action="">
                <ul id="player-list-only">
                <li><span>${data.players[element].name}&nbsp;&nbsp;</span></li>
                </ul>
                </form>
                `
  });
  into.innerHTML = `
                ${playerList}
                
                <div>
                
                </div>
                `
  console.log('playerList called');
  // console.log(playerList);
}

  function renderPlayerAttendance(data, into) {
    var playerList = '';  // make empty playerList var
    Object.keys(data.players).forEach((element) => {
    // assign html to playerList
    playerList += `   
                  <form action="">
                  <ul class="playerAttendanceList" data-name="${data.players[element].name}">
                    <li><span>${data.players[element].name}&nbsp;&nbsp;</span><input type="radio" name="attendance" value="present">&nbsp;P&nbsp;<input type="radio" name="attendance" value="absentExplained">&nbsp;EA&nbsp;<input type="radio" name="attendance" value="absentUnexplained">&nbsp;UA&nbsp;</li>
                  </ul>
                  </form>
                  `
    });
    console.log('playerAttendance assigned'); 
    into.innerHTML = `
                     ${playerList}
                     
                     <div class="showQuotes">
                       <button id="submitAttendanceButton" class="showQuotesButton" style="margin:40px 0 0 20px;">Submit Attendance Record</button><br/>
                     </div>
                     `
    console.log('playerAttendance called');
}

function renderQuoteContainer(data, container) {
  container.innerHTML = `
    <p style="margin-top:80px;"><em>Thanks for submitting the roster. Enjoy the game!</em></p>
    <p style="font-weight:bold;margin-top:60px;">"${state.quoteOfDay.quote}"</p>
    <p>- ${state.quoteOfDay.author}</p>
  `
}

// FETCH QUOTES (max 10 per hour)

function fetchQuotes(){
	  fetch('http://quotes.rest/qod.json')
	    .then(function(response) {
	      return response.json();
	    }).then(function(dataAsJson) {
          console.log(dataAsJson);
          state.quoteOfDay.author = dataAsJson.contents.quotes[0].author
          state.quoteOfDay.quote = dataAsJson.contents.quotes[0].quote
          console.log('this is state.quoteOfDay.author: ' + state.quoteOfDay.author);
          console.log('this is state.quoteOfDay.quote: ' + state.quoteOfDay.quote);
	  renderQuoteContainer(state, container)
      })
};


// delegates 

// on drop down team selection, render Team Details
delegate('#drop-down-list', 'click', 'a', (event) => {
  var selectedTeam = event.delegateTarget.innerHTML;
  state.selectedTeam = selectedTeam;
  //get coaches
  console.log('This is the var selectedTeam: ' + selectedTeam);
  console.log('This is the array state.selectedTeam: ' + state.selectedTeam);
  
  renderTeamDetails(state, teamDetailsContainer);
});


// on drop down team selection, render Player List and button choices
delegate('#drop-down-list', 'click', 'a', (players) => {
  firebase.database().ref('players/').once('value', function(snapshot) {
    state.players = snapshot.val();
    console.log(state.players);
  firebase.database().ref('coaches/').once('value', function(snapshot) {
    state.coaches = snapshot.val();
    console.log(state.coaches);
    
    renderPlayerListOnly(state, playerContainer)
    renderGameChoices(state, choiceButtonsContainer);

  })
  })

})


// on create button click, create new game entry
delegate('body', 'click', '#button1', createNewGameDateFunction)

// NOTE - function expecting two params, was just receiving event. Need to call as funtion within delegate* Every delegate receives a param, which is the event. Call it that.
delegate('body', 'click', '#button1', (event) => {
 renderPlayerAttendance(state, playerContainer)
})
 
// on delete button click, delete function
delegate('body', 'click', '#button3', deleteGameDateFunction)

delegate('#container', 'click', '.playerAttendanceList > input', (event) => {
  // need player name & value selected
  var valueSelected = event.delegateTarget.value // event on delgate Target... 
  var playerName = closest(event.delegateTarget, '[data-name]').getAttribute('data-name')
  
  // TODO push to state
  // after button clicked to save
  // read back from state to get current state for each player  & push to FB
  
  state.attendanceRecords[playerName] = valueSelected
  console.log(state.attendanceRecords[playerName].valueSelected.value)
  //state.attendanceRecords.attendanceValue = valueSelected


});


delegate('body', 'click', '#submitAttendanceButton', (event) => { 
  //? Call a function here to loop the Attendance & push to FB? e.g. loopAttendance() 

//TODO HERE OR BELOW>>>>
   fetchQuotes()

  var attendanceRecords = firebase.database().ref('gameRecords/' + state.selectedDate + '/' + state.selectedTeam + '/players/').update({
    players : state.attendanceRecords.attendanceValue
  });


})


// close main render function
  }
})()





