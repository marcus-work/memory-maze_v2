document.addEventListener('DOMContentLoaded', () => {
    const mazeContainer = document.getElementById('maze');
    const startButton = document.getElementById('start-button');
    const difficultySelect = document.getElementById('difficulty');
    let mazeSize = 10;
    let maze = [];
    let isDrawing = false;
    let startCell;
    let currentPath = [];

    function generateMaze() {
        maze = Array.from({ length: mazeSize }, () => Array(mazeSize).fill('path'));

        // Generate walls with ensured solvable path
        for (let i = 0; i < mazeSize; i++) {
            for (let j = 0; j < mazeSize; j++) {
                if (Math.random() > 0.7 && !(i === 0 && j === 0) && !(i === mazeSize - 1 && j === mazeSize - 1)) {
                    maze[i][j] = 'wall';
                }
            }
        }

        // Ensure start and end are accessible
        maze[0][1] = 'path';
        maze[1][0] = 'path';
        maze[mazeSize - 2][mazeSize - 1] = 'path';
        maze[mazeSize - 1][mazeSize - 2] = 'path';

        maze[0][0] = 'start';
        maze[mazeSize - 1][mazeSize - 1] = 'end';
    }

    function createMaze() {
        mazeContainer.innerHTML = '';
        generateMaze();

        maze.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell', cell);
                cellDiv.dataset.row = rowIndex;
                cellDiv.dataset.col = cellIndex;
                mazeContainer.appendChild(cellDiv);
            });
        });

        mazeContainer.style.gridTemplateColumns = `repeat(${mazeSize}, 30px)`;
        mazeContainer.style.gridTemplateRows = `repeat(${mazeSize}, 30px)`;
    }

    function hideMaze() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            if (!cell.classList.contains('start') && !cell.classList.contains('end')) {
                cell.classList.add('hidden');
            }
        });
    }

    function startGame() {
        const difficulty = difficultySelect.value;
        mazeSize = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 10 : 15;
        createMaze();
        setTimeout(hideMaze, 5000);
    }

    function handleTouchStart(e) {
        const cell = e.target;
        if (cell.classList.contains('start')) {
            isDrawing = true;
            startCell = cell;
            currentPath = [cell];
            cell.classList.add('current');
        }
    }

    function handleTouchMove(e) {
        if (!isDrawing) return;
        const cell = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
        if (cell && cell.classList.contains('cell') && !cell.classList.contains('wall')) {
            if (!cell.classList.contains('current')) {
                currentPath.push(cell);
                cell.classList.add('current');
            }
        } else {
            alert('Oops! Try again.');
            resetGame();
        }
    }

    function handleTouchEnd(e) {
        if (!isDrawing) return;
        const cell = e.target;
        if (cell.classList.contains('end')) {
            alert('Congratulations! You did it!');
            celebrate();
            resetGame();
        } else {
            alert('Oops! Try again.');
            resetGame();
        }
    }

    function handleMouseStart(e) {
        const cell = e.target;
        if (cell.classList.contains('start')) {
            isDrawing = true;
            startCell = cell;
            currentPath = [cell];
            cell.classList.add('current');
        }
    }

    function handleMouseMove(e) {
        if (!isDrawing) return;
        const cell = e.target;
        if (cell && cell.classList.contains('cell') && !cell.classList.contains('wall')) {
            if (!cell.classList.contains('current')) {
                currentPath.push(cell);
                cell.classList.add('current');
            }
        } else {
            alert('Oops! Try again.');
            resetGame();
        }
    }

    function handleMouseEnd(e) {
        if (!isDrawing) return;
        const cell = e.target;
        if (cell.classList.contains('end')) {
            alert('Congratulations! You did it!');
            celebrate();
            resetGame();
        } else {
            alert('Oops! Try again.');
            resetGame();
        }
    }

    function resetGame() {
        isDrawing = false;
        currentPath.forEach(cell => cell.classList.remove('current'));
        startGame();
    }

    function celebrate() {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        document.body.appendChild(firework);
        setTimeout(() => {
            firework.remove();
        }, 1000);
    }

    startButton.addEventListener('click', startGame);
    mazeContainer.addEventListener('touchstart', handleTouchStart);
    mazeContainer.addEventListener('touchmove', handleTouchMove);
    mazeContainer.addEventListener('touchend', handleTouchEnd);

    mazeContainer.addEventListener('mousedown', handleMouseStart);
    mazeContainer.addEventListener('mousemove', handleMouseMove);
    mazeContainer.addEventListener('mouseup', handleMouseEnd);
});
