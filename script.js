document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const newGameButton = document.getElementById('new-game-btn');

    let currentPlayer = 'X';
    let moves = 0;
    let gameEnded = false;
    let winner = null;
    const cells = [];

    // Create cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cells.push(cell);
        cell.addEventListener('click', () => cellClick(i));
        board.appendChild(cell);
    }

    // Handle cell clicks
    function cellClick(index) {
        if (!gameEnded && !cells[index].textContent) {
            cells[index].textContent = currentPlayer;
            moves++;
            checkWin();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    // Check for a win
    function checkWin() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent) {
                gameEnded = true;
                cells[a].style.backgroundColor = 'lightgreen';
                cells[b].style.backgroundColor = 'lightgreen';
                cells[c].style.backgroundColor = 'lightgreen';
                winner = cells[a].textContent;
                status.textContent = `Player ${winner} wins!`;
                return;
            }
        }

        if (moves === 9) {
            gameEnded = true;
            status.textContent = "It's a draw!";
        }
    }

    // New game button event listener
    newGameButton.addEventListener('click', () => {
        resetGame();
    });

    // Reset the game
    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '#fff';
        });
        currentPlayer = 'X';
        moves = 0;
        gameEnded = false;
        winner = null;
        status.textContent = '';
    }
});
