import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";
import newsImg from "../../assets/newsImg.png";

const NewsDetailWindow = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <div style={{ padding: "10px" }}>
    <div css={titlsCss}>{title}</div>
    <img src={newsImg} css={imgCss} alt="뉴스 이미지" />
    <div css={contentCss}>{content}</div>
  </div>
);

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
