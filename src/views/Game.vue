<template>
    <div class="snake-game" @keydown="handleKeydown" tabindex="0">
        <div class="grid">
            <h1>Snake Game</h1>
            <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="grid-row">
                <div v-for="(cell, colIndex) in row" :key="colIndex" :class="getCellClass(rowIndex, colIndex)"></div>
            </div>
        </div>
        <div class="score">Score: {{ score }}</div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            gridWidth: 20,
            gridHeight: 20,
            snake: [{ row: 0, col: 0 }],
            food: { row: 5, col: 5 },
            direction: 'right',
            intervalId: null,
            score: 0,
        };
    },
    computed: {
        grid() {
            const grid = [];
            for (let row = 0; row < this.gridHeight; row++) {
                const rowData = [];
                for (let col = 0; col < this.gridWidth; col++) {
                    rowData.push(false);
                }
                grid.push(rowData);
            }
            // Place snake on the grid
            this.snake.forEach(segment => {
                grid[segment.row][segment.col] = true;
            });
            // Place food on the grid
            grid[this.food.row][this.food.col] = true;
            return grid;
        },
    },
    mounted() {
        this.startGame();
    },
    methods: {
        startGame() {
            this.intervalId = setInterval(this.moveSnake, 200);
        },
        moveSnake() {
            const head = { ...this.snake[0] };
            switch (this.direction) {
                case 'up':
                    head.row--;
                    break;
                case 'down':
                    head.row++;
                    break;
                case 'left':
                    head.col--;
                    break;
                case 'right':
                    head.col++;
                    break;
            }
            // Check for collision with wall or self
            if (
                head.row < 0 ||
                head.row >= this.gridHeight ||
                head.col < 0 ||
                head.col >= this.gridWidth ||
                this.snake.some(segment => segment.row === head.row && segment.col === head.col)
            ) {
                clearInterval(this.intervalId);
                alert('Game Over');
                return;
            }
            this.snake.unshift(head);
            // Check for collision with food
            if (head.row === this.food.row && head.col === this.food.col) {
                this.score++;
                this.generateFood();
            } else {
                this.snake.pop();
            }
        },
        generateFood() {
            const emptyCells = [];
            this.grid.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (!cell) {
                        emptyCells.push({ row: rowIndex, col: colIndex });
                    }
                });
            });
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            this.food = emptyCells[randomIndex];
        },
        handleKeydown(event) {
            switch (event.key) {
                case 'ArrowUp':
                    if (this.direction !== 'down') {
                        this.direction = 'up';
                    }
                    break;
                case 'javascript':
                case 'ArrowDown':
                    if (this.direction !== 'up') {
                        this.direction = 'down';
                    }
                    break;
                case 'ArrowLeft':
                    if (this.direction !== 'right') {
                        this.direction = 'left';
                    }
                    break;
                case 'ArrowRight':
                    if (this.direction !== 'left') {
                        this.direction = 'right';
                    }
                    break;
            }
        },
        getCellClass(rowIndex, colIndex) {
            return {
                'grid-cell': true,
                'snake-cell': this.snake.some(segment => segment.row === rowIndex && segment.col === colIndex),
                'food-cell': this.food.row === rowIndex && this.food.col === colIndex,
            };
        },
    },
};
</script>
  
<style scoped>
.snake-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.grid {
    display: inline-block;
    box-shadow: 2px 6px 8px 1px rgba(0, 0, 0, 0.38);
    -webkit-box-shadow: 2px 6px 8px 1px rgba(0, 0, 0, 0.38);
    -moz-box-shadow: 2px 6px 8px 1px rgba(0, 0, 0, 0.38);
    padding: 50px;
}

.grid-row {
    display: flex;
}

.grid-cell {
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
}

.snake-cell {
    background-color: #333;
}

.food-cell {
    background-color: #ff0000;
}

.score {
    margin-top: 10px;
    font-weight: bold;
}
</style>
  