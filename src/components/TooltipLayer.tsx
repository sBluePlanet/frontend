import { createPortal } from "react-dom";
import { css } from "@emotion/react";

interface TooltipProps {
  visible: boolean;
  x: number;
  y: number;
  content: string;
}

const tooltipCss = (x: number, y: number) =>
  css({
    position: "fixed",
    top: y,
    left: x,
    backgroundColor: "black",
    color: "white",
    fontSize: "12px",
    padding: "8px",
    borderRadius: "4px",
    pointerEvents: "none",
    zIndex: 9999,
  });

const TooltipLayer = ({ visible, x, y, content }: TooltipProps) => {
  if (!visible) return null;
  return createPortal(
    <div css={tooltipCss(x, y)}>{content}</div>,
    document.body
  );
};

export default TooltipLayer;
