

export type PaginationType = {
    total: number
    page: number
    limit: number
    totalPages: number
}
export type NoteType = {
    _id: string
    title: string
    image: string
    userId: string
    createdAt: string
    docs:DocType[]
}

export type DocType = {
    _id: string,
    fileName: string,
    noteId: string,
    userId:string,
    source_type:string
}
export type NoteServerData = { notes: NoteType[] } & { pagination?: PaginationType }