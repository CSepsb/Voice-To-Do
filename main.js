// Voice To-Do

// text-to-speech
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak
// speech-to-text
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API

// Variables
let num = 0;

// HTML Variables
let outputEl = document.getElementById("output");

// Tasks array
let tasks = [];

// Button Event Listener
document.getElementById("btn").addEventListener("click", btnClicked);

function btnClicked() {
  // Get Menu Selection
  let selection = document.getElementById("menu").value;

  // Implement Menu Selection
  if (selection === "add") {
    add();
  } else if (selection === "edit") {
    edit();
  } else if (selection === "remove") {
    remove();
  } else if (selection === "move") {
    move();
  }
}
// Functions
function add() {
  let task = prompt("Enter item:");
  num++;
  tasks.push(`<div>${num}: ${task} </div>`);
  outputEl.innerHTML = tasks.join("");
  console.log("Add Item");
}

function edit() {
  let index = +prompt("Enter position:");
  let item = prompt("Replace with:");
  tasks[index - 1] = `<div>${index}: ${item} </div>`;
  outputEl.innerHTML = tasks.join("");
  console.log("Edit");
}

function remove() {
  let index = +prompt("Position to remove:");
  tasks.splice(index - 1, 1);
  num--;
  for (let i = index - 1; i < tasks.length; i++) {
    tasks[i] = `<div>${i + 1}: ${tasks[i].split(":")[1]}</div>`;
  }
  outputEl.innerHTML = tasks.join("");
  console.log("Remove at Position");
}

function move() {
  let index1 = +prompt("Move item from:");
  let index2 = +prompt("Move item to:");
  let movedItem = tasks.splice(index1 - 1, 1);
  tasks.splice(index2 - 1, 0, movedItem);
  outputEl.innerHTML = tasks.join("");
  console.log("Move");
}
// Key Event Listener
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(event) {
  if (event.keyCode === 32) {
    spacePressed = true;
  }
}

function keyUpHandler(event) {
  if (event.keyCode === 32) {
    spacePressed = false;
  }
}

function listen() {
  if (spacePressed === true) {
    console.log("good");
  }
}
