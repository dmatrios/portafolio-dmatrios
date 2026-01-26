"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { gsap } from "gsap";
import "./CardSwap.css";

export type CardSwapEasing = "elastic" | "smooth";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  customClass?: string;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { customClass, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      {...rest}
      className={["card", customClass ?? "", className ?? ""].join(" ").trim()}
    />
  );
});

type CardElement = React.ReactElement<CardProps & { ref?: React.Ref<HTMLDivElement> }>;

export type CardSwapProps = {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  onOrderChange?: (order: number[]) => void;
  skewAmount?: number;
  easing?: CardSwapEasing;
  children: CardElement | CardElement[];
};

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (
  el: HTMLDivElement,
  slot: ReturnType<typeof makeSlot>,
  skew: number
) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

export default function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  onOrderChange,
  skewAmount = 6,
  easing = "elastic",
  children,
}: CardSwapProps) {
  const config =
    easing === "elastic"
      ? {
        ease: "elastic.out(0.6,0.9)",
        durDrop: 2,
        durMove: 2,
        durReturn: 2,
        promoteOverlap: 0.9,
        returnDelay: 0.05,
      }
      : {
        ease: "power1.inOut",
        durDrop: 0.85,
        durMove: 0.85,
        durReturn: 0.85,
        promoteOverlap: 0.45,
        returnDelay: 0.18,
      };

  // ✅ Tipado: aquí childArr YA es CardElement[]
  const childArr = useMemo(() => {
    const arr = Children.toArray(children).filter(Boolean) as unknown as CardElement[];
    return arr;
  }, [children]);

  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const orderRef = useRef<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i)
  );

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const total = refs.length;
    if (!total) return;

    refs.forEach((r, i) => {
      const el = r.current;
      if (!el) return;
      placeNow(el, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
    });

    onOrderChange?.([...orderRef.current]);

    const swap = () => {
      if (orderRef.current.length < 2) return;

      const [front, ...rest] = orderRef.current;
      const elFront = refs[front]?.current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((idx, i) => {
        const el = refs[idx]?.current;
        if (!el) return;

        const slot = makeSlot(i, cardDistance, verticalDistance, total);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);

      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      }, undefined, "return");

      tl.to(
        elFront,
        { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: config.durReturn, ease: config.ease },
        "return"
      );

      tl.call(() => {
        orderRef.current = [...rest, front];
        onOrderChange?.([...orderRef.current]);
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    const node = containerRef.current;

    const pause = () => {
      tlRef.current?.pause();
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };

    const resume = () => {
      tlRef.current?.play();
      if (!intervalRef.current) intervalRef.current = window.setInterval(swap, delay);
    };

    if (pauseOnHover && node) {
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
    }

    return () => {
      if (pauseOnHover && node) {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
      }
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) => {
    if (!isValidElement(child)) return child;

    // ✅ NO tocamos key (mantiene el key del padre: p.slug)
    return cloneElement(child, {
      ref: refs[i],
      style: { width, height, ...(child.props.style ?? {}) },
      onClick: (e: React.MouseEvent<HTMLDivElement>) => {
        child.props.onClick?.(e);
        onCardClick?.(i);
      },
    });
  });

  return (
    <div ref={containerRef} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
}
