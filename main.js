// Voice To-Do

// Variables
let num = 0;
let spacePressed = false;

// HTML Variables
let outputEl = document.getElementById("output");

// Tasks array
let tasks = [];

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
  if (transcript === "add") {
  }
  alert("Name of the task.");
  num++;
  tasks.push(`${transcript}`);

  outputEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    outputEl.innerHTML += `<div>${i + 1}: ${tasks[i]}</div>`;
  }
}

function remove() {
  if (transcript === "remove") {
  }
  alert("Position to remove:");
  let index = +transcript;
  tasks.splice(index - 1, 1);
  num--;

  outputEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    outputEl.innerHTML += `<div>${i + 1}: ${tasks[i].split(":")[1]}</div>`;
  }
}
function edit() {
  if (transcript === "edit") {
  }
  alert("Enter position:");
  let index = +transcript;
  alert("Replace with:");
  tasks[index - 1] = `${transcript}`;

  outputEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    outputEl.innerHTML += `<div>${i + 1}: ${tasks[i]}</div>`;
  }
}

function move() {
  if (transcript === "move") {
  }
  alert("Move item from:");
  let index1 = +transcript;
  alert("Move item to:");
  let index2 = +transcript;

  let movedItem = tasks.splice(index1 - 1, 1)[0];
  tasks.splice(index2 - 1, 0, movedItem);

  outputEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    outputEl.innerHTML += `<div>${i + 1}: ${tasks[i]}</div>`;
  }
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
    document.querySelector("h1").style.color = "hsl(87deg 100% 32%)";
    speechRecognition();
  } else {
    document.getElementById("img").src = "img/mute.png";
    document.getElementById("img").alt = "mute";
    document.querySelector("h1").style.color = "red";
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
  if (transcript === "help") {
  }
  let message = new SpeechSynthesisUtterance(
    `To add task say add, to remove say remove, to move say move and to edit say edit`
  );
  window.speechSynthesis.speak(message);
}

function speechRecognition() {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  recognition.onstart = function () {
    console.log("Voice recognition activated.");
  };

  recognition.onspeechend = function () {
    console.log("Voice recognition stopped.");
    recognition.stop();
  };

  recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    console.log(transcript` ${confidence}%`);
  };

  recognition.start();
}
// https://www.studytonight.com/post/javascript-speech-recognition-example-speech-to-text
