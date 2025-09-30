
import { PanelRight, Sparkles, Video, GitBranch, FileText, Star, HelpCircle, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/stores";
import { addExtraWidth, reduceExtraWidth, toggleRightPanel } from "@/store/chatSlice";

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
                <PanelItem rightPanelOpen={rightPanelOpen} icon={<FileText />} label="Reports" />
                <PanelItem rightPanelOpen={rightPanelOpen} icon={<Star />} label="Flashcards" />
                <PanelItem rightPanelOpen={rightPanelOpen} icon={<HelpCircle />} label="Quiz" />
            </div>

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

export default RightPanel;
