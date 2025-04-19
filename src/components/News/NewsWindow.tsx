import { useEffect } from "react";
import { css } from "@emotion/react";
import { colors } from "../../styles/theme";
import { GoAlert } from "react-icons/go";
import { useNewsStore } from "../../stores/useNewsStore";

interface NewsWindowProps {
  onNewsClick: (NewsId: number) => void;
}

const NewsWindow = ({ onNewsClick }: NewsWindowProps) => {
  const { newsList, getList } = useNewsStore();

  useEffect(() => {
    getList();
  }, []);

  return (
    <div css={listCss}>
      {newsList.map((News) => (
        <div
          key={News.specialEventId}
          css={NewsItemCss}
          onClick={() => onNewsClick(News.specialEventId)}
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
    borderBottom: `1px solid ${colors.red}`,
    paddingBottom: "8px",
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
