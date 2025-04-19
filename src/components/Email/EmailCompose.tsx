import { useState } from "react";
import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";
import { getAdvice } from "../../api/gptApi";
import { useWindowStore } from "../../stores/useWindowStore";
import EmailDetailWindow from "../Email/EmailDetail";
import { useEventStore } from "../../stores/useEventStore";
import EmailWaitingWindow from "../Email/EmailWaiting";

const EmailCompose = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const pushWindow = useWindowStore((state) => state.pushWindow);
  const eventId = useEventStore((state) => state.eventId);

  const handleSend = async () => {
    if (!title || !content) return;
    if (eventId === null) return;

    const waitingKey = `waiting:${Date.now()}`;

    try {
      useWindowStore.getState().requestCloseWindow("email-compose");

      pushWindow({
        type: "email-wait",
        key: waitingKey,
        title: `RE: ${title}`,
        content: <EmailWaitingWindow />,
        color: colors.neon,
      });

      const res = await getAdvice(eventId, title, content);
      useWindowStore.getState().requestCloseWindow(waitingKey);

      pushWindow({
        type: "email-detail",
        key: `advice:${Date.now()}`,
        title: `RE: ${title}`,
        content: (
          <EmailDetailWindow
            title={`RE: ${title}`}
            content={res.content}
            writer="과학자 어쩌고"
          />
        ),
      });
    } catch (err) {
      console.error("Advice 요청 실패:", err);
    }
  };

  return (
    <div css={composeCss}>
      <div css={fieldCss}>
        <label css={labelCss}>To</label>
        <div css={receiverCss}>과학자 누구 씨</div>
      </div>
      <div css={fieldCss}>
        <label css={labelCss}>제목</label>
        <input
          css={inputCss}
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <textarea
        css={textareaCss}
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button css={sendBtnCss} onClick={handleSend}>
        보내기 (3/3)
      </button>
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
  width: "fit-content",
  padding: "8px 12px",
  fontFamily: fonts.gothic,
  color: colors.white,
  borderBottom: `1px solid ${colors.neon}`,
});

const fieldCss = css({
  display: "flex",
  marginBottom: "8px",
  alignItems: "center",
});

const labelCss = css({
  marginBottom: "4px",
  fontSize: "13px",
  color: colors.neon,
  marginRight: "8px",
  width: "30px",
  textAlign: "center",
});

const inputCss = css({
  padding: "8px 12px",
  backgroundColor: "transparent",
  border: "none",
  borderBottom: `1px solid ${colors.neon}`,
  color: colors.white,
  fontSize: "14px",
  outline: "none",
  transition: "border-bottom-color 0.3s",

  "&::placeholder": {
    color: "#aaa",
  },
  "&:focus": {
    borderBottomColor: colors.white,
  },
});

const textareaCss = css({
  minHeight: "120px",
  padding: "10px 12px",
  backgroundColor: "transparent",
  border: `1px solid ${colors.neon}`,
  color: colors.white,
  fontSize: "14px",
  fontFamily: fonts.gothic,
  outline: "none",
  resize: "none",
  borderRadius: "4px",
  transition: "border-color 0.3s",
  marginTop: "8px",

  "&::placeholder": {
    color: "#aaa",
  },
  "&:focus": {
    borderColor: colors.white,
  },
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: colors.dark,
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
});

const sendBtnCss = css({
  padding: "8px 16px",
  backgroundColor: colors.normal,
  color: colors.white,
  fontFamily: fonts.fixel,
  cursor: "pointer",
  border: "none",
  "&:hover": {
    backgroundColor: colors.dark,
  },
});
