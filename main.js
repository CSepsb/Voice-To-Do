// Voice To-Do

// Variables
let num = 0;
let spacePressed = false;

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

// To-Do-List functions
function add() {
  let item = prompt("Enter item:");
  num++;
  tasks.push(`${item}`);
  outputEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    outputEl.innerHTML += `<div>${i + 1}: ${tasks[i]}</div>`;
  }
  speakAdd(num, item);
}

function remove() {
  let index = prompt("Position to remove:");
  if (isValidIndex(index)) {
    tasks.splice(index - 1, 1);
    outputEl.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      outputEl.innerHTML += `<div>${i + 1}: ${tasks[i]}</div>`;
    }
    speakRemove(num);
    num--;
  } else {
    speakError();
  }
}

function edit() {
  let index = prompt("Enter position:");
  if (isValidIndex(index)) {
    let task = prompt("Replace with:");
    tasks[index - 1] = `${task}`;

    outputEl.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      outputEl.innerHTML += `<div>${i + 1}: ${tasks[i]}</div>`;
    }
    speakEdit(index, task);
  } else {
    speakError();
  }
}

function move() {
  let index1 = prompt("Move item from:");
  let index2 = prompt("Move item to:");

  if (isValidIndex(index1) && isValidIndex(index2)) {
    let movedItem = tasks.splice(index1 - 1, 1)[0];
    tasks.splice(index2 - 1, 0, movedItem);

    outputEl.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      outputEl.innerHTML += `<div>${i + 1}: ${tasks[i]}</div>`;
    }
    speakMove(index1, index2);
  } else {
    speakError();
  }
}

// Key Event Listener Push-To-Talk
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(event) {
  if (event.code === "Space") {
    spacePressed = true;
    pushToSpeak();
  }
}

function keyUpHandler(event) {
  if (event.code === "Space") {
    spacePressed = false;
    pushToSpeak();
  }
}
// Talking functions
function pushToSpeak() {
  if (spacePressed === true) {
    document.getElementById("img").src = "img/unmute.png";
    document.getElementById("img").alt = "unmute";
    document.querySelector("h1").style.color = "hsl(87deg 100% 32%)";
    speakAll();
  }
}
function speakAll() {
  for (let i = 0; i < tasks.length; i++) {
    let taskNum = i + 1;
    let taskText = tasks[i];
    if (task.lenght > 1) {
      let message = new SpeechSynthesisUtterance(`No tasks to do`);
      window.speechSynthesis.speak(message);
    } else {
      let message = new SpeechSynthesisUtterance(
        `Task ${taskNum}, ${taskText}`
      );
      window.speechSynthesis.speak(message);
    }
  }
}
function speakAdd(taskNum, taskText) {
  let message = new SpeechSynthesisUtterance(
    `${taskText} added as task number ${taskNum} `
  );
  window.speechSynthesis.speak(message);
  console.log(message);
}

function speakRemove(taskNum) {
  let message = new SpeechSynthesisUtterance(`Task number ${taskNum} removed`);
  window.speechSynthesis.speak(message);
  console.log(message);
}

function speakEdit(taskNum, taskText) {
  let message = new SpeechSynthesisUtterance(
    `Task number ${taskNum}, has been replaced by ${taskText}`
  );
  window.speechSynthesis.speak(message);
  console.log(message);
}
function speakMove(taskNum1, taskNum2) {
  let message = new SpeechSynthesisUtterance(
    `Task number ${taskNum1}, has been moved in the place of task number${taskNum2}`
  );
  window.speechSynthesis.speak(message);
  console.log(message);
}
function speakError() {
  let message = new SpeechSynthesisUtterance(`Error`);
  window.speechSynthesis.speak(message);
  console.log(message);
}
function isValidIndex(index) {
  return !isNaN(index) && index >= 1 && index <= tasks.length;
}
