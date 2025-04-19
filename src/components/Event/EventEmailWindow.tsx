import { ReactNode, useState } from "react";
import { css } from "@emotion/react";

import { colors, fonts } from "../../styles/theme";
import { useTooltipStore } from "../../stores/useTooltipStore";
import { useStatusStore } from "../../stores/useStatusStore";
import { parseTooltip, parseTooltipNewLine } from "../../utils/parseText";

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
      {choices
        .filter((c) => selectedId === null || c.id === selectedId)
        .map((choice) => (
          <div key={choice.id} css={choiceBoxCss}>
            <div css={choiceCss} onClick={() => handleClick(choice.id)}>
              {parseTooltip(choice.content, tooltipData, show, hide)}
            </div>
          </div>
        ))}
      {resultMessage && (
        <>
          <div css={statusLineCss}>
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
                <span key={key} css={statusItemCss}>
                  <span>{iconMap[key]}</span>
                  <ArrowIcon color={color} size={18} />
                </span>
              );
            })}
          </div>

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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  marginTop: "20px",
  paddingTop: "20px",
  borderTop: `1px solid ${colors.neon}`,
});

const statusItemCss = css({
  display: "flex",
  alignItems: "center",
  gap: "2px",
});
