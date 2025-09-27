import type React from "react"
import type { Swiper as SwiperRef } from "swiper"
import { getYear } from "date-fns/getYear"
import { parseISO } from "date-fns/parseISO"
import { useRef, useState } from "react"
import { Keyboard, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import type { TimelineEvent } from "@/pages/History/ui/mockData"
import ArrowLeftIcon from "@/shared/assets/icons/arrow-slide-left.svg"
import ArrowRightIcon from "@/shared/assets/icons/arrow-slide-right.svg"
import { WIDTH } from "@/shared/const/number"
import { useWindowSize } from "@/shared/lib/hooks/useWindowsSize"
import { Icon } from "@/shared/ui/Icon"
import Card from "../Card/Card"

import "./Slider.module.scss"

interface Props {
  events: TimelineEvent[]
}

export const Slider: React.FC<Props> = ({ events }) => {
  const { windowWidth } = useWindowSize()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const swiperRef = useRef<SwiperRef | null>(null)

  const isDesktop = windowWidth > WIDTH.SCREEN_1024

  if (events.length === 0) {
    return <div className="slider">Нет событий</div>
  }

  const onPrev = () => swiperRef.current?.slidePrev()
  const onNext = () => swiperRef.current?.slideNext()

  const maxIndex = Math.max(
    0,
    events.length - (isDesktop ? 3 : windowWidth > WIDTH.SCREEN_800 ? 2 : 1)
  )

  return (
    <div className="slider">
      <div className="slider__wrapper">
        {isDesktop && activeIndex > 0 && (
          <button
            type="button"
            className="slider__button-prev"
            aria-label="Предыдущий слайд"
            onClick={onPrev}
          >
            <Icon Svg={ArrowLeftIcon} width={8} height={12} color="#3877ee" />
          </button>
        )}

        <Swiper
          onSwiper={(swiper: SwiperRef | null) => {
            swiperRef.current = swiper
          }}
          modules={[Navigation, Pagination, Keyboard]}
          breakpoints={{
            0: { slidesPerView: 1.5, spaceBetween: 16 },
            [WIDTH.SCREEN_800]: { slidesPerView: 2, spaceBetween: 24 },
            [WIDTH.SCREEN_1024]: { slidesPerView: 3, spaceBetween: 24 },
          }}
          navigation={false}
          pagination={{
            el: ".slider__pagination",
            clickable: true,
            type: "bullets",
          }}
          keyboard={{ enabled: true }}
          onSlideChange={(swiper: SwiperRef) =>
            setActiveIndex(swiper.activeIndex)
          }
          className="slider__swiper"
        >
          {events.map(event => (
            <SwiperSlide key={event.id}>
              <Card
                year={getYear(parseISO(event.date))}
                description={event.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {isDesktop && activeIndex < maxIndex && (
          <button
            type="button"
            className="slider__button-next"
            aria-label="Следующий слайд"
            onClick={onNext}
          >
            <Icon
              Svg={ArrowRightIcon}
              width={8}
              height={12}
              color="#3877ee"
              aria-label="Следующий слайд"
            />
          </button>
        )}

        {!isDesktop && <div className="slider__pagination" />}
      </div>
    </div>
  )
}

Slider.displayName = "Slider"
