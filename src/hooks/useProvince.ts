import { useMemo, useRef, useState } from "react"
import { LGU_PATHS,MAX_GUESS_PATH_LIMIT,MAX_CHALLENGE_PROVINCE_LIMIT } from "../util/constants"

export function useProvince(random: boolean = false) {
 
  const provinceKeys = Object.keys(LGU_PATHS)
  const [pathVersion, setPathVersion] = useState(0)
  const [provinceOutline, setProvinceOutline] = useState(
    random ? provinceKeys[Math.floor(Math.random() * provinceKeys.length)] : provinceKeys[0]
  )
  const [randomProvinces, setRandomProvinces] = useState<string[]>([]);
  const lastProvinceRef = useRef(provinceOutline);
  const provinceData = LGU_PATHS[provinceOutline]

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
  
  // // Get the 10 shuffled location with name and path
  // const locationNameAndPath = useMemo(() => {
  //   const paths = provinceData?.paths || []    
  //   const shuffled = [...paths]
  //   for (let i = shuffled.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1))
  //     ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  //   }

  //   return shuffled.slice(0, MAX_GUESS_PATH_LIMIT)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathVersion,MAX_GUESS_PATH_LIMIT, provinceData?.paths])

  // Get the 10 shuffled location with name ONLY
  const locationName = useMemo(() => {
    const paths = provinceData?.paths || [];
    const shuffled = [...paths];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled
      .slice(0, MAX_GUESS_PATH_LIMIT)
      .map((path) => path.id)
      .filter((id): id is string => !!id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathVersion, MAX_GUESS_PATH_LIMIT, provinceData?.paths]);

  
  // Get All location Name base on province params
  const getAllLocationName = (province: string) => {
    const data = LGU_PATHS[province];
    return data?.paths?.map((path) => path.id).sort().filter((id): id is string => !!id) || [];
  };

  // Challenge Mode Functions
  const generateRandomProvinces = () => {
    const shuffled = [...provinceKeys];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selected = shuffled.slice(0, MAX_CHALLENGE_PROVINCE_LIMIT);
    setRandomProvinces(selected);
    return selected;
  };

  const provinceLocations = useMemo(() => {
    return randomProvinces.map((province) => {
      const data = LGU_PATHS[province];      
      const paths = data?.paths || [];
      const shuffled = [...paths];
  
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
  
      return {
        province,
        locations: shuffled
          .slice(0, MAX_GUESS_PATH_LIMIT)
          .map((path) => path.id)
          .filter((id): id is string => !!id),
      };
    });
  }, [randomProvinces]);
  

  return {
    provinceOutline,
    provinceKeys,
    setProvinceOutline,
    nextProvince,
    refreshPaths,
    locationName,
    getAllLocationName,
    randomProvinces,
    generateRandomProvinces,
    provinceLocations,    
  }
}
