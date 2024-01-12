// Voice To-Do

// Variables
let num = 0;
let spacePressed = false;

// HTML Variables
let outputEl = document.getElementById("output");

// let task = [];
// Tasks arrays
let day = [];
let week = [];
let month = [];
let year = [];

// Button Event Listener
document.getElementById("btn").addEventListener("click", btnClicked);

function btnClicked() {
  let menu = document.getElementById("menu").value;
  if (menu === "add") {
    checkUserListFunctions(add);
  } else if (menu === "edit") {
    checkUserListFunctions(edit);
  } else if (menu === "remove") {
    checkUserListFunctions(remove);
  } else if (menu === "move") {
    checkUserListFunctions(add);
  }
}

document
  .getElementById("user")
  .addEventListener("select", checkUserListFunctions, false);
// Array user function
function checkUserListFunctions(functions) {
  let user = document.getElementById("user").value;

  if (user === "day") {
    functions();
  } else if (user === "week") {
    functions();
  } else if (user === "month") {
    functions();
  } else if (user === "year") {
    functions();
  }
}

// To-Do-List functions
function add() {
  let item = prompt("Enter item:");
  if (item.length === 0) {
    speakError();
  } else {
    num++;
    tasks.push(`${item}`);
    outputEl.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      outputEl.innerHTML += `<div>${i + 1}: ${tasks[i]}</div>`;
    }
    console.log(item);
    speakAdd(num, item);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
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
  localStorage.setItem("tasks", JSON.stringify(tasks));
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
  localStorage.setItem("tasks", JSON.stringify(tasks));
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
  localStorage.setItem("tasks", JSON.stringify(tasks));
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
    stopSpeak();
    pushToSpeak();
  }
}
// Talking functions
function pushToSpeak() {
  if (spacePressed) {
    document.getElementById("img").src = "img/unmute.png";
    document.getElementById("img").alt = "unmute";
    document.querySelector("h1").style.color = "hsl(87deg 100% 32%)";
    speakAll();
  } else {
    document.getElementById("img").src = "img/mute.png";
    document.getElementById("img").alt = "mute";
    document.querySelector("h1").style.color = "red";
  }
}
function speakAll() {
  if (tasks.length === 0) {
    let message = new SpeechSynthesisUtterance(
      `No tasks to do, if you want to add one? Select add and click go.`
    );
    window.speechSynthesis.speak(message);
  } else {
    for (let i = 0; i < tasks.length; i++) {
      let taskNum = i + 1;
      let taskText = tasks[i];
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
function stopSpeak() {
  window.speechSynthesis.cancel();
}
// Persistant data

// Check if tasks exist
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  checkUserData();
  displayTasks();
}

function displayTasks() {
  outputEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    outputEl.innerHTML += `<div>${i + 1}: ${tasks[i]}</div>`;
  }
}

document
  .getElementById("user")
  .addEventListener("select", checkUserData, false);
// Array user function
function checkUserData() {
  let user = document.getElementById("user").value;

  if (user === "day") {
    num = day.length;
  } else if (user === "week") {
    num = week.length;
  } else if (user === "month") {
    num = month.length;
  } else if (user === "year") {
    num = year.length;
  }
}
