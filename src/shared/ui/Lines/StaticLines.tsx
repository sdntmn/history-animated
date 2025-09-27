import type React from "react"

import "./StaticLines.module.scss"

export const StaticLines: React.FC = () => {
  return (
    <div className="static-lines">
      <div className="static-line static-lines__horizontal-line"></div>
      <div className="static-line static-lines__vertical-line"></div>
    </div>
  )
}
