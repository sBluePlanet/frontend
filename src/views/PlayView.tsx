import { css } from "@emotion/react";
import { colors } from "../styles/theme";
import TopBar from "../components/Bar/TopBar";
import WindowManager from "../components/Window/WindowManager";
import TooltipLayer from "../components/TooltipLayer";
import { useTooltipStore } from "../stores/useTooltipStore";

const PlayView = () => {
  const { visible, x, y, content } = useTooltipStore();

  return (
    <div css={playViewCss}>
      <TopBar />
      <div css={mainAreaCss}>
        <WindowManager />
      </div>
      <TooltipLayer visible={visible} x={x} y={y} content={content} />
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
