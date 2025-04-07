let btn = document.querySelectorAll(".btn");
let ply = document.querySelector("#player");
let count = 1;
let current_player = "X";
let cont = document.querySelector(".container");
let reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  window.location.reload();
});
const winpattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];
btn.forEach(btn => {

  btn.addEventListener("click", () => {
    if (count % 2 === 0 && current_player === "O") {
      btn.innerText = "O";
      btn.style.color = "red";
      btn.disabled = true;
      current_player = "X";
      ply.innerText = "Current Player is " + current_player;
      checkwinner();
    }
    else {
      btn.innerText = "X";
      btn.disabled = true;
      current_player = "O";
      ply.innerText = "Current Player is " + current_player;
      checkwinner();
    }

    count++;

  });
});
const showWinner = (winner) => {
  ply.innerText = `Congratulations, Winner is ${winner}`;
  btn.forEach(btn => {
    btn.disabled = true;
  });

};
const checkwinner = () => {
  let hasWin = false;
  for (let pattern of winpattern) {
    let pos1 = btn[pattern[0]].innerText;
    let pos2 = btn[pattern[1]].innerText;
    let pos3 = btn[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== ""
      && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      hasWin = true;
      return;
    }
    if (!hasWin) {
      const allbtns = [...btn].every((btn) => btn.innerText !== "");
      if (allbtns) {
        ply.innerText = 'OOPSY,Match Drawn';
      }
    }
  }
}


