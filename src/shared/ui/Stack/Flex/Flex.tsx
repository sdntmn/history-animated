import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

import cn from "classnames"

import "./Flex.module.scss"

export type FlexJustify = "start" | "center" | "end" | "between"
export type FlexAlign = "start" | "center" | "end"
export type FlexDirection = "row" | "column" | "columnReverse" | "rowReverse"
export type FlexWrap = "nowrap" | "wrap"
export type FlexGap = "4" | "8" | "16" | "20" | "24" | "32"

const justifyClasses: Record<FlexJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
}

const alignClasses: Record<FlexAlign, string> = {
  start: "align-start",
  center: "align-center",
  end: "align-end",
}

const directionClasses: Record<FlexDirection, string> = {
  row: "direction-row",
  column: "direction-column",
  columnReverse: "direction-column-reverse",
  rowReverse: "direction-row-reverse",
}

const gapClasses: Record<FlexGap, string> = {
  4: "gap-4",
  8: "gap-8",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
  32: "gap-32",
}

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface FlexProps extends DivProps {
  className?: string
  children?: ReactNode
  justify?: FlexJustify
  align?: FlexAlign
  direction: FlexDirection
  gap?: FlexGap
  max?: boolean
  wrap?: FlexWrap
}

export const Flex: React.FC<FlexProps> = (props: FlexProps) => {
  const {
    className,
    children,
    justify = "start",
    align = "center",
    direction = "row",
    gap,
    max = false,
    wrap = "nowrap",
    ...otherProps
  } = props

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
    max && "flex__max",
    wrap && `flex__${wrap}`,
  ]

  return (
    <div className={cn("flex", classes)} {...otherProps}>
      {children}
    </div>
  )
}
