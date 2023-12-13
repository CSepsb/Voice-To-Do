// Voice To-Do

// text-to-speech
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak
// https://javascript.plainenglish.io/teach-your-pc-to-speak-using-javascript-c6e4460fbabc
// speech-to-text
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API

// Variables
let num = 0;
let spacePressed = false;
let recognitionActive = false;

// Prefixed properties// Prefixed properties

let SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
let SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

// Grammar
let recognition = new SpeechRecognition();
let speechRecognitionList = new SpeechGrammarList();

// HTML Variables
let outputEl = document.getElementById("output");
let msg = document.getElementById("output").innerHTML;

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
  tasks.push(`${task}`);

  outputEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    outputEl.innerHTML += `<div>${i + 1}: ${tasks[i]}</div>`;
  }

  console.log("Add Item");
}

function remove() {
  let index = +prompt("Position to remove:");
  tasks.splice(index - 1, 1);
  num--;

  outputEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    outputEl.innerHTML += `<div>${i + 1}: ${tasks[i].split(":")[1]}</div>`;
  }

  console.log("Remove at Position");
}
function edit() {
  let index = +prompt("Enter position:");
  let item = prompt("Replace with:");

  tasks[index - 1] = `${item}`;

  outputEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    outputEl.innerHTML += `<div>${i + 1}: ${tasks[i]}</div>`;
  }

  console.log("Edit");
}

function move() {
  let index1 = +prompt("Move item from:");
  let index2 = +prompt("Move item to:");

  let movedItem = tasks.splice(index1 - 1, 1)[0];
  tasks.splice(index2 - 1, 0, movedItem);

  outputEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    outputEl.innerHTML += `<div>${i + 1}: ${tasks[i]}</div>`;
  }
  intructions();
  console.log("Move");
}

// Key Event Listener Push-To-Talk
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(event) {
  if (event.code === "Space") {
    spacePressed = true;
    pushToTalk();
  }
}

function keyUpHandler(event) {
  if (event.code === "Space") {
    spacePressed = false;
    pushToTalk();
  }
}

function pushToTalk() {
  if (spacePressed === true) {
    document.getElementById("img").src = "img/unmute.png";
    document.getElementById("img").alt = "unmute";
    if (!recognitionActive) {
      recognition.start();
      recognitionActive = true;

      document.querySelector("h1").style.color = "green";
    }
  } else {
    document.getElementById("img").src = "img/mute.png";
    document.getElementById("img").alt = "mute";

    if (recognitionActive) {
      recognition.stop();
      recognitionActive = false;

      document.querySelector("h1").style.color = "red";
    }
  }
}

function speakAll() {
  for (let i = 0; i < tasks.length; i++) {
    let taskNum = i + 1;
    let taskText = tasks[i];
    let message = new SpeechSynthesisUtterance(`Task ${taskNum}: ${taskText}`);
    window.speechSynthesis.speak(message);
  }
}
function intructions() {
  let message = new SpeechSynthesisUtterance(
    `To add task say add, to remove say remove, to move say move and to edit say edit`
  );
  window.speechSynthesis.speak(message);
}

// Event listeners
recognition.addEventListener("result", recognitionResultHandler);
recognition.addEventListener("end", recognitionEndHandler);

// Event handler
function recognitionResultHandler(event) {
  let transcript = event.results[0][0].transcript;
  console.log("Recognition Result:", transcript);
}

function recognitionEndHandler() {
  console.log("Recognition Ended");
}
