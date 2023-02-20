const game = new Game();
game.start();
document.querySelector('#reset').addEventListener('click', function(){
    window.location.reload();
    return false;
  });

function Game() {
    const board = new Board();
    const humanPlayer = new HumanPlayer(board);
    const computerPlayer = new ComputerPlayer(board);

    let turn = 0;

    this.start = function () {
        const config = { childList: true };
        const observer = new MutationObserver(() => takeTurn());
        board.position.forEach((el) => observer.observe(el, config));
        takeTurn();
    }

    function takeTurn() {
        if (board.checkForWinner()) {
            return;
        }
        if (turn % 2 === 0) {
            humanPlayer.takeTurn();
        } else {
            computerPlayer.takeTurn();
        }
        turn++;
    }
}

function Board() {
    this.position = Array.from(document.querySelectorAll('.square'))
    this.checkForWinner = function () {
        let winner = false
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
        const positions = this.position;

        winningCombinations.forEach((winningCombo) => {
            const pos0InnerText = positions[winningCombo[0]].innerText;
            const pos1InnerText = positions[winningCombo[1]].innerText;
            const pos2InnerText = positions[winningCombo[2]].innerText;
            const isWinningCombo = pos0InnerText !== '' &&
                pos0InnerText === pos1InnerText &&
                pos1InnerText === pos2InnerText;


            if (isWinningCombo) {
                winner = true;
                winningCombo.forEach((index) => {
                    positions[index].className += ' Winner';
                    console.log(index);
                });
                setTimeout(function(){
                document.getElementById('status').innerHTML+=`x Won!`;
                }, 50); 
            }
        });
        return winner;
    }
}

function HumanPlayer(board) {
    this.name = "You";
    this.takeTurn = function () {
        board.position.forEach(el => el.addEventListener('click', handleTurnTaken));
    }
    function handleTurnTaken(event) {
        event.target.innerText = 'X';
        board.position.forEach(el => el.removeEventListener('click', handleTurnTaken));
    }

}

function ComputerPlayer(board) {
    this.name = 'Computer'
    this.takeTurn = function () {
        const availablePositions = board.position.filter((p) => p.innerText === '')
        const move = Math.floor(Math.random() * availablePositions.length)
        availablePositions[move].innerText = 'O';
    }

}