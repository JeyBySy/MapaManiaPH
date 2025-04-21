import React, { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PopUpProps {
  children: React.ReactNode
  visible: boolean
  onClose: () => void
  title?: string
}

const PopUp: React.FC<PopUpProps> = ({ children, visible, onClose, title }) => {
  const popupRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [visible, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={popupRef}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            className="bg-white dark:bg-gray-900 text-white min-w-1/4 rounded-md border-2 relative"
          >
            {/* Header */}
            <div className="bg-black/60  dark:bg-gray-700 p-4 rounded-t-sm text-center">
              <h2 className="text-lg font-bold font-mono tracking-wider uppercase text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
                {title}
              </h2>
            </div>

            {/* Close Button */}
            <div
              onClick={onClose}
              className="cursor-pointer rounded-sm p-4 absolute z-50 -top-3 -right-6 bg-red-600 text-white font-bold text-sm w-8 h-8 flex items-center justify-center border-2 border-black shadow-sm"
            >
              x
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex text-sm gap-2  ">{children}</div>
            </div>
            <div className="bg-black/60 dark:bg-gray-600 p-4 rounded-b-sm text-center"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PopUp
