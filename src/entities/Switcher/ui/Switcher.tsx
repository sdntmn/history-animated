import type React from "react"
import { useMemo } from "react"
import ArrowLeftIcon from "@/shared/assets/icons/arrow-slide-left.svg"
import ArrowRightIcon from "@/shared/assets/icons/arrow-slide-right.svg"
import { Icon } from "@/shared/ui/Icon"
import "./Switcher.module.scss"
import type { TimePeriod } from "@/pages/History/ui/mockData"
import cn from "classnames"
import { ICON_SIZE, WIDTH } from "@/shared/const/number"
import { useWindowSize } from "@/shared/lib/hooks/useWindowsSize"
import { HStack, VStack } from "@/shared/ui/Stack"

interface Props {
  periods: TimePeriod[]
  activeIndex: number
  onPeriodChange: (index: number) => void
}

export const Switcher: React.FC<Props> = ({
  periods,
  activeIndex,
  onPeriodChange,
}) => {
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
  const totalPeriods = formatNumber(periods.length)

  const { widthIcon, heightIcon } = useMemo(() => {
    if (windowWidth > WIDTH.SCREEN_1024)
      return {
        widthIcon: ICON_SIZE.DESKTOP.WIDTH,
        heightIcon: ICON_SIZE.DESKTOP.HEIGHT,
      }
    if (windowWidth > WIDTH.SCREEN_800)
      return {
        widthIcon: ICON_SIZE.TABLET.WIDTH,
        heightIcon: ICON_SIZE.TABLET.HEIGHT,
      }
    return {
      widthIcon: ICON_SIZE.MOBILE.WIDTH,
      heightIcon: ICON_SIZE.MOBILE.HEIGHT,
    }
  }, [windowWidth])

  const isDisabledPrev = activeIndex === 0
  const isDisabledNext = activeIndex === periods.length - 1
  const isMobile = windowWidth <= WIDTH.SCREEN_800

  return (
    <VStack className="switcher">
      <div className="switcher__events">
        {currentEventNumber}/{totalPeriods}
      </div>

      <HStack gap={isMobile ? "8" : "20"}>
        <button
          type="button"
          aria-label="Предыдущий период"
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
          type="button"
          aria-label="Следующий период"
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
    </VStack>
  )
}
