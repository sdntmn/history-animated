import React from "react"
import "./Card.module.scss"

interface Props {
  year: number
  description: string
}

const Card: React.FC<Props> = ({ year, description }) => {
  return (
    <div className="card">
      <div className="card__year-badge">{year}</div>
      <div className="card__description">{description}</div>
    </div>
  )
}

export default Card
