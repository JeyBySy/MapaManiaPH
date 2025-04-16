export interface LGUPath {
  id: string | null
  d: string
}

export interface ProvinceShape {
  viewBox: string
  paths: LGUPath[]
}

export interface LGU_PATH_TYPE {
  [provinceKey: string]: ProvinceShape
}
