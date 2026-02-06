import { useEffect, useRef, useState } from "react";
import { BaseModal } from "../../base/BaseModal"
import { Button } from "../../ui/button"
import { ClipboardMinus, HardDrive, Link2, Loader2, MoveLeft, Newspaper, Search, Youtube } from "lucide-react";
import type { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddSourceNoteModal } from "@/store/addSourceSlice";
import useDrivePicker from 'react-google-drive-picker'
import { apiUrl, developerKey, googleClientId } from "@/config/get-env";
import { getUserData } from "@/helper/getUserData";

import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { uploadPickedFiles } from "@/api/notes";
import { AddPasteTextForm } from "./AddPasteTextForm";
import AddWebLinkForm from "./AddWebLinkForm";
import AddYoutubeLinkForm from "./AddYoutubeForm";
import { toggleDiscoveryModal } from "@/store/discoveryModalSlice";
import { showInfo } from "@/util/toast-notification";



const CreateNoteModal = ({ noteId }: { noteId?: string }) => {

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


    const [dropZone, setDropZone] = useState(true)
    const [youtubeLinkForm, setYoutubeLinkForm] = useState(false)
    const [websiteLinkForm, setWebsiteLinkForm] = useState(false)
    const [pasteTextForm, setPasteTextForm] = useState(false)


    //youtube form
    const hideYoutubeLinkForm = () => {
        setYoutubeLinkForm(false)
        setDropZone(true)
    }

    const showYoutubeLinkForm = () => {
        setYoutubeLinkForm(true)
        setDropZone(false)
    }
    //end youtube form



    //web linkform
    const hideWebLinkForm = () => {
        setWebsiteLinkForm(false)
        setDropZone(true)
    }

    const showWebLinkForm = () => {
        setWebsiteLinkForm(true)
        setDropZone(false)
    }

    //end web linkform



    //paste text form
    const hidePasteTextForm = () => {
        setPasteTextForm(false)
        setDropZone(true)
    }

    const showPasteTextForm = () => {
        setPasteTextForm(true)
        setDropZone(false)
    }

    //paste text form


    useEffect(() => {

        uploadPickedFiles(data?.docs, noteId)

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

                    </>
                }
            >

                <div className="flex justify-between mb-10 ">
                    <div className="text-xl font-semibold">Add Sources</div>
                  
                </div>
                <div>



                    <p className="text-sm text-gray-600">Sources let NotebookLM base its responses on the information that matters most to you.
                        (Examples: marketing plans, course reading, research notes, meeting transcripts, sales documents, etc.)</p>
                </div>
                {dropZone && <UploadFileSection noteId={noteId} />}


                {youtubeLinkForm && <AddYoutubeLinkForm noteId={noteId} hideYoutubeLinkForm={hideYoutubeLinkForm} />}

                {websiteLinkForm && <AddWebLinkForm noteId={noteId} hideWebLinkForm={hideWebLinkForm} />}


                {pasteTextForm && <AddPasteTextForm noteId={noteId} hidePasteTextForm={hidePasteTextForm} />}




                {/* div card :actions buttons  */}
                <div className="flex gap-2">
                    <div className="flex-1  cursor-pointer rounded-md border border-gray-200 p-4">
                        <div className="mb-5 ">
                            <p className="text-gray-900">Google Workspace</p>
                        </div>
                        <button onClick={() => handleOpenPicker()} className="flex gap-2 bg-slate-100 p-2 rounded-md text-sm text-blue-600 font-semibold">
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
                            <button onClick={showWebLinkForm} className="flex cursor-pointer bg-slate-100 gap-2 p-2 rounded-md text-sm text-blue-600 font-semibold">
                                <Newspaper size={20}></Newspaper>   Website
                            </button>

                            <button onClick={showYoutubeLinkForm} className="flex cursor-pointer gap-2 bg-slate-100 p-2 rounded-md text-sm text-blue-600 font-semibold">
                                <span><Youtube></Youtube></span> Youtube</button>
                        </div>
                    </div>


                    <div className="flex-1 rounded-md border border-gray-200 p-4">
                        <div className="mb-5 " >
                            <p className="flex cursor-pointer gap-2 font-semibold text-gray-900">
                                <ClipboardMinus></ClipboardMinus> Paste text
                            </p>
                        </div>
                        <button onClick={showPasteTextForm} className="bg-slate-100 p-2 rounded-md text-sm text-blue-600 font-semibold">Copied text</button>
                    </div>

                </div>
            </BaseModal>
        </div>
    );
}






const UploadFileSection = ({ noteId }: { noteId?: string }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);


    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            uploadFiles(files);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (loading) return; // prevent new uploads
        const files = e.target.files;
        if (files && files.length > 0) {
            uploadFiles(files);
        }
    };

    const uploadFiles = async (files: FileList) => {
        setLoading(true);
        const formData = new FormData();
        const userData = getUserData()
        const userId = userData?._id
        Array.from(files).forEach((file) => {
            formData.append("doc", file);
            formData.append("userId", userId)
            formData.append("noteId", noteId as string)

        });

        try {
            const response = await fetch(`${apiUrl}/api/v1/notes/upload-files`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Upload successful:", data);
            showInfo('File uploaded successfully')
            setLoading(false);
        } catch (error) {
            setLoading(false);

            console.error("Error uploading files:", error);
        }
    };





    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (




        <div
            className={`mb-8 mt-6 rounded-lg p-8 flex flex-col items-center justify-center text-center 
      ${isDragging ? "border-solid border-2 border-indigo-500 bg-indigo-50" : "border-2 border-dashed border-gray-300"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
        >


            {loading && (
                <div className="mb-4 flex items-center space-x-2 text-indigo-500">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Uploading...</span>
                </div>
            )}

            <div className="bg-indigo-50 rounded-full p-4 mb-3">
                <svg
                    className="w-8 h-8 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v12"
                    />
                </svg>
            </div>

            <p className="font-medium text-gray-900">Upload sources</p>
            <p className="text-gray-500 text-sm mb-2">
                Drag & drop or <span className="text-indigo-600 cursor-pointer">choose file</span> to upload
            </p>
            <p className="text-gray-400 text-xs">
                Supported file types: PDF, .txt, Markdown, Audio (e.g. mp3)
            </p>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
                multiple
            />
        </div>
    );
};







export default CreateNoteModal;