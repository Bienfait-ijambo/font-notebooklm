import LeftPanel from '@/components/chat/LeftPanel'
import MiddlePanel from '@/components/chat/MiddlePanel'
import RightPanel from '@/components/chat/RightPanel'
import { useEffect, useState } from 'react'
import CreateNoteModal from '@/components/note/createNoteModal/CreateNoteModal'
import { Link, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store'
import { fetchSingleNote } from '@/store/chatSlice'
import { MoveLeft } from 'lucide-react'
import UserAvatar from '@/components/base/UserAvatar'
import DiscoveryModal from '@/components/note/DiscoveryModal'

function ChatPage() {
  const [count, setCount] = useState(0)
  const { id } = useParams<{ id: string }>();


  const dispatch = useDispatch<AppDispatch>();
  const { note, } = useSelector((state: RootState) => state.chat);


  useEffect(() => {

    if (id) {
      dispatch(fetchSingleNote(id))

    }
  }, [dispatch, id]);



  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex   items-center gap-2">
          <Link
            to="/notes"
            className="cursor-pointer text-gray-500 hover:text-gray-700 transition"
          >
            <MoveLeft size={18} />
          </Link>
          <input

            type="text"
            value={note?.title}
            className="w-full min-w-[300px] max-w-sm bg-transparent border-none focus:ring-0 text-gray-800 text-base font-medium truncate"
            readOnly
          />
        </div>
        <div className='mr-4'>
          {/* header actions here */}
         
          <UserAvatar />
        </div>
      </div>


      <div className="flex h-screen gap-4">


        <LeftPanel note={note}  />
        <MiddlePanel></MiddlePanel>
        <RightPanel />

        <CreateNoteModal noteId={id} ></CreateNoteModal>
        <DiscoveryModal noteId={id}></DiscoveryModal>
        

      </div>


    </>
  )
}

export default ChatPage
