"use client";
import React from "react";
import clsx from "clsx";
import { motion, MotionConfig } from "framer-motion";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const id = React.useId();
  const [isActive, setIsActive] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  React.useEffect(() => {
    const tick = () => {
      setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
    };
    if (isActive) {
      const timerId = window.setInterval(tick, 1000);
      return () => window.clearInterval(timerId);
    }
  }, [isActive]);

  return (
    <MotionConfig reducedMotion="user">
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            return (
              <li className={styles.color} key={index}>
                {isSelected && (
                  <motion.div
                    layout={true}
                    layoutId={`${id}-outline`}
                    className={styles.selectedColorOutline}
                    style={{ zIndex: 10 }}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            <button onClick={() => setIsActive(!isActive)}>
              {isActive ? <Pause /> : <Play />}
              <VisuallyHidden>{isActive ? "Pause" : "Play"}</VisuallyHidden>
            </button>
            <button
              onClick={() => {
                setIsActive(false);
                setTimeElapsed(0);
              }}
            >
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </MotionConfig>
  );
}

export default CircularColorsDemo;
