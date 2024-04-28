"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { type Project } from "@/functions/projects";
import { PortfolioImageItem } from "./PortfolioImageItem";

export const PortfolioItemsImages = ({ images }: { images: string[] }) => {
  return (
    <>
      <Carousel>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselContent>
          {images.map((photo: string) => {
            return (
              <CarouselItem className="basis-11/12 lg:basis-5/12" key={photo}>
                <PortfolioImageItem photo={photo} />
              </CarouselItem>
            );
          })}
          {images.map((photo: string) => {
            return (
              <CarouselItem className="basis-11/12 lg:basis-5/12" key={photo}>
                <PortfolioImageItem photo={photo} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </>
  );
};
