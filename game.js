/* global
 *    HSB,
 *    background,
 *    colorMode,
 *    createCanvas,
 *    fill,
 *    mouseX,
 *    mouseY,
 *    stroke,
 *    rect,
 *    strokeWeight,
      circle,
      random, 
      width,
      key,
      height,
      mouseIsPressed,
      line,
      keyCode,
      UP_ARROW,
      windowWidth,
      windowHeight,
      createInput,
      text,
      textSize,
      noStroke,
      loadImage,
      image,
      getURLParams,
      millis,
      collidePointRect,
      collideRectCircle,
      createButton,
      noLoop,
 */

var easyWords = [
  "bridge",
  "bone",
  "grapes",
  "bell",
  "jellyfish",
  "bunny",
  "truck",
  "grass",
  "door",
  "monkey",
  "spider",
  "bread",
  "ears",
  "bowl",
  "bracelet",
  "alligator",
  "bat",
  "clock",
  "lollipop",
  "moon",
  "doll",
  "orange",
  "ear",
  "basketball",
  "bike",
  "airplane",
  "pen",
  "inchworm",
  "seashell",
  "rocket",
  "cloud",
  "bear",
  "corn",
  "chicken",
  "purse",
  "glasses",
  "blocks",
  "carrot",
  "turtle",
  "pencil",
  "horse",
  "dinosaur",
  "head",
  "lamp",
  "snowman",
  "ant",
  "giraffe",
  "cupcake",
  "chair",
  "leaf",
  "bunk",
  "bed",
  "snail",
  "baby",
  "balloon",
  "bus",
  "cherry",
  "crab",
  "football",
  "branch",
  "robot"
];

let player1, player2, game;
let priorX, priorY;
let input1;
let time, rounds;
let word;
let color;
let button;
let score = 0;
let needNewWord;
let strokeW;
let coverButton;

function setup() {
  let canvas = createCanvas(windowWidth - 20, windowHeight - 20);
  background(255, 204, 100);
  canvas.parent("canvas_div");

  strokeW = 8;
  
  time = 10;
  rounds = 2;
  let params = getURLParams();

  player1 = new Player(params.player1name);
  player2 = new Player(params.player2name);

  game = new Game(time, rounds);

  priorX = 0;
  priorY = 0;

  input1 = createInput("Enter your guess", [""]);

  color = "black";

  noStroke();
  fill("white");
  rect(
    (17 * windowWidth) / 60,
    windowHeight / 30 + 60,
    (37 * windowWidth) / 60,
    (35 * windowHeight) / 60 - 80,
    20
  );

    coverButton = createButton("Hide Word");
    coverButton.position(windowWidth / 12, 1.5*windowHeight / 2);
    coverButton.size(windowWidth / 8, windowHeight / 14);
    coverButton.mousePressed(hideWord);

  if (game.rounds > 0) {
    button = createButton("Pick a Word");
    button.position(windowWidth / 2.9, windowHeight / 65);
    button.size(windowWidth / 2, windowHeight / 12);

    button.mousePressed(pickWord);
  }
  restartScreen();
}


function draw() {
 
  if (game.rounds > 0) {
    // console.log(word.strWord);
    // while (millis() > game.time * 100) {
    if (mouseIsPressed) {
      if (
        collidePointRect(
          mouseX,
          mouseY,
          (17 * windowWidth) / 60,
          windowHeight / 30 + 60,
          (37 * windowWidth) / 60,
          (35 * windowHeight) / 60 - 80
        )
      ) {
        stroke(color);
        strokeWeight(strokeW);
        
        if (
          priorX <= (17 * windowWidth) / 60 + (37 * windowWidth) / 60 &&
          priorX >= (17 * windowWidth) / 60 &&
          priorY >= windowHeight / 30 &&
          priorY <= windowHeight / 30 + (35 * windowHeight) / 60
        ) {
          line(priorX, priorY, mouseX, mouseY);
        }
      }
    }
    priorX = mouseX;
    priorY = mouseY;
    // }
    // while (millis() < game.time * 100) {
    input1.position(windowWidth / 2, 3*windowHeight/4);
    input1.changed(checkGuess);
    // }
  } 
  else 
  {

    textSize(32);
    fill("black")  
  if (player1.score > player2.score) 
  {
       
      text(`${player1.name} Won!`, windowWidth / 2, (2 * windowHeight) / 2.5);
  } 
  else if (player1.score < player2.score) 
  {
      text(`${player2.name} Won!`, windowWidth / 2, (2 * windowHeight) / 2.5);
  } 
  else 
  {
      text("Tie!", 1.155*windowWidth / 2, (2 * windowHeight) / 2.5);
  }
    noLoop();
  }

  textSize(25);
  noStroke();
  fill("white");
  text(
    `Player 1: ${player1.name}`,
    (3.5 * windowWidth) / 60,
    (235 * windowHeight) / 600
  );
  text(`Player 2: ${player2.name}`, (3.5 * windowWidth) / 60, windowHeight / 2);
  text(
    `Score: ${player1.score}`,
    (3.5 * windowWidth) / 60,
    (235 * windowHeight) / 550
  );
  text(
    `Score: ${player2.score}`,
    (3.5 * windowWidth) / 60,
    (6 * windowHeight) / 11.25
  );
  
  textSize(25);
  fill("white");
  text("Word: ", (3.5 * windowWidth) / 60, 2.75 * windowHeight / 4);
  
  textSize(15);
  text("Press R: Red", (3.5 * windowWidth) / 60, (4 * windowHeight) / 60);
  text("Press B: Blue", (3.5 * windowWidth) / 60, (6 * windowHeight) / 60);
  text("Press G: Green", (3.5 * windowWidth) / 60, (8 * windowHeight) / 60);
  text("Press V: Black", (3.5 * windowWidth) / 60, (10 * windowHeight) / 60);
  text("Press Up Arrow: Clear", (3.5 * windowWidth) / 60, (12* windowHeight) / 60 );
  text("Press 1: Increase Thickness", (3.5 * windowWidth) / 60, (14 * windowHeight) / 60 );
  text("Press 2: Decrease Thickness", (3.5 * windowWidth) / 60, (16 * windowHeight) / 60 );
  game.displayStatus();
}

function hideWord()
{
  word.show = !word.show;
  if (!word.show)
  {
    fill(255, 153, 51);
    rect(windowWidth / 9.95, 2.58 * windowHeight / 4, 150, 50);
  }
}

function pickWord() {
  //variable for whether or not to pick a word
  //time starts when button clicked
  // counts down from 60 for each round

  //clear everything
  if (game.rounds > 0) {
    restartScreen();

    let random = Math.floor(Math.random() * easyWords.length);
    word = new Word(easyWords[random]);
    easyWords.splice(random, 1);
    console.log(word.strWord);
    word.display(windowWidth / 9.75, (2.07 * windowHeight) / 3);
  }
}

class Word {
  constructor(strWord) {
    this.strWord = strWord;
    this.show = true;
  }

  display(x, y) {
    fill("white");
    noStroke();
    textSize(25);
    text(this.strWord, x, y);
  }
}

function checkGuess(guess) {
  if (input1.value() == word.strWord) {
    textSize(windowWidth / 20);
    fill("black");
    text("Correct!", windowWidth / 2, (3.25 * windowHeight) / 4);
    if (game.drawer == player1.name) {
      player2.score += 10;
    } else {
      player1.score += 10;
    }
  } else {
    textSize(32);
    fill("black");
    text("Wrong Guess", windowWidth / 2, (3.25 * windowHeight) / 4);
  }
  if (game.drawer == player1.name) {
    game.drawer = player2.name;
  } else {
    game.drawer = player1.name;
    game.rounds -= 1;
  }
  restartScreen();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    restartScreen();
  }
  if (keyCode == 49)
    {
      strokeW+=3;
    }
  if (keyCode == 50)
    {
      strokeW-=3;
    }
}

function keyTyped() {
  if (key == "r") {
    color = "red";
  }
  if (key == "b") {
    color = "blue";
  }
  if (key == "g") {
    color = "green";
  }
  if (key == "v") {
    color = "black";
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
}

class Game {
  constructor(time, rounds) {
    this.time = time;
    this.rounds = rounds;
    this.drawer = player1.name;
  }

  displayStatus() {
    fill("white");
    textSize(40);
    text(
      `${this.drawer} is drawing`,
      1.4 * windowWidth / 3,
      (2.75 * windowHeight) / 4
    );
  }

  //total time and start time
}

function restartScreen() {
  background(255, 204, 100);
  noStroke();
  fill("white");
  rect(
    (17 * windowWidth) / 60,
    (2.925 * windowHeight) / 30,
    (37 * windowWidth) / 60,
    (30 * windowHeight) / 60,
    20
  );

  noStroke();
  fill(255, 153, 51);
  rect(
    windowWidth / 30,
    windowHeight / 2 + 105,
    (13 * windowWidth) / 60,
    windowHeight / 4,
    20
  );

  noStroke();
  fill(255, 153, 51);
  rect(
    (8.5 * windowWidth) / 30,
    windowHeight / 2 + 105,
    (37 * windowWidth) / 60,
    windowHeight / 4,
    20
  );

  noStroke();
  fill(255, 153, 51);
  rect(
    windowWidth / 30,
    windowHeight / 30,
    (13 * windowWidth) / 60,
    windowHeight / 4,
    20
  );

  noStroke();
  fill(255, 153, 51);
  rect(
    windowWidth / 30,
    windowHeight / 3,
    (13 * windowWidth) / 60,
    windowHeight / 4,
    20
  );
}
