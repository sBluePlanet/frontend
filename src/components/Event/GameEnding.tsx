import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";
import { parseNewLine } from "../../utils/parseText";

interface GameEndingProps {
  onClick: () => void;
  title: string;
  content: string;
}

const GameEnding = ({ onClick, title, content }: GameEndingProps) => {
  const [typingText, setTypingText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypingText(content.slice(0, i + 1));
      i++;
      if (i >= content.length) {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [content]);

  return (
    <div css={windowCss}>
      <div css={windowTopCss}>
        <span css={titleCss}>{title}</span>
      </div>
      <div css={contentCss}>
        {parseNewLine(typingText)}
        {isTypingDone && (
          <button onClick={onClick} css={restartButtonCss}>
            당신은…
          </button>
        )}
      </div>
    </div>
  );
};

export default GameEnding;

const windowCss = css({
  position: "absolute",
  width: "500px",
  userSelect: "none",
  backgroundColor: colors.wBackground,
  color: colors.white,
  clipPath: "polygon(20px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20px)",
  border: `1px solid ${colors.red}`,
});

const windowTopCss = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 10px 8px 30px",
  background: `linear-gradient(to right, ${colors.red}, rgba(10, 183, 163, 0))`,
  borderBottom: `1px solid ${colors.red}`,
  fontFamily: fonts.fixel,
});

const titleCss = css({
  color: "white",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
});

const contentCss = css({
  padding: "20px",
  lineHeight: "1.5",
});

const restartButtonCss = css({
  marginTop: "20px",
  padding: "10px 20px",
  fontSize: "16px",
  fontFamily: fonts.fixel,
  backgroundColor: colors.red,
  color: `${colors.white}`,
  border: "none",
  cursor: "pointer",
  width: "100%",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
});
