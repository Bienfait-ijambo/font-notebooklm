
import { PanelRight, Sparkles, Video, GitBranch, FileText, Star, HelpCircle, Pencil, NotepadText } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/stores";
import { addExtraWidth, reduceExtraWidth, toggleRightPanel } from "@/store/chatSlice";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@radix-ui/react-checkbox";

const RightPanel = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { rightPanelOpen } = useSelector((state: RootState) => state.chat);

  function togglePanel() {
    if (rightPanelOpen) {
      dispatch(addExtraWidth())
      dispatch(toggleRightPanel())

    } else {

      dispatch(reduceExtraWidth())
      dispatch(toggleRightPanel())
    }

  }

  const note = {
    docs: [
      {
        _id: "dkkdk",
        title: "hello world"
      }
    ]
  }

  return (
    <div
      className={`bg-white shadow-md rounded-sm h-full transition-all duration-300 ml-auto mr-auto ${rightPanelOpen ? "w-[25%] p-4" : "w-16 p-2"
        }`}
    >
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
        <PanelItem rightPanelOpen={rightPanelOpen} icon={<Sparkles />} label="Audio Overview" />
        <PanelItem rightPanelOpen={rightPanelOpen} icon={<Video />} label="Video Overview" />
        <PanelItem rightPanelOpen={rightPanelOpen} icon={<GitBranch />} label="Mind Map" />
        <ReportPanelItem rightPanelOpen={rightPanelOpen} />
      </div>



      <br />

      {rightPanelOpen ? (


        <div className="space-y-3">

          {/* <DocRowSkeleton count={10} /> */}
          {/* {note?.docs?.map((doc) => (
            <div
              key={doc._id}
              className="flex cursor-pointer items-center gap-2 hover:bg-gray-50 p-2 rounded-md"
            >
              <FileText className="text-blue-500" size={20} />
              <div className="flex flex-col">
                <span className="flex-1 text-sm truncate">{doc?.title}</span>
                <span className="text-xs">5 sources</span>
              </div>
            </div>
          ))} */}
        </div>

      ) : (
        <div className="flex flex-col items-center mt-6  pl-1  gap-4">
          {note?.docs.map((doc) => (
            <Button key={doc._id} variant="outline" size="icon">
              <FileText className="text-blue-500" size={20} />
            </Button>
          ))}
        </div>
      )}



      {/* Bottom note button */}
      <div className="mt-6 flex justify-center">
        <Button
          className={`flex items-center gap-2 rounded-full font-medium shadow-md ${rightPanelOpen ? "px-6 py-3" : "p-3"
            }`}
        >
          <Pencil size={18} />
          {rightPanelOpen && <span>Add note</span>}
        </Button>
      </div>
    </div>

  );
};

const PanelItem = ({ icon, label, rightPanelOpen }: { icon: React.ReactNode; label: string; rightPanelOpen: boolean }) => {
  return (
    <div
      className={`flex items-center justify-center  rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer transition ${rightPanelOpen ? "flex-col p-4 h-24" : "p-2 h-14"

        }  ${label == 'Mind Map' ? 'bg-orange-50' : ''} `}
    >
      {icon}
      {rightPanelOpen && <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>}
    </div>
  );
};



// / 🧾 Report menu (with dropdown)
const ReportPanelItem = ({ rightPanelOpen }: { rightPanelOpen: boolean }) => {
  const menuItems = ["Summary", "Study Guide", "Briefing Doc", "FAQ"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer transition ${rightPanelOpen ? "flex-col p-4 h-24" : "p-2 h-14"
            }`}
        >
          <FileText />
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
            onClick={() => console.log("Selected:", item)}
            className="cursor-pointer"
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


export default RightPanel;
