import {  useMemo, useRef, useState } from "react"
import { LGU_PATHS } from "../util/constants"

export function useProvince(random: boolean = false) {
  const pathLimit = 10
  const provinceKeys = Object.keys(LGU_PATHS)
  const [pathVersion, setPathVersion] = useState(0)
  const [provinceOutline, setProvinceOutline] = useState(
    random ? provinceKeys[Math.floor(Math.random() * provinceKeys.length)] : provinceKeys[0]
  )
  const lastProvinceRef = useRef(provinceOutline);
  
  
  const selectProvince = (province: string) => {
    setProvinceOutline(province)
  }
  
  const nextProvince = () => {
    if (provinceKeys.length <= 1) return;
  
    let newKey = lastProvinceRef.current;
    while (newKey === lastProvinceRef.current) {     
      newKey = provinceKeys[Math.floor(Math.random() * provinceKeys.length)];
    }
  
    lastProvinceRef.current = newKey;
    setProvinceOutline(newKey);
  };
  

  const refreshPaths = () => {
    setPathVersion((prev) => prev + 1)
  }

  const provinceData = LGU_PATHS[provinceOutline]

  // // Get the 10 shuffled location with name and path
  // const locationPath = useMemo(() => {
  //   const paths = provinceData?.paths || []    
  //   const shuffled = [...paths]
  //   for (let i = shuffled.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1))
  //     ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  //   }
  
  //   return shuffled.slice(0, pathLimit)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathVersion,pathLimit, provinceData?.paths])

// Get the 10 shuffled location with name ONLY
  const locationName = useMemo(() => {
    const paths = provinceData?.paths || [];
    const shuffled = [...paths];
  
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  
    return shuffled
      .slice(0, pathLimit)
      .map((path) => path.id)
      .filter((id): id is string => !!id);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathVersion, pathLimit, provinceData?.paths]);

  // Get All location Name base on province params
  const getAllLocationName = (province: string) => {
    const data = LGU_PATHS[province];
    return data?.paths?.map((path) => path.id).sort().filter((id): id is string => !!id) || [];
  };

  return {
    provinceOutline,
    provinceKeys,
    setProvinceOutline,
    selectProvince,
    nextProvince,
    refreshPaths,
    locationName,
    getAllLocationName
  }
}
