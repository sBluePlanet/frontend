import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";
import { parseNewLine } from "../../utils/parseText";

const images = import.meta.glob("../../assets/news/*.png", {
  eager: true,
  import: "default",
});

const getImageByFilename = (filename: string): string => {
  return images[`../../assets/news/${filename}`] as string;
};

const NewsDetailWindow = ({
  title,
  content,
  imgUrl,
}: {
  title: string;
  content: string;
  imgUrl: string;
}) => {
  const imageSrc = getImageByFilename(imgUrl);

  return (
    <div style={{ padding: "10px" }}>
      <div css={titlsCss}>{title}</div>
      <img src={imageSrc} css={imgCss} alt="뉴스 이미지" />
      <div css={contentCss}>{parseNewLine(content)}</div>
    </div>
  );
};

export default NewsDetailWindow;

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
