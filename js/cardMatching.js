// This is 'cardMatching.js' File of Fun2Learn

/*
==========================================================================================================================================================================================
                                                                U T I L I T Y   R E Q U I R E M E N T S 
==========================================================================================================================================================================================
*/

// Array Containing the images name
// const deckCards = ["Agility.png", "Agility.png", "Boat.png", "Boat.png", "Citizenship.png", "Citizenship.png", "Hack.png", "Hack.png", "Nerd-Rage.png", "Nerd-Rage.png", "taj.jpeg", "taj.jpeg", "Robotics.png", "Robotics.png", "Shock.png", "Shock.png"];

const deckCards = [
    "Andaman_Nicobar.jpg", "Andaman_Nicobar.jpg",
    "Delhi.jpg", "Delhi.jpg",
    "Gujarat.jpg", "Gujarat.jpg",
    "Maharashtra.jpg", "Maharashtra.jpg",
    "Punjab.jpg", "Punjab.jpg",
    "Rajasthan.jpg", "Rajasthan.jpg",
    "Telangana.jpg", "Telangana.jpg",
    "Uttar_Pradesh.jpg", "Uttar_Pradesh.jpg"
]

// Getting all required components via ID and Query Selector
const deck = document.querySelector(".deck");
let opened = [];
let matched = [];
const modal = document.getElementById("modal");
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again-btn");
const movesCount = document.querySelector(".moves-counter");
const star = document.getElementById("star-rating").querySelectorAll(".star");
const timeCounter = document.querySelector(".timer");

// Initialising variables
let moves = 0;
let starCount = 3;
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

/*
==========================================================================================================================================================================================
                                                            S H U F F L E       A R R A Y       F U N C T I O N
==========================================================================================================================================================================================
*/

function shuffle(array){

  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0){
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
==========================================================================================================================================================================================
                                                                S T A R T       G A M E     F U N C T I O N
==========================================================================================================================================================================================
*/

function startGame(){

    // Invoke shuffle function and store in variable
    const shuffledDeck = shuffle(deckCards); 
    
    // Iterate over deck of cards array
    for (let i=0; i < shuffledDeck.length; i++) {
        
        // Create the <li> tags
        const liTag = document.createElement('LI');
        
        // Give <li> class of card
        liTag.classList.add('card');
        
        // Create the <img> tags
        const addImage = document.createElement("IMG");
        
        // Append <img> to <li>
        liTag.appendChild(addImage);
        
        // Set the img src path with the shuffled deck
        addImage.setAttribute("src", "images/" + shuffledDeck[i]);
        
        // Add an alt tag to the image
        addImage.setAttribute("alt", "image of vault boy from fallout");
        
        // Update the new <li> to the deck <ul>
        deck.appendChild(liTag);
    }

}

// Call to the start Game Function
startGame();

/*
==========================================================================================================================================================================================
                                                                R E M O V E     C A R D    F U N C T I O N
==========================================================================================================================================================================================
*/

function removeCard() {
  
    // As long as <ul> deck has a child node, remove it
    while (deck.hasChildNodes()) {
        deck.removeChild(deck.firstChild);
    }
}

/*
==========================================================================================================================================================================================
                                                                    T I M E R     F U N C T I O N
==========================================================================================================================================================================================
*/

function timer() {
  
    // Update the count every 1 second
    time = setInterval(function() {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }

        // Update the timer in HTML with the time it takes the user to play the game
        timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: " + minutes + " Mins " + seconds + " Secs" ;
    }, 1000);
}


function stopTime() {
  clearInterval(time);
}

/*
==========================================================================================================================================================================================
                                                                    R E S E T    F U N C T I O N
==========================================================================================================================================================================================
*/

function resetEverything() {
  
    // Stop time, reset the minutes and seconds update the time inner HTML
    stopTime();
    
    timeStart = false;
    seconds = 0;
    minutes = 0;
    timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";
    
    // Reset star count and the add the class back to show stars again
    star[1].firstElementChild.classList.add("fa-star");
    star[2].firstElementChild.classList.add("fa-star");
    starCount = 3;
    
    // Reset moves count and reset its inner HTML
    moves = 0;
    movesCount.innerHTML = 0;
    
    // Clear both arrays that hold the opened and matched cards
    matched = [];
    opened = [];
    
    // Clear the deck
    removeCard();
    
    // Create a new deck
    startGame();
}

/*
==========================================================================================================================================================================================
                                                                M O V E S       C O U N T E R     F U N C T I O N
==========================================================================================================================================================================================
*/

function movesCounter() {

    // Update the html for the moves counter
    movesCount.innerHTML ++;
    
    // Keep track of the number of moves for every pair checked
    moves ++;
}

/*
==========================================================================================================================================================================================
                                                                S T A R      R A T I N G       F U N C T I O N
==========================================================================================================================================================================================
*/

function starRating() {

    if (moves === 14) {
        star[2].firstElementChild.classList.remove("fa-star");
        starCount--;
    }

    if (moves === 18) {
        star[1].firstElementChild.classList.remove("fa-star");
        starCount--;
    }
}

/*
==========================================================================================================================================================================================
                                                                C O M P A R E      T W O      C A R D    F U N C T I O N
==========================================================================================================================================================================================
*/

function compareTwo() {

    // When there are 2 cards in the opened array
    if (opened.length === 2) {
        
        // Disable any further mouse clicks on other cards
        document.body.style.pointerEvents = "none";
    }
    
    // Compare the two images src
    if (opened.length === 2 && opened[0].src === opened[1].src) {
        
        // If matched call match()
        match();

    } 
    
    else if (opened.length === 2 && opened[0].src != opened[1].src) {
        
        // If No match call noMatch()
        noMatch();
    }
}

/*
==========================================================================================================================================================================================
                                                                            C A R D S   M A T C H E D
==========================================================================================================================================================================================
*/

function match() {
  
    setTimeout(function() {

        opened[0].parentElement.classList.add("match");
        opened[1].parentElement.classList.add("match");
        
        // Push the matched cards to the matched array
        matched.push(...opened);
        
        // Allow for further mouse clicks on cards
        document.body.style.pointerEvents = "auto";
        
        // Check to see if the game has been won with all 8 pairs
        winGame();
        
        // Clear the opened array
        opened = [];

    }, 600);

    // Call movesCounter to increment by one
    movesCounter();
    starRating();
}

/*
==========================================================================================================================================================================================
                                                                        C A R D S       N O T      M A C H E D
==========================================================================================================================================================================================
*/

function noMatch() {
    
    setTimeout(function() {
        
        // Remove class flip on images parent element
        opened[0].parentElement.classList.remove("flip");
        opened[1].parentElement.classList.remove("flip");
        
        // Allow further mouse clicks on cards
        document.body.style.pointerEvents = "auto";
        
        // Remove the cards from opened array
        opened = [];
    }, 700);

    // Call movesCounter to increment by one
    movesCounter();
    starRating();
}

/*
==========================================================================================================================================================================================
                                                                    A D D       S T A T S       F U N C T I O N
==========================================================================================================================================================================================
*/

function AddStats() {

    // Access the modal content div
    const stats = document.querySelector(".modal-content");
    
    // Create three different paragraphs
    for (let i = 1; i <= 3; i++) {
        
        // Create a new Paragraph
        const statsElement = document.createElement("p");
        
        // Add a class to the new Paragraph
        statsElement.classList.add("stats");
        
        // Add the new created <p> tag to the modal content
        stats.appendChild(statsElement);
    }
    
    // Select all p tags with the class of stats and update the content
    let p = stats.querySelectorAll("p.stats");
        
    // Set the new <p> to have the content of stats (time, moves and star rating)
        p[0].innerHTML = "Time to complete: " + minutes + " Minutes and " + seconds + " Seconds";
        p[1].innerHTML = "Moves Taken: " + moves;
        p[2].innerHTML = "Your Star Rating is: " + starCount + " out of 3";
}

/*
==========================================================================================================================================================================================
                                                                M O D A L       D I S P L A Y       F U N C T I O N
==========================================================================================================================================================================================
*/
function displayModal() {

    // Access the modal <span> element (x) that closes the modal
    const modalClose = document.getElementsByClassName("close")[0];
    
    // When the game is won set modal to display block to show it
    modal.style.display= "block";
    
    // When the user clicks on <span> (x), close the modal
    modalClose.onclick = function() {
        modal.style.display = "none";
    };
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {

        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

/*
==========================================================================================================================================================================================
                                                                        W I N       G A M E     F U N C T I O N
==========================================================================================================================================================================================
*/

function winGame() {

    if (matched.length === 16) {
        stopTime();
        AddStats();
        displayModal();
    }
}

/*
==========================================================================================================================================================================================
                                                                        O N     C L I C K I N G     F U N C T I O N S
==========================================================================================================================================================================================
*/

// On Clicking any of the card
deck.addEventListener("click", function(evt) {

    if (evt.target.nodeName === "LI") {
        
        // To console if I was clicking the correct element 
        console.log(evt.target.nodeName + " Was clicked");
        // Start the timer after the first click of one card Executes the timer() function
        
        if (timeStart === false) {
            timeStart = true; 
            timer();
        }

        // Call flipCard() function
        flipCard();
    }

    //Flip the card and display cards img
    function flipCard() {
        
        // When <li> is clicked add the class .flip to show img
        evt.target.classList.add("flip");
        
        // Call addToOpened() function
        addToOpened();
    }
    
    //Add the fliped cards to the empty array of opened
    function addToOpened() {
        
        if (opened.length === 0 || opened.length === 1) {
            // Push that img to opened array
            opened.push(evt.target.firstElementChild);
        }
        
        // Call compareTwo() function
        compareTwo();
    }
});

reset.addEventListener('click', resetEverything);
    playAgain.addEventListener('click',function() {
    modal.style.display = "none";
    resetEverything();
});