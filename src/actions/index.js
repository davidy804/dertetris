export const PAUSE      = "PAUSE"
export const RESUME     = "RESUME"
export const MOVE_LEFT  = "MOVE_LEFT"
export const MOVE_RIGHT = "MOVE_RIGHT"
export const ROTATE     = "ROTATE"
export const MOVE_DOWN  = "MOVE_DOWN"
export const DROP       = "DROP"
export const GAME_OVER  = "GAME_OVER"
export const RESTART    = "RESTART"

export const moveRight = () => {
    return { type: MOVE_RIGHT }
}

export const moveLeft = () => {
    return { type: MOVE_LEFT }
}

export const rotate = () => {
    return { type: ROTATE }
}

export const moveDown = () => {
    return { type: MOVE_DOWN }
}

export const drop = () => {
    return { type: DROP }
}

export const pause = () => {
    return { type: PAUSE }
}

export const resume = () => {
    return { type: RESUME }
}

export const restart = () => {
    return { type: RESTART }
}
