import { useEffect, useState } from "react";
import { BaseModal } from "../base/BaseModal"
import { Button } from "../ui/button"
import { ClipboardMinus, HardDrive, Link2, Newspaper, Search, Youtube } from "lucide-react";
import type { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddSourceNoteModal } from "@/store/addSourceSlice";
import useDrivePicker from 'react-google-drive-picker'
import { developerKey, googleClientId } from "@/config/get-env";
import { getUserData } from "@/helper/getUserData";
import { uploadPickedFiles } from "@/api/notes";





const CreateNoteModal = ({noteId}:{noteId?:string}) => {

    const dispatch = useDispatch<AppDispatch>();
    const { modal } = useSelector((state: RootState) => state.addSource);
    const userData = getUserData()

    const [openPicker, data, authResponse] = useDrivePicker();
    const handleOpenPicker = async () => {


        openPicker({
            clientId: googleClientId,
            developerKey: developerKey,
            viewId: "DOCS",
            token: userData?.googleAccessToken,
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
        })

        dispatch(toggleAddSourceNoteModal())


    }

    useEffect(() => {
        // do anything with the selected/uploaded files
        // if (data) {
        //     data.docs.map(i => console.log(i.name))
        // }
        if (data) {
            // console.log('docs : ', data?.docs)
            uploadPickedFiles(data?.docs,noteId)
        }
    }, [data])


    return (


        <div>


            <BaseModal
                open={modal}
                onOpenChange={() => dispatch(toggleAddSourceNoteModal())}
                title="NotebookLM"
                description=""
                width={850}
                height={600}
                footer={
                    <>
                        <Button variant="outline" onClick={() => dispatch(toggleAddSourceNoteModal())}>
                            Cancel
                        </Button>
                        <Button>Save changes</Button>
                    </>
                }
            >

                <div className="flex justify-between mb-10 ">
                    <div className="text-xl font-semibold">Add Sources</div>
                    <div>
                        <button className="flex gap-2  bg-indigo-100 rounded-full p-2 px-3 font-semibold text-indigo-600 ">
                            <Search className="mt-1" size={16}></Search> <span>Discover sources</span></button>
                    </div>
                </div>
                <div>



                    <p className="text-sm">Sources let NotebookLM base its responses on the information that matters most to you.
                        (Examples: marketing plans, course reading, research notes, meeting transcripts, sales documents, etc.)</p>
                </div>
                <div className="mb-8 mt-6 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                    <div className="bg-indigo-50 rounded-full p-4 mb-3">
                        <svg
                            className="w-8 h-8 text-indigo-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v12" />
                        </svg>
                    </div>

                    <p className="font-medium text-gray-900">Upload sources</p>
                    <p className="text-gray-500 text-sm mb-2">
                        Drag & drop or <span className="text-indigo-600 cursor-pointer">choose file</span> to upload
                    </p>
                    <p className="text-gray-400 text-xs">
                        Supported file types: PDF, .txt, Markdown, Audio (e.g. mp3)
                    </p>

                    {/* Hidden file input */}
                    <input type="file" className="hidden" />
                </div>

                {/* div card :actions buttons  */}
                <div className="flex gap-2">
                    <div className="flex-1 rounded-md border border-gray-200 p-4">
                        <div className="mb-5 ">
                            <p className="text-gray-900">Google Workspace</p>
                        </div>
                        <button onClick={() => handleOpenPicker()} className="flex cursor-pointer gap-2 bg-slate-100 p-2 rounded-md text-sm text-blue-600 font-semibold">
                            <HardDrive></HardDrive>
                            Google Drive

                        </button>
                    </div>
                    <div className="flex-1 rounded-md border border-gray-200 p-4">
                        <div className="flex gap-1 mb-5 ">
                            <Link2></Link2>
                            <p className="text-gray-900 font-semibold">Link</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex bg-slate-100 gap-2 p-2 rounded-md text-sm text-blue-600 font-semibold">
                                <Newspaper size={20}></Newspaper>   Website
                            </button>
                            <button className="flex gap-2 bg-slate-100 p-2 rounded-md text-sm text-blue-600 font-semibold">
                                <span><Youtube></Youtube></span> Youtube</button>
                        </div>
                    </div>


                    <div className="flex-1 rounded-md border border-gray-200 p-4">
                        <div className="mb-5 ">
                            <p className="flex gap-2 font-semibold text-gray-900">
                                <ClipboardMinus></ClipboardMinus> Paste text</p>
                        </div>
                        <button className="bg-slate-100 p-2 rounded-md text-sm text-blue-600 font-semibold">Copied text</button>
                    </div>

                </div>
            </BaseModal>
        </div>
    );
}

export default CreateNoteModal;