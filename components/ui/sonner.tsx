import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:shadow-lg border-0 flex items-center gap-5 p-5 rounded w-full",
          description:
            "group-[.toast]:text-slate-200 -mt-1 text-md group-[.toaster]:text-white",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: "bg-red-500 text-white",
          info: "bg-blue-500 text-white",
          success: "bg-green-500 text-white",
          warning: "bg-orange-500 text-white",
          title: "text-xl font-bold",
          loading: "group-[.toaster]:text-slate-900",
          closeButton: "right-0",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
