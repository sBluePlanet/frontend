import { css } from "@emotion/react";
import { dummyTooltip } from "../../dummy/dummyData";
import { useTooltipStore } from "../../stores/useTooltipStore";

const EmailDetailWindow = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const { show, hide } = useTooltipStore();
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
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  show(rect.left + 5, rect.bottom + 3, dummyTooltip[word]);
                }}
                onMouseLeave={hide}
              >
                {word}
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
  textDecoration: "underline dotted",
  cursor: "help",
  margin: "0 2px",
});
