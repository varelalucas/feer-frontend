"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Gallery from "react-photo-gallery";
export const ModalGallery = ({ images }: { images: string[] }) => {
  const dynamicEl = images.map((image) => {
    return {
      src: image,
      width: 16,
      height: 9,
    };
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="z-50 absolute bottom-8 right-[50px]">
          Ver fotos
        </Button>
      </DialogTrigger>
      <DialogContent
        className="lg:min-w-[1400px] overflow-y-scroll max-h-[90vh]"
        aria-setsize={800}
      >
        <DialogHeader>
          <DialogTitle>Galeria de imagens</DialogTitle>
        </DialogHeader>
        <Gallery photos={dynamicEl} />
      </DialogContent>
    </Dialog>
  );
};
