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
          className="fixed inset-0 z-50 flex lg:items-center py-5 lg:justify-center backdrop-blur-sm bg-black/50"
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
            className="bg-gray-100 dark:bg-gray-900 text-white  mx-auto lg:w-2xl lg:min-w-[400px] rounded-md border-2 border-gray-300 shadow relative"
          >
            {/* Close Button */}
            <div
              onClick={onClose}
              className="cursor-pointer rounded-sm p-4 absolute z-50 -top-3 -right-6 bg-red-600 text-white font-bold text-sm w-8 h-8 flex items-center justify-center border-2 border-black shadow-sm"
            >
              x
            </div>

            <div className="">
              {/* Header */}
              <div className="bg-gray-400  dark:bg-gray-700 p-4 rounded-t-sm">
                <h2 className="text-xs lg:text-lg font-bold font-mono tracking-wider uppercase text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
                  {title}
                </h2>
              </div>

              {/* Content */}
              <div className="flex text-xs gap-2 max-h-[80vh] text-wrap overflow-y-auto ">{children}</div>

              {/* Footer */}
              <div className="bg-gray-400  dark:bg-gray-600 p-4 rounded-b-sm text-center"></div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PopUp
