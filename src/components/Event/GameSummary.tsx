import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";

interface GameSummaryProps {
  content: string;
}

const GameSummary = ({ content }: GameSummaryProps) => {
  const match = content.match(/"([^"]+)"/);
  const highlightText = match ? match[1] : "";

  const restText = content
    .replace(match?.[0] || "", "")
    .replace(/\d+\.\s*/g, "")
    .trim();

  return (
    <div css={windowCss}>
      <div css={windowTopCss}>
        <span css={titleCss}>Game Summary</span>
      </div>
      <div css={contentCss}>
        <div css={highlightCss}>{highlightText}</div>
        <div>{restText}</div>
        <button onClick={() => window.location.reload()} css={restartButtonCss}>
          RESTART
        </button>
      </div>
    </div>
  );
};

export default GameSummary;

const highlightCss = css({
  color: colors.red,
  fontWeight: "bold",
  marginBottom: "1em",
  textAlign: "center",
});

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
