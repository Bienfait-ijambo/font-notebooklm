import { apiUrl } from "@/config/get-env";
import { getUserData } from "@/helper/getUserData";
import { makeHttpReq } from "@/helper/makeHttpReq";
import type { NoteServerData, NoteType } from "@/types/note-types";
import { showError, showSuccess } from "@/util/toast-notification";





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
    if (Array.isArray(docs)) {

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
        console.log('add weblink : ', data)

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
        console.log('add text : ', data)

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
        console.log('add text : ', data)

    } catch (error) {
        console.log('error : ', error)
    }

};


export const searchWeb = async (query: string,userId:string) => {
    try {

        const data = await makeHttpReq('GET', `notes/search/web?query=${query}&userId=${userId}`)
        return data
    } catch (error) {
        showError(error?.error?.message)
    }

};




export const updateNote = async (noteId: string, title: string) => {
    try {

        const data = await makeHttpReq('PUT', `notes`,
            { title, id: noteId })
        console.log('note updated : ', data)
        showSuccess(data?.message as string)

    } catch (error) {
        console.log('error : ', error)
    }

};



export const createSummary = async (noteId: string, docIds: string[]) => {
    try {
        const userData = getUserData()
        const userId = userData?._id

        const data = await makeHttpReq('POST', `notes/summary`,
            { userId, noteId, docIds })

        //it means we already have summaries for all selected sources(docs)
        if (data.status == 'ready_to_generate_source') {
            await generateSummarySource(userId, noteId, docIds)
        }
    } catch (error) {
        console.log('error : ', error)
    }

};


export const generateSummarySource = async (userId: string, noteId: string, docIds: string[]) => {
    try {

        const data = await makeHttpReq('POST', `notes/add/sources`,
            { userId, noteId, docIds })

        showSuccess(data?.message)
    } catch (error) {
        console.log('error : ', error)
    }

}




// faq


export const createFAQ = async (noteId: string, docIds: string[]) => {
    try {
        const userData = getUserData()
        const userId = userData?._id

        const data = await makeHttpReq('POST', `notes/faq`,
            { userId, noteId, docIds })

        //it means we already have summaries for all selected sources(docs)
        if (data.status == 'ready_to_generate_source') {
            await generateFAQSource(userId, noteId, docIds)
        }
    } catch (error) {
        console.log('error : ', error)
    }

};


export const generateFAQSource = async (userId: string, noteId: string, docIds: string[]) => {
    try {

        const data = await makeHttpReq('POST', `notes/add/faq/sources`,
            { userId, noteId, docIds })

        showSuccess(data?.message)
    } catch (error) {
        console.log('error : ', error)
    }

}


// end faq




// study guide



export const createStudyGuide = async (noteId: string, docIds: string[]) => {
    try {
        const userData = getUserData()
        const userId = userData?._id

        const data = await makeHttpReq('POST', `notes/studyguide`,
            { userId, noteId, docIds })

        //it means we already have summaries for all selected sources(docs)
        if (data.status == 'ready_to_generate_source') {
            await generateStudyguide(userId, noteId, docIds)
        }
    } catch (error) {
        console.log('error : ', error)
    }

};


export const generateStudyguide = async (userId: string, noteId: string, docIds: string[]) => {
    try {

        const data = await makeHttpReq('POST', `notes/add/studyguide/sources`,
            { userId, noteId, docIds })

        showSuccess(data?.message)
    } catch (error) {
        console.log('error : ', error)
    }

}



// briefing doc










export const createBriefingDoc = async (noteId: string, docIds: string[], type: 'audio' | 'briefing-doc') => {
    try {
        const userData = getUserData()
        const userId = userData?._id

        const data = await makeHttpReq('POST', `notes/briefingdoc`,
            { userId, noteId, docIds, type })

        //it means we already have summaries for all selected sources(docs)
        if (data.status == 'ready_to_generate_source') {
            await generateBriefingDoc(userId, noteId, docIds,type)
        }
    } catch (error) {
        console.log('error : ', error)
    }

};


export const generateBriefingDoc = async (userId: string, noteId: string, docIds: string[],type: 'audio' | 'briefing-doc') => {
    try {

        const data = await makeHttpReq('POST', `notes/add/briefingdoc/sources`,
            { userId, noteId, docIds,type })

        showSuccess(data?.message)
    } catch (error) {
        console.log('error : ', error)
    }

}




export async function getSourceResults(noteId: string) {
    const userData = getUserData()
    const userId = userData?._id
    const data = await makeHttpReq('GET', `notes/source/results?noteId=${noteId}&userId=${userId}`)
    return data


}




// mindMap

export const createMindMap = async (noteId?: string, docIds: string[]) => {
    try {
        const userData = getUserData()
        const userId = userData?._id

        const data = await makeHttpReq('POST', `notes/mindmap`,
            { userId, noteId, docIds })

        //it means we already have summaries for all selected sources(docs)
        if (data.status == 'ready_to_generate_source') {
            await generateMindMap(userId, noteId, docIds)
        }
    } catch (error) {
        console.log('error : ', error)
    }

};


export const generateMindMap = async (userId: string, noteId: string, docIds: string[]) => {
    try {

        const data = await makeHttpReq('POST', `notes/add/mindmap/sources`,
            { userId, noteId, docIds })

        showSuccess(data?.message)
    } catch (error) {
        console.log('error : ', error)
    }

}


// end



// chats


export type messageType={ role: 'ai' | 'user', noteId: string, userId: string, content: string }
export type chatHistoryType = { chatHistory: Array<messageType> }
export const getNoteChats = async (userId: string, noteId: string) => {
    try {

        const data = await makeHttpReq('GET', `chats/history?userId=${userId}&noteId=${noteId}`) as chatHistoryType
        return data

    } catch (error) {
        console.log('error : ', error)
    }

}


export const sendChatMessage = async ({userId,noteId,query}:{userId: string, noteId: string,query:string}) => {
    try {

        const data = await makeHttpReq('POST', `chats`,
            { userId, noteId,query }) as {message:messageType}
            return data
    } catch (error) {
        console.log('error : ', error)
    }

}

export type questionAndDocOverviewType= {aiResult:{questions:string[],doc_overview:string}}

export const getQuestionsAndDocOverview = async (noteId:string) => {
    try {

        const data = await makeHttpReq('GET', `notes/docs/overview?noteId=${noteId}`) as questionAndDocOverviewType
        console.log(' :  ',data)
            return data
    } catch (error) {
        console.log('error : ', error)
    }

}



export const createBlankNote = async () => {
    try {
        const userData = getUserData()
        const userId = userData?._id

        const data = await makeHttpReq('POST', `blank/notes`,
            { userId }) as{newNote: {_id:string,title:string}}
       return data

    } catch (error) {
        console.log('error : ', error)
    }

};






