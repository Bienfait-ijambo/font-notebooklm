
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoveLeft } from "lucide-react";


export const AddYoutubeForm = ({ hideYoutubeLinkForm,noteId }: { hideYoutubeLinkForm: () => void,noteId?:string }) => {
    return (
        // 
        <div className="p-1 mb-4 mt-4">
            <div className="flex gap-2">
                <button className="cursor-pointer" onClick={hideYoutubeLinkForm} ><MoveLeft /></button>
                <Label htmlFor="" className="text-sm font-semibold">Paste a Youtube URL</Label>
            </div>

            <Textarea
                className="resize-y min-h-[100px] mt-2 text-sm placeholder:text-sm" placeholder="https://www.youtube.com/?feature=ytca" />
        </div>
    );
}
