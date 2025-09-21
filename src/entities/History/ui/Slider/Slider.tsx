import React, { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Navigation, Pagination, Keyboard } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "./Slider.module.scss"

import Card from "../Card/Card"
import { parseISO } from "date-fns/parseISO"
import { getYear } from "date-fns/getYear"

import ArrowLeftIcon from "@/shared/assets/icons/arrow-slide-left.svg"
import ArrowRightIcon from "@/shared/assets/icons/arrow-slide-right.svg"
import { Icon } from "@/shared/ui/Icon"
import { useWindowSize } from "@/shared/lib/hooks/useWindowsSize"
import { TimelineEvent } from "@/pages/History/ui/mockData"

interface Props {
  events: TimelineEvent[]
}

export const Slider: React.FC<Props> = ({ events }) => {
  const { windowWidth } = useWindowSize()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [slidesPerView, setSlidesPerView] = useState<number | "auto">("auto")
  const [spaceBetween, setSpaceBetween] = useState<number>(24)
  const containerRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)

  const isDesktop = windowWidth > 1024
  const isTablet = windowWidth > 800
  const isMobile = windowWidth <= 800

  const calculateSlidesConfig = useCallback(() => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.offsetWidth

    if (isDesktop) {
      setSlidesPerView(3)
      setSpaceBetween(24)
      return
    }
    if (isTablet) {
      setSlidesPerView(2)
      setSpaceBetween(24)
      return
    }
    if (isMobile) {
      setSlidesPerView(1.5)
      setSpaceBetween(16)
      return
    }

    const minCardWidth = 160
    const desktopSpaceBetween = 24

    let calculatedSlidesPerView: number = 1

    for (let i = 3; i >= 1; i--) {
      const neededWidth = i * minCardWidth + (i - 1) * desktopSpaceBetween
      if (containerWidth >= neededWidth) {
        calculatedSlidesPerView = i
        break
      }
    }

    setSlidesPerView(calculatedSlidesPerView)
    setSpaceBetween(desktopSpaceBetween)
  }, [isDesktop, isMobile, isTablet])

  const updateVisibleSlides = useCallback(() => {
    if (!swiperRef.current) return

    const swiper = swiperRef.current
    const visibleIndexes: number[] = []
    const slidesCount = events.length

    if (slidesCount === 0) return

    const progress = swiper.progress
    const slidesPerViewValue = typeof slidesPerView === "number" ? slidesPerView : 1

    let firstVisibleIndex = Math.floor(progress * (slidesCount - slidesPerViewValue))
    firstVisibleIndex = Math.max(0, Math.min(firstVisibleIndex, slidesCount - 1))

    for (let i = 0; i < slidesPerViewValue + 1; i++) {
      const index = firstVisibleIndex + i
      if (index < slidesCount) {
        visibleIndexes.push(index)
      }
    }
  }, [events.length, slidesPerView])

  const onPrev = () => swiperRef.current?.slidePrev()
  const onNext = () => swiperRef.current?.slideNext()

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver(() => {
      calculateSlidesConfig()
      setTimeout(updateVisibleSlides, 100)
    })

    observer.observe(containerRef.current)
    calculateSlidesConfig()

    return () => observer.disconnect()
  }, [calculateSlidesConfig, updateVisibleSlides])

  useEffect(() => {
    updateVisibleSlides()
  }, [activeIndex, updateVisibleSlides])

  const lastIndex = useMemo(() => {
    if (!events.length) return 0
    const spv = typeof slidesPerView === "number" ? slidesPerView : 1
    return Math.max(0, events.length - spv)
  }, [events.length, slidesPerView])

  return (
    <>
      <div className="slider" ref={containerRef}>
        <div className="slider__wrapper">
          {isDesktop && activeIndex > 0 && (
            <button className="slider__button-prev" aria-label="Предыдущий слайд" onClick={onPrev}>
              <Icon Svg={ArrowLeftIcon} width={8} height={12} color="#3877ee" />
            </button>
          )}

          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            modules={[Navigation, Pagination, Keyboard]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            centeredSlides={false}
            navigation={
              isDesktop
                ? {
                    nextEl: ".slider__button-next",
                    prevEl: ".slider__button-prev",
                  }
                : false
            }
            watchSlidesProgress={true}
            slideToClickedSlide={true}
            pagination={{
              el: ".slider__pagination",
              clickable: true,
              dynamicBullets: false,
              type: "bullets",
              renderBullet: (index, className) => {
                return `<span class="${className}" data-index="${index}"></span>`
              },
            }}
            slidesPerGroup={1}
            keyboard={{ enabled: true }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex)
              updateVisibleSlides()
            }}
            className="slider__swiper"
          >
            {events.map((event, index) => (
              <SwiperSlide key={index}>
                <Card year={getYear(parseISO(event.date))} description={event.description} />
              </SwiperSlide>
            ))}
          </Swiper>

          {isDesktop && activeIndex < lastIndex && (
            <button className="slider__button-next" aria-label="Следующий слайд" onClick={onNext}>
              <Icon Svg={ArrowRightIcon} width={8} height={12} color="#3877ee" />
            </button>
          )}

          {isMobile && <div className="slider__pagination" />}
        </div>
      </div>
    </>
  )
}

Slider.displayName = "Slider"
