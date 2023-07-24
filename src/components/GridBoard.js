import React, { useEffect, useRef } from 'react'
import GridSquare from './GridSquare'
import { useSelector, useDispatch } from 'react-redux'
import { shapes } from '../utils'
import { moveLeft, moveRight, moveDown, drop, rotate, pause, resume, restart } from '../actions'

export default function GridBoard(props) {
    const game = useSelector((state) => state.game)
    const { grid, shape, rotation, x, y, isRunning, speed } = game
    const block = shapes[shape][rotation]
    const blockColor = shape
    const requestRef = useRef()
    const lastUpdateTimeRef = useRef(0)
    const progressTimeRef = useRef(0)
    const dispatch = useDispatch()
    const gridSquares = grid.map((rowArray, row) => {
        return rowArray.map((square, col) => {
            const blockX = col - x
            const blockY = row - y
            let color = square
            if (blockX >= 0 && blockX < block.length && blockY >= 0 && blockY < block.length) {
                color = block[blockY][blockX] === 0 ? color:blockColor
            }
            const k = row * grid[0].length + col;
            return <GridSquare key={k} color={color} />
        })
    })

    const update = (time) => {
        requestRef.current = requestAnimationFrame(update)
        if (!isRunning) {
            return
        }
        if (!lastUpdateTimeRef.current) {
            lastUpdateTimeRef.current = time
        }
        const deltaTime = time - lastUpdateTimeRef.current
        progressTimeRef.current += deltaTime
        if (progressTimeRef.current > speed) {
            dispatch(moveDown())
            progressTimeRef.current = 0
        }
        lastUpdateTimeRef.current = time
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(update)
        return () => cancelAnimationFrame(requestRef.current)
    }, [isRunning, speed])

    const handleKeyDown = event => {
        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                dispatch(moveLeft());
                break;
            case 'ArrowUp':
                event.preventDefault();
                dispatch(rotate());
                break;
            case 'ArrowRight':
                event.preventDefault();
                dispatch(moveRight());
                break;
            case 'ArrowDown':
                event.preventDefault();
                dispatch(moveDown());
                break;
            case ' ':
                event.preventDefault();
                dispatch(drop());
                dispatch(moveDown());
                break;
            case 'Escape':
                event.preventDefault();
                if (isRunning) {
                    dispatch(pause())
                } else {
                    dispatch(resume())
                }
                break;
            case 'r':
                event.preventDefault();
                dispatch(restart());
                break;
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    })

    return (
        <div className='grid-board'>
            {gridSquares}
        </div>
    )
}
