import { apiUrl } from "@/config/get-env";
import { getUserData } from "@/helper/getUserData";
import { makeHttpReq } from "@/helper/makeHttpReq";

import { fetchSingleNote } from "@/store/chatSlice";
import type { NoteServerData, NoteType } from "@/types/note-types";

   

export async function getNotes(page = 1, search: string = ''): Promise<NoteServerData> {
    const data = await makeHttpReq('GET', `notes?page=${page}&search=${search}`) as NoteServerData
    return data


}


export async function getSingleNote(id: string): Promise<{ note: NoteType }> {

      await new Promise((resolve) => setTimeout(resolve, 6000));

    const data = await makeHttpReq('GET', `notes/${id}`) as { note: NoteType }
    return data


}


const downloadFileInDrive = async (fileId: string, noteId?: string) => {
    try {
        const userData = getUserData()
        const userId = userData?._id

        const data = await makeHttpReq('POST', `notes/drive-files`,
             { fileId, userId, noteId }) as NoteServerData

             updateLeftPanelData(noteId)
             
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


export const sendWeblink = async (webLink: string, noteId?: string) => {
    try {
        const userData = getUserData()
        const userId = userData?._id

        const data = await makeHttpReq('POST', `notes/weblinkdata`,
             { webLink, userId, noteId }) 
        console.log('add weblink : ',data)

    } catch (error) {
        console.log('error : ', error)
    }

};


export const sendTextData = async (text: string, noteId?: string) => {
    try {
        const userData = getUserData()
        const userId = userData?._id

        const data = await makeHttpReq('POST', `notes/text-data`,
             { text, userId, noteId }) 
        console.log('add text : ',data)

    } catch (error) {
        console.log('error : ', error)
    }

};



export const sendYoutubeLink = async (youtubeLink: string, noteId?: string) => {
    try {
        const userData = getUserData()
        const userId = userData?._id

        const data = await makeHttpReq('POST', `notes/youtube-link`,
             { youtubeLink, userId, noteId }) 
        console.log('add text : ',data)

    } catch (error) {
        console.log('error : ', error)
    }

};


export const searchWeb = async (query: string) => {
    try {
       
        const data = await makeHttpReq('GET', `notes/search/web?query=${query}`) 
       return data
    } catch (error) {
        console.log('error : ', error)
    }

};

