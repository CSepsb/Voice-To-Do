// Voice To-Do(A to-do list website that talks to you)

// Variables
let num = 0;
let spacePressed = false;

// HTML Variables
let outputEl = document.getElementById("output");

let tasks = [];

// Button Event Listener
document.getElementById("btn").addEventListener("click", btnClicked);
// List Select Event Listener
document.getElementById("user").addEventListener("change", displayTasks);

// To-Do-List Basic Functions

// Add Task
function add() {
  let item = prompt("Enter item:");
  if (item.length === 0) {
    speakError();
  } else {
    num++;
    let user = document.getElementById("user").value;
    tasks.push({ user, item });
    outputEl.innerHTML = "";
    displayTasks();
    speakAdd(num, item, user);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
// Remove Task
function remove() {
  let index = prompt("Position to remove:");
  let user = document.getElementById("user").value;
  if (isValidIndex(index)) {
    tasks.splice(index - 1, 1)[0];
    outputEl.innerHTML = "";
    displayTasks();
    speakRemove(index, user);
    num--;
  } else {
    speakError();
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Edit Task
function edit() {
  let index = prompt("Enter position:");
  if (isValidIndex(index)) {
    let task = prompt("Replace with:");
    let user = document.getElementById("user").value;
    let originalTask = tasks[index - 1].item;

    tasks[index - 1] = { user, item: task };

    outputEl.innerHTML = "";
    displayTasks();
    speakEdit(index, originalTask, task, user);
  } else {
    speakError();
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Move Task
function move() {
  let index1 = prompt("Move item from:");
  let index2 = prompt("Move item to:");
  if (isValidIndex(index1) && isValidIndex(index2)) {
    let movedItem = tasks.splice(index1 - 1, 1)[0];
    tasks.splice(index2 - 1, 0, movedItem);
    outputEl.innerHTML = "";
    displayTasks();
    speakMove(index1, index2, movedItem.user);
  } else {
    speakError();
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Select and Force the right Function to run
function btnClicked() {
  let menu = document.getElementById("menu").value;
  if (menu === "add") {
    add();
  } else if (menu === "edit") {
    edit();
  } else if (menu === "remove") {
    remove();
  } else if (menu === "move") {
    move();
  }
}

// Key Event Listener Push-To-Talk
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// On
function keyDownHandler(event) {
  if (event.code === "Space") {
    spacePressed = true;
    pushToSpeak();
  }
}
// Off
function keyUpHandler(event) {
  if (event.code === "Space") {
    spacePressed = false;
    stopSpeak();
    pushToSpeak();
  }
}

// Talking functions

// Lists All Task and Changes the Icon and Title color
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
// Lists All Tasks
function speakAll() {
  if (tasks.length === 0) {
    let message = new SpeechSynthesisUtterance(
      `No tasks to do, if you want to add one? Select add and click go.`
    );
    window.speechSynthesis.speak(message);
  } else {
    for (let i = 0; i < tasks.length; i++) {
      let taskNum = i + 1;
      let taskText = tasks[i].item;
      let message = new SpeechSynthesisUtterance(
        `Task ${taskNum}, ${taskText}`
      );
      window.speechSynthesis.speak(message);
    }
  }
}
// Lists Added Task and User
function speakAdd(taskNum, taskText, user) {
  let message = new SpeechSynthesisUtterance(
    `${taskText} added as task number ${taskNum}, in ${user} list`
  );
  window.speechSynthesis.speak(message);
  console.log(message);
}
// Lists Removed Task and User
function speakRemove(taskNum, user) {
  let message = new SpeechSynthesisUtterance(
    `Task number ${taskNum} removed in ${user} list`
  );
  window.speechSynthesis.speak(message);
  console.log(message);
}
// Lists Edited Task and User
function speakEdit(taskNum, originalTask, newTask, user) {
  let message = new SpeechSynthesisUtterance(
    `Task number ${taskNum}, "${originalTask}" has been replaced by "${newTask}", in ${user} list`
  );
  window.speechSynthesis.speak(message);
  console.log(message);
}
// Lists Moved Task and User
function speakMove(taskNum1, taskNum2, user) {
  let message = new SpeechSynthesisUtterance(
    `Task number ${taskNum1}, has been moved in the place of task number ${taskNum2}, in ${user} list`
  );
  window.speechSynthesis.speak(message);
  console.log(message);
}
// Informs User of an Error
function speakError() {
  let message = new SpeechSynthesisUtterance(`Error`);
  window.speechSynthesis.speak(message);
  console.log(message);
}
// Stops Speach
function stopSpeak() {
  window.speechSynthesis.cancel();
}

// Validates index
function isValidIndex(index) {
  return !isNaN(index) && index >= 1 && index <= tasks.length;
}

// Persistant data
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  num = tasks.length; 
  displayTasks();
}

// Displays Tasks From Specific List 
function displayTasks() {
  outputEl.innerHTML = "";

  let user = document.getElementById("user").value;
  let userTasks = tasks.filter((task) => task.user === user);

  for (let i = 0; i < userTasks.length; i++) {
    outputEl.innerHTML += `<div>${i + 1}: ${userTasks[i].item}</div>`;
  }
}