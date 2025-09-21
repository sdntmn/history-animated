import React, { useMemo, useState } from "react"

import { Page } from "@/shared/ui/Page"
import { HStack, VStack } from "@/shared/ui/Stack"
import "./HistoryPage.module.scss"

import { getYear } from "date-fns/getYear"
import { parseISO } from "date-fns/parseISO"
import { useWindowSize } from "@/shared/lib/hooks/useWindowsSize"
import { Flex } from "@/shared/ui/Stack/Flex/Flex"

import { timePeriods } from "./mockData"
import { useAnimatedYear } from "@/shared/lib/hooks/useAnimationYear"
import { AnimatedYear, CircleCarousel, Slider, StaticLines, Switcher } from "@/entities/History"

export const HistoryPage: React.FC = () => {
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
    const years = sortedEvents.map((event) => getYear(parseISO(event.date)))
    return {
      start: Math.min(...years),
      end: Math.max(...years),
    }
  }, [sortedEvents])

  const displayedPrevYear = useAnimatedYear(periodYears.start, [periodYears.start])

  const displayedEndYear = useAnimatedYear(periodYears.end, [periodYears.end])

  const isDesktop = windowWidth > 800
  const isDesktop1280 = windowWidth > 1280

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
            key={displayedPrevYear}
          />
        </span>
        <span className="history-page__years ">
          <AnimatedYear
            className="history-page__years_right"
            year={displayedEndYear ?? periodYears.end}
            key={displayedEndYear}
          />
        </span>
      </HStack>

      {isDesktop1280 && <StaticLines />}
      {isDesktop && (
        <CircleCarousel
          onPeriodChange={handlePeriodChange}
          periods={timePeriods}
          activePeriod={activePeriod}
        />
      )}
      {!isDesktop && <div className="history-page__divider"></div>}

      <Flex direction={"column"} align="start" className="history-page__section-slider">
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
