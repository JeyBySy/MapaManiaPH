import React, { useEffect, useRef, useState } from "react"
import formatProvinceName from "../util/formatProvinceName"

interface TypingTextProps {
    text: string
    isSubmitted?: boolean
    isMasked?: boolean
    maskChar?: string
    delay?: number // typing delay per character in ms
    className?: string
}

const TypingText: React.FC<TypingTextProps> = ({
    text,
    isSubmitted = false,
    isMasked = false,
    maskChar = "?",
    delay = 50,
    className = "",
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
            setDisplayText(text.replace(/[A-Za-z_]/gi, maskChar).slice(0, 10))
        } else {
            setDisplayText(text.replace(/_/g, " "))
        }
    }, [isSubmitted, text, isMasked, maskChar, delay])

    return <p className={className}>{formatProvinceName(displayText)}</p>
}

export default TypingText
