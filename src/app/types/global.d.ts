declare module "*.jpg"
declare module "*.png"
declare module "*.jpeg"

declare module "*.svg" {
  import type React from "react"

  const SVG: React.FC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare const __IS_DEV__: boolean

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T
}
