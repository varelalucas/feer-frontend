"use client";

import { Button } from "../ui/button";

export const Selector = ({ type }: { type: "ALUGUEL" | "COMPRA" }) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant={type === "ALUGUEL" ? "default" : "outline"}
        onClick={() => {
          type = "ALUGUEL";
        }}
      >
        ALUGUEL
      </Button>
      <Button
        onClick={() => {
          type = "COMPRA";
        }}
      >
        COMPRA
      </Button>
    </div>
  );
};
