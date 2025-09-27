import type React from "react"
import cn from "classnames"

import "./AnimatedYear.module.scss"

interface Props {
  className?: string
  year: number
}

export const AnimatedYear: React.FC<Props> = ({ className, year }) => {
  const digits = year.toString().split("")

  return (
    <div className={cn("animated-year", className)}>
      {digits.map((digit, idx) => (
        <div
          key={`${year}-${idx}-${digit}`}
          className="animated-year__container"
        >
          <div className="digit">{digit}</div>
        </div>
      ))}
    </div>
  )
}
