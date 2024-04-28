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
import { type User, deleteUser } from "@/functions/users";
import { toast } from "sonner";

export const ModalDeleteUser = ({
  user,
  token,
}: {
  user: User;
  token: string;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async () => {
    setLoading(true);

    const request = await deleteUser(user.id, token);

    if (request.status === 200) {
      toast.success("Sucesso!", {
        description: request.message,
      });

      document.getElementById("closeModalNewUser")?.click();
    } else {
      toast.error("Erro!", {
        description: request.message,
      });

      document.getElementById("closeModalNewUser")?.click();
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
            Deseja excluir o usuário <b>{user.full_name}</b>?
          </DialogTitle>
          <DialogDescription>Essa ação é irreversível!</DialogDescription>
        </DialogHeader>

        <DialogFooter className="grid grid-cols-4 gap-2">
          <div className="col-span-2"></div>
          <DialogClose>
            <Button id="closeModalNewUser" variant="ghost" className="w-full">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="w-full cursor-pointer"
            onClick={handleDeleteUser}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Excluindo
              </div>
            ) : (
              "Excluir"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
