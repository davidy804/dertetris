import React from 'react'
import { useSelector } from 'react-redux'

// Displays a message
export default function MessagePopup(props) {
    const isRunning = useSelector((state) => state.game.isRunning)
    const gameOver = useSelector((state) => state.game.gameOver)

    let message1 = ''
    let message2 = ''
    let message3 = ''
    let message4 = ''
    let message5 = ''
    let message6 = ''
    let isHidden = 'hidden'

    if (gameOver) {
        message1 = 'GAME OVER'
        message2 = 'Arrow Keys to Move'
        message3 = 'Up Arrow Key to Rotate'
        message4 = 'Space to Hard Drop'
        message5 = 'R to Retry'
        message6 = 'Escape to Pause/Resume'
        isHidden = ''
    } else if (!isRunning) {
        message1 = 'PAUSED'
        message2 = 'Arrow Keys to Move'
        message3 = 'Up Arrow Key to Rotate'
        message4 = 'Space to Hard Drop'
        message5 = 'R to Retry'
        message6 = 'Escape to Pause/Resume'
        isHidden = ''
    }

    return (
        <div className={`message-popup ${isHidden}`}>
            <h1>{message1}</h1>
            <h5>{message2}</h5>
            <h5>{message3}</h5>
            <h5>{message4}</h5>
            <h5>{message5}</h5>
            <h5>{message6}</h5>
        </div>
    )
}
