import { useState } from "react";
import { css } from "@emotion/react";

import { colors, fonts } from "../../styles/theme";
import { dummyTooltip } from "../../dummy/dummyData";
import { useTooltipStore } from "../../stores/useTooltipStore";

const EventEmailWindow = ({
  title,
  content,
  writer,
  choices,
  onChoiceSelect,
  onNext,
}: {
  title: string;
  content: string;
  writer: string;
  choices: { id: number; content: string }[];
  onChoiceSelect: (choiceId: number) => Promise<string>;
  onNext: () => void;
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const { show, hide } = useTooltipStore();
  
  const parts = content.split(/(\^.+?\^)/g);

  const handleClick = async (choiceId: number) => {
    if (selectedId !== null) return;
    setSelectedId(choiceId);
    const result = await onChoiceSelect(choiceId);
    setResultMessage(result);
  };

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

      {choices
        .filter((c) => selectedId === null || c.id === selectedId)
        .map((choice) => (
          <div key={choice.id} css={choiceBoxCss}>
            <div css={choiceCss} onClick={() => handleClick(choice.id)}>
              {choice.content}
            </div>
          </div>
        ))}
      {resultMessage && (
        <>
          <div css={resultCss}>{resultMessage}</div>
          <button css={nextButtonCss} onClick={onNext}>
            next
          </button>
        </>
      )}
    </div>
  );
};

export default EventEmailWindow;

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
  textDecoration: `underline 2px dotted ${colors.neon}`,
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

const resultCss = css({
  marginTop: "15px",
  padding: "20px 16px",
  borderTop: `1px solid ${colors.neon}`,
  color: colors.neon,
  fontSize: "15px",
  fontFamily: fonts.gothic,
  fontStyle: "italic",
  textAlign: "center",
});

const nextButtonCss = css({
  padding: "10px 20px",
  fontSize: "16px",
  fontFamily: fonts.fixel,
  backgroundColor: colors.dark,
  color: `${colors.white}`,
  border: "none",
  cursor: "pointer",
  width: "100%",
  "&:hover": {
    backgroundColor: colors.normal,
  },
});
