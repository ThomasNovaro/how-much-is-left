import { Suspense } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import Info from "@/public/info.svg";
import Image from "next/image";

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
    <div className="relative bg-[#e43030] text-black min-h-screen w-screen flex flex-col items-center justify-center laptop:gap-14">
      <a
        href="https://unfccc.int/sites/default/files/english_paris_agreement.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-0 right-0 w-6 h-6 mt-2 mr-2 laptop:h-10 laptop:w-10 laptop:mt-10 laptop:mr-10"
      >
        <Image src={Info} width={50} height={50} alt="info" />
      </a>
      <h1 className="gap-5 px-5 tablet:pt-10 text-[100px] text-center tablet:flex tablet:justify-center font-[1500] font-borders w-full h-fit leading-none">
        <div className="flex flex-col tablet:hidden">
          <div>how much do</div>
          <div>we have left?</div>
        </div>
        <div className="hidden tablet:flex">how much do we have left?</div>
      </h1>
      {/* I want the numbers to animate when opening the page or when scrolling to this position.
      Number are fetched through API from the countdown */}
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <ClimateClock />
      </Suspense>
      <div className="">
        <a
          href="https://thomasnovaro.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono absolute bottom-0 left-0 right-0 text-center font-semibold text-black text-xs mb-[5px] laptop:mb-3 hover:underline decoration-black"
        >
          made by thom
        </a>
      </div>
    </div>
  );
}
