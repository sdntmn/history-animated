import { useEffect, useState } from "react"

interface WindowSize {
  windowHeight: number
  windowWidth: number
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windowHeight: 0,
    windowWidth: 0,
  })

  const handleSize = (): void => {
    setWindowSize({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    })
  }

  useEffect(() => {
    if (
      windowSize.windowWidth !== window.innerWidth ||
      windowSize.windowHeight !== window.innerHeight
    ) {
      handleSize()
    }
    window.addEventListener("resize", handleSize)
    return () => {
      window.removeEventListener("resize", handleSize)
    }
  }, [windowSize.windowWidth, windowSize.windowHeight])

  return windowSize
}
