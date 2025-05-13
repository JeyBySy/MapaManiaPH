import React from 'react'

type GameOverMessageType = {
    isEmptyLives: boolean
    provinceName: string
    timeOut?: boolean
    finish?: boolean
    surrender?: boolean

}

const GameOverMessage: React.FC<GameOverMessageType> = ({ surrender, finish, timeOut, isEmptyLives, provinceName }) => {
    return (
        <p className='w-full text-center py-2 px-2 text-[55%] lg:text-sm text-retro-text text-shadow-2xs'>
            {finish ? (
                <>Congratulations! You've completed the challenge!</>
            ) : surrender && timeOut ? (
                <>Take a moment to explore the map and learn more about the province's outline.</>
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
                <>Better luck next time!</>
            )}
        </p>
    )
}

export default GameOverMessage