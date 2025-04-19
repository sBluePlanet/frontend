import { createPortal } from "react-dom";
import { css } from "@emotion/react";
import { colors } from "../styles/theme";

interface TooltipProps {
  visible: boolean;
  x: number;
  y: number;
  content: string;
}

const TooltipLayer = ({ visible, x, y, content }: TooltipProps) => {
  if (!visible) return null;
  return createPortal(
    <div css={tooltipCss(x, y)}>{content}</div>,
    document.body
  );
};

export default TooltipLayer;

const tooltipCss = (x: number, y: number) =>
  css({
    maxWidth: "300px",
    lineHeight: "1.5",
    position: "fixed",
    top: y,
    left: x,
    backgroundColor: colors.black,
    color: colors.white,
    fontSize: "14px",
    padding: "10px 15px",
    zIndex: 8888,
  });
