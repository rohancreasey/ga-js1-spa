/**
 * Project 3: SPA
 * ====
 *
 * See the README.md for instructions
 */

(function() {

  var container = document.querySelector('#container')
  var header = document.querySelector('header')
  var state = {
    games : ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    groups : ['teamRED','teamBLUE','teamYELLOW'],
    teams : [
        {
          name : 'teamRED',
          coach : 'Coachy McCoach',
          players : ['Han Solo','Luke Skywalker','Chewie Bacca','Lando Calrissian','Leia Organa','Obi-Wan Kenobi','Admiral Ackbar']
        }
        ],
    players : []
    }


render(state, container)

function render(data, into) {
  // TODO

  // CALL FUNCTIONS
  renderHeader(state, header);    // render header
  renderGameChoices(state, container);   // render home page buttons
  //renderPlayerContainer(state, container);    // render player list container



// HEADER CODE

// Drop Down Menu - currently pulling list of groups
// change to: 'Home // Teams // Edit Games // ...?
function renderDropDownItem(item) {
  // return `<a href="#">${item.name}</a>`
  console.log(item);
  return `<span id="${item}"><a href="#">${item}</a></span>`     
}

var link = document.querySelector('#drop-down-list');
link.addEventListener("click", doSomething, false);
console.log(link);
function doSomething(callback){
  var teamLink = link.li.span.a.value;
  console.log('teamLink value: ' + teamLink);
}
    // // Create New Game Function
    // function doSomething(callback) {
    //   var dateCreate = document.getElementById('create-gameDate').value;  // get selected date, assign to dateCreate 
    //   // console.log('Selected date: ' + dateCreate);  // check
    //   if (dateCreate != '') {
    //     firebase.database().ref('games/' + dateCreate).push({ // push new game date
    //       team: 'teamRED',
    //     });
    //   console.log('Date added to database: ' + dateCreate);    // check
    //   } else {  // check - if no date selected, alert
    //     alert('Please select a new game date.');
    //   }
    // }


// Header 
// contains drop down, search bar, title
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

delegate('li', 'click', 'span', (event) => {
  var id = event.target.id.value;
  console.log(event.delegateTarget);
  //firebase.database().ref('tasks/' + id).remove();
  // renderList(state, document.querySelector('ul'));
});



// var choseTeam = document.querySelector('header');
// choseTeam.addEventListener("click", choseTeamFunction, false);

// // // Create New Game Function
// function choseTeamFunction(team) {
// 	var chosenTeam = document.header.getElementById('#item').value;  // get selected date, assign to dateCreate 

  
//     // console.log('Selected date: ' + dateCreate);  // check

//     if (dateCreate != '') {
//         firebase.database().ref('games/' + dateCreate).push({ // push new game date
//           team: 'teamRED',
//         });
//       console.log('Date added to database: ' + dateCreate);    // check
//     }

//    else {  // check - if no date selected, alert
//       alert('Please select a new game date.');
      
//     }  

// }



/* Call data */
// firebase.database().ref('players/').on('value', function(snapshot) {
//   console.log(snapshot.val());
// });


// VIEW 1 -- DEFAULT VIEW -- BUTTON CHOICE

function renderGameChoices(state, container){
  container.innerHTML = `
    <div class="gameChoicesDiv">
      <input type="date" id="create-gameDate" />
      <button id="button1" class="gameChoiceButton">Button 1 - Create game</button><br/>
    </div>
    <div class="gameChoicesDiv">
      <input type="date" id="view-gameDate" />
      <button id="button2" class="gameChoiceButton">Button 2 - View game</button><br/>
    </div>
    <div class="gameChoicesDiv">
      <input type="date" id="delete-gameDate" />
      <button id="button3" class="gameChoiceButton">Button 3 - Delete game</button><br/>
    </div>
  `
}


// ADD GAME ACTIONS

var createGame = document.querySelector('#button1');
createGame.addEventListener("click", createNewGameFunction, false);

// Create New Game Function
function createNewGameFunction(gameDate) {
  var dateCreate = document.getElementById('create-gameDate').value;  // get selected date, assign to dateCreate 
  // console.log('Selected date: ' + dateCreate);  // check
  if (dateCreate != '') {
    firebase.database().ref('games/' + dateCreate).push({ // push new game date
      team: 'teamRED',
    });
  console.log('Date added to database: ' + dateCreate);    // check
  } else {  // check - if no date selected, alert
    alert('Please select a new game date.');
  }
}

// DELETE GAME ACTIONS

var deleteGameButton = document.querySelector('#button3');
deleteGameButton.addEventListener('click', deleteGameFunction, false);

// Delete game function
function deleteGameFunction(gameDate) {
  var dateDelete = document.getElementById('delete-gameDate').value; // get value of delete date
    console.log('Selected date: ' + dateDelete);  // check
    if ((dateDelete != '') && confirm("Are you sure you want to delete this game date?") == true) {
      firebase.database().ref('games/' +dateDelete).set({
      //dateDelete : {
      
      //}
      });
      console.log('Game date deleted from database: ' + dateDelete);    // check
    } else if (dateDelete == '') {
      alert("Did you mean to select a game date to delete?");
    }
}

// firebase.database().ref('teams/').on('value', function(snapshot) {
//   console.log(snapshot.val());
// });




// VIEW 2 -- TEAM PLAYER LIST

function renderPlayer(item) { // renders Player name
  return (
    `<a href="#">${item}</a>`
  )
}

// render Team List
function renderPlayerContainer(state, container) {
  container.innerHTML = `
    <section id="main" class="wrapper">
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






































// close main render function
  }
})()





