import { useState, useRef, ReactNode, useEffect } from "react";
import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";

interface WindowProps {
  id: number;
  title: string;
  children: ReactNode;
  initialX: number;
  initialY: number;
  zIndex: number;
  onClick: () => void;
  onClose: () => void;
  color?: string;
  width?: string | number;
  closable?: boolean;
}

const Window = ({
  title,
  children,
  initialX,
  initialY,
  zIndex,
  onClick,
  onClose,
  color = colors.neon,
  width = "400px",
  closable = true,
}: WindowProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    onClick();
  };

  return (
    <div css={windowCss(position.x, position.y, zIndex, color, width)}>
      <div css={windowTopCss(color)} onMouseDown={handleMouseDown}>
        <span css={titleCss}>{title}</span>
        {closable && (
          <span css={closeCss} onClick={onClose}>
            ×
          </span>
        )}
      </div>
      <div css={contentCss(color)}>{children}</div>
    </div>
  );
};

export default Window;

const windowCss = (
  x: number,
  y: number,
  z: number,
  color: string,
  width: string | number
) =>
  css({
    position: "absolute",
    top: y,
    left: x,
    zIndex: z,
    width: typeof width === "number" ? `${width}px` : width,
    userSelect: "none",
    backgroundColor: colors.wBackground,
    color: colors.white,
    clipPath: "polygon(20px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20px)",
    border: `1px solid ${color}`,
  });

const windowTopCss = (color: string) =>
  css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "move",
    padding: "8px 10px 8px 30px",
    background: `linear-gradient(to right, ${color}, rgba(10, 183, 163, 0))`,
    borderBottom: `1px solid ${color}`,
    fontFamily: fonts.fixel,
  });

const titleCss = css({
  color: "white",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
});

const contentCss = (color: string) =>
  css({
    padding: "10px",
    lineHeight: "1.5",
    maxHeight: "600px",
    overflow: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: `${color}cc transparent`,
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: `${color}cc`,
      borderRadius: "4px",
      border: "2px solid transparent",
      backgroundClip: "content-box",
    },
  });

const closeCss = css({
  cursor: "pointer",
  padding: "0 8px",
  fontSize: "20px",
  "&:hover": {
    color: colors.red,
  },
});
