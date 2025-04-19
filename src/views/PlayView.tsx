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
import { getSummary } from "../api/gptApi";

import GameStart from "../components/Event/GameStart";
import GameEnding from "../components/Event/GameEnding";
import TopBar from "../components/Bar/TopBar";
import WindowManager from "../components/Window/WindowManager";
import TooltipLayer from "../components/Guide/TooltipLayer";
import EventEmailWindow from "../components/Event/EventEmailWindow";
import EventNewsWindow from "../components/Event/EventNewsWindow";
import GameSummary from "../components/Event/GameSummary";
import EndingAlert from "../components/Event/EndingAlert";
import { useNewsStore } from "../stores/useNewsStore";

const PlayView = () => {
  const [isGameStartVisible, setGameStartVisible] = useState(true);
  const [prologue, setPrologue] = useState({ title: "", content: "" });
  const [isEndingAlertVisible, setEndingAlertVisible] = useState(false);
  const [ending, setEnding] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummaryVisible, setSummaryVisible] = useState(false);

  const setUserId = useStatusStore((state) => state.setUserId);
  const setStatus = useStatusStore((state) => state.setStatus);
  const setNextEvent = useEventStore((state) => state.setNextEvent);

  const { visible, x, y, content } = useTooltipStore();
  const pushWindow = useWindowStore((state) => state.pushWindow);
  const requestCloseWindow = useWindowStore((s) => s.requestCloseWindow);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getStartData();
        const { userStatus } = data;

        setUserId(userStatus.userId);
        setStatus("air", userStatus.air);
        setStatus("water", userStatus.water);
        setStatus("life", userStatus.biology);
        setStatus("support", userStatus.popularity);

        const prologueEvent = await getSpecialEvent();
        setPrologue({
          title: prologueEvent.title,
          content: prologueEvent.content,
        });

        setNextEvent(prologueEvent.nextEvent);

        const tooltips = await getTooltips();
        useTooltipStore.getState().setTooltipData(tooltips);
      } catch (error) {
        console.error("Failed to fetch game start data:", error);
      }
    };

    init();
  }, [setStatus]);

  useEffect(() => {
    if (isEndingAlertVisible) {
      pushWindow({
        type: "alert",
        title: "ALERT",
        key: "ending-alert",
        color: colors.red,
        content: (
          <EndingAlert
            onConfirm={() => {
              useWindowStore.getState().requestCloseWindow("ending-alert");
              setEndingAlertVisible(false);
              showEnding();
            }}
          />
        ),
        closable: false,
        width: 300,
      });
    }
  }, [isEndingAlertVisible]);

  const handleStartClick = async () => {
    setGameStartVisible(false);

    try {
      const { getList: getNewsList } = useNewsStore.getState();
      await getNewsList();

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
  };

  const handleChoiceSelect = async (choiceId: number): Promise<string> => {
    try {
      const { userStatus, result, nextEvent } = await postChoice(choiceId);

      setStatus("air", userStatus.air);
      setStatus("water", userStatus.water);
      setStatus("life", userStatus.biology);
      setStatus("support", userStatus.popularity);

      setNextEvent(nextEvent);

      const { getList: getEmailList } = useEmailStore.getState();
      await getEmailList();

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
    const currentTurn = useTurnStore.getState().turn;

    if (eventType === 3 || currentTurn <= 0) {
      requestCloseWindow(closeKey);
      setEndingAlertVisible(true);
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

        const { getList: getNewsList } = useNewsStore.getState();
        await getNewsList();

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

  const showEnding = async () => {
    try {
      const { title, content } = await getEndingData();
      setEnding({ title, content });

      getSummary()
        .then((res) => setSummary(res.content))
        .catch((e) => console.error("요약 생성 실패:", e));
    } catch (error) {
      console.error("엔딩 데이터 로딩 실패:", error);
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

      {ending?.content && !isSummaryVisible && (
        <div css={overlayCss}>
          <GameEnding
            title={ending.title}
            content={ending.content}
            onClick={() => setSummaryVisible(true)}
          />
        </div>
      )}

      {ending && isSummaryVisible && (
        <div css={overlayCss}>
          {summary ? (
            <GameSummary content={summary} />
          ) : (
            <div css={loadingCss}>요약을 생성하는 중입니다...</div>
          )}
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

const loadingCss = css({
  color: "white",
  fontSize: "20px",
  textAlign: "center",
  padding: "50px",
});
