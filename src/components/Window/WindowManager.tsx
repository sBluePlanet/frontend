import { useState, ReactNode } from "react";
import { css } from "@emotion/react";
import Window from "../Window/Window";
import LeftBar from "../Bar/LeftBar";
import { colors } from "../../styles/theme";

type WindowType = "email" | "chat" | "news";

interface WindowData {
  id: number;
  type: WindowType;
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

  const openWindow = (type: WindowType) => {
    if (windows.some((w) => w.type === type)) return;

    const titleMap = {
      email: "email",
      chat: "chat",
      news: "news",
    };

    const contentMap = {
      email: (
        <p>
          from. Yun <br /> 우린할수잇다알지?
        </p>
      ),
      chat: <p>GPT 선생님 도와주세요</p>,
      news: <p>속보: 지구 멸망합니다!</p>,
    };

    const newWindow: WindowData = {
      id: nextId++,
      type,
      title: titleMap[type],
      content: contentMap[type],
      x: 100 + windows.length * 30,
      y: 100 + windows.length * 30,
      zIndex: zIndex,
    };

    setWindows((prev) => [...prev, newWindow]);
    setZIndex((prev) => prev + 1);
  };

  const closeWindow = (id: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const bringToFront = (id: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: zIndex } : w))
    );
    setZIndex((prev) => prev + 1);
  };

  return (
    <div css={desktopCss}>
      <LeftBar open={openWindow} />
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
