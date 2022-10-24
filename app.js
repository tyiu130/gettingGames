// Create an app object (gettingGames)
const gettingGames = {};

// Initialize preset data in the dedicated properties
gettingGames.url = new URL('http://api.rawg.io/api/games');
gettingGames.rawgApiKey = 'ee7f1b60d0424455b0c8ac0b09a03e17';
gettingGames.userQuery = '';

// Create an init method to kick off the setup of the application
// - calls the local method (getGames) for a random games to start
// - add a 'change' event listener to call the local method (getUserQuery), to track user input
gettingGames.init = () => {
  gettingGames.getGames();
  gettingGames.setUpEventListeners();
};

// Create a method (getGames) to make API call on page load (no filtering by user inputs)
gettingGames.getGames = () => {
  gettingGames.url.search = new URLSearchParams({
    key: gettingGames.rawgApiKey,
    ordering: 'genres'
    
  });

  fetch(gettingGames.url)
    .then(function (res) {
      return res.json()
    })
    .then(data => {
      let results = data.results
      // console.log(results);
      gettingGames.displayGames(results)
    });
}

// method to display the results of the api calls on the page (accepts parameters for: gameName, gamePoster) and is called in the api calling methods with the parameters
gettingGames.displayGames = (arrayOfGames) => {
  // target the gamesUl 
  const gameContainer = document.querySelector('.gameContainer');
  gameContainer.innerHTML = '';

  // for resetting the contents of the game container to nothing before appending new stuff to it
  // gameCard.innerHTML = '';

  console.log(arrayOfGames);
  // includes a foreach loop to go through the array that will be returned by the api call
  arrayOfGames.forEach(game => {
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


// Create a method (getUserQuery) to update the variable (userQuery) based on user input from the dropdown(in a form)


// Create a method (getGamesByGenre) to make API calls, which takes the user input as a parameter (userQuery)

gettingGames.setUpEventListeners = function () {

  document.querySelector('#genre').addEventListener('change', function () {
    const getGamesByGenre = this.value;
    gettingGames.getGames(getGamesByGenre);
  })
}

// When the API call is successful, display the result by appending the data to the results div
// If the API call fails, display an error message


gettingGames.init();

// Stretch goals
  // Popup modal button for instructions, the user can click on to open for the instructions on how to use the app

  // expand the form containing the dropdown to have more inputs and a submit button that triggers the api call 