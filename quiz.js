var timerId;
var seconds = 0;

function startTimer() {
  timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  seconds++;
  var timerElement = document.getElementById("timer");
  if (timerElement) {
    timerElement.textContent = formatTime(seconds);
  }
}

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  return `${padTime(minutes)}:${padTime(remainingSeconds)}`;
}

function padTime(time) {
  return time.toString().padStart(2, "0");
}

function stopTimer() {
  clearInterval(timerId);
}

// Quiz logic

let questions = [
  {
    id: 1,
    question: "25 * 5",
    answer: "125",
    options: ["120", "135", "125", "None of these"],
  },
  {
    id: 2,
    question: "200 % 6",
    answer: "2",
    options: ["2", "12", "1", "0"],
  },
  {
    id: 3,
    question: "34 + 69",
    answer: "103",
    options: ["110", "93", "103", "90"],
  },
  {
    id: 4,
    question: "98 - 4",
    answer: "94",
    options: ["94", "82", "80", "22"],
  },
  {
    id: 5,
    question: "70 / 7",
    answer: "10",
    options: ["30", "20", "10", "40"],
  },
  {
    id: 6,
    question: "How many bits is a byte?",
    answer: "8",
    options: ["32", "16", "8", "64"],
  },
];

let question_count = 0;
let points = 0;

window.onload = function () {
  show(question_count);
  startTimer();
};

function show(count) {
  let question = document.getElementById("questions");
  let [first, second, third, fourth] = questions[count].options;

  question.innerHTML = `<h2>Q${count + 1}. ${questions[count].question}</h2>
    <ul class="option_group">
    <li class="option">${first}</li>
    <li class="option">${second}</li>
    <li class="option">${third}</li>
    <li class="option">${fourth}</li>
    </ul>`;
  toggleActive();
}

function toggleActive() {
  let option = document.querySelectorAll("li.option");
  for (let i = 0; i < option.length; i++) {
    option[i].onclick = function () {
      for (let i = 0; i < option.length; i++) {
        if (option[i].classList.contains("active")) {
          option[i].classList.remove("active");
        }
      }
      option[i].classList.add("active");
    };
  }
}

function next() {
  if (question_count == questions.length - 1) {
    stopTimer();
    sessionStorage.setItem("timer", formatTime(seconds)); // Store the time in sessionStorage
    location.href = "final.html";
  }

  let user_answer = document.querySelector("li.option.active").innerHTML;

  if (user_answer == questions[question_count].answer) {
    points += 10;
    sessionStorage.setItem("points", points);
  }
  console.log(points);

  question_count++;
  show(question_count);
}
