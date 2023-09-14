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

const allSquare = document.querySelectorAll(".grid__square");

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
