"use client";

import { TestimonialType } from "@/functions/testimonials";
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

export const CarouselHome = ({
  testimonials,
}: {
  testimonials: TestimonialType[];
}) => {
  return (
    <>
      <Carousel>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselContent>
          <CarouselItem>
            <div className="flex items-center justify-center flex-col text-center aspect-square">
              <svg
                width="71"
                height="49"
                viewBox="0 0 71 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2316 48.88L2.05156 41.68C5.89156 37.72 8.53156 34.06 9.97156 30.7C11.5316 27.22 12.3116 23.62 12.3116 19.9L17.8916 24.94H0.251563V0.0999923H25.4516V16.48C25.4516 22.6 24.3716 28.24 22.2116 33.4C20.1716 38.44 16.5116 43.6 11.2316 48.88ZM55.88 48.88L46.7 41.68C50.54 37.72 53.18 34.06 54.62 30.7C56.18 27.22 56.96 23.62 56.96 19.9L62.54 24.94H44.9V0.0999923H70.1V16.48C70.1 22.6 69.02 28.24 66.86 33.4C64.82 38.44 61.16 43.6 55.88 48.88Z"
                  fill="#C83538"
                />
              </svg>
              <p className="max-w-[350px] w-full mt-10 text-sm lg:text-xl text-theme-600">
                {testimonials[0].testimonial}
              </p>
              <h3 className="text-lg font-bold text-theme-600 mt-6">
                {testimonials[0].nm_person}
              </h3>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div>
              <div className="flex items-center justify-center flex-col text-center p-10 bg-theme-400 aspect-square">
                <svg
                  width="78"
                  height="55"
                  viewBox="0 0 78 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5906 54.2L2.39063 46.2C6.65729 41.8 9.59063 37.7333 11.1906 34C12.924 30.1333 13.7906 26.1333 13.7906 22L19.9906 27.6H0.390626V-8.58307e-06H28.3906V18.2C28.3906 25 27.1906 31.2667 24.7906 37C22.524 42.6 18.4573 48.3333 12.5906 54.2ZM62.2 54.2L52 46.2C56.2667 41.8 59.2 37.7333 60.8 34C62.5333 30.1333 63.4 26.1333 63.4 22L69.6 27.6H50V-8.58307e-06H78V18.2C78 25 76.8 31.2667 74.4 37C72.1333 42.6 68.0667 48.3333 62.2 54.2Z"
                    fill="white"
                  />
                </svg>

                <p className="max-w-[350px] w-full mt-10 text-sm lg:text-xl text-white">
                  {testimonials[1].testimonial}
                </p>
                <h3 className="text-lg font-bold text-white mt-6">
                  {testimonials[1].nm_person}
                </h3>
              </div>
              <div className="bg-theme-500 w-[91.5px] h-[63px] ml-[48px] clipy" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex items-center justify-center flex-col text-center aspect-square">
              <svg
                width="71"
                height="49"
                viewBox="0 0 71 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2316 48.88L2.05156 41.68C5.89156 37.72 8.53156 34.06 9.97156 30.7C11.5316 27.22 12.3116 23.62 12.3116 19.9L17.8916 24.94H0.251563V0.0999923H25.4516V16.48C25.4516 22.6 24.3716 28.24 22.2116 33.4C20.1716 38.44 16.5116 43.6 11.2316 48.88ZM55.88 48.88L46.7 41.68C50.54 37.72 53.18 34.06 54.62 30.7C56.18 27.22 56.96 23.62 56.96 19.9L62.54 24.94H44.9V0.0999923H70.1V16.48C70.1 22.6 69.02 28.24 66.86 33.4C64.82 38.44 61.16 43.6 55.88 48.88Z"
                  fill="#C83538"
                />
              </svg>
              <p className="max-w-[350px] w-full mt-10 text-xl text-theme-600">
                {testimonials[2].testimonial}
              </p>
              <h3 className="text-sm lg:text-xl font-bold text-theme-600 mt-6">
                {testimonials[2].nm_person}
              </h3>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  );
};
