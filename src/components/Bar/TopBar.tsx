import { css } from "@emotion/react";

const TopBar = () => {
  return <div css={topBarCss}>Welcome to Blue Planet</div>;
};

export default TopBar;

const topBarCss = css({
  height: "40px",
  backgroundColor: "#002b36",
  color: "white",
  fontWeight: "bold",
  padding: "0 20px",
  display: "flex",
  alignItems: "center",
});
