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
import { Loader, Loader2, Plus } from "lucide-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { createUser } from "@/functions/users";
import { toast } from "sonner";

export const ModalNewUser = ({ token }: { token: string }) => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async () => {
    setLoading(true);

    const request = await createUser(username, password, fullname, token);

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
          setUsername("");
          setFullname("");
          setPassword("");
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
          <DialogTitle>Criar novo usuário</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome completo
            </Label>
            <Input
              id="fullname"
              placeholder="Pedro Duarte"
              className="col-span-3"
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Nome de usuário
            </Label>
            <Input
              id="username"
              placeholder="peduarte"
              className="col-span-3"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Senha
            </Label>
            <Input
              id="username"
              type="password"
              placeholder="**********************"
              className="col-span-3"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="grid grid-cols-4 gap-2">
          <div className="col-span-2"></div>
          <DialogClose>
            <Button id="closeModalNewUser" variant="ghost" className="w-full">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="slate"
            className="w-full cursor-pointer"
            onClick={handleCreateUser}
            disabled={
              !(
                username.length !== 0 &&
                fullname.length !== 0 &&
                password.length !== 0
              ) || loading
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
