import { useState } from "react"
import { LGU_PATHS } from "../util/constants"

export function useProvince(random: boolean = false) {
  const provinceKeys = Object.keys(LGU_PATHS)  
  const [provinceOutline, setProvinceOutline] = useState(
    random ? provinceKeys[Math.floor(Math.random() * provinceKeys.length)] : provinceKeys[0]
  )

  const selectProvince = (province: string) => {
    setProvinceOutline(province)
  }
  
  const nextProvince = () => {
    const newKey = provinceKeys[Math.floor(Math.random() * provinceKeys.length)]
    setProvinceOutline(newKey)
  }

  return {
    provinceOutline,
    provinceKeys,
    setProvinceOutline,
    selectProvince,
    nextProvince,
  }
}
