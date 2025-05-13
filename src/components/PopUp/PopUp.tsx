import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface PopUpProps {
  children: React.ReactNode
  visible: boolean
  onClose?: () => void
  showExitBtn?: boolean
}

const PopUp: React.FC<PopUpProps> = ({ children, visible, onClose, showExitBtn = false }) => {
  const popupRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showExitBtn && (popupRef.current && !popupRef.current.contains(event.target as Node)) && onClose) {
        onClose()
      }
    }

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [visible, onClose, showExitBtn])

  return (
    <>
      {visible && (
        <div className="fixed inset-0 backdrop-blur flex flex-col items-center justify-center z-50">
          <motion.div
            ref={popupRef}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ stiffness: 300, damping: 20 }}
          >
            {/* Close Button */}
            {/* {showExitBtn && (
              <div
                onClick={onClose}
                className="cursor-pointer rounded-sm p-4 absolute z-50 -top-3 -right-6 bg-red-600 text-white font-bold text-sm w-8 h-8 flex items-center justify-center border-2 border-black shadow-sm"
              >
                x
              </div>
            )} */}

            {children}

          </motion.div>
        </div>
      )}
    </>
  )
}

export default PopUp
