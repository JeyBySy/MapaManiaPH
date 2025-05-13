import React from 'react'

type GameOverMessageType = {
    isEmptyLives: boolean
    provinceName: string
    timeOut?: boolean
    finish?: boolean

}

const GameOverMessage: React.FC<GameOverMessageType> = ({ finish, timeOut, isEmptyLives, provinceName }) => {
    return (
        <p className='w-full text-center py-2 px-2 text-sm text-retro-text text-shadow-2xs'>
            {finish ? (
                <>Congratulations! You've completed the challenge!</>
            ) : isEmptyLives ? (
                <>
                    You've run out of lives on{' '}
                    <span className='dark:text-retro-purple text-retro-mint'>
                        "{provinceName}"
                    </span>. Better luck next time!
                </>
            ) : timeOut ? (
                <>You've run out of time. Better luck next time!</>
            ) : (
                <>TEST: Congratulations! You've completed the challenge!</>
            )}
        </p>
    )
}

export default GameOverMessage