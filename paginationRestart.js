// Create an app object (gettingGames)
const gettingGames = {};

// declare universal variables
gettingGames.url = new URL('https://api.rawg.io/api/games');
gettingGames.rawgApiKey = 'ee7f1b60d0424455b0c8ac0b09a03e17';
gettingGames.userQuery = 'action';
gettingGames.selectedPage = 1;

// init method declaration
gettingGames.init = function(){
  gettingGames.getGames(gettingGames.userQuery, gettingGames.selectedPage);
  gettingGames.handlingEvents();
}

gettingGames.getGames = function(userGenre, currentPage) {
  // api call with search params for apiKey, page_size, userQuery, and selectedPage. the last two are function parameters that accept arguments from the event listeners
  //   fires on successful init with preset arguments
  //   is called by eventHandler with updated argument values
  // calls gettingGames.displayGames with the successfully returned game array
  gettingGames.url.search = new URLSearchParams({
    key: gettingGames.rawgApiKey,
    genres: userGenre,
    page_size: 24,
    page: currentPage
  });
  console.log(userGenre, currentPage);
  fetch(gettingGames.url)
    .then(function (res) {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText);
      }
    })
    .then(data => {
      let results = data.results
      console.log(results);
      gettingGames.displayGames(results)
    })
    .catch((err) => {
      alert("Something went wrong and we don't know what happened.");
    });
}


// gettingGames.displayGames
  //take the array of game data that is returned by the api call and render it to the page


gettingGames.handlingEvents = function () {
  const userGenre = document.querySelector('#genre');
  const userPage = document.querySelectorAll('.pageNums');
  const gettingGamesBody = document.querySelector('body');
  //listen to the whole dom for change
  gettingGamesBody.addEventListener('change', function(event){
    event.preventDefault();
    console.log(userGenre, userPage);



    gettingGames.userQuery = userGenre.value;
    gettingGames.selectedPage = userPage.id;

    console.log(gettingGames.userQuery, gettingGames.selectedPage);
    gettingGames.getGames(gettingGames.userQuery, gettingGames.selectedPage);

  // want to end up calling the getGames method with the arguments generated by the event listening


  //event handling:
  // if (event.target of the click === a or b) { apiCall(a.value, b.value) }
  // if the click is on either of the following two points, capture the value:
  // a. userQuery from the dropdown
  // b. the page that is on/selected.
  // handler for clicking on either of these points calls the api call method
  // ~~~ id's shouldn't be used to target nodes for styling
  // the event handler should add to the class list if the node is the target of the click
  
  // if the click is on any of the modal targets, do the modal stuff
  // handler on the info popup and modal call the handler
  
  
  })
} 
  
gettingGames.init();
