"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { Loader2, Plus } from "lucide-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { createTestimonial } from "@/functions/testimonials";
import { Textarea } from "@/components/ui/textarea";

export const ModalNewTestimonial = ({ token }: { token: string }) => {
  const [nmPerson, setNmPerson] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateTestimonial = async () => {
    setLoading(true);

    const request = await createTestimonial(nmPerson, testimonial, token);

    if (request.status === 200) {
      toast.success("Sucesso!", {
        description: request.message,
      });

      document.getElementById("closeModalNewTestimonial")?.click();
    } else {
      toast.error("Erro!", {
        description: request.message,
      });

      document.getElementById("closeModalNewTestimonial")?.click();
    }
  };

  return (
    <Dialog
      onOpenChange={(e) => {
        if (!e) {
          setTestimonial("");
          setNmPerson("");
          setLoading(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="slate" className="flex items-center gap-2">
          <Plus /> Adicionar novo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[650px] w-full">
        <DialogHeader>
          <DialogTitle>Criar nova avaliação</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome do cliente
            </Label>
            <Input
              id="fullname"
              placeholder="Pedro Duarte"
              className="col-span-3"
              onChange={(e) => setNmPerson(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Avaliação
            </Label>
            <Textarea
              id="username"
              placeholder="*"
              className="col-span-3"
              onChange={(e) => setTestimonial(e.target.value)}
              rows={8}
              maxLength={420}
            />
            <div></div>
            <div className="col-span-3">
              <p>
                <b>{testimonial.length}</b> / 420
              </p>
            </div>
          </div>
        </div>
        <DialogFooter className="grid grid-cols-4 gap-2">
          <div className="col-span-2"></div>
          <DialogClose>
            <Button
              id="closeModalNewTestimonial"
              variant="ghost"
              className="w-full"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="slate"
            className="w-full cursor-pointer"
            onClick={handleCreateTestimonial}
            disabled={
              !(nmPerson.length !== 0 && testimonial.length !== 0) || loading
            }
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Criando
              </div>
            ) : (
              "Salvar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
