import { css } from "@emotion/react";
import StatusBar from "./StatusBar";

const TopBar = () => {
  return (
    <div css={topBarCss}>
      <div>Blue Planet</div>
      <StatusBar />
      <div>20턴</div>
    </div>
  );
};

export default TopBar;

const topBarCss = css({
  height: "60px",
  backgroundColor: "#002b36",
  color: "white",
  fontWeight: "bold",
  padding: "0 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
