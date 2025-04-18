import { css } from "@emotion/react";

interface LeftBarProps {
  open: (type: "email" | "chat" | "news") => void;
}

const LeftBar = ({ open }: LeftBarProps) => {
  return (
    <div css={leftBarCss}>
      <button css={btnCss} onClick={() => open("email")}>
        📧
      </button>
      <button css={btnCss} onClick={() => open("chat")}>
        💬
      </button>
      <button css={btnCss} onClick={() => open("news")}>
        📰
      </button>
    </div>
  );
};

export default LeftBar;

const leftBarCss = css({
  backgroundColor: "#012b36",
  color: "white",
  padding: "20px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

const btnCss = css({
  padding: "10px",
  backgroundColor: "transparent",
  color: "white",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#003b44",
  },
});
