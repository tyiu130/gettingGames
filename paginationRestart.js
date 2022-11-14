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
  gettingGames.paginationStyling(gettingGames.selectedPage);
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
  // const navPageNumsArray = document.querySelectorAll('.pageNums');
  const pageNum1 = document.querySelector('.pageNums');
  // const pageNum2 = document.querySelector('#2');
  // const pageNum3 = document.querySelector('#3');
  // const pageNum4 = document.querySelector('#4');
  // const pageNum5 = document.querySelector('#5');
  
  
  // foreach loop to assign a different node variable to each a element
  // navPageNumsArray.forEach(anchorElement => {
  //   userPage.value = anchorElement.id;
  //   //for each navAnchor, create an anchorElementTarget for it
  //   console.log(anchorElement, anchorElement.value, anchorElement.id);
  // });
  // // simplify it and just make a const for each pageNumAnchor based on the id
    // have event listeners for both triggers of an api call
  
  userGenre.addEventListener('change', function (event) {
    event.preventDefault();
    gettingGames.userQuery = this.value;
    gettingGames.getGames(gettingGames.userQuery, gettingGames.selectedPage);
  });

  pageNum1.addEventListener('click', function (event) {
    event.preventDefault();
    gettingGames.selectedPage = this.value;
    // gettingGames.getGames(gettingGames.userQuery, gettingGames.selectedPage);
  })
  const pageNumbers = document.querySelectorAll('.pageNums');
  pageNumbers.forEach(pageNumber => {
    // reassign the value of gettingGames.selectedPage to reflect the newly selected pageNumber

    pageNumber.addEventListener('click', function (event) {
      event.preventDefault();
      gettingGames.selectedPage = event.target.id;
      // console.log(event.target.id);
      gettingGames.getGames(gettingGames.userQuery, gettingGames.selectedPage);
      // call a function that accpts the newly updated selectedPage and does the logic to dynamically update the styling to reflect 
      gettingGames.paginationStyling(gettingGames.selectedPage);
    });
  });
    //event.target.value = pageId 
  // if (event.target === gettingGames.selectedPage) {
  // gettingGames.selectedPage = event.target.value
  // }
  // if (event.target = userGenre) {
  //   gettingGames.userQuery = userGenre;
  //   console.log(userGenre);
  //   gettingGames.getGames(gettingGames.userQuery, gettingGames.selectedPage);
  // }

  // const gettingGamesBody = document.querySelector('body');
  // //listen to the whole dom for change
  // gettingGamesBody.addEventListener('change', function(event){
  //   event.preventDefault();
  //   console.log(event.target, this.value);


  // target all a elements and replace (which will reset the class list to) 'pageNums'
  // pageNumber.classList.replace('currentPage', 'pageNums');

  // // give each pageNumber a unique var name to check in the logic:
  // console.log(pageNumber.id);
  // if (pageNumber.id === gettingGames.selectedPage) {
  //   pageNumber.classList.add('currentPage');
  // } else if (pageNumber.id !== gettingGames.selectedPage) {
  //   pageNumber.classList.replace('currentPage', 'pageNums');
  // }
    // dynamically style the pageNum anchors to reflect their curent state.
      // if the gettingGames.selectedPage = the id of the element, add 'currentPage' to classList
      // else if gettingGames.selectedPage !== the id of the element, remove 'currentPage' from the classList

    // gettingGames.userQuery = userGenre.value;
    // gettingGames.selectedPage = userPage.id;

    // console.log(gettingGames.userQuery, gettingGames.selectedPage);
    // gettingGames.getGames(gettingGames.userQuery, gettingGames.selectedPage);

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
  
  
  // });
} 

gettingGames.paginationStyling = function(numberToHighlight){
  const pageNumbers = document.querySelectorAll('.pageNums');
  console.log(gettingGames.selectedPage);

  pageNumbers.forEach(pageNumber => {
    // if (gettingGames.selectedPage === 1 ) {
    //   pageNumber.classList.add('currentPage');
    // } else 
    if (pageNumber.id === numberToHighlight) {
      console.log('hey');
      pageNumber.classList.add('currentPage');
    } else {
      // make sure all ofther a's class lists only have pageNums
      pageNumber.classList.replace('currentPage', 'pageNums')
    }
  });
   // dynamically style the pageNum anchors to reflect their curent state.
      // if the gettingGames.selectedPage = the id of the element, add 'currentPage' to classList
      // else if gettingGames.selectedPage !== the id of the element, remove 'currentPage' from the classList
  
};
  
gettingGames.init();
