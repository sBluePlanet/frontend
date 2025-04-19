import { ReactNode, useState } from "react";
import { css } from "@emotion/react";

import { colors, fonts } from "../../styles/theme";
import { useTooltipStore } from "../../stores/useTooltipStore";
import { useStatusStore } from "../../stores/useStatusStore";

import { FaCloud } from "react-icons/fa";
import { GiWaterDrop } from "react-icons/gi";
import { FaHeartbeat } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
} from "react-icons/md";

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
  const diff = useStatusStore.getState().getDiff();

  const { show, hide, tooltipData } = useTooltipStore();

  const iconMap: Record<string, ReactNode> = {
    air: <FaCloud />,
    water: <GiWaterDrop />,
    life: <FaHeartbeat />,
    support: <FaPerson />,
  };

  const handleClick = async (choiceId: number) => {
    if (selectedId !== null) return;
    setSelectedId(choiceId);
    const result = await onChoiceSelect(choiceId);
    setResultMessage(result);
  };

  const parseTextWithTooltip = (text: string) => {
    const parts = text.split(/(\^.+?\^)/g);
    return parts.map((part, i) => {
      if (/^\^.+\^$/.test(part)) {
        const word = part.replace(/\^/g, "");
        const tooltip = tooltipData[word] || "설명이 없습니다.";
        return (
          <span
            key={i}
            css={tooltipTarget}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              show(rect.left, rect.bottom + 3, tooltip);
            }}
            onMouseLeave={hide}
          >
            {word}
          </span>
        );
      } else {
        return <span key={i}>{part}</span>;
      }
    });
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
      <div css={contentCss}>{parseTextWithTooltip(content)}</div>

      {choices
        .filter((c) => selectedId === null || c.id === selectedId)
        .map((choice) => (
          <div key={choice.id} css={choiceBoxCss}>
            <div css={choiceCss} onClick={() => handleClick(choice.id)}>
              {parseTextWithTooltip(choice.content)}
            </div>
          </div>
        ))}
      {resultMessage && (
        <>
          {Object.entries(diff).map(([key, value]) => {
            if (value === 0) return null;

            const isIncrease = value > 0;
            const isLargeChange = Math.abs(value) >= 10;

            const ArrowIcon = isIncrease
              ? isLargeChange
                ? MdOutlineKeyboardDoubleArrowUp
                : MdOutlineKeyboardArrowUp
              : isLargeChange
              ? MdOutlineKeyboardDoubleArrowDown
              : MdOutlineKeyboardArrowDown;

            const color = isIncrease ? colors.green : colors.red;

            return (
              <div key={key} css={statusLineCss}>
                <span css={statusIconCss}>{iconMap[key]}</span>
                <ArrowIcon color={color} size={18} />
              </div>
            );
          })}

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
  padding: "10px 16px 30px 16px",
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

const statusLineCss = css({
  borderTop: `1px solid ${colors.neon}`,
  padding: "20px 0 0 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "20px 0 0 0",
});

const statusIconCss = css({
  fontSize: "18px",
  color: colors.white,
});
