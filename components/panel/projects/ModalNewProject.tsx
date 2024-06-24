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
import {
  createProject,
  getAllProjects,
  updateProject,
  type Project,
} from "@/functions/projects";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import CurrencyInput from "./CurrencyInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { UploadImage } from "./UploadFile";

export const ModalNewProject = ({
  project,
  token,
  type,
}: {
  project: any;
  token: string;
  type: "edit" | "create";
}) => {
  const [loading, setLoading] = useState(false);
  const [projectEdit, setProjectEdit] = useState<Project>({
    ...project,
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [drawings, setDrawings] = useState<string[]>([]);
  const [photoInput, setPhotoInput] = useState("");
  const [drawingInput, setDrawingInput] = useState("");
  const [times, setTimes] = useState(1);
  const [status, setStatus] = useState(false);

  const [isPhotoLoading, setIsPhotoLoading] = useState(false);

  const router = useRouter();

  const formSchema = z.object({
    val_project: z.coerce.number().min(0.1, "Esse campo é obrigatório"),
    val_condominium: z.coerce.number().min(0.1, "Esse campo é obrigatório"),
    val_iptu: z.coerce.number().min(0.1, "Esse campo é obrigatório"),
    type_project: z.enum(["ALUGUEL", "COMPRA"], {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case "invalid_type":
            return {
              message: "Esse campo não pode ser diferente de ALUGUEL ou COMPRA",
            };
          case "invalid_enum_value":
            return {
              message: "Esse campo não pode ser diferente de ALUGUEL ou COMPRA",
            };
          default:
            return { message: "Campo inválido" };
        }
      },
    }),
    st_disponibility: z.boolean(),
    nm_project: z
      .string({ required_error: "Esse campo é obrigatório" })
      .min(1, "Esse campo é obrigatório"),
    ds_project: z
      .string({ required_error: "Esse campo é obrigatório" })
      .min(1, "Esse campo precisa ter um valor")
      .max(420, "Esse campo precisa ter no máximo 420 caracteres."),
    address_project: z.string().min(1, "Esse campo é obrigatório"),
    val_area: z.number({ required_error: "Esse campo é obrigatório" }),
    num_bedrooms: z.number({ required_error: "Esse campo é obrigatório" }),
    num_bathrooms: z.number({ required_error: "Esse campo é obrigatório" }),
    num_suits: z.number({ required_error: "Esse campo é obrigatório" }),
    num_garage: z.number({ required_error: "Esse campo é obrigatório" }),
    pet_friendly: z.boolean(),
  });

  const handleSaveProject = async (data: any) => {
    console.log(data);

    setLoading(true);

    if (times === 1) {
      setTimes(times + 1);

      const projectEdit = {
        ...data,
        arr_photos: photos,
        arr_drawings: drawings,
        arr_videos: [],
      };

      if (!!project.id) {
        const toastId = toast.loading("Atualizando projeto...");

        const request = await updateProject(project.id, projectEdit, token);

        if (request.status === 200) {
          toast.success("Sucesso!", {
            description: request.message,
            id: toastId,
          });
          document.getElementById("closeModalNewProject")?.click();
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
        const toastId = toast.loading("Criando projeto...");

        const request = await createProject(projectEdit, token);

        if (request.status === 200) {
          toast.success("Sucesso!", {
            description: request.message,
            id: toastId,
          });
          document.getElementById("closeModalNewProject")?.click();
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

  const handleDeleteImage = (type: string, image: string) => {
    if (type === "photo") {
      let photosArray = [...photos];

      const index = photosArray.findIndex((photo) => photo === image);

      console.log(index);

      if (index !== -1) {
        photosArray.splice(index, 1);
        setPhotos(photosArray);
      }
    } else if (type === "drawing") {
      let drawingsArray = drawings;

      const index = drawingsArray.findIndex((drawing) => drawing === image);

      if (index !== -1) {
        drawingsArray.splice(index, 1);
        setDrawings(drawingsArray);
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (status) {
      if (!project.id) {
        setProjectEdit({
          ...project,
          st_disponibility: false,
          pet_friendly: false,
        });
      } else {
        setProjectEdit({ ...project });

        setPhotos(project.arr_photos);
        setDrawings(project.arr_drawings);
      }
    }
  }, [project, status]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      val_project: projectEdit.val_project || 0,
      val_condominium: projectEdit.val_condominium || 0,
      val_iptu: projectEdit.val_iptu || 0,
      type_project: projectEdit.type_project || "COMPRA",
      st_disponibility: projectEdit.st_disponibility || true,
      nm_project: projectEdit.nm_project || "",
      ds_project: projectEdit.ds_project || "",
      address_project: projectEdit.address_project || "",
      val_area: projectEdit.val_area || 0,
      num_bedrooms: projectEdit.num_bedrooms || 0,
      num_bathrooms: projectEdit.num_bathrooms || 0,
      num_suits: projectEdit.num_suits || 0,
      num_garage: projectEdit.num_garage || 0,
      pet_friendly: projectEdit.pet_friendly || false,
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
            setDrawingInput("");
            setPhotoInput("");
            setTimes(1);
            setPhotos([]);
            setDrawings([]);
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
              {!!projectEdit.id ? (
                <>
                  Editando o projeto <b># {projectEdit.id}</b>
                </>
              ) : (
                "Criando novo projeto"
              )}
            </DialogTitle>
          </DialogHeader>
          <div>
            <h1 className="font-bold text-center w-full text-2xl">Imagens</h1>
            <div className="flex items-center gap-5 mt-5">
              <div className="w-full">
                <h1 className="font-semibold">Fotos do projeto</h1>
                <div className="flex items-center gap-2 w-full mt-2">
                  <UploadImage
                    setProjectPhotos={setPhotos}
                    projectPhotos={photos}
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
                          handleDeleteImage("photo", photo);
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
            <div className="flex items-center gap-5 mt-5">
              <div className="w-full">
                <h1 className="font-semibold">Plantas do projeto</h1>
                <div className="flex items-center gap-8 w-full mt-2">
                  <Input
                    placeholder="Link da imagem"
                    className="w-full"
                    value={drawingInput}
                    onChange={(e) => setDrawingInput(e.target.value)}
                  />
                  <Button
                    className="w-10 aspect-square"
                    size="icon"
                    variant="secondary"
                    onClick={() => {
                      if (drawingInput.length === 0) {
                        toast.info("Falha ao adicionar imagem", {
                          description:
                            "O campo link da imagem não pode ser vazio",
                        });

                        return;
                      }

                      if (!drawingInput.startsWith("https://")) {
                        toast.info("Falha ao adicionar imagem", {
                          description: "O link deve ser válido",
                        });

                        return;
                      }

                      const newDrawings = [drawingInput, ...drawings];
                      setDrawings(newDrawings);
                      setDrawingInput("");
                    }}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 w-full">
                {drawings.map((drawing, index) => {
                  return (
                    <div key={index} className="relative">
                      <Button
                        className="rounded-full absolute -top-5 -right-5"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          handleDeleteImage("drawing", drawing);
                        }}
                      >
                        <Trash2 size={20} />
                      </Button>
                      <img
                        src={drawing}
                        className="w-full aspect-video rounded"
                        alt={drawing}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <form onSubmit={form.handleSubmit(handleSaveProject)}>
            <h1 className="font-bold text-center w-full text-2xl">
              Informações do projeto
            </h1>
            <div className="grid grid-cols-2 gap-5 mt-5">
              <div>
                <FormField
                  control={form.control}
                  name="nm_project"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do projeto</FormLabel>
                      <FormMessage />
                      <FormControl>
                        <Input placeholder="Nome do projeto" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <CurrencyInput
                  form={form}
                  label="Valor do projeto"
                  name="val_project"
                  placeholder="Valor do projeto"
                />
              </div>
              <div>
                <CurrencyInput
                  form={form}
                  label="Valor do condomínio"
                  name="val_condominium"
                  placeholder="Valor do condomínio"
                />
              </div>
              <div>
                <CurrencyInput
                  form={form}
                  label="Valor do IPTU"
                  name="val_iptu"
                  placeholder="Valor do IPTU"
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="type_project"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo do projeto</FormLabel>
                      <FormMessage />
                      <FormControl>
                        <Input placeholder="Tipo do projeto" {...field} />
                      </FormControl>
                      <FormDescription>
                        Esse campo não pode ser diferente de ALUGUEL ou COMPRA
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="address_project"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço do projeto</FormLabel>
                      <FormMessage />
                      <FormControl>
                        <Input placeholder="Endereço do projeto" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="ds_project"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição do projeto</FormLabel>
                      <FormMessage />
                      <FormControl>
                        <Textarea
                          placeholder="Descrição do projeto"
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
              <div className="grid grid-cols-3 gap-3">
                <FormField
                  control={form.control}
                  name="st_disponibility"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-4 items-center">
                      <FormLabel>Disponível?</FormLabel>
                      <FormControl>
                        <Switch
                          name={field.name}
                          id={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="val_area"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-4">
                      <FormLabel>Área do projeto</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Área quadrada"
                          disabled={field.disabled}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="num_bathrooms"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-4">
                      <FormLabel>Qtd. de banheiros</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Número de banheiros"
                          disabled={field.disabled}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pet_friendly"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-4 items-center">
                      <FormLabel>Aceita pets?</FormLabel>
                      <FormControl>
                        <Switch
                          name={field.name}
                          id={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="num_suits"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-4">
                      <FormLabel>Qtd. de suítes</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Número de suítes"
                          disabled={field.disabled}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="num_garage"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-4">
                      <FormLabel>Vagas de garagem</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Vagas de garagem"
                          disabled={field.disabled}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div></div>
                <FormField
                  control={form.control}
                  name="num_bedrooms"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-4">
                      <FormLabel>Qtd. de quartos</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Número de quartos"
                          disabled={field.disabled}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="grid grid-cols-6 gap-2">
              <div className="col-span-4"></div>
              <DialogClose>
                <Button
                  id="closeModalNewProject"
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
                    {!!projectEdit.id ? "Salvando" : "Criando"}
                  </div>
                ) : !!projectEdit.id ? (
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
