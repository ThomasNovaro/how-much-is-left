"use client";
import { FC, useEffect, useState } from "react";
import CountdownTimerProps from "./index.types";

const CountdownTimer: FC<CountdownTimerProps> = ({ deadline }) => {
  const [timeRemaining, setTimeRemaining] = useState<{
    years: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = new Date(deadline).getTime();
      const distance = target - now;

      if (distance < 0) {
        return {
          years: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365.25));
      const remainingAfterYears = distance % (1000 * 60 * 60 * 24 * 365.25);

      return {
        years,
        days: Math.floor(remainingAfterYears / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (remainingAfterYears % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (remainingAfterYears % (1000 * 60 * 60)) / (1000 * 60)
        ),
        seconds: Math.floor((remainingAfterYears % (1000 * 60)) / 1000),
      };
    };

    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div className="font-block text-[100px] uppercase leading-none flex flex-col laptop:flex-row laptop:gap-10 laptop:justify-center items-center">
      <div>{timeRemaining.years} years</div>
      <div>{timeRemaining.days} days</div>
      <div>{timeRemaining.hours} hours</div>
      <div>{timeRemaining.minutes} minutes</div>
      <div>{timeRemaining.seconds} seconds</div>
    </div>
  );
};

export default CountdownTimer;
