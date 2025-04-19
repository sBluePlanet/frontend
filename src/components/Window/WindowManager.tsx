import { useState, useEffect, ReactNode } from "react";
import { css } from "@emotion/react";

import { colors, fonts } from "../../styles/theme";
import {
  HiOutlineMail,
  HiOutlineNewspaper,
  HiOutlineLightBulb,
} from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";

import { getEmailDetail, getNewsDetail } from "../../api/dataApi";
import { useWindowStore } from "../../stores/useWindowStore";

import Window from "./Window";
import EmailWindow from "../Email/EmailWindow";
import EmailCompose from "../Email/EmailCompose";
import NewsWindow from "../News/NewsWindow";
import NewsDetail from "../News/NewsDetail";
import EmailDetailWindow from "../Email/EmailDetail";

interface WindowData {
  id: number;
  key: string;
  type: string;
  title: string;
  content: ReactNode;
  x: number;
  y: number;
  zIndex: number;
  color?: string;
}

let nextId = 1;

const WindowManager = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);

  const { openWindowQueue, clearWindowQueue } = useWindowStore();
  const { closeWindowQueue, clearCloseQueue } = useWindowStore();

  useEffect(() => {
    if (openWindowQueue.length > 0) {
      const next = openWindowQueue[0];
      openWindow(next.type || "external", next);
      clearWindowQueue();
    }
  }, [openWindowQueue, clearWindowQueue]);

  useEffect(() => {
    if (closeWindowQueue.length > 0) {
      const keyToClose = closeWindowQueue[0];
      setWindows((prev) => prev.filter((w) => w.key !== keyToClose));
      clearCloseQueue();
    }
  }, [closeWindowQueue]);

  const bringToFront = (id: number) => {
    const topZ = useWindowStore.getState().nextZIndex();
    setWindows((prevWindows) =>
      prevWindows.map((w) => (w.id === id ? { ...w, zIndex: topZ } : w))
    );
  };

  const openWindow = (
    type: string,
    payload: {
      title: string;
      content: ReactNode;
      key?: string;
      color?: string;
    }
  ) => {
    const windowKey = payload.key || `${type}:${payload.title}`;

    setWindows((prev) => {
      const existing = prev.find((w) => w.key === windowKey);
      if (existing) {
        bringToFront(existing.id);
        return prev;
      }

      const newZ = useWindowStore.getState().nextZIndex();

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const centerX = screenWidth / 2 - 150;
      const centerY = screenHeight / 2 - 350;

      const isEvent = type === "event";

      const x = isEvent
        ? centerX
        : centerX + Math.floor(Math.random() * 100 - 50);
      const y = isEvent
        ? centerY
        : centerY + Math.floor(Math.random() * 100 - 50);

      const newWindow: WindowData = {
        id: nextId++,
        key: windowKey,
        type,
        title: payload.title,
        content: payload.content,
        x,
        y,
        zIndex: newZ,
        color: payload.color,
      };

      return [...prev, newWindow];
    });
  };

  const closeWindow = (id: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const predefinedMap = {
    email: () =>
      openWindow("email", {
        title: "E-MAIL",
        content: <EmailWindow onEmailClick={handleEmailClick} />,
        key: "email",
      }),
    news: () =>
      openWindow("news", {
        title: "NEWS",
        content: <NewsWindow onNewsClick={handleNewsClick} />,
        key: "news",
        color: colors.red,
      }),
  };

  const handleEmailClick = async (emailId: number) => {
    if (emailId === -1) {
      openWindow("email-compose", {
        key: "email-compose",
        title: "E-MAIL",
        content: <EmailCompose />,
      });
      return;
    }

    try {
      const email = await getEmailDetail(emailId);

      openWindow("email-detail", {
        key: `email-detail:${email.eventId}`,
        title: "E-MAIL",
        content: (
          <EmailDetailWindow
            title={email.title}
            content={email.content}
            writer={email.writer}
            choice={email.selectedChoice}
          />
        ),
      });
    } catch (err) {
      console.error("이메일 상세 조회 실패:", err);
    }
  };

  const handleNewsClick = async (newsId: number) => {
    try {
      const news = await getNewsDetail(newsId);

      openWindow("news-detail", {
        key: `news-detail:${news.specialEventId}`,
        title: "NEWS",
        content: (
          <NewsDetail
            title={news.title}
            content={news.content}
            imgUrl={news.imgUrl}
          />
        ),
        color: colors.red,
      });
    } catch (err) {
      console.error("뉴스 상세 조회 실패:", err);
    }
  };

  return (
    <div css={desktopCss}>
      <div css={screenCss}>
        <div css={desktopIconContainerCss}>
          <div css={desktopIconCss} onClick={() => predefinedMap["email"]?.()}>
            <HiOutlineMail size={40} />
            <div>Email</div>
          </div>
          <div css={desktopIconCss} onClick={() => predefinedMap["news"]?.()}>
            <HiOutlineNewspaper size={40} />
            <div>News</div>
          </div>
          <div css={desktopIconCss}>
            <HiOutlineLightBulb size={40} />
            <div>Tips</div>
          </div>
          <div css={desktopIconCss}>
            <IoSettingsOutline size={40} />
            <div>Test</div>
          </div>
        </div>

        {windows.map((w) => (
          <Window
            key={w.id}
            id={w.id}
            title={w.title}
            zIndex={w.zIndex}
            initialX={w.x}
            initialY={w.y}
            onClose={() => closeWindow(w.id)}
            onClick={() => bringToFront(w.id)}
            color={w.color}
          >
            {w.content}
          </Window>
        ))}
      </div>
    </div>
  );
};

export default WindowManager;

const desktopCss = css({
  flex: 1,
  display: "flex",
  width: "100%",
  backgroundColor: colors.background,
});

const screenCss = css({
  flex: 1,
  position: "relative",
  overflow: "hidden",
});

const desktopIconContainerCss = css({
  position: "absolute",
  top: 40,
  left: 40,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const desktopIconCss = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px 20px",
  gap: "5px",
  color: colors.neon,
  cursor: "pointer",
  fontSize: "15px",
  fontFamily: fonts.fixel,
  "&:hover": {
    backgroundColor: colors.wBackground,
    color: colors.white,
  },
});
