/*
    ~ * ~ * ~ * 
    ~ * ~ * ~ * MOBILE 
    ~ * ~ * ~ * PLAYER
    ~ * ~ * ~ * INTERFACE
    ~ * ~ * ~ * 
*/

// MARK: SOCKET

//open and connect the input socket
let socket = io('/', {
  withCredentials: true
});

//listen for the confirmation of connection 
socket.on('connect', () => {
    console.log('now connected to server');
    if (socket.recovered) {
      console.log('previous connection reestablished')
    }
});

//receiving info to complete setup
socket.on('clientInit', (data) => {
  // console.log('received init data:');
  // console.log(data);
  // players = data.players;
  // game = data.game;
  // state = data.state;
  // originalFactions = game.factions; //sets current server faction info, so can change on own without overwrite
  // adjustedFactions = structuredClone(game.factions); //fookkin references mate
  
  // for (let faction of Object.keys(adjustedFactions)){
  //   influenceTally[faction] = {
  //     newOrders: {},
  //     newShares: 0,
  //   };
  //   for (let action of Object.keys(adjustedFactions[faction].orders)){
  //     influenceTally[faction].newOrders[action] = 0;
  //   }
  // }

  // hasReceivedInit = true;
  //trying to fix UI bug, need both socket info and setup to have finished
  // hasEitherFinished ? initUI() : hasEitherFinished = true;
});

socket.on('updates', (data)=>{
  players = data.players;
  // game = data.game;
  state = data.state;

  //seems... weird...
  // timerMin = state.timerMin;
  // timerSec = state.timerSec;

  // if (hasPlayerProfile) {phase = state.phase}; //login issue if phase changes

  //personal updates: TODO

});

// MARK: GAME STATE VARIABLES

let players, state;
// let phase = "login"; //hmm now has state phase... TODO redundant


// MARK: UI VARIABLES

let font, textSize_L, textSize_M, textSize_S;
let canvas;
let wCell, hCell; //hmm. just for grid spacing...
let headY, bodyY, footY; //y height of sections

function preload(){
  font = loadFont('assets/fonts/fugaz.ttf');
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("canvas");
  // background(82,135,39);

  //currently using a 14x30 grid of cells for mobile portrait mode
  //layout of 5x14 (not incl padding) for header, 7x14 for footer, 18x14 for body
  wCell = width / 14;
  hCell = height / 30;
  headY = hCell * 4;
  bodyY = hCell * 19;
  footY = hCell * 6;

  //layout
  ellipseMode(CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(RADIANS);
  textFont(font);
  textAlign(CENTER, CENTER);
  textSize(width/40);
  strokeWeight(2);
  // colorMode();

  //trying to fix UI bug, need both socket info and setup to have finished
  // hasEitherFinished ? initUI() : hasEitherFinished = true;
};

//
// MARK: Draw
//

function draw(){
  background(82,135,39);
  // background(0);

}

//
// MARK: Init Functions
//


//
// MARK: Misc Functions
//

function mousePressed(){
  if (mouseX < wCell * 3 && mouseY < hCell * 3 
    && timerSecretShowing){
      alert("long live the queen");
      //TODO go to /bees
    }
}

function hexToRGB(hex){
  //https://learnersbucket.com/examples/interview/convert-hex-color-to-rgb-in-javascript/
  const r = parseInt(hex.slice(1, 3), 16)/255;
  const g = parseInt(hex.slice(3, 5), 16)/255;
  const b = parseInt(hex.slice(5, 7), 16)/255;
    
  return { r: r, g: g, b: b};
}

function randomHex(){ // thanks https://css-tricks.com/snippets/javascript/random-hex-color/
  let randomColor = "";
  while(randomColor.length !== 6) { //errors if 5
    randomColor = Math.floor(Math.random()*16777215).toString(16);
  }
  return "#" + randomColor;

}
