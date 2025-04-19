import { ReactNode } from "react";
import { css } from "@emotion/react";
import { colors } from "../styles/theme";

export const parseTooltipNewLine = (
  text: string,
  tooltipData: Record<string, string>,
  onShow: (x: number, y: number, content: string) => void,
  onHide: () => void
): ReactNode[] => {
  const normalized = text
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");

  const paragraphs = normalized.split(/\n{2,}/);

  return paragraphs.map((paragraph, pIdx) => (
    <p key={pIdx} style={{ marginBottom: "1.5em" }}>
      {paragraph.split(/\n/).map((line, lIdx, arr) => (
        <span key={lIdx}>
          {line.split(/(\^.+?\^)/g).map((part, i) => {
            if (/^\^.+\^$/.test(part)) {
              const word = part.replace(/\^/g, "");
              const tooltip = tooltipData[word] || "설명이 없습니다.";
              return (
                <span
                  key={i}
                  css={tooltipTarget}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    onShow(rect.left, rect.bottom + 3, tooltip);
                  }}
                  onMouseLeave={onHide}
                >
                  {word}
                </span>
              );
            } else {
              return <span key={i}>{part}</span>;
            }
          })}
          {lIdx !== arr.length - 1 && <br />}
        </span>
      ))}
    </p>
  ));
};

export const parseTooltip = (
  text: string,
  tooltipData: Record<string, string>,
  onShow: (x: number, y: number, content: string) => void,
  onHide: () => void
): ReactNode[] => {
  return text.split(/(\^.+?\^)/g).map((part, i) => {
    if (/^\^.+\^$/.test(part)) {
      const word = part.replace(/\^/g, "");
      const tooltip = tooltipData[word] || "설명이 없습니다.";
      return (
        <span
          key={i}
          css={tooltipTarget}
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            onShow(rect.left, rect.bottom + 3, tooltip);
          }}
          onMouseLeave={onHide}
        >
          {word}
        </span>
      );
    } else {
      return <span key={i}>{part}</span>;
    }
  });
};

const tooltipTarget = css({
  textDecoration: `underline 2px dotted ${colors.neon}`,
  fontWeight: "bold",
  color: "white",
  cursor: "help",
  margin: "0 2px",
});
