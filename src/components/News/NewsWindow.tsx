import { css } from "@emotion/react";
import { dummyNews } from "../../dummy/dummyData";
import { colors } from "../../styles/theme";
import { GoAlert } from "react-icons/go";

interface NewsWindowProps {
  onNewsClick: (NewsId: number) => void;
}

const NewsWindow = ({ onNewsClick }: NewsWindowProps) => {
  return (
    <div css={listCss}>
      {dummyNews.map((News) => (
        <div
          key={News.id}
          css={NewsItemCss}
          onClick={() => onNewsClick(News.id)}
        >
          <GoAlert color={colors.red} />
          <span css={titleCss}>{News.title}</span>
        </div>
      ))}
    </div>
  );
};

export default NewsWindow;

const listCss = css({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "12px",
  fontSize: "14px",
  overflowY: "auto",
  height: "100%",
  "& > *:not(:last-child)": {
    borderBottom: `1px solid ${colors.normal}`, // 원하는 밑줄 스타일
    paddingBottom: "8px", // 간격이 필요하다면 추가
  },
});

const NewsItemCss = css({
  padding: "0 8px",
  cursor: "pointer",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  alignItems: "center",
  "&:hover": {
    color: colors.neon,
  },
});

const titleCss = css({
  marginLeft: "8px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
