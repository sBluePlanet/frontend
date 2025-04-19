import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";
import { parseNewLine } from "../../utils/parseText";
import img from "../../assets/news/EXT000.png";

interface GameStartProps {
  onStartClick: () => void;
  title: string;
  content: string;
}

const GameStart = ({ onStartClick, title, content }: GameStartProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(content.slice(0, i + 1));
      i++;

      if (i >= content.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [content]);

  useEffect(() => {
    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.scrollTop =
        scrollWrapperRef.current.scrollHeight;
    }
  }, [displayedText]);

  return (
    <div css={windowCss}>
      <div css={windowTopCss}>
        <span css={titleCss}>{title}</span>
      </div>
      <div css={contentCss}>
        <div css={contentRowCss}>
          <img src={img} alt="프롤로그 이미지" css={imgCss} />
          <div css={scrollWrapperCss} ref={scrollWrapperRef}>
            <div css={textCss}>{parseNewLine(displayedText)}</div>
          </div>
        </div>
        <button onClick={onStartClick} css={startButtonCss}>
          START
        </button>
      </div>
    </div>
  );
};

export default GameStart;

const windowCss = css({
  position: "absolute",
  width: "700px",
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
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  gap: "20px",
});

const contentRowCss = css({
  display: "flex",
  gap: "20px",
  maxHeight: "400px",
});

const imgCss = css({
  width: "300px",
  height: "400px",
});

const scrollWrapperCss = css({
  flex: 1,
  overflow: "auto",
  paddingRight: "8px",
  scrollbarWidth: "thin",
  scrollbarColor: `${colors.red} transparent`,
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: colors.red,
    borderRadius: "4px",
    border: "2px solid transparent",
    backgroundClip: "content-box",
  },
});

const textCss = css({
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",
});

const startButtonCss = css({
  marginTop: "16px",
  padding: "10px 20px",
  fontSize: "16px",
  fontFamily: fonts.fixel,
  backgroundColor: colors.red,
  color: colors.white,
  border: "none",
  cursor: "pointer",
  width: "100%",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
});
