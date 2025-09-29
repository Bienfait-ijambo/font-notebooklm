import { apiUrl } from "@/config/get-env";
import { getUserData } from "@/helper/getUserData";
import { makeHttpReq } from "@/helper/makeHttpReq";
import type { NoteServerData, NoteType } from "@/types/note-types";


export async function getNotes(page = 1, search: string = ''): Promise<NoteServerData> {

    const data = await makeHttpReq('GET', `notes?page=${page}&search=${search}`) as NoteServerData
    return data


}


export async function getSingleNote(id:string): Promise<{note:NoteType}> {
    const data = await makeHttpReq('GET', `notes/${id}`) as {note:NoteType}
    return data


}


const downloadFile = async (fileId: string) => {

    console.log('file id : ', fileId)
    const userId = '68beb16d17836bc4d0e84bda'
    const noteId = '68d8d6e3308f4849551fe067'

    // const data = await makeHttpReq('POST', `notes/drive-files`,{fileId,userId,noteId}) as NoteServerData

    const response = await fetch(`${apiUrl}/api/v1/notes/drive-files`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json", // ✅ important!
        },
        body: JSON.stringify({ fileId, userId, noteId }),
    });
    const r = await response.json()

};


export const uploadPickedFiles = async (docs: any[], accessToken: string) => {
    const formData = new FormData();
    const userData = getUserData()
    for (const doc of docs) {
        const file = await downloadFile(doc.id);
        // console.log('download :: :', file)
        // formData.append("doc", file);
        // formData.append("userId", userData?._id);
    }

    try {
        // const response = await fetch(`${apiUrl}/api/v1/notes`, {
        //   method: "POST",
        //   body: formData,
        // });

        // if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);

        // const data = await response.json();
        // console.log("Upload successful:", data);
    } catch (error) {
        console.error("Error uploading files:", error);
    }
};
