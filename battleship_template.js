document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('battleshipCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 10;
    const cellSize = canvas.width / gridSize;
    let shipsOnBoard = [];

    function drawBoard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }

    function drawShips() {
        shipsOnBoard.forEach(function(position) {
            ctx.fillStyle = 'navy';
            ctx.fillRect(position[0] * cellSize, position[1] * cellSize, cellSize, cellSize);
            console.log(shipsOnBoard);
        });
    }

    function canPlaceShip(gridX, gridY, shipSize) {
        for (let i = 0; i < shipSize; i++) {
            if (shipsOnBoard.some(position => position[0] === gridX + i && position[1] === gridY)) {
                return false; // A part of the ship overlaps with an existing ship
            }
        }
        return true; // No overlap, ship can be placed
    }

    document.querySelectorAll('.ship').forEach(ship => {
        ship.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
    });

    canvas.addEventListener('dragover', function(e) {
        e.preventDefault();
    });


    canvas.addEventListener('drop', function(e) {
        e.preventDefault();
        const shipId = e.dataTransfer.getData('text/plain');
        const ship = document.getElementById(shipId);
        const shipSize = parseInt(ship.dataset.size);
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const gridX = Math.floor(x / cellSize);
        const gridY = Math.floor(y / cellSize);
        
        if (gridX + shipSize <= gridSize && canPlaceShip(gridX, gridY, shipSize)) {
            for (let i = 0; i < shipSize; i++) {
                shipsOnBoard.push([gridX + i, gridY]);
            }
            ship.style.display = 'none'; // Hide the ship after placing it
            drawBoard();
            drawShips();
        }
    });


    
    drawBoard();
});


