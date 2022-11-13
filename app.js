// Create an app object (gettingGames)
const gettingGames = {};

// //Api call method for doing more digging
// gettingGames.genreUrl = new URL('https://api.rawg.io/api/genres');
// gettingGames.getGameGenres = function () {
//   gettingGames.genreUrl.search = new URLSearchParams({
//     key: gettingGames.rawgApiKey
//   });

//   fetch(gettingGames.genreUrl)
//     .then(function (res) {
//       return res.json()
//     })
//     .then(data => {
//       let results = data.results
//       console.log(results);
//       gettingGames.displayGames(results)
//     });
// }
  // gettingGames.getGameGenres();





// Initialize preset data in the dedicated properties
gettingGames.url = new URL('https://api.rawg.io/api/games');
gettingGames.rawgApiKey = 'ee7f1b60d0424455b0c8ac0b09a03e17';
gettingGames.userQuery = 'action';
gettingGames.selectedPage = 1;

// gettingGames.pageNum = 1; //sets the default pageNum so that the api call with filters can be made with or without users changing the pageNum by clicking on the nav inputs

// Create an init method to kick off the setup of the application
// - calls the local method (getGames) for a random games to start
// - add a 'change' event listener to call the local method (getUserQuery), to track user input
gettingGames.init = function(){
  // gettingGames.getGames();
  gettingGames.setUpEventListeners();
  gettingGames.getGamesWithFilters()
};

// Create a method (getGames) to make API call on page load (no filtering by user inputs)
gettingGames.getGames = function(){
  gettingGames.url.search = new URLSearchParams({
    key: gettingGames.rawgApiKey,
    page_size: 24    
  });

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
      // console.log(results);
      gettingGames.displayGames(results)
    })
    .catch((err) => {
        alert("Something went wrong and we don't know what happened.");
      }
    )
}

// method to display the results of the api calls on the page (accepts parameters for: gameName, gamePoster) and is called in the api calling methods with the parameters
gettingGames.displayGames = function(arrayOfGames){ 
  // target the gamesUl 
  const gameContainer = document.querySelector('.gameContainer');
  gameContainer.innerHTML = '';

  // for resetting the contents of the game container to nothing before appending new stuff to it
  // gameCard.innerHTML = '';

  // console.log(arrayOfGames);
  // includes a foreach loop to go through the array that will be returned by the api call
  arrayOfGames.forEach(function(game){
    const gameCard = document.createElement('li');
    gameCard.classList.add('gameCard');

    // gettingGames.gameName = results.[].name
    const gameName = document.createElement('h2');
    // gameName.classList.add(gameName);
    gameName.textContent = game.name;
    // gettingGames.gameImg = results[].background_image
    const gameImg = document.createElement('img');
    gameImg.src = game.background_image;
    gameImg.alt = `background image of ${game.name}`;

    // add game info to the gameCard li's and then to the ul
    gameCard.appendChild(gameName);
    gameCard.appendChild(gameImg);
    gameContainer.appendChild(gameCard);
  });
}


// Create a method (getUserQuery) to update the variable (userQuery) based on user input from the dropdown(in a form) - event listeners
gettingGames.setUpEventListeners = function(){
  //~~~ put the event listener on the whole dom and save the targets of the dropdown and the page list and make an event handler for change to either of these points - probably a conditional. 
    // make another conditional for if the infoButton is clicked and call the modal event handler

  const userQuery = document.querySelector('#genre');
  let getGamesByGenre = '';
  userQuery.addEventListener('change', function (event) {
    event.preventDefault();
    getGamesByGenre = this.value;
    gettingGames.getGamesWithFilters(getGamesByGenre);
  });
  const openBtn = document.querySelector('.infoPopup');
  const closeBtn = document.querySelector('.closeButton');
  const modal = document.querySelector('.modal');
  const modalBackground = document.querySelector('.modalBackground');

  openBtn.addEventListener('click', function (event) {
    modal.classList.add('openModal');
    modalBackground.classList.add('openModal');
  })

  closeBtn.addEventListener('click', function (event) {
    modal.classList.remove('openModal');
    modalBackground.classList.remove('openModal');
  })

  modalBackground.addEventListener('click', function (event) {
    // if the click happens on the modalbackground && !modal then do the class remove stuff
    if (event.target === modalBackground) {
      modal.classList.remove('openModal');
      modalBackground.classList.remove('openModal');
    }
  })

// let classList = gettingGames.selectedPage.classList;
    // classList.toggle('currentPage');
    // // having the styling reflect the page that the user has selected/is on
    // // target the selected

    // target
    // the id of the a = if the value of gettingGames.selectedPage {
      // a.classList.add('currentPage);
    // }
  const pageNumbers = document.querySelectorAll('.pageNums');
  pageNumbers.forEach(pageNumber => {
    pageNumber.addEventListener('click', function (event) {
      event.preventDefault();
      gettingGames.selectedPage = event.target.id;
      const pageSelection = event.target;
      pageSelection.classList.add('currentPage');
      // pageSelection.classList.add
      // console.log(gettingGames.selectedPage);
      // ~~~ id's shouldn't be used to target nodes for styling
        // the event handler should add to the class list if the node is the target of the click
      // if (pageNumber.id != gettingGames.selectedPage) {
      //   pageNumber.classList.replace('currentPage', '');
      // } else if (pageNumber.id === gettingGames.selectedPage) {
      //   pageNumber.classList.add('currentPage');
      //   console.log(pageNumber);
      // } 
      gettingGames.getGamesWithFilters(getGamesByGenre);
    });
    //with subsequent clicks of the page numbers, the class lists are not updating to remove currentPage. it's savign teh state/history of having been clicked.
    
  });
  // do a for each to target the id of the selected a  ?

  
}

gettingGames.pagination = function (numOfGames) {
  // get the count of games returned from the api and do math to divide it by 24 (=the number of games displayed on the page at once)
    // ~ for adventure genre this turned out to be 5281 lis needed. I propose we adjust the app so that it returns the top 100 games based on rating to the player. (there is a way to have the returned games sorted by rating in the searchParams) // not sure how to sort the returned games. i tried using ordering as a search param but i'm not sure how it is sorting the games/if i needed to put in a score?
  // create that many numbered li's in the nav //~ because we know that we're only going to be displaying 100 games, we only need 5 pages of games. a ***stretch goal*** could be to have pagination for all the games in the genre. but when we add more filter options, the number of returned games should be smaller and easier to manage....?
  //~not needed at this juncture //add event listners to the nav ul for clicks on lis that aren't there on page load
  // give the lis the same value as the count
  //~not needed at this juncture // update the value of pageNum based on the li the user selects with the click event
  // call the gettingGames.getGamesWithFilters method with the updated pageNum
}

// Create a method (getGamesByGenre) to make API calls, which takes the user input as a parameter (userQuery) - receives arguments of userQueries when called in the event listeners 
  // pagination:
    // take the pageNum from a function that listens to the user interaction (nav buttons) and puts it into the api call
      // updates the variable: gettingGames.pageNum
gettingGames.getGamesWithFilters = function (userGenre, currentPage) {
  gettingGames.url.search = new URLSearchParams({
    key: gettingGames.rawgApiKey,
    genres: userGenre,
    page_size: 24,
    page: currentPage
    // ordering: '-matacritic'
  });
  console.log(userGenre, currentPage);
  // console.log(userGenre);
  fetch(gettingGames.url)
    .then(function (res) {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText);
      }
    })
    .then(data => {
      // let numOfGames = data.count;//pass this number to the method that appends the number of pages there are to the nav list - save data.count as a var and call the pagination function with it
      let results = data.results;
      if (results.length <1) {
        throw new Error("no data");
      }
      gettingGames.displayGames(results);
    })
    .catch((err) => {
      if (err.message === "no data") {
        alert("We couldn't get the games! Try a different genre.");
      } else {
        alert("Something went wrong and we don't know what happened.");
      } 
    });
}



// When the API call is successful, display the result by appending the data to the results div
// If the API call fails, display an error message

gettingGames.init();

// Stretch goals
  // Popup modal button for instructions, the user can click on to open for the instructions on how to use the app
    // Terri





  // see more than 20 games  - pagination?
    // Kirsten
  
  // expand the form containing the dropdown to have more inputs and a submit button that triggers the api call 
    // both - pair programming during project work time?

    // eventhandling targets the value of the page and the dropdown selection value and feeding that to the api call. 
    // so the api call search params will be looking for page number and genre
      //take the target out of the forloop?
      