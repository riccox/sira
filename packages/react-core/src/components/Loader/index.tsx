import type { FC } from "react";
import { useMemo } from "react";

import {
  DotPulse,
  JellyTriangle,
  RaceBy,
  Ring,
  Waveform,
} from "@uiball/loaders";
import { Sira } from "../../types";
import { getThemeColor } from "../../util";

export interface ILoaderProps {
  size?: Sira.Size;
  type?: "ring" | "wave" | "jelly" | "bar" | "dot";
  color?: Sira.Color;
  speed?: Sira.Speed;
}

export const Loader: FC<ILoaderProps> = (props) => {
  const {
    color = "primary",
    size = "md",
    type = "ring",
    speed = "normal",
  } = props;

  const loaderSize = useMemo(() => {
    switch (size) {
      case "xs":
        return 20;
      case "sm":
        return 40;
      case "md":
        return 60;
      case "lg":
        return 80;
      case "xl":
        return 100;
    }
  }, [size]);

  const waveLineWeight = useMemo(() => {
    switch (size) {
      case "xs":
        return 3;
      case "sm":
        return 6;
      case "md":
        return 10;
      case "lg":
        return 12;
      case "xl":
        return 15;
    }
  }, [size]);

  const barLineWeight = useMemo(() => {
    switch (size) {
      case "xs":
        return 4;
      case "sm":
        return 6;
      case "md":
        return 10;
      case "lg":
        return 12;
      case "xl":
        return 14;
    }
  }, [size]);

  const loaderSpeed = useMemo(() => {
    switch (speed) {
      case "slowest":
        return 4.4;
      case "slow":
        return 3.2;
      case "normal":
        return 2.1;
      case "fast":
        return 1.3;
      case "fastest":
        return 0.6;
    }
  }, [speed]);

  const loaderColor = useMemo(() => {
    return getThemeColor(color, 500);
  }, [color]);

  const loaderProps = useMemo(
    () => ({
      size: loaderSize,
      color: loaderColor,
      speed: loaderSpeed,
    }),
    [loaderColor, loaderSize, loaderSpeed]
  );

  return useMemo(() => {
    switch (type) {
      case "ring":
        return <Ring lineWeight={7} {...loaderProps} />;
      case "wave":
        return <Waveform lineWeight={waveLineWeight} {...loaderProps} />;
      case "jelly":
        return <JellyTriangle {...loaderProps} />;
      case "bar":
        return <RaceBy lineWeight={barLineWeight} {...loaderProps} />;
      case "dot":
        return <DotPulse {...loaderProps} />;
    }
  }, [barLineWeight, loaderProps, type, waveLineWeight]);
};
