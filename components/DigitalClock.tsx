import React, { useEffect, useState } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const { DateTimeFormat } = Intl;

  const timeFormatter = new DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const dateFormatter = new DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const update = () => {
    const now = new Date();
    // Digital timer (HH:MM:SS)
    setTime(timeFormatter.format(now));

    // Date (e.g., Sunday, August 10, 2025)
    setDate(dateFormatter.format(now));
  };

  useEffect(() => {
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p className="text-3xl font-mono font-bold">{time}</p>
      <p className="text-xs opacity-80">{date}</p>
    </div>
  );
};

export default DigitalClock;
