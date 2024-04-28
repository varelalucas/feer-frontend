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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  PortfolioType,
  createPortfolio,
  updatePortfolio,
} from "@/functions/portfolio";

export const ModalNewPortfolio = ({
  portfolio,
  token,
  type,
}: {
  portfolio: any;
  token: string;
  type: "edit" | "create";
}) => {
  const [loading, setLoading] = useState(false);
  const [portfolioEdit, setPortfolioEdit] = useState<PortfolioType>({
    ...portfolio,
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoInput, setPhotoInput] = useState("");
  const [times, setTimes] = useState(1);
  const [status, setStatus] = useState(false);

  const router = useRouter();

  const formSchema = z.object({
    nm_portfolio: z
      .string({ required_error: "Esse campo é obrigatório" })
      .min(1, "Esse campo precisa ter mais de um caractere"),
    ds_portfolio: z
      .string({ required_error: "Esse campo é obrigatório" })
      .min(1, "Esse campo precisa ter mais de um caractere")
      .max(420, "Esse campo pode ter no máximo 420 caracteres"),
    type_portfolio: z
      .string({ required_error: "Esse campo é obrigatório" })
      .min(1, "Esse campo precisa ter mais de um caractere"),
    val_duration: z
      .string({ required_error: "Esse campo é obrigatório" })
      .min(1, "Esse campo precisa ter mais de um caractere"),
    nm_client: z
      .string({ required_error: "Esse campo é obrigatório" })
      .min(1, "Esse campo precisa ter mais de um caractere"),
  });

  const handleSavePortfolio = async (data: any) => {
    setLoading(true);

    if (times === 1) {
      setTimes(times + 1);

      const portfolioEdit = {
        ...data,
        arr_photos: photos,
      };

      if (!!portfolio.id) {
        const toastId = toast.loading("Atualizando portfolio...");

        const request = await updatePortfolio(
          portfolio.id,
          portfolioEdit,
          token
        );

        if (request.status === 200) {
          toast.success("Sucesso!", {
            description: request.message,
            id: toastId,
          });
          document.getElementById("closeModalNewPortfolio")?.click();
          router.refresh();
        }

        if (request.status === 400) {
          toast.info("Erro!", {
            description: request.message,
            id: toastId,
          });
        }

        if (request.status === 500) {
          toast.error("Erro!", {
            description: request.message,
            id: toastId,
          });
        }
      } else {
        const toastId = toast.loading("Criando portfolio...");

        const request = await createPortfolio(portfolioEdit, token);

        if (request.status === 200) {
          toast.success("Sucesso!", {
            description: request.message,
            id: toastId,
          });
          document.getElementById("closeModalNewPortfolio")?.click();
          router.refresh();
        }

        if (request.status === 400) {
          toast.info("Erro!", {
            description: request.message,
            id: toastId,
          });
        }

        if (request.status === 500) {
          toast.error("Erro!", {
            description: request.message,
            id: toastId,
          });
        }
      }
    }
  };

  const handleDeleteImage = (image: string) => {
    let photosArray = [...photos];

    const index = photosArray.findIndex((photo) => photo === image);

    console.log(index);

    if (index !== -1) {
      photosArray.splice(index, 1);
      setPhotos(photosArray);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (status) {
      if (!portfolio.id) {
        setPortfolioEdit({
          ...portfolio,
        });
      } else {
        setPortfolioEdit({ ...portfolio });

        setPhotos(portfolio.arr_photos);
      }
    }
  }, [portfolio, status]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      nm_client: portfolioEdit.nm_client || "",
      nm_portfolio: portfolioEdit.nm_portfolio || "",
      ds_portfolio: portfolioEdit.ds_portfolio || "",
      type_portfolio: portfolioEdit.type_portfolio || "",
      val_duration: portfolioEdit.val_duration || "",
    },
  });

  return (
    <Form {...form}>
      <Dialog
        onOpenChange={(e) => {
          if (e) {
            setStatus(true);
          } else {
            setStatus(false);
            form.reset();
            setLoading(false);
            setTimes(1);
            setPhotos([]);
          }
        }}
      >
        <DialogTrigger asChild>
          {type === "create" ? (
            <Button variant="slate" className="flex items-center gap-2">
              <Plus /> Adicionar novo
            </Button>
          ) : (
            <Button size="icon" variant="warning" className="text-xl">
              <Pencil />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent
          className="lg:min-w-[1400px] overflow-y-scroll max-h-screen"
          aria-setsize={800}
        >
          <DialogHeader>
            <DialogTitle>
              {!!portfolio.id ? (
                <>
                  Editando o portfólio <b># {portfolio.id}</b>
                </>
              ) : (
                "Criando novo portfólio"
              )}
            </DialogTitle>
          </DialogHeader>
          <div>
            <h1 className="font-bold text-center w-full text-2xl">Imagens</h1>
            <div className="flex items-center gap-5 mt-5">
              <div className="w-full">
                <h1 className="font-semibold">Fotos do Portfólio</h1>
                <div className="flex items-center gap-2 w-full mt-2">
                  <Input
                    placeholder="Link da imagem"
                    className="w-full"
                    value={photoInput}
                    onChange={(e) => setPhotoInput(e.target.value)}
                  />
                  <Button
                    className="w-10 aspect-square"
                    size="icon"
                    variant="secondary"
                    onClick={() => {
                      if (photoInput.length === 0) {
                        toast.info("Falha ao adicionar imagem", {
                          description:
                            "O campo link da imagem não pode ser vazio",
                        });

                        return;
                      }

                      if (!photoInput.startsWith("https://")) {
                        toast.info("Falha ao adicionar imagem", {
                          description: "O link deve ser válido",
                        });

                        return;
                      }

                      const newPhotos = [photoInput, ...photos];
                      setPhotos(newPhotos);
                      setPhotoInput("");
                    }}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8 w-full">
                {photos.map((photo, index) => {
                  return (
                    <div key={index} className="relative">
                      <Button
                        className="rounded-full absolute -top-5 -right-5"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          handleDeleteImage(photo);
                        }}
                      >
                        <Trash2 size={20} />
                      </Button>
                      <img
                        src={photo}
                        className="w-full aspect-video rounded"
                        alt={photo}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <form onSubmit={form.handleSubmit(handleSavePortfolio)}>
            <h1 className="font-bold text-center w-full text-2xl">
              Informações do projeto
            </h1>
            <div className="grid grid-cols-2 gap-5 mt-5">
              <div>
                <FormField
                  control={form.control}
                  name="nm_portfolio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do projeto</FormLabel>
                      <FormMessage />
                      <FormControl>
                        <Input placeholder="Nome do portfólio" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="type_portfolio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo do projeto</FormLabel>
                      <FormMessage />
                      <FormControl>
                        <Input placeholder="Tipo do portfólio" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="nm_client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do cliente</FormLabel>
                      <FormMessage />
                      <FormControl>
                        <Input placeholder="Nome do cliente" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="val_duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempo de duração</FormLabel>
                      <FormMessage />
                      <FormControl>
                        <Input placeholder="Tempo de duração" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="ds_portfolio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição do portfólio</FormLabel>
                      <FormMessage />
                      <FormControl>
                        <Textarea
                          placeholder="Descrição do portfólio"
                          {...field}
                          rows={6}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value.length} / 420
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="grid grid-cols-6 gap-2">
              <div className="col-span-4"></div>
              <DialogClose>
                <Button
                  id="closeModalNewPortfolio"
                  variant="ghost"
                  className="w-full"
                  type="button"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                variant="slate"
                className="w-full cursor-pointer"
                type="submit"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />{" "}
                    {!!portfolioEdit.id ? "Salvando" : "Criando"}
                  </div>
                ) : !!portfolioEdit.id ? (
                  "Salvar"
                ) : (
                  "Criar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};
