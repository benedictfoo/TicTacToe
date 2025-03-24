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
(function () {
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
      checkIfWon();
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
    // winArray.forEach(condition=>{
    //   if()
    // })
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
        return `Player ${first === "X" ? "1" : "2"} won!`;
      }
      if (turnCount === 9) {
        return "There is no winner...";
      }
    }
  }
})();
