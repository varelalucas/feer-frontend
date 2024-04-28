"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const PortfolioImageItem = ({ photo }: { photo: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          className="cursor-pointer aspect-video w-full max-h-[342px]"
          src={photo}
        />
      </DialogTrigger>
      <DialogContent className="lg:min-w-[1400px]" aria-setsize={800}>
        <DialogHeader>
          <DialogTitle>Visualicação da imagem</DialogTitle>
        </DialogHeader>
        <img className="aspect-video marquee-item w-[90vw]" src={photo} />
      </DialogContent>
    </Dialog>
  );
};
