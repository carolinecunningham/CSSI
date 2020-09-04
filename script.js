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
      createButton,
      color,
 */

let player1name = "user", player2name = "user";
let input1, input2;
let brushHue;
let button;

function setup() {
  
  let canvas = createCanvas(windowWidth - 20, windowHeight - 20);
  // colorMode(HSB, 360, 100, 100);
  background(255, 204, 100);
  strokeWeight(20);
  // player1 = new Player();
  // player2 = new Player();

  input1 = createInput("Player 1 Name",[""]);
  input2 = createInput("Player 2 Name",[""]);
  
  button = createButton('Start Game');
  button.position(windowWidth/4, 9*windowHeight/20);
  button.size(windowWidth/2,windowHeight/10);
  button.mousePressed(goToGame);
}

function draw() {
  firstPage();
  
}

function goToGame()
{
  if (player1name != "user" && player2name != "user")
  {
    window.location.href = "/game.html?player1name=" + player1name + "&player2name=" + player2name;
  }
  else
  {
     fill('black');
     textSize(20);
     text("Please enter the players' names", 2*windowWidth/5, 3*windowHeight/4);
  }
}

// /game.html?player1name=caroline&player2name=beri

function firstPage() {
  // img = loadImage('assets/dollartest.jpg');
  // image(img, 100, 100);
  fill(255, 153, 51);
  noStroke();
  rect(windowWidth/4, windowHeight/10, windowWidth/2, windowHeight/10,20);
  rect(0, 17*windowHeight/60, windowWidth, 25*windowHeight/60);
  fill("white");
  textSize(30);
  text(" Our Skribbl Game", 2 * windowWidth/5+40, windowHeight/6);

  input1.position(windowWidth / 8, 8*windowHeight/9);
  input2.position(4*windowWidth / 5, 8*windowHeight/9);

  input1.changed(setName1);
  input2.changed(setName2);

  textSize(20);
  fill("white");
  text("Player 1: Enter Your Name", windowWidth / 9.25,  7.5*windowHeight/9);
  text("Player 2: Enter Your Name", 3.85*windowWidth / 5, 7.5*windowHeight/9);
}

class startbutton {
  constructor() {}
}

function keyPressed() {}

function setName1() {
  player1name = input1.value();
}

function setName2() {
  player2name = input2.value();
}


