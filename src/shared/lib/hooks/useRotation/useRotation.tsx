import gsap from "gsap"
import { useCallback, useRef } from "react"

export const useRotation = (initialRotation = 0) => {
  const rotation = useRef(initialRotation)

  const rotate = useCallback((degrees: number, element: HTMLElement | null) => {
    rotation.current += degrees

    if (element) {
      gsap.to(element, {
        rotation: rotation.current,
        duration: 1.2,
        ease: "back.out(1.7)",
        transformOrigin: "center",
      })
    }

    return rotation.current
  }, [])

  const setRotation = useCallback(
    (newRotation: number, element: HTMLElement | null) => {
      rotation.current = newRotation

      if (element) {
        gsap.to(element, {
          rotation: rotation.current,
          duration: 1.2,
          ease: "back.out(1.7)",
          transformOrigin: "center",
        })
      }

      return rotation.current
    },
    []
  )

  const getRotation = useCallback(() => rotation.current, [])

  return {
    rotation,
    rotate,
    setRotation,
    getRotation,
  }
}
