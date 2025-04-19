import {  useMemo, useState } from "react"
import { LGU_PATHS } from "../util/constants"

export function useProvince(random: boolean = false) {
  const pathLimit = 10
  const provinceKeys = Object.keys(LGU_PATHS)
  const [pathVersion, setPathVersion] = useState(0)

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

  const refreshPaths = () => {
    setPathVersion((prev) => prev + 1)
  }

  const provinceData = LGU_PATHS[provinceOutline]
  const locationPath = useMemo(() => {
    const paths = provinceData?.paths || []    
    const shuffled = [...paths]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
  
    return shuffled.slice(0, pathLimit)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathVersion,pathLimit, provinceData?.paths])

  return {
    provinceOutline,
    provinceKeys,
    setProvinceOutline,
    selectProvince,
    nextProvince,
    refreshPaths,
    locationPath
  }
}
