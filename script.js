document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const board = document.getElementById("board");
  const resetBtn = document.getElementById("resetBtn");
  const timerDisplay = document.getElementById("timer");

  // Game settings
  const size = 5;
  let timer;
  let seconds = 0;

  // Event listener for each square click
  function toggleSquare(square) {
    square.classList.toggle("is-off");
    checkWin();
  }

  // Randomly configure the initial board
  function randomizeBoard() {
    Array.from(board.children).forEach((square) => {
      if (Math.random() > 0.5) {
        toggleSquare(square);
      }
    });
  }

  // Check if the player has won
  function checkWin() {
    const isWin = Array.from(board.children).every((square) =>
      square.classList.contains("is-off")
    );
    if (isWin) {
      clearInterval(timer);
      window.alert(
        `You win! Time taken: ${seconds} second${seconds !== 1 ? "s" : ""}`
      );
      resetBoard();
    }
  }

  // Reset the game board
  function resetBoard() {
    board.innerHTML = "";
    seconds = 0;
    updateTimerDisplay();
    createBoard();
  }

  // Start the timer
  function startTimer() {
    timer = setInterval(() => {
      seconds++;
      updateTimerDisplay();
    }, 1000);
  }

  // Update the timer display
  function updateTimerDisplay() {
    timerDisplay.textContent = `Time: ${seconds} second${
      seconds !== 1 ? "s" : ""
    }`;
  }

  // Event listener for the reset button
  resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    resetBoard();
    startTimer();
  });

  // Create the initial game board
  function createBoard() {
    for (let i = 0; i < size * size; i++) {
      const square = document.createElement("div");
      square.className = "square";
      square.addEventListener("click", () => toggleSquare(square));
      board.appendChild(square);
    }
    randomizeBoard();
  }

  // Initial setup: create the board, start the timer
  createBoard();
  startTimer();
});
