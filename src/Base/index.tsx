/** @jsx jsx */
import { jsx, InterpolationWithTheme } from "@emotion/core";
import * as React from "react";

export interface Props {
  css?: InterpolationWithTheme<any>;
  element?: keyof JSX.IntrinsicElements;
}

const Base: React.FC<Props> = ({ element = "div", children, css }) => {
  const Element = element as any;
  return <Element css={css} children={children} />;
}

export default Base;
