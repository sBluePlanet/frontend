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
}

const Window = ({
  // id,
  title,
  children,
  initialX,
  initialY,
  zIndex,
  onClick,
  onClose,
  color = colors.neon,
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
    <div css={windowCss(position.x, position.y, zIndex, color)}>
      <div css={windowTopCss(color)} onMouseDown={handleMouseDown}>
        <span css={titleCss}>{title}</span>
        <span css={closeCss} onClick={onClose}>
          ×
        </span>
      </div>
      <div css={contentCss}>{children}</div>
    </div>
  );
};

export default Window;

const windowCss = (x: number, y: number, z: number, color: string) =>
  css({
    position: "absolute",
    top: y,
    left: x,
    zIndex: z,
    width: "400px",
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

const contentCss = css({
  padding: "10px",
  lineHeight: "1.5",
});

const closeCss = css({
  cursor: "pointer",
  padding: "0 8px",
  fontSize: "20px",
  "&:hover": {
    color: colors.red,
  },
});
