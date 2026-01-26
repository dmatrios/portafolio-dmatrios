"use client";

import { useEffect, useState } from "react";
import LiquidEther from "@/components/LiquidEther";
import DarkVeil from "@/components/DarkVeil";

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isTouch;
}

export function HeroBackground() {
  const isTouch = useIsTouchDevice();

  // IMPORTANTE: el background nunca debe capturar el scroll/touch
  // pointer-events-none asegura que el usuario pueda scrollear siempre.
  if (isTouch) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={100}
        isViscous
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
    </div>
  );
}
