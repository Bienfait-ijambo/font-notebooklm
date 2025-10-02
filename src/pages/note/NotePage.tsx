import CreateNoteModal from '@/components/note/createNoteModal/CreateNoteModal';
import DiscoveryModal from '@/components/note/DiscoveryModal';
import EditNoteModal from '@/components/note/EditNoteModal';
import NoteCard from '@/components/note/NoteCard';
import type { AppDispatch, RootState } from '@/store';
import { fetchNotes } from '@/store/noteSlice';
import { Plus } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// shadcn pagination
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from '@/components/ui/input';
import { debounce } from 'lodash'
import { toggleAddSourceNoteModal } from '@/store/addSourceSlice';
import { useNavigate } from 'react-router';

function NotePage() {
    // const [count, setCount] = useState(0)

    const dispatch = useDispatch<AppDispatch>();
    const { notes, loading, pagination } = useSelector((state: RootState) => state.note);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('')
    const totalPages = pagination?.totalPages ?? 1;
    const navigate = useNavigate()



    const fetchNoteWithDebounce = useCallback(debounce((page: number, search: string) => {
        dispatch(fetchNotes({ page, search }))

    }, 500), [dispatch])


    const searchNote = (e: React.ChangeEvent<HTMLInputElement>) => {

        const title = e.target.value

        setSearch(title)
        setPage(1)

    }

    const viewNoteDetail = (id: string) => {
        navigate('/chats/' + id)

    }



    const showAddNoteSourceModal = () => {

        dispatch(toggleAddSourceNoteModal())
        navigate('/chats')

    }


    useEffect(() => {

        fetchNoteWithDebounce(page, search)
    }, [page, search, fetchNoteWithDebounce])




    return (
        <>

            <main className="min-h-screen bg-gray-50 p-6">



                <div className='flex justify-between'>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            Recent notebooks
                        </h1>
                    </div>
                    <div>
                        <Input onChange={searchNote} value={search} placeholder='search...'></Input>
                    </div>

                </div>


                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Create new notebook card */}
                    <div onClick={() => showAddNoteSourceModal()} className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl h-40 cursor-pointer hover:bg-gray-100 transition">
                        <div className="flex flex-col items-center">
                            <Plus className="w-8 h-8 text-blue-600 mb-2" />
                            <span className="text-gray-600 font-medium">
                                Create new notebook
                            </span>
                        </div>


                    </div>


                    <NoteCard viewNoteDetail={viewNoteDetail} notebooks={notes} />


                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                />
                            </PaginationItem>

                            {[...Array(totalPages)].map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        isActive={page === i + 1}
                                        onClick={() => setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </main>

        </>
    )
}

export default NotePage
