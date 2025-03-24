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
  let turn = "X";
  // Click Event
  const boardElement = document.querySelector("#board");
  boardElement.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("board-square")) {
      if (target.dataset.value === "") {
        target.dataset.value = turn;
        turn = turn === "X" ? "O" : "X";
      }
    }
  });
})();
