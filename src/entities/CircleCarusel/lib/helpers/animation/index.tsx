import type { RefObject } from "react"
import gsap from "gsap"
import { DEGREES, DURATIONS, POINT } from "@/shared/const/number"

export const animatePointHover = (
  pointRef: RefObject<HTMLDivElement | null>,
  elRef: RefObject<HTMLSpanElement | null>
) => {
  const pointEl = pointRef.current
  const numberEl = elRef.current

  if (!pointEl || !numberEl) return

  gsap.killTweensOf([pointEl, numberEl])

  gsap.to(pointRef.current, {
    width: POINT.SIZE.END,
    height: POINT.SIZE.END,
    backgroundColor: POINT.COLOR.EXPANDED,
    borderRadius: POINT.BORDER_RADIUS.DEFAULT,
    duration: DURATIONS.SECOND_0_3,
    ease: "power2.out",
    onStart: () => {
      if (elRef.current) {
        gsap.set(elRef.current, {
          opacity: 1,
          visibility: "visible",
          delay: DURATIONS.SECOND_0_1,
        })
      }
    },
  })
}

export const resetPointHover = (
  pointRef: RefObject<HTMLDivElement | null>,
  elRef: RefObject<HTMLSpanElement | null>
) => {
  const pointEl = pointRef.current
  const numberEl = elRef.current

  if (!pointEl || !numberEl) return

  gsap.killTweensOf([pointEl, numberEl])

  gsap.to(pointRef.current, {
    width: POINT.SIZE.START,
    height: POINT.SIZE.START,
    backgroundColor: POINT.COLOR.DEFAULT,
    borderRadius: POINT.BORDER_RADIUS.DEFAULT,
    duration: DURATIONS.SECOND_0_3,
    ease: "power2.in",
    onComplete: () => {
      if (elRef.current)
        gsap.set(elRef.current, { opacity: 0, visibility: "hidden" })
    },
  })
}

export const animatePointActive = (
  pointRef: RefObject<HTMLDivElement | null>,
  elRef: RefObject<HTMLSpanElement | null>,
  extraRef: RefObject<HTMLSpanElement | null>
) => {

  const pointEl = pointRef.current
  const numberEl = elRef.current
  const textEl = extraRef.current

  if (!pointEl || !numberEl || textEl) return

  gsap.killTweensOf([pointEl, numberEl, textEl])

  gsap.to(pointRef.current, {
    width: POINT.SIZE.END,
    height: POINT.SIZE.END,
    backgroundColor: POINT.COLOR.EXPANDED,
    borderRadius: POINT.BORDER_RADIUS.DEFAULT,
    duration: DURATIONS.SECOND_0_4,
    ease: "back.out(1.7)",
    onComplete: () => {
      gsap.to(elRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: DURATIONS.SECOND_0_2,
        delay: DURATIONS.SECOND_0_1,
      })
      gsap.to(extraRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: DURATIONS.SECOND_0_2,
        delay: DURATIONS.SECOND_0_1,
      })
    },
  })
}

export const resetPointActive = (
  pointRef: RefObject<HTMLDivElement | null>,
  elRef: RefObject<HTMLSpanElement | null>,
  extraRef: RefObject<HTMLSpanElement | null>
) => {
  if (!pointRef.current || !elRef.current || !extraRef.current) return

  gsap.killTweensOf(pointRef.current)
  gsap.killTweensOf(elRef.current)
  gsap.killTweensOf(extraRef.current)

  gsap.set(elRef.current, { opacity: 0, visibility: "hidden" })
  gsap.set(extraRef.current, { opacity: 0, visibility: "hidden" })

  gsap.to(pointRef.current, {
    width: POINT.SIZE.START,
    height: POINT.SIZE.START,
    backgroundColor: POINT.COLOR.DEFAULT,
    borderRadius: POINT.BORDER_RADIUS.DEFAULT,
    duration: DURATIONS.SECOND_0_3,
    ease: "power2.in",
  })
}

const toRadians = (deg: number) => (deg * Math.PI) / DEGREES.HALF_CIRCLE

export const getPointPosition = (
  index: number,
  totalPoints: number,
  radius: number
) => {
  const angle = (DEGREES.FULL_CIRCLE / totalPoints) * index
  return {
    x: radius * Math.cos(toRadians(angle)),
    y: radius * Math.sin(toRadians(angle)),
  }
}
