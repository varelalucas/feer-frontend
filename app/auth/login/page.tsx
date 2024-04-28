"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/functions/users";
import { createCookie } from "@/lib/cookies";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { toast } from "sonner";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSendForm = async () => {
    if (!username || username.length === 0) {
      toast.info("Preencha todos os campos", {
        description: "Forneça um usuário",
      });
      return;
    }

    if (!password || password.length === 0) {
      toast.error("Insira uma senha");
      return;
    }

    const toastId = toast.loading("Logando no usuário");

    const response = await login(username, password);

    if (response.status === 200) {
      toast.success("Sucesso no login!", {
        description: response.message,
        id: toastId,
      });

      if (!!response.data) {
        setTimeout(() => toast.dismiss(toastId), 500);

        setTimeout(() => router.push("/panel"), 1000);
      }
    } else {
      toast.error("Erro no login!", {
        description: response.message,
        id: toastId,
      });
    }
  };

  return (
    <main className="h-screen w-screen bg-slate-300 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg max-w-[650px] w-full">
        <div className="flex w-full justify-center flex-col items-center">
          <Image
            src="/images/brand/icon.png"
            width={95}
            height={69}
            alt="Logo"
          />
          <h1 className="mt-5 mb-10 text-3xl font-bold">Seja bem vindo!</h1>
        </div>
        <div className="relative">
          <label
            htmlFor="username"
            className="bg-white -mt-3 z-10 ml-2 px-2 absolute"
          >
            Nome de usuário
          </label>
          <input
            name="username"
            id="username"
            placeholder="Usuário"
            className="border pt-4 pb-3 px-3 rounded-lg border-theme-800 focus:border-theme-400 focus:outline-theme-400 w-full"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="relative mt-5">
          <label
            htmlFor="password"
            className="bg-white -mt-3 z-10 ml-2 px-2 absolute"
          >
            Senha
          </label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Senha"
            className="border pt-4 pb-3 px-3 rounded-lg border-theme-800 focus:border-theme-400 focus:outline-theme-400 w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex w-full justify-center flex-col items-center mt-5">
          <Button onClick={handleSendForm} color="primary">
            Entrar
          </Button>
        </div>
      </div>
    </main>
  );
}
