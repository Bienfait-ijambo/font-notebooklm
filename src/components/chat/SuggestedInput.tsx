"use client";

import { useEffect, useRef, useState } from "react";

export function SuggestedInput({
  questions,
  selectQuestion,
}: {
  questions: string[];
  selectQuestion: (question: string) => void;
}) {
  const chipsRef = useRef<HTMLDivElement | null>(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const el = chipsRef.current;
    if (!el) return;

    const check = () => {
      setShowArrows(el.scrollWidth > el.clientWidth + 4);
    };

    check();
    window.addEventListener("resize", check);

    const mo = new MutationObserver(check);
    mo.observe(el, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", check);
      mo.disconnect();
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    chipsRef.current?.scrollBy({
      left: dir * Math.max(200, chipsRef.current.clientWidth * 0.6),
      behavior: "smooth",
    });
  };

  return (
    <div className="relative px-4 py-2">
      {showArrows && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white shadow flex items-center justify-center"
        >
          <ArrowLeft />
        </button>
      )}

      <div
        ref={chipsRef}
        className="flex gap-2 overflow-x-auto scrollbar-none px-6"
      >
        {questions?.map((q, i) => (
          <button
            key={i}
            onClick={() => selectQuestion(q)}
            className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-200 transition"
          >
            {q}
          </button>
        ))}
      </div>

      {showArrows && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white shadow flex items-center justify-center"
        >
          <ArrowRight />
        </button>
      )}
    </div>
  );
}

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      d="M15 18l-6-6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
