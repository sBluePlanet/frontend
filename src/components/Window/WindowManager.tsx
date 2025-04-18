import { useState, ReactNode } from "react";
import { css } from "@emotion/react";
import { colors } from "../../styles/theme";

import LeftBar from "../Bar/LeftBar";
import Window from "./Window";
import EmailWindow from "../Email/EmailWindow";
import EmailDetail from "../Email/EmailDetail";
import EmailCompose from "../Email/EmailCompose";
import NewsWindow from "../News/NewsWindow";
import NewsDetail from "../News/NewsDetail";
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
        title: "email",
        content: <EmailWindow onEmailClick={handleEmailClick} />,
        key: "email",
      }),
    chat: () =>
      openWindow("chat", {
        title: "chat",
        content: "채팅기능 없는데용?",
        key: "chat",
      }),
    news: () =>
      openWindow("news", {
        title: "news",
        content: <NewsWindow onNewsClick={handleNewsClick} />,
        key: "news",
      }),
  };

  const handleEmailClick = (emailId: number) => {
    if (emailId === -1) {
      openWindow("email-compose", {
        key: "email-compose",
        title: "📨 새 이메일 작성",
        content: <EmailCompose />,
      });
      return;
    }

    const email = dummyEmails.find((e) => e.id === emailId);
    if (!email) return;

    openWindow("email-detail", {
      key: `email-detail:${email.id}`,
      title: `📧 ${email.title}`,
      content: <EmailDetail title={email.title} content={email.content} />,
    });
  };

  const handleNewsClick = (newsId: number) => {
    const news = dummyNews.find((n) => n.id === newsId);
    if (!news) return;

    openWindow("news-detail", {
      key: `news-detail:${news.id}`,
      title: `📰 ${news.title}`,
      content: <NewsDetail title={news.title} content={news.content} />,
    });
  };

  return (
    <div css={desktopCss}>
      <LeftBar open={(type) => predefinedMap[type]?.()} />
      <div css={screenCss}>
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
