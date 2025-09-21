import React, { memo } from "react"

import cn from "classnames"

import "./Icon.module.scss"

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, "onClick">
interface IconBaseProps extends SvgProps {
  className?: string
  Svg: React.FC<React.SVGProps<SVGSVGElement>>
}

interface IconNonClickableProps extends IconBaseProps {
  clickable?: false
}

interface IconClickableProps extends IconBaseProps {
  clickable: true
  onClick: () => void
}

type IconProps = IconNonClickableProps | IconClickableProps

export const Icon: React.FC<IconProps> = memo(function Icon(props: IconProps) {
  const { className, Svg, width = 32, height = 32, clickable, ...otherProps } = props

  const svgProps = {
    width,
    height,
    ...otherProps,
    ...(clickable ? { onClick: undefined } : {}),
  }
  const Icon = <Svg className={cn("icon", [className])} {...svgProps} />

  if (clickable) {
    return (
      <span
        role="button"
        tabIndex={0}
        className="icon__button"
        onClick={props?.onClick}
        style={{ width, height }}
      >
        {Icon}
      </span>
    )
  }

  return Icon
})
