import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";
import { GoAlertFill } from "react-icons/go";

const EndingAlert = ({ onConfirm }: { onConfirm: () => void }) => {
  return (
    <div css={wrapperCss}>
      <div css={iconCss}>
        <GoAlertFill size={50} />
      </div>
      <p>엔딩 조건을 달성했습니다</p>
      <button css={confirmCss} onClick={onConfirm}>
        확인
      </button>
    </div>
  );
};

export default EndingAlert;

const wrapperCss = css({
  padding: "5px 10px 10px 10px",
  lineHeight: 1.6,
  fontFamily: fonts.fixel,
  textAlign: "center",
});

const iconCss = css({
  color: colors.red,
});

const confirmCss = css({
  marginTop: "10px",
  padding: "10px 20px",
  backgroundColor: colors.red,
  color: colors.white,
  border: "none",
  cursor: "pointer",
  width: "100%",
  ":hover": {
    backgroundColor: colors.softRed,
  },
});
