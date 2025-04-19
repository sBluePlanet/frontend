import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";

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

  return (
    <div style={{ padding: "10px" }}>
      <div css={titlsCss}>{title}</div>
      <img src={imageSrc} css={imgCss} alt="뉴스 이미지" />
      <div css={contentCss}>{content}</div>
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
  backgroundColor: colors.dark,
  color: `${colors.white}`,
  border: "none",
  cursor: "pointer",
  width: "100%",
  "&:hover": {
    backgroundColor: colors.normal,
  },
});
