import { useState, ReactNode } from "react";
import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/theme";

import Window from "./Window";
import EmailWindow from "../Email/EmailWindow";
import EmailDetail from "../Email/EmailDetail";
import EmailCompose from "../Email/EmailCompose";
import NewsWindow from "../News/NewsWindow";
import NewsDetail from "../News/NewsDetail";
import {
  HiOutlineMail,
  HiOutlineNewspaper,
  HiOutlineLightBulb,
} from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";

import { dummyEmails, dummyNews } from "../../dummy/dummyData";

interface WindowData {
  id: number;
  key: string;
  type: string;
  title: string;
  content: ReactNode;
  x: number;
  y: number;
  zIndex: number;
}

let nextId = 1;

const WindowManager = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [zIndex, setZIndex] = useState(10);

  const bringToFront = (id: number) => {
    setZIndex((prev) => {
      const newZ = prev + 1;
      setWindows((prevWindows) =>
        prevWindows.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w))
      );
      return newZ;
    });
  };

  const openWindow = (
    type: string,
    payload: {
      title: string;
      content: ReactNode;
      key?: string;
    }
  ) => {
    const windowKey = payload.key || `${type}:${payload.title}`;

    setWindows((prev) => {
      const existing = prev.find((w) => w.key === windowKey);
      if (existing) {
        bringToFront(existing.id);
        return prev;
      }

      const newZ = zIndex + 1;
      setZIndex(newZ);

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const centerX = screenWidth / 2 - 150;
      const centerY = screenHeight / 2 - 100;
      const offsetX = Math.floor(Math.random() * 100 - 50);
      const offsetY = Math.floor(Math.random() * 100 - 50);

      const newWindow: WindowData = {
        id: nextId++,
        key: windowKey,
        type,
        title: payload.title,
        content: payload.content,
        x: centerX + offsetX,
        y: centerY + offsetY,
        zIndex: newZ,
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
      }),
  };

  const handleEmailClick = (emailId: number) => {
    if (emailId === -1) {
      openWindow("email-compose", {
        key: "email-compose",
        title: "새 이메일 작성",
        content: <EmailCompose />,
      });
      return;
    }

    const email = dummyEmails.find((e) => e.id === emailId);
    if (!email) return;

    openWindow("email-detail", {
      key: `email-detail:${email.id}`,
      title: `${email.title}`,
      content: <EmailDetail title={email.title} content={email.content} />,
    });
  };

  const handleNewsClick = (newsId: number) => {
    const news = dummyNews.find((n) => n.id === newsId);
    if (!news) return;

    openWindow("news-detail", {
      key: `news-detail:${news.id}`,
      title: `${news.title}`,
      content: <NewsDetail title={news.title} content={news.content} />,
    });
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
            <div>Setting</div>
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
