"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="p-2">
        <p className="font-bold text-xl">
          Shadcn/ui carousel autoplay example (with plugin)
        </p>
      </div>

      <div className="bg-zinc-400 w-[38rem]">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full "
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            <CarouselItem>
              <img
                src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
                alt=""
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://img.freepik.com/free-photo/snowy-mountain-peak-starry-galaxy-majesty-generative-ai_188544-9650.jpg"
                alt=""
              />
            </CarouselItem>
            <CarouselItem>
              <img src="https://i.redd.it/6uoazfklyo7b1.jpg" alt="" />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
      <div className="flex flex-col justify-center items-center gap-2 mt-10">
        <Link
          className="mx-2 w-full"
          href={"https://github.com/GweepCreative/CarouselAutoPlay"}
        >
          <Button className="w-full">Source Code on Github</Button>
        </Link>

        <Link
          className="mx-2 w-full"
          href={"https://grkn.dev"}
        >
          <Button className="w-full">By GrknDev</Button>
        </Link>
      </div>
    </main>
  );
}
