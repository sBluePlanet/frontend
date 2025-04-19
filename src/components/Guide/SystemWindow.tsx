import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";

const SystemWindow = () => {
  return (
    <div css={contentCss}>
      게임 재시작
      <button onClick={() => window.location.reload()} css={restartButtonCss}>
        RESTART
      </button>
    </div>
  );
};

export default SystemWindow;

const contentCss = css({
  padding: "10px",
  fontSize: "15px",
  lineHeight: 1.8,
});

const restartButtonCss = css({
  marginLeft: "10px",
  padding: "5px 10px",
  fontSize: "16px",
  fontFamily: fonts.fixel,
  backgroundColor: colors.red,
  color: `${colors.white}`,
  border: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
});
