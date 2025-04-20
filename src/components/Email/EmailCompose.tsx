import { useState } from "react";
import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";

import { getAdvice } from "../../api/gptApi";
import { useWindowStore } from "../../stores/useWindowStore";
import { useEventStore } from "../../stores/useEventStore";
import { useEmailStore } from "../../stores/useEmailStore";
import EmailWaitingWindow from "../Email/EmailWaiting";
import EmailDetailWindow from "../Email/EmailDetail";

const EmailCompose = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const pushWindow = useWindowStore((state) => state.pushWindow);
  const eventId = useEventStore((state) => state.eventId);

  const emailQuota = useEmailStore((state) => state.emailQuota);
  const decreaseQuota = useEmailStore((state) => state.decreaseQuota);

  const handleSend = async () => {
    if (!title || !content) return;
    if (eventId === null) return;

    if (emailQuota <= 0) {
      pushWindow({
        type: "alert",
        title: "이메일 제한",
        key: "email-limit-alert",
        color: colors.red,
        content: (
          <div css={{ padding: "10px", textAlign: "center" }}>
            더 이상 메시지를 보낼 수 없습니다
          </div>
        ),
        closable: true,
        width: 300,
      });
      return;
    }

    const waitingKey = `waiting:${Date.now()}`;

    try {
      useWindowStore.getState().requestCloseWindow("email-compose");

      pushWindow({
        type: "email-wait",
        key: waitingKey,
        title: `RE: ${title}`,
        content: <EmailWaitingWindow />,
        color: colors.neon,
        x: window.innerWidth / 2 - 150,
        y: window.innerHeight / 2 - 150,
      });

      const res = await getAdvice(eventId, title, content);
      useWindowStore.getState().requestCloseWindow(waitingKey);

      decreaseQuota();

      pushWindow({
        type: "email-detail",
        key: `advice:${Date.now()}`,
        title: `RE: ${title}`,
        content: (
          <EmailDetailWindow
            title={`RE: ${title}`}
            content={res.content}
            writer="박병호 과학 전문가"
          />
        ),
      });

      const { getList: getEmailList } = useEmailStore.getState();
      await getEmailList();
    } catch (err) {
      console.error("Advice 요청 실패:", err);
    }
  };

  return (
    <div css={composeCss}>
      <div css={fieldCss}>
        <label css={labelCss}>To</label>
        <div css={receiverCss}>박병호 과학 전문가</div>
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
        placeholder={`과학 전문가에게 조언을 구해보세요.\n예) 삼투압식 필터를 도입하면 어떻게 되나요?`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button css={sendBtnCss} onClick={handleSend}>
        보내기 ({emailQuota} / 3)
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
