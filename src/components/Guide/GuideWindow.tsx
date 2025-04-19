import { css } from "@emotion/react";
import { colors } from "../../styles/theme";

import { FaCloud } from "react-icons/fa";
import { GiWaterDrop } from "react-icons/gi";
import { FaHeartbeat } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

const GuideWindow = () => {
  return (
    <div css={contentCss}>
      <div css={statusCss}>
        대기 <FaCloud size={12} /> / 수질 <GiWaterDrop size={12} /> / 생물{" "}
        <FaHeartbeat size={12} /> / 지지도 <FaPerson size={12} />
      </div>
      <div css={{ padding: "10px" }}>
        각 수치의 균형을 유지하세요. <br />
        하나라도 <span css={{ color: colors.red }}>0</span>이 되거나{" "}
        <span css={{ color: colors.red }}>100</span>이 되면 게임 오버입니다.
        <br />
        50 이상의 수치를 유지하며 20턴을 무사히 마치세요!
      </div>
    </div>
  );
};

export default GuideWindow;

const contentCss = css({
  padding: "10px",
  fontSize: "15px",
  lineHeight: 1.8,
});

const statusCss = css({
  textAlign: "center",
  padding: "10px",
  backgroundColor: colors.softRed,
});
