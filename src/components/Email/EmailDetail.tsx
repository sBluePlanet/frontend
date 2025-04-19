import { css } from "@emotion/react";
import { dummyTooltip } from "../../dummy/dummyData";
import { useTooltipStore } from "../../stores/useTooltipStore";
import { colors, fonts } from "../../styles/theme";

const EmailDetailWindow = ({
  title,
  content,
  writer,
  choice,
}: {
  title: string;
  content: string;
  writer: string;
  choice: { id: number; content: string };
}) => {
  const { show, hide } = useTooltipStore();
  const parts = content.split(/(\^.+?\^)/g);

  return (
    <div css={wrapperCss}>
      <div css={fieldCss}>
        <label css={labelCss}>제목</label>
        <div css={textCss}>{title}</div>
      </div>
      <div css={fieldCss}>
        <label css={labelCss}>발신자</label>
        <div css={textCss}>{writer}</div>
      </div>
      <div css={contentCss}>
        {parts.map((part, i) => {
          if (/^\^.+\^$/.test(part)) {
            const word = part.replace(/\^/g, "");
            return (
              <span
                key={i}
                css={tooltipTarget}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  show(rect.left, rect.bottom + 3, dummyTooltip[word]);
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
      </div>

      <div key={choice.id} css={choiceBoxCss}>
        <div css={choiceCss}>{choice.content}</div>
      </div>
    </div>
  );
};

export default EmailDetailWindow;

const wrapperCss = css({
  padding: "5px 10px 10px 10px",
  lineHeight: 1.6,
});

const fieldCss = css({
  display: "flex",
  marginBottom: "8px",
});

const labelCss = css({
  fontSize: "13px",
  color: colors.neon,
  marginRight: "8px",
  width: "40px",
  textAlign: "right",
});

const textCss = css({
  width: "fit-content",
  fontFamily: fonts.gothic,
  color: colors.white,
  fontSize: "14px",
});

const contentCss = css({
  marginTop: "15px",
  padding: "10px",
  borderTop: `1px solid ${colors.neon}`,
  fontSize: "15px",
  lineHeight: 1.8,
});

const tooltipTarget = css({
  textDecoration: `underline 2px dotted ${colors.white}`,
  fontWeight: "bold",
  color: colors.white,
  cursor: "help",
  margin: "0 2px",
});

const choiceBoxCss = css({
  display: "flex",
  justifyContent: "flex-end",
});

const choiceCss = css({
  color: colors.white,
  fontFamily: fonts.fixel,
  fontSize: "14px",
  padding: "12px 20px",
  borderRadius: "15px 15px 0px 15px",
  border: `1px solid ${colors.neon}`,
  maxWidth: "70%",
  alignSelf: "flex-end",
  backgroundColor: colors.dark,

  margin: "8px 0",
  "&:hover": {
    backgroundColor: colors.wBackground,
    cursor: "pointer",
  },
});
