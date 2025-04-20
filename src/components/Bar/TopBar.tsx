import { css } from "@emotion/react";
import { FaEarthAsia } from "react-icons/fa6";
import StatusBar from "./StatusBar";
import { colors, fonts } from "../../styles/theme";
import { useTurnStore } from "../../stores/useTurnStore";

const TopBar = () => {
  const turn = useTurnStore((state) => state.turn);

  return (
    <div css={topBarCss}>
      <div css={{ color: colors.neon }}>
        <FaEarthAsia /> <span css={{ fontSize: "22px" }}>Blue Planet</span>
      </div>
      <StatusBar />
      <div>
        <span css={bigNumberCss}>{turn}</span>
        <span css={smallNumberCss}>/20</span>
      </div>
    </div>
  );
};

export default TopBar;

const topBarCss = css({
  height: "60px",
  padding: "0 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: colors.neon,
  fontFamily: fonts.fixel,
  fontSize: "20px",
  borderBottom: `1px solid ${colors.neon}`,
});

const bigNumberCss = css({
  fontSize: "25px",
  fontWeight: "bold",
  marginRight: "2px",
  color: colors.red,
});

const smallNumberCss = css({
  fontSize: "15px",
  opacity: 0.7,
});
