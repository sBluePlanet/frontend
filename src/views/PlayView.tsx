import { useEffect, useState } from "react";
import { css } from "@emotion/react";

import { colors } from "../styles/theme";
import { useTooltipStore } from "../stores/useTooltipStore";
import { useStatusStore } from "../stores/useStatusStore";
import { useWindowStore } from "../stores/windowStore";
import { useEmailStore } from "../stores/useEmailStore";
import { getStartData, getCommonEvent, postChoice } from "../api/gameApi";

import GameStart from "../components/Event/GameStart";
import TopBar from "../components/Bar/TopBar";
import WindowManager from "../components/Window/WindowManager";
import TooltipLayer from "../components/TooltipLayer";
import EventEmailWindow from "../components/Event/EventEmailWindow";

const PlayView = () => {
  const [isGameStartVisible, setGameStartVisible] = useState(true);
  const [prologue, setPrologue] = useState({ title: "", content: "" });
  const [nextEvent, setNextEvent] = useState<number | null>(null);

  const setUserId = useStatusStore((state) => state.setUserId);
  const setStatus = useStatusStore((state) => state.setStatus);
  const { visible, x, y, content } = useTooltipStore();
  const pushWindow = useWindowStore((state) => state.pushWindow);
  const requestCloseWindow = useWindowStore((s) => s.requestCloseWindow);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getStartData();
        const { prologue, userStatus, nextEvent } = data;

        setPrologue({
          title: prologue.title,
          content: prologue.content,
        });

        setUserId(userStatus.userId);
        setStatus("air", userStatus.air);
        setStatus("water", userStatus.water);
        setStatus("life", userStatus.biology);
        setStatus("support", userStatus.popularity);

        setNextEvent(nextEvent);
      } catch (error) {
        console.error("Failed to fetch game start data:", error);
      }
    };

    init();
  }, [setStatus]);

  const handleStartClick = async () => {
    setGameStartVisible(false);

    if (nextEvent === 1) {
      try {
        const { event, choices } = await getCommonEvent();

        pushWindow({
          type: "event",
          title: event.title,
          content: (
            <EventEmailWindow
              title={event.title}
              content={event.content}
              writer={event.writer}
              choices={choices}
              onChoiceSelect={handleChoiceSelect}
              onNext={() => handleNextEvent(`event:${event.eventId}`)}
            />
          ),
          key: `event:${event.eventId}`,
          color: colors.neon,
        });
      } catch (error) {
        console.error("Failed to fetch common event:", error);
      }
    }
  };

  const handleChoiceSelect = async (choiceId: number): Promise<string> => {
    try {
      const { userStatus, result, nextEvent } = await postChoice(choiceId);

      setStatus("air", userStatus.air);
      setStatus("water", userStatus.water);
      setStatus("life", userStatus.biology);
      setStatus("support", userStatus.popularity);

      setNextEvent(nextEvent);
      return result;
    } catch (error) {
      console.error("선택지 전송 실패:", error);
      return "문제가 발생했습니다.";
    }
  };

  const handleNextEvent = async (closeKey: string) => {
    if (nextEvent === 1) {
      try {
        requestCloseWindow(closeKey);

        const { event, choices } = await getCommonEvent();

        const { getList } = useEmailStore.getState();
        await getList();

        pushWindow({
          type: "event",
          title: event.title,
          content: (
            <EventEmailWindow
              title={event.title}
              content={event.content}
              writer={event.writer}
              choices={choices}
              onChoiceSelect={handleChoiceSelect}
              onNext={() => handleNextEvent(`event:${event.eventId}`)}
            />
          ),
          key: `event:${event.eventId}`,
          color: colors.neon,
        });
      } catch (error) {
        console.error("다음 common 이벤트 로딩 실패:", error);
      }
    }
  };

  return (
    <div css={playViewCss}>
      {isGameStartVisible && (
        <div css={overlayCss}>
          <GameStart
            onStartClick={handleStartClick}
            title={prologue.title}
            content={prologue.content}
          />
        </div>
      )}
      <TopBar />
      <div css={mainAreaCss}>
        <WindowManager />
      </div>
      <TooltipLayer visible={visible} x={x} y={y} content={content} />
    </div>
  );
};

export default PlayView;

const playViewCss = css({
  width: "100vw",
  height: "100vh",
  backgroundColor: colors.background,
  display: "flex",
  flexDirection: "column",
});

const mainAreaCss = css({
  flex: 1,
  display: "flex",
  flexDirection: "row",
  position: "relative",
  overflow: "hidden",
});

const overlayCss = css({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
});
