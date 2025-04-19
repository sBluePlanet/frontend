import { ReactNode } from "react";
import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";

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
import { useStatusStore } from "../../stores/useStatusStore";
import { parseNewLine } from "../../utils/parseText";

const images = import.meta.glob("../../assets/news/*.png", {
  eager: true,
  import: "default",
});

const getImageByFilename = (filename: string): string => {
  return images[`../../assets/news/${filename}`] as string;
};

const EventNewsWindow = ({
  title,
  content,
  imgUrl,
  onNext,
}: {
  title: string;
  content: string;
  imgUrl: string;
  onNext: () => void;
}) => {
  const imageSrc = getImageByFilename(imgUrl);
  const diff = useStatusStore.getState().getDiff();

  const iconMap: Record<string, ReactNode> = {
    air: <FaCloud />,
    water: <GiWaterDrop />,
    life: <FaHeartbeat />,
    support: <FaPerson />,
  };

  return (
    <div style={{ padding: "10px" }}>
      <div css={titlsCss}>{title}</div>
      <img src={imageSrc} css={imgCss} alt="뉴스 이미지" />
      <div css={contentCss}>{parseNewLine(content)}</div>
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
      <button css={nextButtonCss} onClick={onNext}>
        next
      </button>
    </div>
  );
};

export default EventNewsWindow;

const titlsCss = css({
  fontFamily: fonts.fixel,
  fontSize: "18px",
  borderBottom: `1px solid ${colors.red}`,
  marginBottom: "15px",
});

const imgCss = css({
  width: "100%",
});

const contentCss = css({
  padding: "10px",
  fontSize: "15px",
  lineHeight: 1.8,
});

const nextButtonCss = css({
  padding: "10px 20px",
  fontSize: "16px",
  fontFamily: fonts.fixel,
  backgroundColor: colors.red,
  color: `${colors.white}`,
  border: "none",
  cursor: "pointer",
  width: "100%",
  "&:hover": {
    backgroundColor: colors.softRed,
  },
});

const statusLineCss = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  margin: "10px 0 20px 0",
});

const statusItemCss = css({
  display: "flex",
  alignItems: "center",
  gap: "2px",
});
