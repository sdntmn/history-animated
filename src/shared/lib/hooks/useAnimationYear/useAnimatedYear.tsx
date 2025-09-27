import { useEffect, useRef, useState } from "react"

export const useAnimatedYear = (
  targetYear: number | null,
  deps: number[] = []
) => {
  const [displayedYear, setDisplayedYear] = useState<number | null>(null)
  const displayedYearRef = useRef<number | null>(null)

  useEffect(() => {
    displayedYearRef.current = displayedYear
  }, [displayedYear])

  useEffect(() => {
    if (targetYear === null) {
      setDisplayedYear(null)
      return
    }

    if (displayedYearRef.current === null) {
      setDisplayedYear(targetYear)
      return
    }

    const direction = targetYear > displayedYearRef.current ? 1 : -1
    let current = displayedYearRef.current

    const interval = setInterval(() => {
      current += direction
      setDisplayedYear(current)
      displayedYearRef.current = current

      if (current === targetYear) {
        clearInterval(interval)
      }
    }, 80)

    return () => clearInterval(interval)
  }, [targetYear, ...deps])

  return displayedYear
}
