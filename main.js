const quistion_field = document.querySelector(".question");
const answer_buttons = document.querySelectorAll(".answer");
const result = document.querySelector(".result");
const satrt_btn = document.querySelector(".start-btn");
const main = document.querySelector(".main");
const start = document.querySelector(".start");

const signs = ["+", "-", "*", "/"];

function randInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomSign() {
  return signs[randInt(0, 3)];
}

function shuffle(array) {
  let curIndex = array.length;
  let randomIndex;

  while (curIndex !== 0) {
    randomIndex = Math.floor(Math.random() * curIndex);
    curIndex--;

    [array[curIndex], array[randomIndex]] = [
      array[randomIndex],
      array[curIndex],
    ];
    return array;
  }
}
let cookie = false;
let cookies = document.cookie.split("; ");

for (let i = 0; i < cookies.length; i++) {
  if (cookies[i].split("=")[0] === "quize") {
    cookie = cookies[i].split("=")[1];
    break;
  }
}

if (cookie) {
  let data = cookie.split("/");
  result.innerHTML = `В прошлой игре вам было задано ${
    data[0]
  } вопросов, вы ответили правильно на ${
    data[1]
  } вопросов. Точность ${Math.round((data[1] * 100) / data[0])}%`;
}
class Question {
  constructor() {
    let a = randInt(1, 30);
    let b = randInt(1, 30);
    let sign = randomSign();
    this.question = `${a} ${sign} ${b}`;
    if (sign == "+") {
      this.correct = a + b;
    } else if (sign == "-") {
      this.correct = a - b;
    } else if (sign == "*") {
      this.correct = a * b;
    } else if (sign == "/") {
      this.correct = a / b;
    }
    this.answers = [
      randInt(this.correct - 10, this.correct - 1),
      randInt(this.correct - 10, this.correct - 1),
      this.correct,
      randInt(this.correct + 1, this.correct + 10),
      randInt(this.correct + 1, this.correct + 10),
    ];
    shuffle(this.answers);
  }

  display() {
    quistion_field.innerHTML = this.question;

    for (let i = 0; i < this.answers.length; i++) {
      answer_buttons[i].innerHTML = this.answers[i];
    }
  }
}

let total_answers = 0;
let correct_answers = 0;
let current_qustion = new Question();
current_qustion.display();

satrt_btn.addEventListener("click", function () {
  start.style.display = "none";
  main.style.display = "flex";

  total_answers = 0;
  correct_answers = 0;

  setTimeout(function () {
    let quize_cookie = `quize=${total_answers}/${correct_answers}; max-age=100000`;
    document.cookie = quize_cookie;

    start.style.display = "flex";
    main.style.display = "none";
    result.innerHTML = `Всего задано вопросов: ${total_answers}. Правильных ответов: ${correct_answers}`;
  }, 10000);
});
for (let i = 0; i < answer_buttons.length; i++) {
  answer_buttons[i].addEventListener("click", function () {
    if (+answer_buttons[i].innerHTML === current_qustion.correct) {
      answer_buttons[i].style.backgroundColor = "#4CAF50";
      anime({
        targets: answer_buttons[i],
        background: "#212121",
        duration: 400,
        easing: "linear",
      });
      correct_answers += 1;
      console.log("Правильно");
    } else {
      answer_buttons[i].style.backgroundColor = "#E64A19";
      anime({
        targets: answer_buttons[i],
        background: "#212121",
        duration: 400,
        easing: "linear",
      });
      console.log("Не правильно");
    }
    total_answers += 1;
    current_qustion = new Question();
    current_qustion.display();
  });
}