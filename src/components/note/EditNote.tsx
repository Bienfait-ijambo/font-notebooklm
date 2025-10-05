import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft, Loader2,  } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

// Schema validation with Zod
const editNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type EditNoteFormValues = z.infer<typeof editNoteSchema>;
interface EditNoteProps {
  note?: { _id: string; title: string };
//   onSave: (data: EditNoteFormValues) => Promise<void>;
}

export const EditNote = ({ note }: EditNoteProps ) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<EditNoteFormValues>({
    resolver: zodResolver(editNoteSchema),
    defaultValues: {
      title:  note?.title || "",
    },
  });

  // Submit only on blur
  const handleBlur = async () => {
    const data = getValues();
    if (!errors.title) {
    //   await onSave(data);
    console.log('make http req',data,note)
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 w-full">
         <Link
            to="/notes"
            className="cursor-pointer text-gray-500 hover:text-gray-700 transition"
          >
            <MoveLeft size={18} />
          </Link>

        <div className="flex-1">
         
          <Input
            id="title"
            {...register("title")}
            value={note?.title}
            onBlur={handleBlur}
            className="w-full min-w-[300px]  max-w-sm bg-transparent border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-base font-medium"
          />
         
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>
      </div>

      <div className="mr-4">
        {/* header actions, e.g., user avatar */}
      </div>
    </div>
  );
};
