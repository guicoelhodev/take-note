'use client';
import { useEffect, useState } from "react";

export const Time = () => {
  const [currentTime, setCurrentTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <aside className="countdown font-mono text-2xl text-color font-semibold">
      <span style={{ "--value": currentTime.hours }}></span>h
      <span style={{ "--value": currentTime.minutes }}></span>m
    </aside>
  );
};
