import React from "react"

interface ButtonProps {
  btnName: string
  btnColor:
    | "retro-orange"
    | "retro-yellow"
    | "retro-mint"
    | "retro-purple"
    | "retro-bg"
    | "sky"
    | "emerald"
    | "red"
    | "gray"
  event?: () => void | null
}

const colorClasses: Record<string, string> = {
  "retro-orange": "from-[#ff5f5f] to-[#cc4b4b]",
  "retro-yellow": "from-[#fcd34d] to-[#eab308]",
  "retro-mint": "from-[#0ff0fc] to-[#0bc7cc]",
  "retro-purple": "from-[#a78bfa] to-[#7c3aed]",
  "retro-bg": "from-[#1a1a1d] to-[#2d2d30]",
  sky: "from-[#0ea5e9] to-[#0284c7]",
  emerald: "from-[#34d399] to-[#059669]",
  red: "from-[#f87171] to-[#dc2626]",
  gray: "from-[#6b7280] to-[#374151]",
}

const Button: React.FC<ButtonProps> = ({ btnName, btnColor, event }) => {
  const gradient = colorClasses[btnColor] || ""
  return (
    <>
      <button
        onClick={event || undefined}
        className={`button w-full px-2 py-3  text-white bg-gradient-to-b ${gradient} hover:opacity-90 relative`}
      >
        {btnName}
      </button>
    </>
  )
}

export default Button
