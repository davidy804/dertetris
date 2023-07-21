import { MOVE_RIGHT, MOVE_LEFT, MOVE_DOWN, DROP, ROTATE, PAUSE, RESUME, RESTART, GAME_OVER } from '../actions'
import { defaultState, nextRotation, canMoveTo, addBlockToGrid, checkRows, randomShape, hardDrop, checkLevel } from '../utils'


const gameReducer = (state = defaultState(), action) => {
    const { shape, grid, x, y, rotation, nextShape, score, level, lines, isRunning } = state

    switch (action.type) {
        case ROTATE:
            const newRotation = nextRotation(shape, rotation)
            if (canMoveTo(shape, grid, x, y, newRotation)) {
                return { ...state, rotation: newRotation }
            }
            return state

        case MOVE_RIGHT:
            if (canMoveTo(shape, grid, x + 1, y, rotation)) {
                return { ...state, x: x + 1 }
            }
            return state

        case MOVE_LEFT:
            if (canMoveTo(shape, grid, x - 1, y, rotation)) {
                return { ...state, x: x - 1 }
            }
            return state

        case MOVE_DOWN:
            const potentialY = y + 1
            if (canMoveTo(shape, grid, x, potentialY, rotation)) {
                return { ...state, y: potentialY }
            }
            const obj = addBlockToGrid(shape, grid, x, y, rotation)
            const newGrid = obj.grid
            const gameOver = obj.gameOver
            const newState = defaultState()
            newState.grid = newGrid
            newState.shape = nextShape
            newState.nextShape = randomShape()
            newState.score = score
            newState.level = level
            newState.lines = lines
            newState.isRunning = isRunning

            if (gameOver) {
                const newState = { ...state }
                newState.shape = 0
                newState.grid = newGrid
                return { ...state, gameOver: true }
            }
            
            newState.lines = lines + checkRows(newGrid)
            newState.score = newState.lines * 40
            checkLevel(newState)
            return newState
        
        case DROP:
            const dropY = hardDrop(shape, grid, x, y, rotation)
            if (canMoveTo(shape, grid, x, dropY, rotation)) {
                return { ...state, y: dropY }
            }

        case RESUME:
            return { ...state, isRunning: true }

        case PAUSE:
            return { ...state, isRunning: false }

        case GAME_OVER:
            return state

        case RESTART:
            return defaultState()

        default:
            return state
    }
}

export default gameReducer
