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
import { EditNote } from '@/components/note/EditNote'
import { fetchNoteSourceResult } from '@/store/rightPanelSlice'
import { CreditMenu } from '@/components/base/CreditMenu'
import { fetchChats } from '@/store/chatHistorySlice'
import { getUserData } from '@/helper/getUserData'

function ChatPage() {
  const [count, setCount] = useState(0)
  const { id } = useParams<{ id: string }>();


  const dispatch = useDispatch<AppDispatch>();
  const { note,loading } = useSelector((state: RootState) => state.chat);

  const {chatHistory } = useSelector((state: RootState) => state.chatHistory);
  const userData=getUserData()


  


  useEffect(() => {

    if (id) {
      dispatch(fetchSingleNote(id))
      dispatch(fetchNoteSourceResult(id))

      dispatch(fetchChats({userId:userData?._id as string,noteId:id}))



    }
  }, [dispatch, id]);



  return (
    <>
      <div className="flex items-center justify-between mb-1">

        <EditNote note={note}></EditNote>
        <div className='flex gap-2 mr-4'>
          {/* header actions here */}
          {/* <CreditMenu /> */}
          <UserAvatar />
        </div>
      </div>


      <div className="flex h-screen gap-2">


        <LeftPanel loading={loading} note={note} />
        <MiddlePanel chatHistory={chatHistory} note={note} userId={userData?._id}></MiddlePanel>
        <RightPanel noteId={id}/>

        <CreateNoteModal noteId={id} ></CreateNoteModal>
        <DiscoveryModal noteId={id}></DiscoveryModal>
        

      </div>


    </>
  )
}

export default ChatPage



