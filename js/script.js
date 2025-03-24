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
  let turnCount = 0;

  // Click Event
  const boardElement = document.querySelector("#board");
  boardElement.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("board-square")) {
      if (target.dataset.value === "") {
        turnCount++;
        target.dataset.value = turnCount % 2 === 1 ? "X" : "O";
      }
      const message = checkIfWon();
      const gameStatusElement = document.querySelector(".game-status");
      gameStatusElement.textContent = message;
    }
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
  function checkIfWon() {
    const squares = document.querySelectorAll(".board-square");
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
        initialize();
        return `Player ${first === "X" ? "X" : "O"} won!`;
      }
    }
    if (turnCount === 9) {
      initialize();
      return "There is no winner...";
    }
    return `${turnCount % 2 === 0 ? "X" : "O"}'s turn.`;
  }
  function initialize(firstTime) {
    const gameStatusElement = document.querySelector(".game-status");
    gameStatusElement.textContent = `X's turn.`;
    turnCount = 0;
    if (!firstTime) {
      const boardSquares = document.querySelectorAll(".board-square");
      boardSquares.forEach((square) => {
        square.dataset.value = "";
      });
    }
  }
  return { initialize };
};
const game = createGame();

game.initialize(true);
