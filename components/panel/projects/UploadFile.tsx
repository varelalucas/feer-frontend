"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileWithPreview extends File {
  preview: string;
}

export const UploadImage = ({
  setProjectPhotos,
  projectPhotos,
}: {
  setProjectPhotos: any;
  projectPhotos: any;
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    multiple: false,
    accept: { "image/*": [".jpg", ".jpeg", ".png"] },
    onDrop: async (acceptedFiles: File[]) => {
      acceptedFiles.map(async (file) => {
        setIsLoading(true);

        const data = new FormData();
        data.append("file", file);

        await axios
          .post("https://api.imgur.com/3/image", data, {
            headers: {
              Accept: "application/json",
              Authorization: "Client-ID 81ebd9cffaa9305",
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });

        setProjectPhotos([...projectPhotos, URL.createObjectURL(file)]);
      });
    },
  });

  return (
    <>
      <div
        {...getRootProps({
          className:
            "bg-neutral-100 p-[30px] rounded-lg cursor-pointer max-md:p-4",
        })}
      >
        <div className="flex items-center justify-center gap-4 rounded border border-dashed border-gray-300 bg-white p-5">
          <>
            <Image
              src="/images/icons/upload.png"
              alt="Ícone de upload"
              width={156}
              height={126}
            />
            <div>
              <h1 className="text-xl font-bold max-md:text-lg">
                Upload de imagem
              </h1>
              <p className="max-md:text-sm">
                Clique aqui ou arraste uma imagem pra cá
              </p>
            </div>
          </>
          )
        </div>
      </div>
      <input {...getInputProps({ className: "hidden" })} />
    </>
  );
};
