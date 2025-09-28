import type { MouseEvent } from "react"
import cn from "classnames"
import gsap from "gsap"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import {
  animatePointActive,
  animatePointHover,
  getPointPosition,
  resetPointActive,
  resetPointHover,
} from "../../lib/helpers/animation"
import "./Point.module.scss"
import { DEGREES, DURATIONS } from "@/shared/const/number"

export interface Props {
  index: number
  totalPoints: number
  radius: number
  rotation: number
  onPointClick: (index: number, event: MouseEvent<HTMLElement>) => void
  category: string
}

export interface PointComponentRef {
  animateNumber: () => void
  resetNumber: () => void
  updateRotation: (newRotation: number) => void
}

export const PointComponent = forwardRef<PointComponentRef, Props>(
  ({ index, totalPoints, radius, rotation, onPointClick, category }, ref) => {
    const pointRef = useRef<HTMLDivElement>(null)
    const textContainerRef = useRef<HTMLDivElement>(null)
    const numberElRef = useRef<HTMLSpanElement>(null)
    const categoryElRef = useRef<HTMLSpanElement>(null)
    const containerRef = useRef<HTMLButtonElement>(null)
    const [isActive, setIsActive] = useState(false)

    const baseTextRotation = DEGREES.ZERO
    const textRotation = baseTextRotation - rotation

    useImperativeHandle(ref, () => ({
      animateNumber: () => {
        setIsActive(true)
        animatePointActive(pointRef, numberElRef, categoryElRef)
        if (textContainerRef.current) {
          gsap.set(textContainerRef.current, {
            rotation: DEGREES.FULL_CIRCLE / totalPoints,
          })
        }
      },
      resetNumber: () => {
        setIsActive(false)
        resetPointActive(pointRef, numberElRef, categoryElRef)
        if (textContainerRef.current) {
          gsap.set(textContainerRef.current, {
            rotation: textRotation,
          })
        }
      },
      updateRotation: (newRotation: number) => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            rotation: -newRotation,
            duration: DURATIONS.SECOND_0_6,
            ease: "none",
          })
        }
        if (textContainerRef.current && !isActive) {
          const newTextRotation = baseTextRotation - newRotation
          gsap.to(textContainerRef.current, {
            rotation: newTextRotation,
            duration: DURATIONS.SECOND_0_6,
            ease: "none",
          })
        }
      },
    }))

    const handleMouseEnter = () => {
      if (!isActive) {
        animatePointHover(pointRef, numberElRef)
      }
    }

    const handleMouseLeave = () => {
      if (!isActive) {
        resetPointHover(pointRef, numberElRef)
      }
    }
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onPointClick(index, e)
    }

    const position = getPointPosition(index, totalPoints, radius)

    return (
      <button
        aria-expanded={isActive}
        aria-label={`Select ${category} period`}
        ref={containerRef}
        className={cn(
          "point-component",
          isActive && "point-component__inactive"
        )}
        type="button"
        style={{
          left: `calc(50% + ${position.x}px)`,
          top: `calc(50% + ${position.y}px)`,
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={pointRef}
          className={cn(
            "point-component__circle",
            isActive && "point-component__circle--active"
          )}
        >
          <div
            ref={textContainerRef}
            className="point-component__text-container"
            style={{
              transform: `rotate(${textRotation}deg)`,
            }}
          >
            <span
              ref={numberElRef}
              className="point-component__number"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              {index + 1}
            </span>
            <span
              ref={categoryElRef}
              className="point-component__category"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </div>
        </div>
      </button>
    )
  }
)

PointComponent.displayName = "PointComponent"
