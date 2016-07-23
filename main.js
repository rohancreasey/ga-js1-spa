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
      // how to check current date
    groups : ['teamRED','teamBLUE','teamYELLOW'],
    teams : [
              { 
                name : 'teamRED',
                players : ['Rohan Creasey','Amy Simmons','Jess Telford','Lauren Bliss','Ryan Baynes','Jack Huang','Irene Kurniawan']
              },
	            { 
                name : 'teamBLUE',
                players : []
              },
              { 
                name : 'teamYELLOW',
                players : []
              }
            ],
    players : ['Rohan Creasey','Amy Simmons','Jess Telford','Lauren Bliss','Ryan Baynes','Jack Huang','Irene Kurniawan']    
  }

  render(state, container)

  function render(data, into) {
    // TODO

// Drop Down Menu - currently pulling list of teams.name
// change to: 'Home // Teams // Edit Games // ...?
function renderDropDownItem(item) {
      return `<a href="#">${item.name}</a>`
}

// Header 
// contains drop down, search bar, title
function renderHeader(state, header) {
	  header.innerHTML = 
      `
        <section class="wrapper">
	        <div id="title"  style="float:right;">
            <a href="#"><h1>Roster App</h1></a>
          </div>
            <nav>
              <section id="search">
                <input type="text" name="name" value="">
                  <!-- <div id="search-icon"><img src="images/search.png" alt="" /></div> -->
              </section>
              <ul>
                <li><a href="#">Team: <span></span></a>
                  <ul>
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



/* Call data */
// firebase.database().ref('players/').on('value', function(snapshot) {
//   console.log(snapshot.val());
// });

      // firebase.database().ref('players/name/').on('value', function(snapshot) {

      //         var outputValues = []
      //         snapshot.forEach((value, key) = > {
      //                 outputValues.push(` < li > ${
      //                         value
      //                     } < /li>`);
      //   })

      //   into.innerHTML = outputValues.join('')
      //   console.log(outputValues);

/* Setting test data

firebase.database().ref('players/').push({
  name: 'Kym Ferrario',
  team: {
      "teamRED" : true,
      "teamBLUE" : true,
      "teamYELLOW" : true
  }
});

*/

// firebase.database().ref('teams/RED/').push({
//   coach: 'Coachy McCoach',
//   members: {
//       "Lauren Bliss" : true,
//       "Byron McReady" : true,
//       "Melissa Shakas" : true
//   }
// });

/* working to render team names from Object
        function renderPlayer(item) {
            return(
              `
                <a href="#">${item.name}</a>
              `
              )
        }

        // renderContainer() that holds list of players inside #container
        function renderContainer(state, container) {
          container.innerHTML = `
            <section id="main" class="wrapper">
            MOO
                    ${state.teams.map((item) => {
                        return `<li>${renderPlayer(item)}</li>`
                    }).join('')}

            </section>
          `
        }
*/

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
































//call functions


renderHeader(state, header);    // render header
renderPlayerContainer(state, container);    // render container





// close main render function
  }
})()





