const game = new Game();
game.start();

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
}

function HumanPlayer(board) {
    this.takeTurn = function () {
        board.position.forEach(el => el.addEventListener('click', handleTurnTaken));
    }
    function handleTurnTaken(event) {
        event.target.innerText = 'X';
        board.position.forEach(el => el.removeEventListener('click', handleTurnTaken));
    }

}

function ComputerPlayer(board) {

    this.takeTurn = function () {
        const availablePositions = board.position.filter((p) => p.innerText === '')
        console.log(availablePositions)
    }

}