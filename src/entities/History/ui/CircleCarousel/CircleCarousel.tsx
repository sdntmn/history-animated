import React, { useRef, useCallback, useState, MouseEvent, useEffect } from "react"
import { PointComponent, PointComponentRef } from "../Point/Point"
import "./CircleCarousel.module.scss"
import { useRotation } from "@/shared/lib/hooks/useRotation"
import { calculateClamp } from "../../lib/calculate/calculateClamp"
import { TimePeriod } from "@/pages/History/ui/mockData"

export interface Props {
  activePeriod: TimePeriod
  periods: TimePeriod[]
  onPeriodChange: (index: number) => void
}

export const CircleCarousel: React.FC<Props> = ({ activePeriod, periods, onPeriodChange }) => {
  const dialRef = useRef<HTMLDivElement>(null)
  const pointsRef = useRef<(PointComponentRef | null)[]>([])
  const { rotation, setRotation, getRotation } = useRotation(0) // ← используем setRotation вместо rotate

  const radius = calculateClamp(460, 37, 530) / 2
  const [activePoint, setActivePoint] = useState<number | null>(null)

  const calculateTargetRotation = useCallback(
    (pointIndex: number) => {
      const anglePerPoint = 360 / periods.length
      const pointAngle = anglePerPoint * pointIndex

      const targetRotation = -60 - pointAngle

      return targetRotation
    },
    [periods.length]
  )

  const handleDialClick = useCallback(() => {
    if (activePoint !== null && pointsRef.current[activePoint]) {
      pointsRef.current[activePoint]?.resetNumber()
      setActivePoint(null)
    }
  }, [activePoint])

  const handlePointClick = useCallback(
    (index: number, event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation()

      if (activePoint !== null && activePoint !== index && pointsRef.current[activePoint]) {
        pointsRef.current[activePoint]?.resetNumber()
      }

      setActivePoint(index)

      // Анимируем новую точку
      if (pointsRef.current[index]) {
        pointsRef.current[index]?.animateNumber()
      }

      // Вращаем круг так чтобы точка оказалась под углом 60°
      const targetRotation = calculateTargetRotation(index)
      setRotation(targetRotation, dialRef.current) // ← используем setRotation

      // Вызываем колбэк для изменения активного периода
      onPeriodChange(index)
    },
    [activePoint, onPeriodChange, setRotation, calculateTargetRotation]
  )

  const setPointRef = useCallback(
    (index: number) => (el: PointComponentRef | null) => {
      pointsRef.current[index] = el
    },
    []
  )

  // Эффект для синхронизации при изменении активного периода
  useEffect(() => {
    const activeIndex = periods.findIndex((period) => period === activePeriod)
    if (activeIndex !== -1 && activeIndex !== activePoint) {
      setActivePoint(activeIndex)

      // Анимируем активную точку
      if (pointsRef.current[activeIndex]) {
        pointsRef.current[activeIndex]?.animateNumber()
      }

      // Вращаем круг к активной точке
      const targetRotation = calculateTargetRotation(activeIndex)
      setRotation(targetRotation, dialRef.current) // ← используем setRotation

      // Сбрасываем другие точки
      pointsRef.current.forEach((point, index) => {
        if (point && index !== activeIndex) {
          point.resetNumber()
        }
      })
    }
  }, [activePeriod, periods, activePoint, setRotation, calculateTargetRotation])

  const points = Array.from({ length: periods.length }, (_, index) => {
    const period = periods[index]
    return (
      <PointComponent
        key={index}
        ref={setPointRef(index)}
        index={index}
        totalPoints={periods.length}
        radius={radius}
        rotation={rotation.current}
        onPointClick={handlePointClick}
        category={period?.category}
      />
    )
  })

  return (
    <div className="circle-carousel" ref={dialRef} onClick={handleDialClick}>
      <div
        style={{
          transformOrigin: "center",
          transform: `rotate(-${getRotation()}deg)`, // убрал transition, т.к. gsap handles it
        }}
      >
        {points}
      </div>
    </div>
  )
}
