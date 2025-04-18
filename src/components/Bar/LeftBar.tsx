import { css } from "@emotion/react";
import { HiOutlineMail, HiOutlineNewspaper } from "react-icons/hi";

interface LeftBarProps {
  open: (type: "email" | "news") => void;
}

const LeftBar = ({ open }: LeftBarProps) => {
  return (
    <div css={leftBarCss}>
      <button css={btnCss} onClick={() => open("email")}>
        <HiOutlineMail size={30} />
      </button>
      <button css={btnCss} onClick={() => open("news")}>
        <HiOutlineNewspaper size={30} />
      </button>
    </div>
  );
};

export default LeftBar;

const leftBarCss = css({
  // backgroundColor: colors.bBackground,
  padding: "30px",
  gap: "12px",
  display: "flex",
  flexDirection: "column",
});

const btnCss = css({
  padding: "10px",
  backgroundColor: "transparent",
  border: 0,
  color: "white",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#003b44",
  },
});
