import type { questionAndDocOverviewType } from "@/api/notes";
import { useEffect, useRef, useState } from "react";

export const SuggestedInput = ({aiResult,selectQuestion}:{aiResult:questionAndDocOverviewType,selectQuestion:(question:string)=>void}) => {
    const [message, setMessage] = useState("");
    // const [chips, setChips] = useState([
    //     "Serverless adoption?",
    //     "What are the key security risks and comprehensive best practices?",
    //     "Differences in cold starts?",
    //     "Concurrency patterns?",
    // ]);

    const chipsRef = useRef(null);
    const [showArrows, setShowArrows] = useState(false);

    // check if chips overflow horizontally
    useEffect(() => {
        const el = chipsRef.current as any;
        if (!el) return;
        const check = () => setShowArrows(el.scrollWidth > el.clientWidth + 2);
        check();
        window.addEventListener("resize", check);
        // also check when content changes (simple mutation observer)
        const mo = new MutationObserver(check);
        mo.observe(el, { childList: true, subtree: true });
        return () => {
            window.removeEventListener("resize", check);
            mo.disconnect();
        };
    }, []);

    const scrollChips = (dir = 1) => {
        // dir: 1 => right, -1 => left
        const el = chipsRef.current as any
        if (!el) return;
        const amount = Math.max(200, el.clientWidth * 0.6);
        el.scrollBy({ left: amount * dir, behavior: "smooth" });
    }



    const removeChip = (idx: string) => {
        // setChips((s) => s.filter((_, i) => i !== idx));
    };

    const send = () => {
        if (!message.trim()) return;
        console.log("Send message:", message);
        // setMessage("");
    };

    const onKeyDownMessage = (e: any) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };





    return (
        <div className="mt-3 relative">
            {/* left arrow */}
            {true && (
                <button
                    onClick={() => scrollChips(-1)}
                    aria-label="Scroll left"
                    className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center"
                >
                    <ArrowLeft size={18} />
                </button>
            )}

            {/* horizontal scroll container */}
            <div
                ref={chipsRef}
                className="flex gap-2 overflow-x-auto px-2 py-1 scrollbar-thin scrollbar-thumb-gray-300"
                // small style so it doesn't wrap and stays inline
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                {aiResult?.aiResult?.questions.map((c, i) => (
                    <div
                        key={i}
                        onClick={()=>selectQuestion(c)}
                        className="inline-flex items-center gap-2 whitespace-nowrap bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                        <button
                            onClick={() => {
                                // use chip as quick fill into input
                                setMessage((m) => (m ? `${m} ${c}` : c));
                            }}
                            className="text-sm text-gray-700 pr-1"
                        >
                            {c}
                        </button>

                        <button
                            onClick={() => removeChip(i)}
                            aria-label={`Remove ${c}`}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* right arrow */}
            {showArrows && (
                <button
                    onClick={() => scrollChips(1)}
                    aria-hidden={false}
                    aria-label="Scroll right"
                    className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center"
                >
                    <ArrowRight size={18} />
                </button>
            )}
        </div>

    );
}
const ArrowLeft = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowRight = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SendIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 2l-7 20 2-7 7-13z" fill="white" opacity="0.15" />
    </svg>
);
