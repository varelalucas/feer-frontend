"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const ImagesMarquee = ({ photo }: { photo: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          className="cursor-pointer w-full"
          style={{ aspectRatio: 4 / 3 }}
          src={photo}
        />
      </DialogTrigger>
      <DialogContent className="lg:min-w-[1400px]" aria-setsize={800}>
        <DialogHeader>
          <DialogTitle>Visualização da imagem</DialogTitle>
        </DialogHeader>
        <img
          className="marquee-item w-[90vw]"
          style={{ aspectRatio: 4 / 3 }}
          src={photo}
        />
      </DialogContent>
    </Dialog>
  );
};
