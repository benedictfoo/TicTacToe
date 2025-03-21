(function board() {
  const boardElement = document.querySelector("#board");
  for (let i = 1; i <= 9; i++) {
    const boardSquare = document.createElement("div");
    boardSquare.setAttribute("id", `square-${i}`);
    boardSquare.classList.add("board-square");
    boardElement.appendChild(boardSquare);
  }
})();
