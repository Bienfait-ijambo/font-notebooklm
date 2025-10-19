import LeftPanel from '@/components/chat/LeftPanel'
import MiddlePanel from '@/components/chat/MiddlePanel'
import RightPanel from '@/components/chat/RightPanel'
import { useEffect, useState } from 'react'
import CreateNoteModal from '@/components/note/createNoteModal/CreateNoteModal'
import { Link, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store'
import { fetchDocOverviewAndQuestions, fetchSingleNote } from '@/store/chatSlice'
import { MoveLeft } from 'lucide-react'
import UserAvatar from '@/components/base/UserAvatar'
import DiscoveryModal from '@/components/note/DiscoveryModal'
import { EditNote } from '@/components/note/EditNote'
import { fetchNoteSourceResult } from '@/store/rightPanelSlice'
import { CreditMenu } from '@/components/base/CreditMenu'
import { fetchChats } from '@/store/chatHistorySlice'
import { getUserData } from '@/helper/getUserData'
import BuyCreditModal from '@/components/payment/BuyCreditModal'
import { fetchUserCreditAndPayment } from '@/store/creditMenuSlice'

function ChatPage() {
  const [count, setCount] = useState(0)
  const { id } = useParams<{ id: string }>();


  const dispatch = useDispatch<AppDispatch>();
  const { note,loading,aiResult } = useSelector((state: RootState) => state.chat);

  const {chatHistory } = useSelector((state: RootState) => state.chatHistory);

  const {result } = useSelector((state: RootState) => state.creditMenu);

  const userData=getUserData()


  


  useEffect(() => {

    if (id) {
      dispatch(fetchSingleNote(id))
      dispatch(fetchNoteSourceResult(id))

      dispatch(fetchChats({userId:userData?._id as string,noteId:id}))

      dispatch(fetchDocOverviewAndQuestions(id))

      dispatch(fetchUserCreditAndPayment(userData?._id))



    }
  }, [dispatch, id]);



  return (
    <>
      <div className="flex items-center justify-between ">

        <EditNote note={note}></EditNote>
        <div className='flex gap-4 mr-4'>
          {/* header actions here */}
         
          <CreditMenu result={result} />
          <UserAvatar />
          <BuyCreditModal />
        </div>
      </div>



      <div className="flex h-screen gap-2">

        <LeftPanel loading={loading} note={note} />
        <MiddlePanel aiResult={aiResult} chatHistory={chatHistory} note={note} userId={userData?._id}></MiddlePanel>
        <RightPanel noteId={id}/>

        <CreateNoteModal noteId={id} ></CreateNoteModal>
        <DiscoveryModal noteId={id}></DiscoveryModal>
        

      </div>


    </>
  )
}

export default ChatPage



