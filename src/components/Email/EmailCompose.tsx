import { css } from "@emotion/react";

const EmailCompose = () => {
  return (
    <div css={composeCss}>
      <p css={receiverCss}>과학 전문가 GPT 씨에게</p>
      <input css={inputCss} placeholder="제목" />
      <textarea css={textareaCss} placeholder="내용을 입력하세요" />
      <button css={sendBtnCss}>보내기</button>
    </div>
  );
};

export default EmailCompose;

const composeCss = css({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "10px",
  fontSize: "14px",
});

const receiverCss = css({
  padding: "5px",
  backgroundColor: "white",
  color: "black",
});

const inputCss = css({
  padding: "8px",
});

const textareaCss = css({
  minHeight: "100px",
  padding: "8px",
});

const sendBtnCss = css({
  padding: "8px 16px",
  color: "#000",
  cursor: "pointer",
});
