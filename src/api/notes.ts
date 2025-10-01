import { apiUrl } from "@/config/get-env";
import { getUserData } from "@/helper/getUserData";
import { makeHttpReq } from "@/helper/makeHttpReq";
import type { NoteServerData, NoteType } from "@/types/note-types";


export async function getNotes(page = 1, search: string = ''): Promise<NoteServerData> {

    const data = await makeHttpReq('GET', `notes?page=${page}&search=${search}`) as NoteServerData
    return data


}


export async function getSingleNote(id: string): Promise<{ note: NoteType }> {
    const data = await makeHttpReq('GET', `notes/${id}`) as { note: NoteType }
    return data


}


const downloadFileInDrive = async (fileId: string, noteId?: string) => {
    try {
        const userData = getUserData()
        const userId = userData?._id

        const data = await makeHttpReq('POST', `notes/drive-files`,
             { fileId, userId, noteId }) as NoteServerData
        console.log(data)

    } catch (error) {
        console.log('error : ', error)
    }

};


export const uploadPickedFiles = async (docs: any[], noteId: string) => {
  if(Array.isArray(docs)){
      
    for (const doc of docs) {
       await downloadFileInDrive(doc.id, noteId);
    
    }

  }
};


const sendWeblink = async (webLink: string, noteId?: string) => {
    try {
        const userData = getUserData()
        const userId = userData?._id

        const data = await makeHttpReq('POST', `notes/weblinkdata`,
             { webLink, userId, noteId }) 
        console.log(data)

    } catch (error) {
        console.log('error : ', error)
    }

};

