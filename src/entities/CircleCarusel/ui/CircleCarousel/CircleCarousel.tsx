import type React from "react"
import type { TimePeriod } from "@/pages/History/ui/mockData"
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { useRotation } from "@/shared/lib/hooks/useRotation"
import { PointComponent, type PointComponentRef } from "../Point/Point"

import "./CircleCarousel.module.scss"
import { calculateClamp } from "@/entities/CircleCarusel/lib/helpers/calculate/calculateClamp"

export interface Props {
  activePeriod: TimePeriod
  periods: TimePeriod[]
  onPeriodChange: (index: number) => void
}

export const CircleCarousel: React.FC<Props> = ({
  activePeriod,
  periods,
  onPeriodChange,
}) => {
  const dialRef = useRef<HTMLDivElement>(null)
  const pointsRef = useRef<(PointComponentRef | null)[]>([])
  const { rotation, setRotation, getRotation } = useRotation(0) // ← используем setRotation вместо rotate

  const radius = calculateClamp(460, 37, 530) / 2
  const [activePoint, setActivePoint] = useState<number | null>(null)

  const calculateTargetRotation = useCallback(
    (pointIndex: number) => {
      const anglePerPoint = 360 / periods.length
      const pointAngle = anglePerPoint * pointIndex

      const targetRotation = -anglePerPoint - pointAngle

      return targetRotation
    },
    [periods.length]
  )

  const handlePointClick = useCallback(
    (index: number, event: MouseEvent<HTMLElement>) => {
      event.stopPropagation()

      if (
        activePoint !== null &&
        activePoint !== index &&
        pointsRef.current[activePoint]
      ) {
        pointsRef.current[activePoint]?.resetNumber()
      }

      setActivePoint(index)

      if (pointsRef.current[index]) {
        pointsRef.current[index]?.animateNumber()
      }

      const targetRotation = calculateTargetRotation(index)
      setRotation(targetRotation, dialRef.current)

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

  useEffect(() => {
    const activeIndex = periods.indexOf(activePeriod)
    if (activeIndex !== -1 && activeIndex !== activePoint) {
      setActivePoint(activeIndex)

      if (pointsRef.current[activeIndex]) {
        pointsRef.current[activeIndex]?.animateNumber()
      }

      const targetRotation = calculateTargetRotation(activeIndex)
      setRotation(targetRotation, dialRef.current)

      pointsRef.current.forEach((point, index) => {
        if (point && index !== activeIndex) {
          point.resetNumber()
        }
      })
    }
  }, [activePeriod, periods, activePoint, setRotation, calculateTargetRotation])

 const points = periods.map((period, index) => (
  <PointComponent
    key={period.id}
    ref={setPointRef(index)}
    index={index}
    totalPoints={periods.length}
    radius={radius}
    rotation={rotation.current}
    onPointClick={handlePointClick}
    category={period.category}
  />
));

  return (
    <div className="circle-carousel" ref={dialRef}>
      <div
        style={{
          transformOrigin: "center",
          transform: `rotate(-${getRotation()}deg)`,
        }}
      >
        {points}
      </div>
    </div>
  )
}
