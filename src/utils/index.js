export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const gridDefault = () => {
    const rows = 18
    const cols = 10
    const array = []

    for (let row = 0; row < rows; row++) {
        array.push([])
        for (let col = 0; col < cols; col++) {
            array[row].push(0)
        }
    }

    return array
}

export const shapes = [
    // none
    [[[0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]]],
  
    // I
    [[[0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0]],
  
     [[0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]]],
  
    // T
    [[[0,0,0,0],
      [0,1,0,0],
      [1,1,1,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [0,1,1,0],
      [0,1,0,0],
      [0,0,0,0]],
  
     [[0,0,0,0],
      [1,1,1,0],
      [0,1,0,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [1,1,0,0],
      [0,1,0,0],
      [0,0,0,0]]],
  
    // L
    [[[0,0,0,0],
      [0,0,1,0],
      [1,1,1,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [0,1,0,0],
      [0,1,1,0],
      [0,0,0,0]],
  
     [[0,0,0,0],
      [0,1,1,1],
      [0,1,0,0],
      [0,0,0,0]],
  
     [[0,1,1,0],
      [0,0,1,0],
      [0,0,1,0],
      [0,0,0,0]]],
  
    // J
    [[[0,0,0,0],
      [0,1,0,0],
      [0,1,1,1],
      [0,0,0,0]],
  
     [[0,1,1,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],
  
     [[0,0,0,0],
      [1,1,1,0],
      [0,0,1,0],
      [0,0,0,0]],
  
     [[0,0,1,0],
      [0,0,1,0],
      [0,1,1,0],
      [0,0,0,0]]],
  
    // Z
    [[[0,0,0,0],
      [1,1,0,0],
      [0,1,1,0],
      [0,0,0,0]],
  
     [[0,0,1,0],
      [0,1,1,0],
      [0,1,0,0],
      [0,0,0,0]]],
  
    // S
    [[[0,0,0,0],
      [0,1,1,0],
      [1,1,0,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [0,1,1,0],
      [0,0,1,0],
      [0,0,0,0]]],
  
    // O
    [[[0,0,0,0],
      [0,1,1,0],
      [0,1,1,0],
      [0,0,0,0]]]
  ]

export const randomShape = () => {
    return random(1, shapes.length - 1)
}

export const defaultState = () => {
    return {
        grid: gridDefault(),
        shape: randomShape(),
        rotation: 0,
        x: 3,
        y: -2,
        nextShape: randomShape(),
        isRunning: true,
        score: 0,
        speed: 1000,
        level: 1,
        lines: 0,
        gameOver: false
    }
}

export const nextRotation = (shape, rotation) => {
    return (rotation + 1) % shapes[shape].length
}

export const canMoveTo = (shape, grid, x, y, rotation) => {
    const currentShape = shapes[shape][rotation]
    const gridWidth = grid[0].length - 1
    const gridHeight = grid.length - 1
    for (let row = 0; row < currentShape.length; row++) {
        for (let col = 0; col < currentShape[row].length; col++) {
            if (currentShape[row][col] !== 0) {
                const proposedX = col + x
                const proposedY = row + y
                const possibleRow = grid[proposedY]

                if (proposedX < 0 || proposedX > gridWidth || proposedY > gridHeight) {
                    return false
                } else if (possibleRow !== undefined) {
                    if (possibleRow[proposedX] !== 0) {
                        return false
                    }
                }
            }
        }
    }
    return true
}

export const addBlockToGrid = (shape, grid, x, y, rotation) => {
    const block = shapes[shape][rotation];
    const newGrid = [...grid];

    let blockOffGrid = false

    for (let row = 0; row < block.length; row++) {
        for (let col = 0; col < block[row].length; col++) {
            if (block[row][col]) {
                const yIndex = row + y
                if (yIndex < 0) {
                    blockOffGrid = true
                } else {
                    newGrid[row + y][col + x] = shape
                }
            }
        }
    }
    return { grid: newGrid, gameOver: blockOffGrid }
}

export const hardDrop = (shape, grid, x, y, rotation) => {
    while (canMoveTo(shape, grid, x, y, rotation)) {
        y += 1
    }
    return y - 1
}

export const checkRows = (grid) => {
    let completedRows = 0

    for (let row = 0; row < grid.length; row++) {
        if (grid[row].indexOf(0) === -1) {
            completedRows += 1
            grid.splice(row, 1)
            grid.unshift(Array(10).fill(0))
        }
    }
    return completedRows
}

export const checkLevel = (newState) => {
    if (newState.score >= 400) {
        newState.level = 2
        newState.speed = 900
    }
    if (newState.score >= 800) {
        newState.level = 3
        newState.speed = 800
    }
    if (newState.score >= 1200) {
        newState.level = 4
        newState.speed = 700
    }
    if (newState.score >= 1600) {
        newState.level = 5
        newState.speed = 600
    }
    if (newState.score >= 2000) {
        newState.level = 6
        newState.speed = 500
    }
    if (newState.score >= 2400) {
        newState.level = 7
        newState.speed = 400
    }
    if (newState.score >= 2800) {
        newState.level = 8
        newState.speed = 300
    }
    if (newState.score >= 3200) {
        newState.level = 9
        newState.speed = 200
    }
    if (newState.score >= 3600) {
        newState.level = 10
        newState.speed = 100
    }
}
