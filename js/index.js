// Implemented SoC
// Migrated HTML tags to the HTML file
// Migrated CSS styles to the CSS file as .classes
// Changed element.styles statement(s) to element.classList.add

const board = Array.from({ length: 3 }, () => Array(3).fill(''));

function clickMeToStart() {
    const random = Math.random();
    document.querySelector('#click-me').textContent = random < 0.5 ? 'First Move : Player O' : 'First Move : Player X';
    document.querySelectorAll('.element').forEach(element => {
        element.textContent = '';
    });

    document.removeEventListener('click', clickMeToStart);
    playing();
}

document.addEventListener('click', clickMeToStart);

let changePlayer = Math.random() < 0.5 ? 0 : 1;

function playing() {
    const boxes = document.querySelectorAll('.box');
    const title = document.getElementById('click-me');

    function handleClick(event) {
        const box = event.currentTarget;
        const element = box.querySelector('.element');

        if (!element.textContent) {
            if (changePlayer % 2 === 0) {
                element.textContent = 'X';
                element.classList.add('x');
            } else {
                element.textContent = 'O';
                element.classList.add('o');
            }
            title.textContent = changePlayer % 2 === 0 ? 'Player O' : 'Player X';
            board[Math.floor((box.id - 1) / 3)][(box.id - 1) % 3] = element.textContent;

            changePlayer++;
            check();

            if (title.textContent.includes('Wins!') || title.textContent.includes('Draw!')) {
                removeEventListeners();
                const subtitle = document.createElement('h2');
                subtitle.textContent = 'Refresh to play again!';
                subtitle.classList.add('subtitle');
                document.querySelector('header').appendChild(subtitle);
            }
        }
    }

    function addEventListeners() {
        boxes.forEach(box => {
            box.addEventListener('click', handleClick);
        });
    }

    function removeEventListeners() {
        boxes.forEach(box => {
            box.removeEventListener('click', handleClick);
        });
    }

    addEventListeners();
}

function check() {
    const title = document.querySelector('#click-me');

    for (let i = 0; i < board.length; i++) {
        if (board[i].every(val => val === 'X') || board[i].every(val => val === 'O')) {
            title.textContent = `Player ${board[i][0]} Wins!`;
            return;
        }
    }

    for (let j = 0; j < board.length; j++) {
        if (board.every(row => row[j] === 'X') || board.every(row => row[j] === 'O')) {
            title.textContent = `Player ${board[0][j]} Wins!`;
            return;
        }
    }

    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        title.textContent = `Player ${board[0][0]} Wins!`;
        return;
    }

    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        title.textContent = `Player ${board[0][2]} Wins!`;
        return;
    }

    if (board.flat().every(cell => cell)) {
        title.textContent = 'Draw!';
    }
}
startUp();