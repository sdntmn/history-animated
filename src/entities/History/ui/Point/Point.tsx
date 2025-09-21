import gsap from "gsap"
import React, { useRef, MouseEvent, forwardRef, useImperativeHandle, useState } from "react"

import "./Point.module.scss"

export interface PointComponentProps {
  index: number
  totalPoints: number
  radius: number
  rotation: number
  onPointClick: (index: number, event: MouseEvent<HTMLDivElement>) => void
  category: string
}

export interface PointComponentRef {
  animateNumber: () => void
  resetNumber: () => void
  updateRotation: (newRotation: number) => void
}

export const PointComponent = forwardRef<PointComponentRef, PointComponentProps>(
  ({ index, totalPoints, radius, rotation, onPointClick, category }, ref) => {
    const pointRef = useRef<HTMLDivElement>(null)
    const textContainerRef = useRef<HTMLDivElement>(null)
    const numberElRef = useRef<HTMLSpanElement>(null)
    const categoryElRef = useRef<HTMLSpanElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const angle = (360 / totalPoints) * index
    const x = radius * Math.cos((angle * Math.PI) / 180)
    const y = radius * Math.sin((angle * Math.PI) / 180)

    const baseTextRotation = 0
    const textRotation = baseTextRotation - rotation

    useImperativeHandle(ref, () => ({
      animateNumber: () => {
        setIsActive(true)
        if (pointRef.current) {
          gsap.to(pointRef.current, {
            width: 56,
            height: 56,
            backgroundColor: "#f4f5f9",
            borderRadius: "50%",
            duration: 0.4,
            ease: "back.out(1.7)",
            onComplete: () => {
              if (numberElRef.current) {
                gsap.to(numberElRef.current, {
                  opacity: 1,
                  visibility: "visible",
                  duration: 0.2,
                  delay: 0.1,
                })
              }
              if (categoryElRef.current) {
                gsap.to(categoryElRef.current, {
                  opacity: 1,
                  visibility: "visible",
                  duration: 0.2,
                  delay: 0.1,
                })
              }
            },
          })
        }
        if (textContainerRef.current) {
          gsap.set(textContainerRef.current, {
            rotation: 60,
          })
        }
      },
      resetNumber: () => {
        setIsActive(false)
        if (pointRef.current) {
          if (numberElRef.current) {
            gsap.set(numberElRef.current, { opacity: 0, visibility: "hidden" })
          }
          if (categoryElRef.current) {
            gsap.set(categoryElRef.current, { opacity: 0, visibility: "hidden" })
          }

          gsap.to(pointRef.current, {
            width: 6,
            height: 6,
            backgroundColor: "#42567a",
            borderRadius: "50%",
            duration: 0.3,
            ease: "power2.in",
          })
        }
        if (textContainerRef.current) {
          gsap.set(textContainerRef.current, {
            rotation: textRotation,
          })
        }
        setIsHovered(false)
      },
      updateRotation: (newRotation: number) => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            rotation: -newRotation,
            duration: 0.6,
            ease: "none",
          })
        }
        if (textContainerRef.current && !isActive) {
          const newTextRotation = baseTextRotation - newRotation
          gsap.to(textContainerRef.current, {
            rotation: newTextRotation,
            duration: 0.6,
            ease: "none",
          })
        }
      },
    }))

    const handleMouseEnter = () => {
      if (!isActive && pointRef.current) {
        setIsHovered(true)
        gsap.to(pointRef.current, {
          width: 56,
          height: 56,
          backgroundColor: "#f4f5f9",
          borderRadius: "50%",
          duration: 0.3,
          ease: "power2.out",
          onStart: () => {
            if (numberElRef.current)
              gsap.set(numberElRef.current, { opacity: 1, visibility: "visible" })
            if (categoryElRef.current)
              gsap.set(categoryElRef.current, { opacity: 0, visibility: "hidden" })
          },
        })
      }
    }

    const handleMouseLeave = () => {
      if (!isActive && pointRef.current) {
        setIsHovered(false)
        gsap.to(pointRef.current, {
          width: 6,
          height: 6,
          backgroundColor: "#42567a",
          borderRadius: "50%",
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            if (numberElRef.current)
              gsap.set(numberElRef.current, { opacity: 0, visibility: "hidden" })
          },
        })
      }
    }

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      onPointClick(index, e)
    }

    return (
      <div
        ref={containerRef}
        className="point-component"
        style={{
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={pointRef} className={`point-component__circle ${isActive ? "active" : ""}`}>
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
      </div>
    )
  }
)

PointComponent.displayName = "PointComponent"
