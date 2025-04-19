import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";
import { parseNewLine } from "../../utils/parseText";

const images = import.meta.glob("../../assets/ending/*.png", {
  eager: true,
  import: "default",
});

const getImageByFilename = (filename: string): string => {
  return images[`../../assets/ending/${filename}`] as string;
};

interface GameEndingProps {
  onClick: () => void;
  title: string;
  content: string;
  imgUrl: string;
}

const GameEnding = ({ onClick, title, content, imgUrl }: GameEndingProps) => {
  const [typingText, setTypingText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  const imageSrc = getImageByFilename(imgUrl);

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

  useEffect(() => {
    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.scrollTop =
        scrollWrapperRef.current.scrollHeight;
    }
  }, [typingText]);

  return (
    <div css={windowCss}>
      <div css={windowTopCss}>
        <span css={titleCss}>{title}</span>
      </div>
      <div css={contentCss}>
        <div css={contentRowCss}>
          <img src={imageSrc} alt="엔딩 이미지" css={imgCss} />
          <div css={scrollWrapperCss} ref={scrollWrapperRef}>
            <div css={textCss}>{parseNewLine(typingText)}</div>
          </div>
        </div>

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
  width: "800px",
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

const contentRowCss = css({
  display: "flex",
  gap: "20px",
  maxHeight: "400px",
});

const imgCss = css({
  width: "400px",
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
  lineHeight: 1.7,
  whiteSpace: "pre-wrap",
});

const restartButtonCss = css({
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
