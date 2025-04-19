import { css, keyframes } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";

const EmailWaiting = () => {
  return (
    <div css={containerCss}>
      <div css={spinnerCss} />
      <div css={textCss}>답변을 기다리는 중입니다...</div>
    </div>
  );
};

export default EmailWaiting;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const containerCss = css({
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
});

const spinnerCss = css({
  width: "40px",
  height: "40px",
  border: `4px solid ${colors.wBackground}`,
  borderTop: `4px solid ${colors.neon}`,
  borderRadius: "50%",
  animation: `${spin} 1s linear infinite`,
});

const textCss = css({
  fontSize: "16px",
  fontFamily: fonts.fixel,
  color: colors.white,
});
