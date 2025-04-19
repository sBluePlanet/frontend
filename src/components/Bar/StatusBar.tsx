import { useEffect, useRef, useState, ReactNode } from "react";
import { css } from "@emotion/react";

import { colors } from "../../styles/theme";
import { useStatusStore } from "../../stores/useStatusStore";

import { FaCloud } from "react-icons/fa";
import { GiWaterDrop } from "react-icons/gi";
import { FaHeartbeat } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

const StatusBar = () => {
  const { air, water, life, support } = useStatusStore();

  return (
    <div css={statusBarCss}>
      <Gauge icon={<FaCloud />} value={air} />
      <Gauge icon={<GiWaterDrop />} value={water} />
      <Gauge icon={<FaHeartbeat />} value={life} />
      <Gauge icon={<FaPerson />} value={support} />
    </div>
  );
};

export default StatusBar;

interface GaugeProps {
  icon: ReactNode;
  value: number;
}

const Gauge = ({ icon, value }: GaugeProps) => {
  const prevValueRef = useRef<number>(value);
  const [color, setColor] = useState(colors.neon);

  useEffect(() => {
    const prev = prevValueRef.current;
    if (value > prev) {
      setColor(colors.red);
    } else if (value < prev) {
      setColor(colors.green);
    }
    prevValueRef.current = value;

    const timer = setTimeout(() => {
      setColor(colors.neon);
    }, 700);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div css={gaugeCss}>
      <span css={iconCss}>{icon}</span>
      <div css={gaugeBarCss(color)}>
        <div css={fillCss(value)} />
      </div>
    </div>
  );
};

const statusBarCss = css({
  display: "flex",
  gap: "50px",
  alignItems: "center",
  fontSize: "14px",
});

const gaugeCss = css({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

const iconCss = css({
  fontSize: "20px",
  marginRight: "8px",
  color: colors.neon,
});

const gaugeBarCss = (color: string) =>
  css({
    width: "80px",
    height: "15px",
    backgroundColor: `${color}cc`,
    boxShadow: `0 0 6px ${color}`,
    overflow: "hidden",
    clipPath: "polygon(10px 0%, 100% 0%, 70px 100%, 0% 100%)",
    transition: "background-color 0.5s ease",
  });

const fillCss = (value: number) =>
  css({
    width: `${value}%`,
    height: "100%",
    backgroundColor: colors.wBackground,
    transition: "width 0.3s ease",
  });
