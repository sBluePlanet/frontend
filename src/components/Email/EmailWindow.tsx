import { css } from "@emotion/react";
import { dummyEmails } from "../../dummy/dummyData";

interface EmailWindowProps {
  onEmailClick: (emailId: number) => void;
}

const EmailWindow = ({ onEmailClick }: EmailWindowProps) => {
  const handleComposeClick = () => {
    onEmailClick(-1);
  };

  return (
    <div css={listCss}>
      <button css={composeBtnCss} onClick={handleComposeClick}>
        조언가에게 이메일 작성
      </button>

      {dummyEmails.map((email) => (
        <div
          key={email.id}
          css={emailItemCss}
          onClick={() => onEmailClick(email.id)}
        >
          <span>✉️</span>
          <span css={titleCss}>{email.title}</span>
        </div>
      ))}
    </div>
  );
};

export default EmailWindow;

const composeBtnCss = css({
  backgroundColor: "#003b44",
  color: "white",
  border: "none",
  padding: "8px 10px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#005f6b",
  },
});

const listCss = css({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "12px",
  fontSize: "14px",
  overflowY: "auto",
  height: "100%",
});

const emailItemCss = css({
  display: "flex",
  gap: "8px",
  cursor: "pointer",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#003b44",
  },
});

const titleCss = css({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
