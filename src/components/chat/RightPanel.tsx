
import { PanelRight, Sparkles, Video, GitBranch, FileText, Star, HelpCircle, Pencil, NotepadText, AwardIcon, Music2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addExtraWidth, reduceExtraWidth, toggleRightPanel } from "@/store/chatSlice";
import './animate.css'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@radix-ui/react-checkbox";
import { createBriefingDoc, createFAQ, createMindMap, createStudyGuide, createSummary } from "@/api/notes";
import type { AppDispatch, RootState } from "@/store";
import { showError } from "@/util/toast-notification";
import { useEffect, useState } from "react";
import { fetchNoteSourceResult, closeSourceModal, showSourceModalContent } from "@/store/rightPanelSlice";
import { truncateTitle } from "@/util/truncateTitle";
import { SourceModal } from "../note/rightpanel/SourceModal";
import MindMapSourceModal from "../note/rightpanel/MindMapSourceModal";
import AudioSection from "./AudioSection";
import { apiUrl } from "@/config/get-env";

const RightPanel = ({ noteId }: { noteId?: string }) => {

  const dispatch = useDispatch<AppDispatch>();
  const { rightPanelOpen } = useSelector((state: RootState) => state.chat);
  const { docIds, sources, sourceModal, audioCard } = useSelector((state: RootState) => state.rightPanel);



  function showSourceModal(source: any) {
    dispatch(showSourceModalContent(source))
  }
  function fetchSources() {
    dispatch(fetchNoteSourceResult(noteId))

  }


  function togglePanel() {
    if (rightPanelOpen) {
      dispatch(addExtraWidth())
      dispatch(toggleRightPanel())

    } else {

      dispatch(reduceExtraWidth())
      dispatch(toggleRightPanel())
    }

  }
const [audioLoading, setAudioLoading] = useState(false);
  const [mindMapLoading, setMindMapLoading] = useState(false);

  async function generateMindMap() {

   try {

     if (docIds.length > 0) {
      setMindMapLoading(true)
      await createMindMap(noteId, docIds)
      fetchSources()
    } else {
      showError("Please select a source");
    }
    
   } catch (error) {
     showError("Failed to generate mind map");
     setMindMapLoading(false)
   }finally{
     setMindMapLoading(false)
   }

  }



  


  async function generateAudio() {
    if (docIds.length > 0) {
      try {
        setAudioLoading(true);


        await createBriefingDoc(noteId, docIds, 'audio')

        fetchSources()

        setAudioLoading(false);

      } catch (error) {
        setAudioLoading(false);

      }
    } else {
      showError("Please select a source");
    }
  }


  return (


    <div
      className={`bg-white shadow-sm rounded-sm h-full transition-all duration-300 ml-auto mr-auto ${rightPanelOpen ? "w-[25%] p-4" : "w-16 p-2"
        }`}
    >
      <SourceModal />
      <MindMapSourceModal />

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        {rightPanelOpen && <p className="text-base text-gray-800">Studio</p>}
        <Button
          variant="link"
          size="icon"
          className="size-8 hover:bg-slate-100 cursor-pointer"
          onClick={() => togglePanel()}
        >
          <PanelRight size={52} />
        </Button>
      </div>
      <hr />

      {/* Content */}
      <div className={`mt-4 grid ${rightPanelOpen ? "grid-cols-2 gap-4" : "grid-cols-1 gap-3"}`}>
        <div
          className={`${audioLoading ? 'animated-gradient-border' : ''}`}
        >

          <PanelItem generateSource={() => generateAudio()} rightPanelOpen={rightPanelOpen} icon={<Sparkles />} label="Audio Overview" />

        </div>

        <PanelItem rightPanelOpen={rightPanelOpen} generateSource={()=>showError('Look for video generation api, EVERY THING WORKS EXCEPT THE VIDEO GENERATION API')} icon={<Video />} label="Video Overview" />
        <PanelItem generateSource={generateMindMap} loading={mindMapLoading} rightPanelOpen={rightPanelOpen} icon={<GitBranch />} label="Mind Map" />

        <ReportPanelItem rightPanelOpen={rightPanelOpen} fetchSources={fetchSources} noteId={noteId} docIds={docIds} />
      </div>


      {rightPanelOpen && (
        <AudioSection
          audioUrl={`${apiUrl}/api/v1/notes/read/audios/${audioCard?.content}`}
          title={audioCard?.title}
        />
      )}



      <br />

      {rightPanelOpen ? (


        sources?.length > 0 ? (<div className={`space-y-3 ${audioCard.show ? 'max-h-60' : 'max-h-100'}  overflow-y-auto  pb-10`}>

          {Array.isArray(sources) && sources.map((source) => (

            <div
              key={source._id}
              onClick={() => showSourceModal(source)}
              className="flex cursor-pointer items-center gap-2 hover:bg-gray-50 p-2 rounded-md"
            >
              {/* <FileText className="text-blue-500" size={20} /> */}

              <SourceIcon type={source?.source_type} />

              <div className="flex flex-col">
                <span className="flex-1 text-base truncate"> {truncateTitle(source?.title, 35) || 'No title'}  </span>
                <span className="text-xs">{source?.source_type} - {source?.total_source}  sources</span>
              </div>
            </div>
          ))}
        </div>) : (
          <div className="flex flex-col items-center mt-10 justify-center  text-center">
            <FileText className="text-gray-500 mx-auto" size={60} />
            <p className="text-sm text-gray-400 font-semibold mt-4 px-3">
              No sources, available
            </p>
          </div>

        )




      ) : (
        <div className="flex flex-col items-center mt-6  pl-1  gap-4">
          {/* {note?.docs.map((doc) => (
            <Button key={doc._id} variant="outline" size="icon">
              <FileText className="text-blue-500" size={20} />
            </Button>
          ))} */}
        </div>
      )}



      {/* Bottom note button */}
      {/* <div className="mt-6 flex justify-center">
        <Button
          className={`flex items-center gap-2 rounded-full font-medium shadow-md ${rightPanelOpen ? "px-6 py-3" : "p-3"
            }`}
        >
          <Pencil size={18} />
          {rightPanelOpen && <span>Add note</span>}
        </Button>
      </div> */}
    </div>

  );
};



const PanelItem = ({
  icon,
  label,
  rightPanelOpen,
  generateSource,
  loading = false,
}: {
  icon: React.ReactNode;
  label: string;
  rightPanelOpen: boolean;
  generateSource: () => void;
  loading?: boolean;
}) => {
  return (
    <div
      onClick={!loading ? generateSource : undefined}
      className={`flex items-center justify-center rounded-md transition
        ${rightPanelOpen ? "flex-col p-4 h-24" : "p-2 h-14"}
        ${label === "Mind Map" ? "bg-orange-50" : "bg-gray-100"}
        ${label === "Audio Overview" ? "bg-green-50" : ""}
        ${loading ? "cursor-not-allowed opacity-60" : "hover:bg-gray-200 cursor-pointer"}
      `}
    >
      {loading ? (
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
      ) : (
        icon
      )}

      {rightPanelOpen && (
        <span className="mt-2 text-sm text-gray-700">
          {loading ? "Loading..." : label}
        </span>
      )}
    </div>
  );
};





// / 🧾 Report menu (with dropdown)
const ReportPanelItem = ({ rightPanelOpen, noteId, docIds, fetchSources }: { rightPanelOpen: boolean, noteId: string, docIds: string[], fetchSources: () => void }) => {
  const menuItems = ["Summary", "Study Guide", "Briefing Doc", "FAQ"];
  const [loading, setLoading] = useState(false);

  async function generateSource(item: string) {
    if (docIds.length > 0) {
      setLoading(true);
      if (item === "Summary") {


        await createSummary(noteId, docIds);



      }
      else if (item === "FAQ") {

        await createFAQ(noteId, docIds)
      } else if (item === "Study Guide") {
        await createStudyGuide(noteId, docIds)
      }
      else if (item === "Briefing Doc") {
        await createBriefingDoc(noteId, docIds, 'briefing-doc')
      }


      fetchSources()

      setLoading(false);
    } else {
      showError("Please select a source");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex items-center justify-center rounded-md bg-blue-50 hover:bg-gray-200 cursor-pointer transition ${rightPanelOpen ? "flex-col p-4 h-24" : "p-2 h-14"}`}
        >
          {loading ? (
            <div className="animated-gradient-border w-full h-full flex items-center justify-center">
              <div className="animated-gradient-inner flex items-center justify-center">
                <FileText />
              </div>
            </div>
          ) : (
            <FileText />
          )}

          {rightPanelOpen && (
            <span className="mt-2 text-sm font-medium text-gray-700">
              Reports
            </span>

          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-44">
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item}
            onClick={() => generateSource(item)}
            className="cursor-pointer"
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};




interface SourceIconProps {
  type?: string;
}

 function SourceIcon({ type = "" }: SourceIconProps) {
  const normalized = type.toLowerCase();

  if (normalized.includes("audio")) {
    return <Music2 className="text-green-500" />;
  }

  if (normalized.includes("mindmap")) {
    return <GitBranch className="text-orange-500" size={20} />;
  }



  return <FileText className="text-blue-500" size={20} />;
}

export default RightPanel;
