// DOM MANIPULATIONS

const squareOne = document.getElementById("grid__square-1");
const squareTwo = document.getElementById("grid__square-2");
const squareThree = document.getElementById("grid__square-3");
const squareFour = document.getElementById("grid__square-4");
const squareFive = document.getElementById("grid__square-5");
const squareSix = document.getElementById("grid__square-6");
const squareSeven = document.getElementById("grid__square-7");
const squareEight = document.getElementById("grid__square-8");
const squareNine = document.getElementById("grid__square-9");

const allSquares = document.querySelectorAll(".grid__square");

const playerOneScore = document.getElementById("info__player__score1");
const playerTwoScore = document.getElementById("info__player__score2");

const infoText = document.getElementById("instructions__text");
const startGameBtn = document.getElementById("instructions__btn");

const modal = document.getElementById("modal");

//Variables

const players = {
    playerOne:{ name: "John", wins: 0},
    playerTwo:{ name: "Doe", wins: 0 }
}

let move = 1;
let nextPlayer = players.playerOne.name;
let pastPlayer;
let currentImage = "cross";
let playerHasWon = false;

// Square clicking

function addSquareClick(){
    allSquares.forEach((square) => {
        square.addEventListener("click", SquareClick)
    });
}

function removeSquareClick(){
    allSquares.forEach((square) => {
        square.removeEventListener("click", SquareClick)
    });
}

function SquareClick() {
    if(!this.classList.contains("cross") && !this.classList.contains("circle")){
    this.classList.add(`${currentImage}`)
    incrementMove();
    }
}

addSquareClick();

//Increment Move

function incrementMove(){
    move+= 1;
    if(move % 2 !== 0){
        nextPlayer = players.playerOne.name;
        pastPlayer = players.playerTwo.name;
        currentImage = "cross";
        infoText.innerHTML = `${players.playerOne.name}'s turn`;
    }
    else {
        nextPlayer = players.playerTwo.name;
        pastPlayer = players.playerOne.name;
        currentImage = "circle";
        infoText.innerHTML = `${players.playerTwo.name}'s turn`;
    }

    checkForWin();
    checkForTie();
}

//Check for Win
    function checkForWin(){
        const lines = [[squareOne, squareTwo, squareThree], // horizontal
                      [squareFour, squareFive, squareSix],
                      [squareSeven, squareEight, squareNine],
                      
                      [squareOne, squareFour, squareSeven],  // vertical
                      [squareTwo, squareFive, squareEight],
                      [squareThree, squareSix, squareNine],

                      [squareOne, squareFive, squareNine],   //diagonal
                      [squareThree, squareFive, squareSeven]
                      ];

                      for(const line of lines){
                        const hasCross = line.every((square) => square.classList.contains("cross"))
                        const hasCircle = line.every((square) =>square.classList.contains("circle"))
                        if(hasCross || hasCircle) {
                            const winner = hasCross ? players.playerOne : players.playerTwo;
                            winner.wins +=1;
                            updateScores();
                            playerWon();
                            return;
                        }
                      }
    }

    function updateScores() {
        playerOneScore.innerHTML = players.playerOne.wins;
        playerTwoScore.innerHTML = players.playerTwo.wins;
    }
    function playerWon(){
        infoText.innerHTML = `${pastPlayer} WON!`;
        playerHasWon = true;
        continueGame(); 
    }

//Check for TIE

function checkForTie() {
    const squares = [squareOne,
                     squareTwo,
                     squareThree,
                     squareFour,
                     squareFive,
                     squareSix,
                     squareSeven,
                     squareEight,
                     squareNine
                    ];
    const allSquaresFilled = squares.every((square) => {
        return(
            square.classList.contains("cross") || square.classList.contains("circle")
        );
    });
    
    if(allSquaresFilled && !playerHasWon) {
        infoText.innerHTML = "It's a TIE! &#128517;";
        continueGame();
    }
}

// CONTINUE // RESTART // RESET ////GAME

function continueGame() {
    removeSquareClick();
    setTimeout(() => {
        reset();
    }, 4000);
}

function restartGame(){
    removeSquareClick();
     reset();   
}

function reset() {
    allSquares.forEach((square) => {
        square.classList = "grid__square";
    });
    addSquareClick();
    playerHasWon = false;
    infoText.innerHTML = `${nextPlayer}'s turn to Start`;
}

// START GAME

function startGame() {
    startGameBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });


const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const player1Input = document.getElementById("player1").value.trim().toLowerCase();
    const player2Input = document.getElementById("player2").value.trim().toLowerCase();

    const player1InputCap = player1Input.charAt(0).toUpperCase() + player1Input.slice(1);
    const player2InputCap = player2Input.charAt(0).toUpperCase() + player2Input.slice(1);

    players.playerOne.name = player1InputCap;
    players.playerTwo.name = player2InputCap;
    nextPlayer = player1InputCap;

    document.getElementById("info__player__name1").innerHTML = players.playerOne.name;
    document.getElementById("info__player__name2").innerHTML = players.playerTwo.name;

    players.playerOne.wins = 0;
    players.playerTwo.wins = 0;
    updateScores();

    infoText.innerHTML = `${players.playerOne.name}'s turn to Start`;
    modal.style.display = "none";

    startGameBtn.innerHTML = "Restart Game";
    addSquareClick();
    restartGame();

});
}

startGame();