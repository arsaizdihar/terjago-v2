import React, { useEffect, useReducer, useRef } from "react";

interface Props {
  start?: number;
  end: number;
  duration: number;
  suffix?: string;
  className?: string;
}

const CountUp: React.FC<Props> = ({
  start = 0,
  end,
  duration,
  suffix,
  className,
}) => {
  const [state, dispatch] = useReducer(
    (state) => Math.min(state + (end - start) / ((duration * 1000) / 50), end),
    start
  );

  const interval = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, startCount] = useReducer(() => true, false);

  const checkStart = () => {
    if (!ref.current || !window) return;
    const top = ref.current.getBoundingClientRect().top;
    if (top >= 0 && top <= window.innerHeight) startCount();
  };

  useEffect(() => {
    checkStart();
    window.addEventListener("scroll", checkStart);
    return () => window.removeEventListener("scroll", checkStart);
  }, []);

  useEffect(() => {
    if (!interval.current && started) {
      interval.current = setInterval(dispatch, 50);
    }
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [duration, end, start, started]);

  useEffect(() => {
    if (state === end && interval.current) clearInterval(interval.current);
  }, [end, state]);

  return (
    <span ref={ref} className={className}>
      {Math.floor(state)}
      {suffix}
    </span>
  );
};

export default CountUp;
