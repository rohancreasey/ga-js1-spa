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
    players : [],
    quoteOfDay : []    
    }


render(state, container)

function render(data, into) {
  // TODO

  // CALL FUNCTIONS
  renderHeader(state, header);    // render header
  // MOVED renderGameChoices(state, container);   // render home page buttons
  // renderPlayerContainer(state, container);    // render player list container
  // TEMP fetchQuotes();
    // SECOND QUOTE fetchQuotesOnDesign();

// 1. HEADER CODE

// Drop Down Menu - currently pulling list of groups
  // change to: 'Home // Teams // Edit Games // ...?
function renderDropDownItem(item) {
  // return `<a href="#">${item.name}</a>`
  // console.log(item);
  return `<a href="#">${item}</a>`     
}

// var link = document.querySelector('#drop-down-list');
// link.addEventListener("click", doSomething, false);
// // console.log(link);
// function doSomething(callback){
//   var teamLink = link;
//   console.log('teamLink value: ' + teamLink);
// }

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

delegate('#drop-down-list', 'click', 'a', (event) => {
  var id = event.delegateTarget.innerHTML;
  console.log(id);
  renderGameChoices(state, container);
  //firebase.database().ref('tasks/' + id).remove();
  // 
});

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


// var createGame = document.querySelector('#button1');
// createGame.addEventListener("click", createNewGameFunction, false);

// var deleteGameButton = document.querySelector('#button3');
// deleteGameButton.addEventListener('click', deleteGameFunction, false);

}

// ADD GAME ACTIONS
//debugger


// Create New Game Function
function createNewGameFunction(gameDate) {
  console.log('create-called');
  var dateCreate = document.getElementById('create-gameDate').value;  // get selected date, assign to dateCreate 
  // console.log('Selected date: ' + dateCreate);  // check
  if (dateCreate != '') {
    var currentGame = firebase.database().ref('games/' + dateCreate).push({ // push new game date
      team: 'teamRED',
      
    });
    console.log(currentGame.key);
    console.log('Date added to database: ' + dateCreate);    // check
    return currentGame.key;
  } else {  // check - if no date selected, alert
    alert('Please select a new game date.');
  }
}


// DELETE GAME ACTIONS

function deleteGameFunction(gameDate) {
  console.log('delete-called');
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






// FETCH QUOTES (max 10 per hour)

function fetchQuotes(){
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


































// delegates call functions when/IF element is clicked 

delegate('body', 'click', '#button1', createNewGameFunction)
delegate('body', 'click', '#button3', deleteGameFunction)


// close main render function
  }
})()





