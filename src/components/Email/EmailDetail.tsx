import { useState } from "react";
import { css } from "@emotion/react";

import { dummyTooltip } from "../../dummy/dummyData";

const EmailDetailWindow = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const parts = content.split(/(\^.+?\^)/g);

  return (
    <div css={wrapperCss}>
      <h4>{title}</h4>
      <hr />
      <p>
        {parts.map((part, i) => {
          if (/^\^.+\^$/.test(part)) {
            const word = part.replace(/\^/g, "");
            return (
              <span
                key={i}
                css={tooltipTarget}
                onMouseEnter={() => setHoveredWord(word)}
                onMouseLeave={() => setHoveredWord(null)}
              >
                {word}
                {hoveredWord === word && (
                  <span css={tooltipCss}>
                    {dummyTooltip[word] || "정보 없음"}
                  </span>
                )}
              </span>
            );
          } else {
            return <span key={i}>{part}</span>;
          }
        })}
      </p>
    </div>
  );
};

export default EmailDetailWindow;

const wrapperCss = css({
  padding: "10px",
  lineHeight: 1.6,
});

const tooltipTarget = css({
  position: "relative",
  textDecoration: "underline dotted",
  cursor: "help",
  margin: "0 2px",
});

const tooltipCss = css({
  position: "absolute",
  top: "100%",
  left: "0",
  backgroundColor: "#222",
  color: "white",
  fontSize: "12px",
  padding: "6px 10px",
  borderRadius: "4px",
  whiteSpace: "nowrap",
  marginTop: "4px",
  zIndex: 999,
});
