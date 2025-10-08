import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MoveLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { sendTextData } from "@/api/notes";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchSingleNote } from "@/store/chatSlice";

const pasteTextSchema = z.object({
    text: z
        .string()
        .min(50, "Text must be at least 50 characters")
        .max(5000, "Text is too long"),
});

type PasteTextFormValues = z.infer<typeof pasteTextSchema>;

export const AddPasteTextForm = ({ hidePasteTextForm, noteId }: { hidePasteTextForm: () => void, noteId?: string }) => {


      const dispatch = useDispatch<AppDispatch>();

  
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PasteTextFormValues>({
        resolver: zodResolver(pasteTextSchema),
    });

    const onSubmit = async (data: PasteTextFormValues) => {

        await sendTextData(data?.text, noteId)
         dispatch(fetchSingleNote(noteId as string))
        reset()
        console.log("✅ Submitted Paste Text:", data);

        // hidePasteTextForm();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-1 mb-4 mt-4 space-y-3">
            <div className="flex gap-2 items-center">
                <button type="button" className="cursor-pointer" onClick={hidePasteTextForm}>
                    <MoveLeft />
                </button>
                <Label htmlFor="text" className="text-sm font-semibold">
                    Paste a Text
                </Label>
            </div>

            <Textarea
                id="text"
                {...register("text")}
                className="resize-y min-h-[100px] mt-2 text-sm placeholder:text-sm"
                placeholder="Paste text here"
            />
            {errors.text && <p className="text-red-500 text-xs mt-1">{errors.text.message}</p>}
            <div className="flex">
                <div></div>
                <div></div>
                <div className="ml-auto">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}
