import { useEffect } from "react";
import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";

import { IoMailOpenOutline } from "react-icons/io5";
import { useEmailStore } from "../../stores/useEmailStore";

interface EmailWindowProps {
  onEmailClick: (emailId: number, type: string) => void;
}

const EmailWindow = ({ onEmailClick }: EmailWindowProps) => {
  const { emailList, getList } = useEmailStore();

  useEffect(() => {
    getList();
  }, []);

  const handleComposeClick = () => {
    onEmailClick(-1, "");
  };

  return (
    <div css={listCss}>
      <button css={composeBtnCss} onClick={handleComposeClick}>
        과학 전문가에게 이메일 작성
      </button>

      {emailList.map((email) => (
        <div
          css={emailItemCss}
          onClick={() => onEmailClick(email.id, email.type)}
        >
          <IoMailOpenOutline />
          <span css={titleCss}>{email.title}</span>
        </div>
      ))}
    </div>
  );
};

export default EmailWindow;

const composeBtnCss = css({
  backgroundColor: colors.normal,
  color: "white",
  border: "none",
  padding: "10px",
  cursor: "pointer",
  fontFamily: fonts.fixel,

  "&:hover": {
    backgroundColor: colors.dark,
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
    color: colors.neon,
  },
});

const titleCss = css({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
