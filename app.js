const cells = document.querySelectorAll('.btn');
const statusText = document.querySelector('#player');
const resetBtn = document.querySelector('#reset');

let currentPlayer = 'X';
let moves = 0;
let gameOver = false;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const setStatus = (message, type = '') => {
  statusText.textContent = message;
  statusText.classList.remove('win', 'draw');
  if (type) statusText.classList.add(type);
};

const disableAllCells = () => {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
};

const showWinner = (winner) => {
  gameOver = true;
  setStatus(`🎉 ${winner} wins. Funky flawless.`, 'win');
  disableAllCells();
};

const checkWinner = () => {
  for (const pattern of winPattern) {
    const [a, b, c] = pattern;
    const pos1 = cells[a].innerText;
    const pos2 = cells[b].innerText;
    const pos3 = cells[c].innerText;

    if (pos1 && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return;
    }
  }

  if (moves === cells.length && !gameOver) {
    gameOver = true;
    setStatus('✨ Draw. Minimal chaos, maximum style.', 'draw');
  }
};

const handleMove = (cell) => {
  if (cell.disabled || gameOver) return;

  cell.innerText = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.disabled = true;
  moves += 1;

  checkWinner();
  if (gameOver) return;

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  setStatus(`Current Player: ${currentPlayer}`);
};

const resetGame = () => {
  currentPlayer = 'X';
  moves = 0;
  gameOver = false;

  cells.forEach((cell) => {
    cell.innerText = '';
    cell.classList.remove('x', 'o');
    cell.disabled = false;
  });

  setStatus('Current Player: X');
};

cells.forEach((cell) => {
  cell.addEventListener('click', () => handleMove(cell));
});

resetBtn.addEventListener('click', resetGame);
