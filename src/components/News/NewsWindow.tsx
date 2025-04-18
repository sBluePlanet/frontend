import { css } from "@emotion/react";
import { dummyNews } from "../../dummy/dummyData";

interface NewsWindowProps {
    onNewsClick: (NewsId: number) => void;
  }
  
  const NewsWindow = ({ onNewsClick }: NewsWindowProps) => {
    return (
      <div css={listCss}>
        {dummyNews.map((News) => (
          <div key={News.id} css={NewsItemCss} onClick={() => onNewsClick(News.id)}>
            <span>📰</span>
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
});

const NewsItemCss = css({
  display: "flex",
  gap: "8px",
  cursor: "pointer",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#003b44",
  },
});

const titleCss = css({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
