import React from "react"

import { Flex, FlexProps } from "../Flex/Flex"

type HStackProps = Omit<FlexProps, "direction">

export const HStack: React.FC<HStackProps> = (props: HStackProps) => {
  return <Flex direction="row" {...props} />
}
