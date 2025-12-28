import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Loader2, Search } from "lucide-react";
import { BaseModal } from "../base/BaseModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { getUserData } from "@/helper/getUserData";
import { toggleDiscoveryModal } from "@/store/discoveryModalSlice";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { searchWeb, sendTextData } from "@/api/notes";
import { showError } from "@/util/toast-notification";
import { fetchSingleNote } from "@/store/chatSlice";



const FormSchema = z.object({
  query: z
    .string()
    .min(3, "Text must be at least 50 characters")
    .max(100, "Text is too long"),
});

type FormType = z.infer<typeof FormSchema>;

export const DiscoveryModal = ({ noteId }: { noteId?: string }) => {

  const [searchResult, setSearchResult] = useState<Array<{ title: string, link: string, text: string }>>([])
  const [sendWebResultLoading, setSendWebResultLoading] = useState(false)


  const dispatch = useDispatch<AppDispatch>();
  const { modal } = useSelector((state: RootState) => state.discoveryModal);
  const userData = getUserData()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormType) => {

    const serverData = await searchWeb(data?.query,userData?._id)

    if (serverData) {
      setSearchResult(serverData?.data)
      // reset()
      console.log("✅ search data", serverData);

      console.log('re :  ', searchResult)

    }

    // hidePasteTextForm();
  };

  async function sendWebResult() {
    try {
     if(searchResult.length>0){
       setSendWebResultLoading(true)
      for (const webResult of searchResult) {
        await sendTextData(webResult?.text,noteId)
      }
      setSendWebResultLoading(false)
      dispatch(toggleDiscoveryModal())
      dispatch(fetchSingleNote(noteId as string))


     }else{
      showError('No source provided')
     }
    } catch (error) {
      setSendWebResultLoading(false)
    }

  }



  return (




    <div>



      <BaseModal
        open={modal}
        onOpenChange={() => dispatch(toggleDiscoveryModal())}
        title="Discover Sources"
        description=""
        width={750}
        height={600}
        footer={
          <>
  <Button variant="outline" onClick={() =>  dispatch(toggleDiscoveryModal())}>
              Cancel
            </Button>
            <Button onClick={sendWebResult} disabled={sendWebResultLoading}>
              {sendWebResultLoading?(<>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      submitting...
                    </>):(<>
                    Submit
                    </>)}
            </Button>

          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} >

          <div className="grid gap-3">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-2">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Search className="" size={20}></Search>
                </div>

              </div>
              <div className="mb-2">
                <p className="text-base">What are you interested in?</p>
              </div>
            </div>


            <div className="p-2">
              <Textarea
                {...register('query')}
                className="resize-y min-h-[50px]  placeholder:text-xs" placeholder="Describe something you would like to learn about or search about" />

              {errors.query && (
                <p className="text-red-500 text-xs mt-1">{errors.query.message}</p>
              )}

            </div>

            <div className="flex justify-between p-2">

              <div></div>
              <div></div>
              <div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      searching...
                    </>
                  ) : (
                    <>
                      <Search /> Search
                    </>

                  )}
                </Button>
              </div>
            </div>


            {/* Sources Section */}

            <div className="mt-4 border-t pt-1">
              <h3 className="text-sm font-semibold mb-2">Select all sources ( {searchResult.length} )</h3>
              <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                {searchResult.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 border rounded-lg p-3 hover:bg-gray-50 transition"
                  >
                    {/* <input type="checkbox" className="mt-1" /> */}
                    <div>
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-indigo-600 hover:underline"
                      >
                        {s.title}
                      </a>
                      <p className="text-xs text-gray-600">{s.link}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>



          </div>
        </form>

      </BaseModal>
    </div>

  );
}

export default DiscoveryModal;