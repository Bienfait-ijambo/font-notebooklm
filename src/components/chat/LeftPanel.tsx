import type { AppDispatch, RootState } from "@/store";
import {
  addExtraWidth,
  reduceExtraWidth,
  toggleLeftPanel,
} from "@/store/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import {
  FileText,
  NotepadText,
  PanelLeft,
  Plus,
  Search,
  Youtube,
  
} from "lucide-react";
import { toggleAddSourceNoteModal } from "@/store/addSourceSlice";
import type { NoteType } from "@/types/note-types";
import { Checkbox } from "../ui/checkbox";
import { toggleDiscoveryModal } from "@/store/discoveryModalSlice";
import { useState } from "react";
import { addDocIds } from "@/store/rightPanelSlice";
// import PdfIcon from '@/assets/pdf-1512.svg'
import PdfIcon from '@/assets/pdf.png'

type LeftPanelProps = {
  note: NoteType;
  loading: boolean
};

const LeftPanel = ({ note, loading }: LeftPanelProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { leftPanelOpen } = useSelector((state: RootState) => state.chat);

  function togglePanel() {
    if (leftPanelOpen) {
      dispatch(addExtraWidth());
      dispatch(toggleLeftPanel());
    } else {
      dispatch(reduceExtraWidth());
      dispatch(toggleLeftPanel());
    }
  }

  // State to track selected doc IDs
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);


 function handleDocSelect(docId: string) {
  setSelectedDocs((prev: string[]) =>
    prev.includes(docId)
      ? prev.filter((id) => id !== docId) // remove if exists
      : [...prev, docId] // add if not exists
  );

  dispatch(addDocIds(docId)); 
}




  return (
    <div
      className={`bg-white shadow-sm h-full transition-all duration-300 flex flex-col ${leftPanelOpen
        ? "w-[25%] p-4 rounded-md"
        : "w-16 p-2 rounded-r-2xl rounded-l-2xl"
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2 flex-shrink-0">
        {leftPanelOpen && <p className="text-base text-gray-800">Sources</p>}
        <Button
          variant="link"
          size="icon"
          className="size-8 hover:bg-slate-100 cursor-pointer"
          onClick={() => togglePanel()}
        >
          <PanelLeft size={35} />
        </Button>
      </div>

      {leftPanelOpen && <hr className="mb-2" />}

      {/* Buttons */}

      <div className="flex-shrink-0">
        {leftPanelOpen ? (
          <div className="flex mt-3 justify-between">
            <Button
              onClick={() => dispatch(toggleAddSourceNoteModal())}
              variant="outline"
              className="rounded-3xl px-5 py-4 w-35"
            >
              <Plus size={18} /> Add
            </Button>
            <Button
              onClick={() => dispatch(toggleDiscoveryModal())}
              variant="outline"
              className="rounded-3xl px-5 py-3 w-35"
            >
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
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto mt-4 pr-2">

        {leftPanelOpen ? (

          loading ? <DocRowSkeleton count={12} /> :

            note?.docs?.length ? (

              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox checked={false} />
                  <span className="text-sm font-medium">Select all sources</span>
                </div>
                {/* <DocRowSkeleton count={10} /> */}
                {note?.docs?.map((doc) => (
                  <div
                    key={doc._id}
                    className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-md"
                  >
                    <SourceIcon type={doc?.source_type} />
                    <span className="flex-1 text-base text-gray-600 truncate"> {doc?.title}  </span>
                    <Checkbox
                      className="cursor-pointer"
                      checked={selectedDocs.includes(doc._id)}
                      onCheckedChange={() => handleDocSelect(doc._id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <NotepadText className="text-gray-500 mx-auto" size={60} />
                <p className="text-sm text-gray-400 font-semibold mt-4 px-3">
                  Saved sources will appear here. Click Add source above to add
                  PDFs, websites, text, videos, or audio files. Or import a file
                  directly from Google Drive.
                </p>
              </div>
            )
          // end
        ) : (
          <div className="flex flex-col items-center mt-6  pl-3  gap-4">
            {note?.docs.map((doc) => (
              <Button key={doc._id} variant="outline" size="icon">
                <FileText className="text-blue-500" size={20} />
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};




type DocRowSkeletonProps = {
  count?: number; // number of rows to render
};

const DocRowSkeleton: React.FC<DocRowSkeletonProps> = ({ count = 5 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 p-2 rounded-md animate-pulse bg-gray-100"
        >
          {/* Icon placeholder */}
          <div className="w-5 h-5 bg-gray-300 rounded" />
          {/* Title placeholder */}
          <div className="flex-1 h-4 bg-gray-300 rounded" />
          {/* Checkbox placeholder */}
          <div className="w-5 h-5 bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
};



interface SourceIconProps {
  type?: string;
}

 function SourceIcon({ type = "" }: SourceIconProps) {
  const normalized = type.toLowerCase();

  if (normalized.includes("youtube")) {
    return <Youtube className="text-red-500" />;
  }

  if (normalized.includes("pdf")) {
    return   <img
        src={PdfIcon}
        alt="PDF Icon"
        width={24}
        height={24}
        className="rounded"
      />
  }


  // if (normalized.includes("mindmap")) {
  //   return <GitBranch className="text-orange-500" size={20} />;
  // }



  return   <FileText className="text-blue-500" size={20} />
}


export default LeftPanel;
