import React from "react"

interface ButtonProps {
  btnName: string
  icon: string
}

const Button: React.FC<ButtonProps> = ({ btnName, icon }) => {
  return (
    <button className={`px-2 py-3 text-white relative w-full cursor-pointer rounded-full `}>
      <p className="flex justify-center items-center gap-2 text-center">
        <span>{icon}</span>
        <span>{btnName}</span>
      </p>
    </button>
  )
}

export default Button
