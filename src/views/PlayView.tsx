import { useEffect, useState } from "react";
import { css } from "@emotion/react";

import { colors } from "../styles/theme";
import { useTooltipStore } from "../stores/useTooltipStore";
import { useStatusStore } from "../stores/useStatusStore";
import { useWindowStore } from "../stores/useWindowStore";
import { useEmailStore } from "../stores/useEmailStore";
import { useEventStore } from "../stores/useEventStore";
import { useTurnStore } from "../stores/useTurnStore";
import {
  getStartData,
  getCommonEvent,
  getSpecialEvent,
  postChoice,
  getEndingData,
} from "../api/gameApi";
import { getTooltips } from "../api/dataApi";

import GameStart from "../components/Event/GameStart";
import GameEnding from "../components/Event/GameEnding";
import TopBar from "../components/Bar/TopBar";
import WindowManager from "../components/Window/WindowManager";
import TooltipLayer from "../components/Guide/TooltipLayer";
import EventEmailWindow from "../components/Event/EventEmailWindow";
import EventNewsWindow from "../components/Event/EventNewsWindow";

const PlayView = () => {
  const [isGameStartVisible, setGameStartVisible] = useState(true);
  const [prologue, setPrologue] = useState({ title: "", content: "" });
  const [ending, setEnding] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const setUserId = useStatusStore((state) => state.setUserId);
  const setStatus = useStatusStore((state) => state.setStatus);
  const nextEvent = useEventStore((state) => state.nextEvent);
  const setNextEvent = useEventStore((state) => state.setNextEvent);
  const turn = useTurnStore((state) => state.turn);
  const decreaseTurn = useTurnStore((state) => state.decreaseTurn);

  const { visible, x, y, content } = useTooltipStore();
  const pushWindow = useWindowStore((state) => state.pushWindow);
  const requestCloseWindow = useWindowStore((s) => s.requestCloseWindow);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getStartData();
        const { prologue, userStatus, nextEvent } = data;

        const tooltips = await getTooltips();
        useTooltipStore.getState().setTooltipData(tooltips);

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
        console.log("nextEvent:", nextEvent);
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
              onNext={() =>
                handleNextEvent(
                  `event:${event.eventId}`,
                  useEventStore.getState().nextEvent
                )
              }
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

      console.log("userStatus:", userStatus);

      setStatus("air", userStatus.air);
      setStatus("water", userStatus.water);
      setStatus("life", userStatus.biology);
      setStatus("support", userStatus.popularity);

      setNextEvent(nextEvent);
      console.log("nextEvent:", nextEvent);

      return result;
    } catch (error) {
      console.error("선택지 전송 실패:", error);
      return "문제가 발생했습니다.";
    }
  };

  const handleNextEvent = async (
    closeKey: string,
    eventType: number | null
  ) => {
    decreaseTurn();

    if (eventType === 3 || turn <= 0) {
      try {
        requestCloseWindow(closeKey);
        const { title, content } = await getEndingData();

        console.log("EndingTitle:", title);
        console.log("EndingContent:", content);

        setEnding({ title, content });
      } catch (error) {
        console.error("엔딩 데이터 로딩 실패:", error);
      }
      return;
    } else if (eventType === 1) {
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
              onNext={() =>
                handleNextEvent(
                  `event:${event.eventId}`,
                  useEventStore.getState().nextEvent
                )
              }
            />
          ),
          key: `event:${event.eventId}`,
          color: colors.neon,
        });
      } catch (error) {
        console.error("다음 common 이벤트 로딩 실패:", error);
      }
    } else if (eventType === 2) {
      try {
        requestCloseWindow(closeKey);

        const response = await getSpecialEvent();
        const { id, title, content, imgUrl, userStatus, nextEvent } = response;

        setStatus("air", userStatus.air);
        setStatus("water", userStatus.water);
        setStatus("life", userStatus.biology);
        setStatus("support", userStatus.popularity);
        setNextEvent(nextEvent);

        pushWindow({
          type: "event",
          title: "NEWS",
          content: (
            <EventNewsWindow
              title={title}
              content={content}
              imgUrl={imgUrl}
              onNext={() =>
                handleNextEvent(
                  `event-news:${id}`,
                  useEventStore.getState().nextEvent
                )
              }
            />
          ),
          key: `event-news:${id}`,
          color: colors.red,
        });
      } catch (error) {
        console.error("다음 special 이벤트 로딩 실패:", error);
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

      {ending && (
        <div css={overlayCss}>
          <GameEnding
            title={ending.title}
            content={ending.content}
            onRestartClick={() => window.location.reload()}
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
  zIndex: 9999,
});
