import React, { ReactNode } from "react";

import cn from "classnames";

import "./Page.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
}

export const Page: React.FC<Props> = ({ className, children }) => {
  return <main className={cn("page", className)}>{children}</main>;
};
