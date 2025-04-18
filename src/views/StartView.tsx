import { css } from "@emotion/react";

const StartScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <div css={startScreenCss}>
      <button css={startBtnCss} onClick={onStart}>Start</button>
    </div>
  );
};

export default StartScreen;

const startScreenCss = css({
  width: "100vw",
  height: "100vh",
  backgroundColor: "black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const startBtnCss = css({
  padding: "1rem 2rem",
  fontSize: "1.5rem",
  color: "white",
  border: "none",
  cursor: "pointer",
  backgroundColor: "black",
});
