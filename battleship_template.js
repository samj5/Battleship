
document.addEventListener('DOMContentLoaded', function() {
    //Player Canvas
    const canvas = document.getElementById('battleshipCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 10;
    const cellSize = canvas.width / gridSize;
    let shipsOnBoard = [];

    //Enemy Canvas
    const canvas2 = document.getElementById('oppBattleshipCanvas');
    const ctx2 = canvas2.getContext('2d');
    const gridSize2 = 10;
    const cellSize2 = canvas2.width / gridSize2;
    let ships = [];

    //Function to Draw the first grid/the player grid
    function drawBoard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }

    //Identical Function to draw the enemy grid
    function drawBoard2() {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        for(let i = 0; i < gridSize2; i++) {
            for (let j = 0; j < gridSize2; j++) {
                ctx2.strokeRect(i * cellSize2, j * cellSize2, cellSize2, cellSize2);
            }
        }
    }

    //Function which draws the ship(fills in cells) when a certain type of ship is dragged and dropped
    function drawShips() {
        shipsOnBoard.forEach(function(position) {
            ctx.fillStyle = 'navy';
            ctx.fillRect(position[0] * cellSize, position[1] * cellSize, cellSize, cellSize);
        });
    }


    function canPlaceShip(gridX, gridY, shipSize) {
        for (let i = 0; i < shipSize; i++) {
            if (gridX + i >= gridSize || shipsOnBoard.some(position => position[0] === gridX + i && position[1] === gridY)) {
                return false; // A part of the ship overlaps with an existing ship or goes out of bounds
            }
        }
        return true; // No overlap, ship can be placed
    }

    function drawShips2() {
        const canvas2 = document.getElementById('oppBattleshipCanvas');
        const ctx2 = canvas2.getContext('2d');
        const gridSize2 = 10;
        const cellSize2 = canvas2.width / gridSize2;
        
        // Clear the ships array
        ships = [];
    
        // Define the ship sizes
        const shipSizes = [5, 4, 3, 3, 2];
    
        // Randomly place ships
        for (let i = 0; i < 5; i++) {
            const shipSize = shipSizes[i];
            let validPlacement = false;
    
            while (!validPlacement) {
                // Randomly generate coordinates for ship placement
                const x = Math.floor(Math.random() * (gridSize2 - shipSize + 1));
                const y = Math.floor(Math.random() * gridSize2);
    
                // Check if the placement is valid (no overlap)
                if (canPlaceShip(x, y, shipSize)) {
                    // Place the ship
                    for (let j = 0; j < shipSize; j++) {
                        ships.push([x + j, y]);
                    }
                    validPlacement = true;
                }
            }
        }
    
        // Draw the ships on the canvas
        ships.forEach(function(position) {
            ctx2.fillStyle = 'green';
            ctx2.fillRect(position[0] * cellSize2, position[1] * cellSize2, cellSize2, cellSize2);
        });
    }
    


    document.querySelectorAll('.ship').forEach(ship => {
        ship.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
    });


    //Dragover and drop are both event listeners for the players grid where the drag and drop for the ships sets up the players grid
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


    // Function to check if a ship exists at the specified grid coordinates on the enemy canvas
    function checkForShip(gridX, gridY) {
        // Iterate through the shipsOnBoard array
        for (let i = 0; i < ships.length; i++) {
            // Get the coordinates of the current ship
            const shipX = ships[i][0];
            const shipY = ships[i][1];
            
            // Check if the ship's coordinates match the clicked cell's coordinates
            if (shipX === gridX && shipY === gridY) {
                return true; // Ship found at the clicked cell
            }
        }
        return false; // No ship found at the clicked cell
    }



   
    canvas2.addEventListener('click', function(e) {
        const rect = canvas2.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const gridX = Math.floor(x / cellSize2);
        const gridY = Math.floor(y / cellSize2);

        console.log('Clicked coordinates:', gridX, gridY);

        if (checkForShip(gridX, gridY)) {
            console.log('Ship detected at coordinates:', gridX, gridY);
            ctx2.fillStyle = 'red';
            ctx2.fillRect(gridX * cellSize2, gridY * cellSize2, cellSize2, cellSize2);
        } else {
            console.log('No ship detected at coordinates:', gridX, gridY);
        }
    });





    drawBoard();
    drawBoard2();
    drawShips2();


});













