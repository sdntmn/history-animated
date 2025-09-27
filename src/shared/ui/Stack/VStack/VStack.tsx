import type React from "react"
import { Flex, type FlexProps } from "../Flex/Flex"

type VStackProps = Omit<FlexProps, "direction">

export const VStack: React.FC<VStackProps> = (props: VStackProps) => {
  const { align = "start" } = props
  return <Flex {...props} direction="column" align={align} />
}
