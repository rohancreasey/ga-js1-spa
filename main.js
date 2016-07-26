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
    players : [],
    quoteOfDay : {},
    quoteOfDayArray : [],  
    groups : ['teamA','teamB','teamC'],
    teams: [],
    selectedTeam : [],
    currentGameID : [],
    attendanceRecords : {}
    }


render(state, container)

function render(data, into) {
  // TODO

  // CALL FUNCTIONS
  renderHeader(state, header);    // render header
  // MOVED renderGameChoices(state, choiceButtonsContainer);   // render home page buttons
  // renderPlayerContainer(state, container);    // render player list container
  // TEMP fetchQuotes();
    // SECOND QUOTE fetchQuotesOnDesign();

// 1. HEADER CODE

// DROP DOWN MENU - currently pulling list of groups array 
// TODO - change menu to pull FB team list
function renderDropDownItem(item) {
  // return `<a href="#">${item.name}</a>`
  // console.log(item);
  return `<a href="#">${item}</a>`     
}

// HEADER 
function renderHeader(state, header) {
  header.innerHTML = `
    <section class="wrapper">
      <div id="title"  style="float:right;">
        <a href="#"><h1>Roster Application</h1></a>
      </div>
      <nav>
        <section id="search">
          <input type="text" name="name" value="">
          <!-- <div id="search-icon"><img src="images/search.png" alt="" /></div> -->
        </section>
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

// TEAM SELECTION FUNCTIONS




// VIEW 1a -- TEAM DETAILS

function renderTeamDetails(state, teamDetailsContainer){
  teamDetailsContainer.innerHTML = 
    `
                    <div id="team-name">Team List: <span class="team-name">${state.selectedTeam}</span></div>
                    <div id"coach-name>Coach: <strong>Coachy McCoach</strong></div>
    `
}


// VIEW 1b -- BUTTON CHOICE

function renderGameChoices(state, choiceButtonsContainer){
  choiceButtonsContainer.innerHTML = `
    <p style="font-weight:bold;">What would you like to do?</p>
          <div class="gameChoicesDiv">
            <span style="">Roster new Game Date:&nbsp; </span>
            <input type="date" id="create-gameDate" />
            <button id="button1" class="gameChoiceButton">Create New Record</button><br/>
          </div>
          <div class="gameChoicesDiv">
            <span style="">View Games:&nbsp; </span>
            <input type="date" id="view-gameDate" />
            <button id="button2" class="gameChoiceButton">View Team Games</button><br/>
          </div>
          <div class="gameChoicesDiv">
            <span style="">Delete a Game Date:&nbsp; </span>
            <input type="date" id="delete-gameDate" />
            <button id="button3" class="gameChoiceButton">Delete a Game Record</button><br/>
          </div>
        </div>
      `
}

/* VIEW / DELETE BUTTONS:
    <div class="gameChoicesDiv">
      <span style="">Roster new Game Date:&nbsp; </span>
      <input type="date" id="create-gameDate" />
      <button id="button1" class="gameChoiceButton">Select a new game date</button><br/>
    </div>
    <div class="gameChoicesDiv">
      <input type="date" id="view-gameDate" />
      <button id="button2" class="gameChoiceButton">Button 2 - View game</button><br/>
    </div>
    <div class="gameChoicesDiv">
      <input type="date" id="delete-gameDate" />
      <button id="button3" class="gameChoiceButton">Button 3 - Delete game</button><br/>
    </div>

    */

// ADD GAME ACTIONS
//debugger


// Create New Game Function
function createNewGameDateFunction(gameDate) {
  console.log('create-called');
  var dateCreate = document.getElementById('create-gameDate').value;  // get selected date, assign to dateCreate 
  // console.log('Selected date: ' + dateCreate);  // check  
  if (dateCreate != '') {

    var newGame = firebase.database().ref('gameRecords/' + dateCreate + '/' + state.selectedTeam).set({ // set new game date
      team: state.selectedTeam,
      players: state.players
    });
    state.currentGameID = newGame.key;
    console.log('state.currentGameID: ' + state.currentGameID);
    // console.log('currentGameID.key: ' + currentGameID.key);
    console.log('Date added to database: ' + dateCreate);
    // console.log('selectedTeam var = ' + selectedTeam)    // check
    //return currentGameID.key;
  } else {          // check - if no date selected, alert
    alert('Please select a new game date.');
  }

}


// DELETE GAME ACTIONS

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



// VIEW 2 -- TEAM PLAYER LIST

/*

function renderPlayer(item) { // renders Player name
  return (
    `<a href="#">${item}</a>`
  )
}

// render Team List
function renderPlayerContainer(state, playerContainer) {
  playerContainer.innerHTML = `
    <section id="team-details" class="wrapper">
      <div id="team-name">Team List: <strong>Team Name</strong></div>
        <div id"coach-name>Coach: <strong>Coachy McCoach</strong></div>
          <ul>
            ${state.players.map((item) => {
              return `<li>${renderPlayer(item)}</li>`
            }).join('')}
          </ul>
    </section>
    `
}

*/

//  firebase.database().ref('players/').on('value', function(snapshot) {
//     state.players = snapshot.val();
//     console.log(state);
//     renderPlayerList(state, document.querySelector('#container'))
//   });

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
                       <button id="submitAttendanceButton" class="showQuotesButton" style="margin-top:40px;">Show Quotes</button><br/>
                     </div>
                     `
    console.log('playerAttendance called');
    // console.log(playerList);
}


function renderQuoteContainer(data, container) {
  container.innerHTML = `
    <p><em>Thanks for the roster. Enjoy the game!</em></p>
    <p style=""><em>Thanks for the roster. Enjoy the game!</em></p>
    <p style="font-weight:bold;margin-top:60px;">${state.quoteOfDay.quote}</p>
    <p>- ${state.quoteOfDay.author}</p>
  `
}


/*
var attendance = [];

function submit() {

  var attendanceRecord = {};

  forEach(item) => {
  attendanceRecord.playerName = 
  attendanceRecord.status = 
  
  attendanceRecord.push(attendanceRecord);
  console.log(attendance);

  }

function submitAttendance(){
	  fetch('http://quotes.rest/qod.json')
	    .then(function(response) {
	      return response.json();
	    }).then(function(dataAsJson) {
          console.log(dataAsJson);
          // loop through data
          
          
          dataAsJson.contents.quotes.forEach((item) => {
	        var quotesObject = {}
          quotesObject.author = item.author
          quotesObject.quote = item.quote
          //   // push to array
          state.quoteOfDay.push(quotesObject);
          console.log(state.quoteOfDay);
	  })
      // renderArticleListContainer(state, container)
	})};

*/

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
	  })
      renderQuoteContainer(state, container)
	};


// function fetchQuotes(){
// 	  fetch('http://quotes.rest/qod.json')
// 	    .then(function(response) {
// 	      return response.json();
// 	    }).then(function(dataAsJson) {
//           console.log(dataAsJson);
//           // loop through data
//           dataAsJson.contents.quotes.forEach((item) => {
// 	        var quotesObject = {}
//           quotesObject.author = item.author
//           quotesObject.quote = item.quote
//           //   // push to array
//           state.quoteOfDay.push(quotesObject);
//           console.log(state.quoteOfDay);
//           console.log('THis is state.quoteOfDay: ' + state.quoteOfDay);
// 	  })
//       renderQuoteContainer(state, container)
// 	})};
  
/* second quotes unrequired
  function fetchQuotesOnDesign(){
	  fetch('https://crossorigin.me/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1')
	    .then(function(response) {
	      return response.json();
	    }).then(function(dataAsJson) {
          console.log(dataAsJson);
          // loop through data
          dataAsJson.contents.quotes.forEach((item) => {
	        var quotesObject = {}
          quotesObject.author = item.author
          quotesObject.quote = item.quote
          //   // push to array
          state.quoteOfDay.push(quotesObject);
          console.log(state.quoteOfDay);
	  })
      // renderArticleListContainer(state, container)
	})};

// http://quotes.rest/qod.json
// http://quotes.rest/qod.json?category=management'
// https://crossorigin.me/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1
*/



















// delegates 

// function load() {
//         console.log("load event detected!");
//       }
//       window.onload = load;
// window.onload = function(){
//   var headerLoaded = document.querySelector('header');
//   headerLoaded.onload = firebase.database().ref('teams/').once('value', function(snapshot) {
//   state.teams = snapshot.val();
//   console.log(state.teams);
// })
// };

// delegate('#header', 'onload', (teams) => {
//   firebase.database().ref('teams/').once('value', function(snapshot) {
//     state.teams = snapshot.val();
//       console.log(state.teams);
//   })
// })


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


// on create button click, create new game entry
delegate('body', 'click', '#button1', createNewGameDateFunction)

// NOTE - function expecting two params, was just receiving event. Need to call as funtion within delegate* Every delegate receives a param, which is the event. Call it that.
delegate('body', 'click', '#button1', (event) => {
 renderPlayerAttendance(state, playerContainer)
})
 
//  OLD - render Player List on button press
// delegate('body', 'click', '#button1', (players) => {
//   firebase.database().ref('players/').once('value', function(snapshot) {
//     state.players = snapshot.val();
//     console.log(state);
//     renderPlayerList(state, document.querySelector('#playerContainer'))
//   })
// })

// on delete button click, delete function
delegate('body', 'click', '#button3', deleteGameDateFunction)


delegate('#container', 'click', '.playerAttendanceList > input', (event) => {
  // need player name & value selected
  var valueSelected = event.delegateTarget.value // TODO event.. .is event delgate Target... 
  var playerName = closest(event.delegateTarget, '[data-name]').getAttribute('data-name')
  
  state.attendanceRecords.player = playerName
  state.attendanceRecords.attendanceValue = valueSelected

  console.log(state.attendanceRecords);

  // push to state
  // after button clicked to save
  // read back from state to get current state for each player  & push to FB

});

//           dataAsJson.contents.quotes.forEach((item) => {
// 	        var quotesObject = {}
//           quotesObject.author = item.author
//           quotesObject.quote = item.quote
//           //   // push to array
//           state.quoteOfDay.push(quotesObject);
//           console.log(state.quoteOfDay);
//           console.log('THis is state.quoteOfDay: ' + state.quoteOfDay);


// delegate('#container', 'click', '____', (event) => {
//   var selectedRadio = document.querySelector('radio')

  

//   console.log(': ' + selectedTeam);


// }


delegate('body', 'click', '#submitAttendanceButton', (event) => {
  fetchQuotes()
  // stack overflow TODO
  //document.querySelector('input[name="attendance"]:checked').value; // collects first radio box set
})







// close main render function
  }
})()





