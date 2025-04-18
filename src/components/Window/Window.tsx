import { useState, useRef, ReactNode, useEffect } from "react";
import { css } from "@emotion/react";

interface WindowProps {
  id: number;
  title: string;
  children: ReactNode;
  initialX: number;
  initialY: number;
  zIndex: number;
  onClick: () => void;
  onClose: () => void;
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
}: WindowProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    onClick();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      css={windowCss(position.x, position.y, zIndex)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div css={windowTopCss} onMouseDown={handleMouseDown}>
        <span>{title}</span>
        <span css={closeCss} onClick={onClose}>
          ×
        </span>
      </div>
      <div css={contentCss}>{children}</div>
    </div>
  );
};

export default Window;

const windowCss = (x: number, y: number, z: number) =>
  css({
    position: "absolute",
    top: y,
    left: x,
    zIndex: z,
    width: "300px",
    backgroundColor: "#002b36",
    fontFamily: "monospace",
    userSelect: "none",
    color: "#ffffff",
    borderRadius: "5px",
  });

const windowTopCss = css({
  padding: "8px",
  backgroundColor: "#073642",
  cursor: "move",
  fontWeight: "bold",
  borderBottom: "1px solid white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const contentCss = css({
  padding: "10px",
  lineHeight: "1.5",
});

const closeCss = css({
  cursor: "pointer",
  padding: "0 8px",
  fontSize: "18px",
  "&:hover": {
    color: "#ff4444",
  },
});
