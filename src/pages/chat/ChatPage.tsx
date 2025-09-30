import LeftPanel from '@/components/chat/LeftPanel'
import MiddlePanel from '@/components/chat/MiddlePanel'
import RightPanel from '@/components/chat/RightPanel'
import { useEffect, useState } from 'react'
import CreateNoteModal from '@/components/note/CreateNoteModal'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store'
import { fetchSingleNote } from '@/store/chatSlice'


function ChatPage() {
  const [count, setCount] = useState(0)
  const { id } = useParams<{ id: string }>();


  const dispatch = useDispatch<AppDispatch>();
  const { note } = useSelector((state: RootState) => state.chat);


useEffect(() => {

  dispatch(fetchSingleNote(id))
     


}, [dispatch, id]);



  return (
    <>
      <div className="flex h-screen gap-4">
         {JSON.stringify(note)}
        <LeftPanel note={note} />
        <MiddlePanel></MiddlePanel>
        <RightPanel />

        <CreateNoteModal></CreateNoteModal>

      </div>


    </>
  )
}

export default ChatPage
