import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft, Loader2, } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { updateNote } from "@/api/notes";
import { useEffect } from "react";

// Schema validation with Zod
const editNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type EditNoteFormValues = z.infer<typeof editNoteSchema>;
interface EditNoteProps {
  note?: { _id: string; title: string };
  //   onSave: (data: EditNoteFormValues) => Promise<void>;
}

export const EditNote = ({ note }: EditNoteProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<EditNoteFormValues>({
    resolver: zodResolver(editNoteSchema),
    defaultValues: {
      title: "",
    },
  });



  // 🧠 When note data changes (e.g., from API), update the form value
  useEffect(() => {
    if (note?.title) {
      setValue("title", note.title)
    }
  }, [note, setValue])


  // Submit only on blur
  const handleBlur = async () => {
    const data = getValues();
    if (!errors.title) {
      //   await onSave(data);
      await updateNote(note?._id as string, data?.title)
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
        {/* <span style={{ fontSize: "3rem", lineHeight: "1.2" }}>🧠✨</span> */}
        <div className="flex-1">

          <Input
            id="title"
            {...register("title")}
            onBlur={handleBlur}
            className="border-none h-12 w-[400px] !text-lg focus:ring-0 focus:border-0 outline-none bg-transparent"
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
