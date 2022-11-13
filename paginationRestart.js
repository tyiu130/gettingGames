// Create an app object (gettingGames)
const gettingGames = {};

// declare universal variables
gettingGames.url = new URL('https://api.rawg.io/api/games');
gettingGames.rawgApiKey = 'ee7f1b60d0424455b0c8ac0b09a03e17';
gettingGames.userQuery = 'action';
gettingGames.selectedPage = 1;

// init method declaration
gettingGames.init = function(){
  gettingGames.getGames();
}

gettingGames.getGames = function() {
  console.log('hey');
}
  // api call with search params for apiKey, page_size, userQuery, and selectedPage. the last two are function parameters that accept arguments from the event listeners
  //   fires on successful init with preset arguments
  //   is called by eventHandler with updated argument values
  // calls gettingGames.displayGames with the successfully returned game array



// gettingGames.displayGames
  //take the array of game data that is returned by the api call and render it to the page

  
// gettingGames.handlingEvents 
  //event handling:
  // if (event.target of the click === a or b) { apiCall(a.value, b.value) }
    //listen to the whole dom for change 
      // if the click is on either of the following two points, capture the value:
        // a. userQuery from the dropdown
        // b. the page that is on/selected. 
        // handler for clicking on either of these points calls the api call method
      
      // if the click is on any of the modal targets, do the modal stuff
        // handler on the info popup and modal call the handler
      

// 

gettingGames.init();
