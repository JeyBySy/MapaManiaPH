import React, { useEffect, useRef, useState } from "react"
import { ignoreCharProvinceName, maskProvinceName } from "../util/formatProvinceName"

interface TypingTextProps {
    text: string | null | undefined
    isSubmitted?: boolean
    isMasked?: boolean
    delay?: number // typing delay per character in ms
    className?: string
    upperCase?: boolean
}

const TypingText: React.FC<TypingTextProps> = ({
    text,
    isSubmitted = false,
    isMasked = false,
    delay = 50,
    className = "",
    upperCase = false
}) => {
    const [displayText, setDisplayText] = useState("")
    const indexRef = useRef(0)

    useEffect(() => {
        if (!text) return

        if (isSubmitted) {
            setDisplayText("")
            indexRef.current = 0

            const interval = setInterval(() => {
                if (indexRef.current < text.length) {
                    const nextChar = text[indexRef.current]
                    setDisplayText((prev) => prev + nextChar)
                    indexRef.current++
                } else {
                    clearInterval(interval)
                }
            }, delay)

            return () => clearInterval(interval)
        } else if (isMasked) {
            setDisplayText(maskProvinceName(text).slice(0, ignoreCharProvinceName(text).length))
        } else {
            setDisplayText(ignoreCharProvinceName(text))
        }
    }, [isSubmitted, text, isMasked, delay])

    return <p className={`${className} capitalize`}>{upperCase ? ignoreCharProvinceName(displayText) : ignoreCharProvinceName(displayText.toLowerCase())}</p>
}

export default TypingText
