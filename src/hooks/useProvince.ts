import {  useState } from "react"
import { LGU_PATHS } from "../util/constants"

export function useProvince(random: boolean = false) {
  const pathLimit = 10
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

  const provinceData = LGU_PATHS[provinceOutline]


  // For persistent path data
  // const locationPath = useMemo(() => {
  //   const paths = provinceData?.paths || []
  
  //   // Shuffle paths using Fisher-Yates
  //   const shuffled = [...paths]
  //   for (let i = shuffled.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1))
  //     ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  //   }
  
  //   return shuffled.slice(0, pathLimit)
  // }, [pathLimit, provinceData?.paths])


  const getShuffledPaths = () => {
    const paths = provinceData?.paths || []
  
    const shuffled = [...paths]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
  
    return shuffled.slice(0, pathLimit)
  }

  return {
    provinceOutline,
    provinceKeys,
    setProvinceOutline,
    selectProvince,
    nextProvince,
    locationPath:getShuffledPaths()
  }
}
