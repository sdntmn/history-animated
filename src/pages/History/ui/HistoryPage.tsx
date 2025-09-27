import { getYear } from "date-fns/getYear"
import { parseISO } from "date-fns/parseISO"
import { useMemo, useState } from "react"
import { CircleCarousel } from "@/entities/CircleCarusel"
import { Slider } from "@/entities/Slider"
import { Switcher } from "@/entities/Switcher"
import { WIDTH } from "@/shared/const/number"
import { useAnimatedYear } from "@/shared/lib/hooks/useAnimationYear"
import { useWindowSize } from "@/shared/lib/hooks/useWindowsSize"
import { AnimatedYear } from "@/shared/ui/AnimatedYear"
import { StaticLines } from "@/shared/ui/Lines/StaticLines"
import { Page } from "@/shared/ui/Page"
import { HStack, VStack } from "@/shared/ui/Stack"
import { Flex } from "@/shared/ui/Stack/Flex/Flex"
import { timePeriods } from "./mockData"

import "./HistoryPage.module.scss"

export const HistoryPage = () => {
  const { windowWidth } = useWindowSize()

  const [activePeriodIndex, setActivePeriodIndex] = useState(0)

  const activePeriod = timePeriods[activePeriodIndex]

  const sortedEvents = useMemo(() => {
    return [...activePeriod.events].sort(
      (a, b) => getYear(parseISO(a.date)) - getYear(parseISO(b.date))
    )
  }, [activePeriod.events])

  const handlePeriodChange = (index: number) => {
    setActivePeriodIndex(index)
  }

  const periodYears = useMemo(() => {
    const years = sortedEvents.map(event => getYear(parseISO(event.date)))
    return {
      start: Math.min(...years),
      end: Math.max(...years),
    }
  }, [sortedEvents])

  const displayedPrevYear = useAnimatedYear(periodYears.start, [
    periodYears.start,
  ])

  const displayedEndYear = useAnimatedYear(periodYears.end, [periodYears.end])

  const showCarousel = windowWidth > WIDTH.SCREEN_800
  const showStaticLines = windowWidth > WIDTH.SCREEN_1280

  return (
    <Page className="history-page">
      <VStack gap="32" align="start" className="history-page__title-wrap">
        <h1>
          <span className="history-page__title">Исторические</span>
          <span className="history-page__title">даты</span>
        </h1>
      </VStack>

      <HStack align="start" className="history-page__years-wrap">
        <span className="history-page__years ">
          <AnimatedYear
            className="history-page__years_left"
            year={displayedPrevYear ?? periodYears.start}
          />
        </span>
        <span className="history-page__years ">
          <AnimatedYear
            className="history-page__years_right"
            year={displayedEndYear ?? periodYears.end}
          />
        </span>
      </HStack>

      {showStaticLines && <StaticLines />}
      {showCarousel && (
        <CircleCarousel
          onPeriodChange={handlePeriodChange}
          periods={timePeriods}
          activePeriod={activePeriod}
        />
      )}
      {!showCarousel && <div className="history-page__divider"></div>}

      <Flex
        direction="column"
        align="start"
        className="history-page__section-slider"
      >
        <Switcher
          periods={timePeriods}
          activeIndex={activePeriodIndex}
          onPeriodChange={handlePeriodChange}
        />
        <HStack className="history-page__slider">
          <Slider events={sortedEvents} />
        </HStack>
      </Flex>
    </Page>
  )
}
