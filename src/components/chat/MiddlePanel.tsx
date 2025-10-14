// MiddlePannel.jsx
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/stores";
import { SendHorizonal, ChevronLeft, ChevronRight } from "lucide-react";


const MiddlePannel = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { middlePanelDefaultWidth } = useSelector((state: RootState) => state.chat);


    return (
        <div
            style={{
                width: `${middlePanelDefaultWidth}%`
            }}
            className={
                `bg-white transition-all duration-300 shadow-sm rounded-md h-full  p-4 flex flex-col`
            }>

            {/* chat section */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2">
                {/* AI message */}
                <div className="flex justify-start">
                    <div className="max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow bg-gray-100 text-gray-800 rounded-bl-none">
                        Hello! I’m your AI assistant. How can I help you today?
                    </div>
                </div>

                {/* Human message */}
                <div className="flex justify-end">
                    <div className="max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow bg-indigo-500 text-white rounded-br-none">
                        Hi! Can you explain how this works?
                    </div>
                </div>

                {/* AI message */}
                <div className="flex justify-start">
                    <div className="max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow bg-gray-100 text-gray-800 rounded-bl-none">
                        Sure! Just type your question in the box below and hit send.
                    </div>
                </div>

                {/* Human message */}
                <div className="flex justify-end">
                    <div className="max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow bg-indigo-500 text-white rounded-br-none">
                        Got it. Thanks!
                    </div>
                </div>
            </div>



            {/* bordered chat-input card */}
            <div className="relative border border-gray-200 rounded-2xl p-3 bg-white">
                {/* main input row */}
                panel:{middlePanelDefaultWidth}
                <div className="flex items-center gap-3">
                    <input
                        type="text"

                        placeholder="Start typing..."
                        className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400 px-2 py-2"
                        aria-label="Message input"
                    />

                    <div className="text-xs text-gray-500 whitespace-nowrap">10 sources</div>

                    <button

                        aria-label="Send"
                        className="w-10 h-10 rounded-full bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center shadow-md transition"
                        title="Send"
                    >
                        <SendHorizonal className="text-white " size={16} />
                    </button>
                </div>



            </div>
        </div>
    );
};

export default MiddlePannel;

