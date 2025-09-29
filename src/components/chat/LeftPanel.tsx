import type { AppDispatch, RootState } from "@/store";
import { addExtraWidth, reduceExtraWidth, toggleLeftPanel } from "@/store/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { FileText, NotepadText, PanelLeft, Plus, Search } from "lucide-react";
import { toggleAddSourceNoteModal } from "@/store/addSourceSlice";
import type { NoteType } from "@/types/note-types";
import { Checkbox } from "../ui/checkbox";


type leftPanelProps={
  note:NoteType
}

const LeftPanel = ({note}:leftPanelProps) => {

     const dispatch = useDispatch<AppDispatch>();
  const { leftPanelOpen } = useSelector((state: RootState) => state.chat);

  function togglePanel() {
    if (leftPanelOpen) {
      dispatch(addExtraWidth());
      dispatch(toggleLeftPanel())
    } else {
      dispatch(reduceExtraWidth());
      dispatch(toggleLeftPanel())

    }
  }


    function toggleDocCheck(id: number) {
      console.log(id)
    // setDocs(prev =>
    //   prev.map(doc =>
    //     doc.id === id ? { ...doc, checked: !doc.checked } : doc
    //   )
    // );
  }


  
    return ( <div
      className={`bg-white shadow-md h-full transition-all duration-300 ${
        leftPanelOpen
          ? "w-[25%] p-4 rounded-md"
          : "w-16 p-2 rounded-r-2xl rounded-l-2xl"
      }`}
    >


     {/* Header */}
      <div className="flex justify-between items-center mb-2">
        {leftPanelOpen && <p className="text-base text-gray-800">Sources</p>}
        <Button
          variant="link"
          size="icon"
          className="size-8 hover:bg-slate-100 cursor-pointer"
          onClick={() => togglePanel()}
        >
          <PanelLeft size={35}></PanelLeft>
        </Button>
      </div>

      {leftPanelOpen && <hr />}




        {/* Buttons */}
      {leftPanelOpen ? (
        <div className="flex mt-3 justify-between">
          <Button onClick={()=>dispatch(toggleAddSourceNoteModal())} variant="outline" className="rounded-3xl px-5 py-4 w-35">
            <Plus size={18} /> Add
          </Button>
          <Button variant="outline" className="rounded-3xl px-5 py-3 w-35">
            <Search size={18} /> Discover
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-6 gap-4">
          <Button variant="outline" size="icon">
            <Plus size={18} />
          </Button>
          <Button variant="outline" size="icon">
            <Search size={18} />
          </Button>
        </div>
      )}





{/* body */}

      {/* Docs List */}
      {leftPanelOpen ? (
        note?.docs.length > 0 ? (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={false}
                
              />
              <span className="text-sm font-medium">Select all sources</span>
            </div>
            {note?.docs.map((doc) => (
              <div
                key={doc._id}
                className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-md"
              >
                <FileText className="text-blue-500" size={20} />
                <span className="flex-1 text-sm truncate">doc-title here is import</span>
                <Checkbox
                  checked={false}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-40 text-center">
            <NotepadText className="text-gray-500 mx-auto" size={60} />
            <p className="text-sm text-gray-400 font-semibold mt-4">
              Saved sources will appear here.  
              Click Add source above to add PDFs, websites, text, videos, or audio files.  
              Or import a file directly from Google Drive.
            </p>
          </div>
        )
      ) : (
        // closed panel docs icons
        <div className="flex flex-col items-center mt-6 gap-4">
          {note?.docs.map((doc) => (
            <Button key={doc._id} variant="outline" size="icon">
              <FileText className="text-blue-500" size={20} />
            </Button>
          ))}
        </div>
      )}
{/* body */}
</div> );
}
 
export default LeftPanel;