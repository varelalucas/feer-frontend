"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { deleteProject, type Project } from "@/functions/projects";

export const ModalDeleteProject = ({
  project,
  token,
}: {
  project: Project;
  token: string;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteProject = async () => {
    setLoading(true);

    const request = await deleteProject(project.id, token);

    if (request.status === 200) {
      toast.success("Sucesso!", {
        description: request.message,
      });
      document.getElementById("closeModalDeleteProject")?.click();
    } else {
      toast.error("Erro!", {
        description: request.message,
      });
      document.getElementById("closeModalDeleteProject")?.click();
    }
  };

  return (
    <Dialog
      onOpenChange={(e) => {
        if (!e) {
          setLoading(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="icon" variant="destructive" className="text-xl">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Deseja excluir o projeto <b># {project.id}</b>?
          </DialogTitle>
          <DialogDescription>Essa ação é irreversível!</DialogDescription>
        </DialogHeader>

        <DialogFooter className="grid grid-cols-4 gap-2">
          <div className="col-span-2"></div>
          <DialogClose>
            <Button
              id="closeModalDeleteProject"
              variant="ghost"
              className="w-full"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="w-full cursor-pointer"
            onClick={handleDeleteProject}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Excluindo
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
