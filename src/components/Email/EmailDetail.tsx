import { css } from "@emotion/react";
import { useTooltipStore } from "../../stores/useTooltipStore";
import { colors, fonts } from "../../styles/theme";
import { parseTooltip, parseTooltipNewLine } from "../../utils/parseText";

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
  const { show, hide, tooltipData } = useTooltipStore();

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
        {parseTooltipNewLine(content, tooltipData, show, hide)}
      </div>

      <div key={choice.id} css={choiceBoxCss}>
        <div css={choiceCss}>
          {parseTooltip(choice.content, tooltipData, show, hide)}
        </div>
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
});
