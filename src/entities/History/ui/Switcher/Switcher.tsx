import React from "react"
import ArrowLeftIcon from "@/shared/assets/icons/arrow-slide-left.svg"
import ArrowRightIcon from "@/shared/assets/icons/arrow-slide-right.svg"
import { Icon } from "@/shared/ui/Icon"
import "./Switcher.module.scss"
import { HStack } from "@/shared/ui/Stack"
import { useWindowSize } from "@/shared/lib/hooks/useWindowsSize"
import { TimePeriod } from "@/pages/History/ui/mockData"
import cn from "classnames"

interface Props {
  periods: TimePeriod[]
  activeIndex: number
  onPeriodChange: (index: number) => void
}

export const Switcher: React.FC<Props> = ({ periods, activeIndex, onPeriodChange }) => {
  const { windowWidth } = useWindowSize()

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % periods.length
    onPeriodChange(nextIndex)
  }

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + periods.length) % periods.length
    onPeriodChange(prevIndex)
  }

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0")
  }

  const currentEventNumber = formatNumber(activeIndex + 1)
  const totalEvents = formatNumber(periods[activeIndex].events.length)

  const isMobile = windowWidth <= 800
  const isTablet = windowWidth <= 1024
  const isDesktop = windowWidth > 1024
  const widthIcon = isDesktop ? 10 : isTablet ? 8 : 6
  const heightIcon = isDesktop ? 14 : isTablet ? 12 : 10
  const isDisabledPrev = activeIndex === 0
  const isDisabledNext = activeIndex === periods.length - 1

  return (
    <HStack>
      <div className="switcher">
        <div className="switcher__content">
          <div className="switcher__events">
            {currentEventNumber}/{totalEvents}
          </div>
        </div>

        <HStack gap={isMobile ? "8" : "20"}>
          <button
            className={cn("switcher__button switcher__button_prev")}
            onClick={handlePrev}
            disabled={isDisabledPrev}
          >
            <Icon
              className="switcher__button-icon"
              Svg={ArrowLeftIcon}
              width={widthIcon}
              height={heightIcon}
              color={"#42567A"}
            />
          </button>

          <button
            className="switcher__button switcher__button_next"
            onClick={handleNext}
            disabled={isDisabledNext}
          >
            <Icon
              className="switcher__button-icon "
              Svg={ArrowRightIcon}
              width={widthIcon}
              height={heightIcon}
              color={"#42567A"}
            />
          </button>
        </HStack>
      </div>
    </HStack>
  )
}
