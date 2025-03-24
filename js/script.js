(function () {
  // Make Board
  const boardElement = document.querySelector("#board");
  for (let i = 1; i <= 9; i++) {
    const boardSquare = document.createElement("div");
    boardSquare.setAttribute("id", `square-${i}`);
    boardSquare.classList.add("board-square");
    boardSquare.dataset.value = "";
    boardElement.appendChild(boardSquare);
  }
})();
const createGame = function () {
  let player1Name, player2Name;
  let turnCount = 0;
  let restart = false;

  const startButton = document.querySelector(".start-button");
  const player1Input = document.querySelector("#player-1-name");
  const player2Input = document.querySelector("#player-2-name");
  const boardElement = document.querySelector("#board");
  const gameStatusElement = document.querySelector(".game-status");
  const squares = document.querySelectorAll(".board-square");
  const gameNames = document.querySelectorAll(".game-name");

  // Click Event
  boardElement.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("board-square")) {
      if (target.dataset.value === "") {
        turnCount++;
        target.dataset.value = turnCount % 2 === 1 ? "X" : "O";
      }
      const statusName = checkStatus();
      if ([player1Name, player2Name].includes(statusName)) {
        gameStatusElement.textContent = `${statusName} won the game!`;
        restart = true;
      } else if (statusName === "draw") {
        gameStatusElement.textContent = "It's a draw";
        restart = true;
      } else {
        showMessage();
      }
      if (
        [player1Name, player2Name].includes(statusName) ||
        statusName === "draw"
      ) {
        toggleStart();
      }
    }
  });
  // Start Event
  startButton.addEventListener("click", (e) => {
    e.preventDefault();
    player1Name = player1Input.value || "X";
    player2Name = player2Input.value || "O";
    if (!restart) {
      toggleInput();
      toggleBoard();
    }
    if (restart) {
      startButton.textContent = "Restart";
      turnCount = 0;
      squares.forEach((square) => {
        square.dataset.value = "";
      });
    }
    toggleStart();
    showMessage();
  });
  // Array of winning
  const winArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  // function to check if won
  function checkStatus() {
    function getSquareValue(oneIndex) {
      return squares[oneIndex - 1].dataset.value;
    }
    for (let i = 0; i < winArray.length; i++) {
      const condition = winArray[i];
      const first = getSquareValue(condition[0]);
      const second = getSquareValue(condition[1]);
      const third = getSquareValue(condition[2]);
      if (
        ["X", "O"].includes(first) &&
        ["X", "O"].includes(second) &&
        ["X", "O"].includes(third) &&
        first === second &&
        first === third
      ) {
        return first === "X" ? player1Name : player2Name;
      }
    }
    if (turnCount === 9) {
      return "draw";
    }
    return false;
  }
  function toggleBoard() {
    boardElement.classList.toggle("hidden");
  }
  function toggleInput() {
    gameNames.forEach((name) => {
      name.classList.toggle("hidden");
    });
  }
  function toggleStart() {
    startButton.classList.toggle("hidden");
  }
  function showMessage() {
    gameStatusElement.textContent = `${
      turnCount % 2 === 0 ? player1Name : player2Name
    }'s turn.`;
  }

  toggleBoard();
};
const game = createGame();

// game.initialize(true);
