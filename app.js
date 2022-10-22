// Create an app object (gettingGames)
const gettingGames = {};

// Initialize preset data in the dedicated properties
// - gettingGames.url
  // const url = new URL('http://api.rawg.io/api/games');
// - gettingGames.rawgApiKey
  // const rawgApiKey = 'ee7f1b60d0424455b0c8ac0b09a03e17';
// - gettingGames.userQuery (initialize with an empty string)

// make an api call with only the api key (a page load method)

// Create a method (getUserQuery) to update the variable (userQuery) based on user input from the dropdown(in a form)

// Create a method (getGames) to make API calls, which takes the user input as a parameter (userQuery)
// When the API call is successful, display the result by appending the data to the results div
// If the API call fails, display an error message
url.search = new URLSearchParams({
  key: rawgApiKey

})

fetch(url)
  .then(function (res) {
    return res.json()
  })
  .then(data => {
    let results = data.results
    console.log(results[0].genres);
  })


// Create an init method to kick off the setup of the application
// - calls the local method (getGames) for a random games to start
// - add a 'change' event listener to call the local method (getUserQuery), to track user input


// Stretch goals
  // Popup modal button for instructions, the user can click on to open for the instructions on how to use the app

  // expand the form containing the dropdown to have more inputs and a submit button that triggers the api call 