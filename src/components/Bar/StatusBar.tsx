import { css } from "@emotion/react";
import { useStatusStore } from "../../stores/useStatusStore";

const StatusBar = () => {
  const { air, water, life, support } = useStatusStore();

  return (
    <div css={statusBarCss}>
      <Gauge icon="AIR" value={air} />
      <Gauge icon="WATER" value={water} />
      <Gauge icon="LIFT" value={life} />
      <Gauge icon="SUPPORT" value={support} />
    </div>
  );
};

export default StatusBar;

interface GaugeProps {
  icon: string;
  value: number;
}

const Gauge = ({ icon, value }: GaugeProps) => {
  return (
    <div css={gaugeCss}>
      {icon}
      <div css={gaugeBarCss}>
        <div css={fillCss(value)} />
      </div>
    </div>
  );
};

const statusBarCss = css({
  display: "flex",
  gap: "16px",
  alignItems: "center",
  fontSize: "14px",
});

const gaugeCss = css({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

const gaugeBarCss = css({
  width: "80px",
  height: "10px",
  backgroundColor: "#444",
  overflow: "hidden",
});

const fillCss = (value: number) =>
  css({
    width: `${value}%`,
    height: "100%",
    backgroundColor: "#157e75",
    transition: "width 0.3s ease",
  });
