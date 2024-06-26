"use client";

import axios from "axios";
import { Loader, Loader2 } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { "image/*": [".jpg", ".jpeg", ".png"] },
    onDrop: async (acceptedFiles: File[]) => {
      setIsLoading(true);
      const file = acceptedFiles[0];

      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        try {
          const response = await axios.post(
            "https://api.imgur.com/3/image",
            formData,
            {
              headers: {
                Accept: "application/json",
                Authorization: "Client-ID 81ebd9cffaa9305",
              },
            }
          );
          console.log(response);
          if (response.data && response.data.data && response.data.data.link) {
            setProjectPhotos([...projectPhotos, response.data.data.link]);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
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
          {isLoading ? (
            <Loader2 size={80} className="loading text-4xl text-theme-400" />
          ) : (
            <>
              <div>
                <h1 className="text-xl font-bold max-md:text-lg">
                  Upload de imagem
                </h1>
                <p className="max-md:text-sm">
                  Clique aqui ou arraste uma imagem pra cá
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <input {...getInputProps({ className: "hidden" })} />
    </>
  );
};
