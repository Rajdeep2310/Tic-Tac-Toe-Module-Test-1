const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissor",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissor",
  },
];
const choiceButtons = document.querySelectorAll(".user-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results_result");
const resultWinner = document.querySelector(".results_winner");
const resultText = document.querySelector(".results_text");
const playAgain = document.querySelector(".play_again");
const score_number_cs = document.querySelector(".score_number_cs");
const yourScore = document.querySelector(".score_number_ys");
const computerScore = document.querySelector(".score_number_cs");
const nextButton = document.querySelector(".next-btn");
const ruleBtn = document.querySelector(".instruction")
// let ysScore = parseInt(localStorage.getItem("ysScore")) || 0;
// let pcScore = localStorage.getItem("pcScore") || 0;
let ysScore = parseInt(localStorage.getItem('userScore')) || 0;
let pcScore = 0;
// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `<button  class="user-btn" data-choice="${results[idx].name}" >
      <div class="choice scissor">
          <img class="hand-signs" src="./img/${results[idx].name}.png" alt="${results[idx].name}" >
      </div>
  </button>`;
    }, idx * 1000);
  });
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const pcWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "YOU WIN";
      resultDivs[0].classList.toggle("winner");
      localStorage.setItem('userScore', 0)
      keepScore(); //
    } else if (pcWins) {
      resultText.innerText = "YOU LOSE";
      resultDivs[1].classList.toggle("winner");
      keepPcScore(1);
    } else {
      resultText.innerText = "DRAW";
    }
  }, 1000);
  resultWinner.classList.toggle("hidden");
  resultDivs.classList.toggle("show-winner");

}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore() {
    ysScore += 1;
    yourScore.innerText = ysScore;
    localStorage.setItem('userScore', ysScore);
}

function keepPcScore(point) {
  pcScore += point;
  computerScore.innerText = pcScore;
}

playAgain.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });
  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});



const rulesBtn = document.querySelector(".rules");
const popupOverlay = document.getElementById("popupOverlay");

rulesBtn.addEventListener("click", () => {
  popupOverlay.style.display = "flex";
});

function closePopup() {
  popupOverlay.style.display = "none";
}


