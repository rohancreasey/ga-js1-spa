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
    groups : ['teamRED','teamBLUE','teamYELLOW', 'teamGOLD'],
    teams: [],
    selectedTeam : [],
    selectedCoach : [],
    selectedDate: {},
    currentGameID : [],
    attendanceRecords : {}
    }


render(state, container)

function render(data, into) {

  // Initial Firebase call to populate menu with teams
  firebase.database().ref('teams/').once('value', function(snapshot) {
    state.teams = snapshot.val();
    console.log('Teams LOADED');
    console.log(state.teams);
  });

  // CALL FUNCTIONS
  renderHeader(state, header);    // render header

// 1a. HEADER - DROP DOWN MENU 
function renderDropDownItem(item) {
  return `<a href="#">${item}</a>`     
}

// 1b. HEADER 
function renderHeader(state, header) {
  header.innerHTML = `
    <section class="wrapper">
      <div id="title"  style="float:right;">
        <a href="#"><h1>Team Roster App</h1></a>
      </div>
      <nav>
        <ul>
          <li><a href="#">Team: <span></span></a>
            <ul id="drop-down-list">
              ${state.groups.map((item) => {
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
      team: state.selectedTeam,
      players: ''
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
    if ((dateDelete != '') && confirm("Are you sure you want to delete this record for " + state.selectedTeam + " on " + dateDelete + "?") == true) {
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
                <ul id="player-list-only">
                <li style="line-height:16px;">${data.players[element].name}&nbsp;&nbsp;</li>
                </ul>
                `
  });
  into.innerHTML = `
                ${playerList}
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

delegate('body', 'click', '#button1', createNewGameDateFunction)

delegate('body', 'click', '#button1', (event) => {
 renderPlayerAttendance(state, playerContainer)
})

delegate('body', 'click', '#button3', deleteGameDateFunction)

delegate('#container', 'click', '.playerAttendanceList > input', (event) => {
  var valueSelected = event.delegateTarget.value
  var players = closest(event.delegateTarget, '[data-name]').getAttribute('data-name')
  state.attendanceRecords[players] = valueSelected
});


delegate('body', 'click', '#submitAttendanceButton', (event) => { 
  var attendanceRecords = firebase.database().ref('gameRecords/' + state.selectedDate + '/' + state.selectedTeam).update({
    players : state.attendanceRecords
  });
  console.log('CHECK THIS');
  console.log(state.selectedDate);
  console.log(state.selectedTeam);
  console.log(state.attendanceRecords);
fetchQuotes()
})


// close main render function
  }
})()
