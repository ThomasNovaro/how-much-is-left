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
    <a
      href="https://unfccc.int/sites/default/files/english_paris_agreement.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="font-mono text-slate-700 text-[20px] laptop:text-[25px] w-full px-20 leading-none flex flex-col laptop:flex-row laptop:gap-10 laptop:justify-center">
        <div>
          <span className="font-block text-[125px] laptop:text-[250px] bg-gradient-to-tl from-red-500 via-red-600 to-black bg-clip-text text-transparent">
            {timeRemaining.years}
          </span>{" "}
          years
        </div>
        <div className="text-right">
          <span className="font-block text-[125px] laptop:text-[250px] bg-gradient-to-tl from-red-500 via-red-600 to-black bg-clip-text text-transparent">
            {timeRemaining.days}
          </span>{" "}
          days
        </div>
        <div>
          <span className="font-block text-[125px] laptop:text-[250px] bg-gradient-to-tl from-red-500 via-red-600 to-black bg-clip-text text-transparent">
            {timeRemaining.hours}
          </span>{" "}
          hours
        </div>
        <div className="text-right">
          <span className="font-block text-[125px] laptop:text-[250px] bg-gradient-to-tl from-red-500 via-red-600 to-black bg-clip-text text-transparent">
            {timeRemaining.minutes}
          </span>{" "}
          minutes
        </div>
        <div>
          <span className="font-block text-[125px] laptop:text-[250px] bg-gradient-to-tl from-red-500 via-red-600 to-black bg-clip-text text-transparent">
            {timeRemaining.seconds}
          </span>{" "}
          seconds
        </div>
      </div>
    </a>
  );
};

export default CountdownTimer;
