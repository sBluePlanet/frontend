import { css } from "@emotion/react";
import { colors } from "../styles/theme";
import TopBar from "../components/Bar/TopBar";
import WindowManager from "../components/Window/WindowManager";

const PlayView = () => {
  return (
    <div css={playViewCss}>
      <TopBar />
      <div css={mainAreaCss}>
        <WindowManager />
      </div>
    </div>
  );
};

export default PlayView;

const playViewCss = css({
  width: "100vw",
  height: "100vh",
  backgroundColor: colors.background,
  display: "flex",
  flexDirection: "column",
});

const mainAreaCss = css({
  flex: 1,
  display: "flex",
  flexDirection: "row",
  position: "relative",
  overflow: "hidden",
});
