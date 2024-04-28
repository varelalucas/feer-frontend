"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { type Project } from "@/functions/projects";
import { ImagesMarquee } from "./Marquee";

export const CarouselClient = ({
  project,
  selectedShow,
}: {
  project: Project;
  selectedShow: string;
}) => {
  return (
    <>
      <Carousel>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselContent>
          {(() => {
            if (selectedShow === "photos") {
              return (
                <>
                  {project.arr_photos.map((photo: string) => {
                    return (
                      <CarouselItem
                        className="basis-11/12 lg:basis-5/12"
                        key={photo}
                      >
                        <ImagesMarquee photo={photo} />
                      </CarouselItem>
                    );
                  })}
                  {project.arr_photos.map((photo: string) => {
                    return (
                      <CarouselItem
                        className="basis-11/12 lg:basis-5/12"
                        key={photo}
                      >
                        <ImagesMarquee photo={photo} />
                      </CarouselItem>
                    );
                  })}
                </>
              );
            }

            if (selectedShow === "drawings") {
              return (
                <>
                  {project.arr_drawings.map((photo: string) => {
                    return (
                      <CarouselItem
                        className="basis-11/12 lg:basis-5/12"
                        key={photo}
                      >
                        <ImagesMarquee photo={photo} />
                      </CarouselItem>
                    );
                  })}
                  {project.arr_drawings.map((photo: string) => {
                    return (
                      <CarouselItem
                        className="basis-11/12 lg:basis-5/12"
                        key={photo}
                      >
                        <ImagesMarquee photo={photo} />
                      </CarouselItem>
                    );
                  })}
                </>
              );
            }
          })()}
        </CarouselContent>
      </Carousel>
    </>
  );
};
