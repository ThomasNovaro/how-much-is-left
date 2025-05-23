import { Suspense } from "react";
import CountdownTimer from "@/components/CountdownTimer";

async function ClimateClock() {
  const response = await fetch("https://api.climateclock.world/v2/clock.json", {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch climate clock data");
  }
  const data = await response.json();
  return (
    <>
      <CountdownTimer
        deadline={data.data.modules.carbon_deadline_1.timestamp}
      />
    </>
  );
}

export default function Home() {
  return (
    <div className="relative bg-gradient-to-t from-red-500 via-blue-400 to-red-white gap-4 text-black min-h-screen w-screen flex flex-col justify-center laptop:gap-14">
      <Suspense fallback={<div className="text-black">Loading...</div>}>
        <ClimateClock />
      </Suspense>
      <div className="pb-1">
        <a
          href="https://thomasnovaro.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono absolute bottom-0 left-0 right-0 text-center font-semibold text-black text-sm mb-[5px] laptop:mb-3 hover:underline decoration-black"
        >
          made by thom
        </a>
      </div>
    </div>
  );
}
