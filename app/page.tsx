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
    <div className="relative bg-gradient-to-t from-blue-400 via-white to-white gap-4 text-black min-h-screen w-screen flex flex-col justify-center laptop:gap-14">
      <a
        href="https://unfccc.int/sites/default/files/english_paris_agreement.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-0 right-0 w-6 h-6 mt-2 mr-2 laptop:h-10 laptop:w-10 laptop:mt-10 laptop:mr-10"
      >
        <Image src={Info} width={50} height={50} alt="info" />
      </a>
      {/* <h1 className="px-6 tablet:pt-10 text-[25px] font-sans tablet:flex tablet:justify-center font-semibold w-full h-fit">
        <div className="flex flex-col tablet:hidden">
          how much ⌛ do
          <br />
          we have left?
        </div>
        <div className="hidden tablet:flex">how much do we have left?</div>
      </h1> */}
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
