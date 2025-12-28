// MiddlePannel.jsx
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/stores";
import { Copy, GitBranch, Loader2, Music2, NotebookTabs, SendHorizonal, Sparkles, ArrowDown } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { createBriefingDoc, createMindMap, createSummary, sendChatMessage, type chatHistoryType, type messageType, type questionAndDocOverviewType } from "@/api/notes";
import { addMessageInChatHistory } from "@/store/chatHistorySlice";
import type { NoteType } from "@/types/note-types";
import { showError } from "@/util/toast-notification";
import { fetchNoteSourceResult } from "@/store/rightPanelSlice";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SuggestedInput } from "./SuggestedInput";
import { ChatInput } from "./ChatInput";


const MiddlePannel = ({ chatHistory, userId, note, aiResult }: { chatHistory: chatHistoryType, userId: string, note: NoteType, aiResult: questionAndDocOverviewType }) => {
    const { _id: noteId } = note
    const dispatch = useDispatch<AppDispatch>();
    const { middlePanelDefaultWidth } = useSelector((state: RootState) => state.chat);

    const { docIds } = useSelector((state: RootState) => state.rightPanel);

    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const chatContainerRef = useRef<HTMLElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);



    async function sendUserMessage({ newMessage }: { newMessage: messageType }) {
        setLoading(true)
        dispatch(addMessageInChatHistory(newMessage))


        const data = await sendChatMessage({ userId, noteId, query: inputValue || newMessage?.content })
        setLoading(false)
        setTimeout(scrollToBottom, 100);
        dispatch(addMessageInChatHistory(data?.message))
        
    }

    const sendMessage = async () => {
        if (!inputValue.trim()) return;

        const newMessage: messageType = {
            role: "user",
            content: inputValue,
            userId, noteId
        };

        await sendUserMessage({ newMessage })
       
    };


    async function selectQuestion(question: string) {
        const newMessage: messageType = {
            role: "user",
            content: question,
            userId, noteId
        };


        await sendUserMessage({ newMessage })

    }


    const onKeyDownMessage = async (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            const newMessage: messageType = {
                role: "user",
                content: inputValue,
                userId, noteId
            };
            setInputValue("");
            await sendUserMessage({ newMessage })
            

        }
    };


    const scrollToBottom = () => {
        const container = chatContainerRef.current;
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth",
            });
        }
    };


    useEffect(() => {
        const container = chatContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
            setShowScrollButton(!isAtBottom);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);



    return (
        <div
            style={{
                width: `${middlePanelDefaultWidth}%`,
            }}
            className={`bg-white transition-all duration-300 shadow-sm rounded-md h-full p-4 flex flex-col`}
        >
            {/* chat section */}
            <div
                ref={chatContainerRef}
                className="relative flex-1 overflow-y-auto mb-4 space-y-3 pr-2"
            >
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <p className="text-base text-gray-800">Chat</p>
                </div>

                <hr className="mb-2" />

                <MiddlePanelHeader aiResult={aiResult} note={note} docIds={docIds} />

                {/* messages */}
                {/* {chatHistory?.chatHistory?.map((msg, index) => ChatMessage({ msg }))} */}


{/* performance optimization */}
                {chatHistory?.chatHistory?.map((msg, index) => (
                    <ChatMessage key={index} msg={msg} />
                ))}

            </div>

            {/* jump-to-bottom button */}
            {showScrollButton && (
                <div className="flex justify-center mb-3">
                    <button
                        onClick={scrollToBottom}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-md rounded-full px-4 py-1.5 flex items-center gap-2 transition-all"
                    >
                        <ArrowDown />
                        <span className="text-sm font-medium">Jump to bottom</span>

                    </button>
                </div>
            )}

            {/* bordered chat-input card */}
            <div className="relative border border-gray-200 rounded-2xl p-3 bg-white">
                {/* main input row */}
                <div className="flex items-center gap-3">
                   
                    <ChatInput
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        onKeyDownMessage={onKeyDownMessage}
                    />


                    <div className="text-xs text-gray-500 whitespace-nowrap">
                        {docIds?.length} sources
                    </div>

                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        aria-label="Send"
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition 
            ${loading
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-indigo-500 hover:bg-indigo-600"
                            }`}
                        title="Send"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin text-white" size={18} />
                        ) : (
                            <SendHorizonal className="text-white" size={16} />
                        )}
                    </button>
                </div>

            </div>
            <SuggestedInput selectQuestion={selectQuestion} questions={aiResult?.aiResult?.questions} />
        </div>
    );

};







const MiddlePanelHeader = ({ note, docIds, aiResult }: { note: NoteType, docIds: string[], aiResult: questionAndDocOverviewType }) => {

    const [audioLoading, setAudioLoading] = useState(false);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [mindMapLoading, setMindMapLoading] = useState(false);




    const dispatch = useDispatch<AppDispatch>();
    async function generateSummary() {
        if (docIds.length > 0) {
            setSummaryLoading(true)
            await createSummary(note?._id, docIds);
            setSummaryLoading(false)

        } else {
            showError("Please select a source");
        }

    }
    async function generateMindMap() {

        if (docIds.length > 0) {
            setMindMapLoading(true)
            await createMindMap(note?._id, docIds)
            setMindMapLoading(false)
            dispatch(fetchNoteSourceResult(note?._id))

        } else {
            showError("Please select a source");
        }

    }

    async function generateAudio() {
        if (docIds.length > 0) {
            try {
                setAudioLoading(true);


                await createBriefingDoc(note?._id, docIds, 'audio')
                dispatch(fetchNoteSourceResult(note?._id))

                setAudioLoading(false);

            } catch (error) {
                setAudioLoading(false);

            }
        } else {
            showError("Please select a source");
        }
    }

    return (<div className="mb-3">
        <div>
            <span style={{ fontSize: "4rem" }}>
                {note?.image}
            </span>

        </div>
        <div className="mb-4">
            <p className="text-3xl mb-2">{note?.title}</p>
            <p className="text-sm">{docIds?.length} sources</p>
            <p className="py-2 text-sm  bg-gray-10 text-gray-800 mb-4  ">
                {aiResult?.aiResult?.doc_overview}
            </p>
            <p>
                <Button
                    variant="outline"
                >
                    <Copy size={18} />

                </Button>
            </p>

        </div>

        <div className="flex gap-4 mb-6 justify-between">
            <div>
                <Button
                    disabled={summaryLoading}
                    onClick={generateSummary}
                    variant="outline"
                    className="rounded-3xl px-5 py-4 w-45 text-gray-500 "
                >

                    {summaryLoading ? (
                        <Loader2 className="animate-spin" size={18} />
                    ) : (
                        <NotebookTabs className="text-yellow-500" size={18} />
                    )}
                    <span className="text-sm">Summary</span>
                </Button>
            </div>
            <div>
                <Button
                    disabled={mindMapLoading}
                    onClick={generateMindMap}
                    variant="outline"
                    className="rounded-3xl px-5 py-4 w-45 text-gray-500 "
                >


                    {mindMapLoading ? (
                        <Loader2 className="animate-spin" size={18} />
                    ) : (
                        <GitBranch className="text-indigo-500" />

                    )}

                    <span className="text-sm">MindMap</span>
                </Button>
            </div>
            <div>
                <Button
                    disabled={audioLoading}
                    onClick={generateAudio}
                    variant="outline"
                    className="rounded-3xl px-5 py-4 w-45 text-gray-500 "
                >
                    {audioLoading ? (
                        <Loader2 className="animate-spin" size={18} />
                    ) : (

                        <Music2 size={18} className=" text-green-400" />


                    )}


                    <span className="text-sm">Audio Overview</span>
                </Button>
            </div>



        </div>

    </div>);
}





type Msg = { role: "ai" | "user"; content: string };

const  ChatMessage=memo(({ msg }: { msg: Msg }) =>{
    return (
        <div className={`flex ${msg?.role === "ai" ? "justify-start" : "justify-end"}`}>
            <div
                className={`
          max-w-[90%] px-4 text-sm
          ${msg.role === "ai"
                        ? "text-gray-800 py-2"
                        : "bg-indigo-100 text-gray-900 py-4 rounded-br-none shadow rounded-2xl"}
        `}
            >
                <div
                    className="
            break-words whitespace-pre-wrap
            overflow-x-hidden
            leading-normal
           
            [&_a]:underline [&_a]:text-blue-600
            [&_pre]:my-1 [&_pre]:p-1 [&_pre]:rounded [&_pre]:bg-gray-100 [&_pre]:overflow-x-auto [&_code]:font-mono
          "
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            a: ({ node, ...props }) => <a {...props} />,
                            ul: ({ node, ...props }) => (
                                <ul className="list-disc list-inside space-y-0" {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                                <ol {...props} />
                            ),
                            li: ({ node, ...props }) => (
                                <li style={{ marginBottom: '-16px' }} {...props} />
                            ),
                            p: ({ node, ...props }) => (
                                <p style={{ marginBottom: msg.role === "ai" ? '0px' : '' }} {...props} />
                            ),

                            h1: ({ node, ...props }) => <h1 style={{ marginBottom: '-20px' }} className="text-2xl  font-bold text-gray-800 my-" {...props} />,
                            h2: ({ node, ...props }) => <h2 style={{ marginBottom: '-20px' }} className="text-xl font-semibold text-gray-700 my-" {...props} />,
                            h3: ({ node, ...props }) => <h2 style={{ marginBottom: '-20px' }} className="text-xl font-semibold text-gray-700 my-" {...props} />,

                            strong: ({ node, ...props }) => <strong className="font-bold text-gray-700" {...props} />,

                        }}
                    >
                        {msg.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
})




export default MiddlePannel;
