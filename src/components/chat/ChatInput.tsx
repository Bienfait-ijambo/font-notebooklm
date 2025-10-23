import { memo } from "react";

type ChatInputProps = {
    inputValue: string;
    setInputValue: (val: string) => void;
    onKeyDownMessage: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const ChatInput = memo(({ inputValue, setInputValue, onKeyDownMessage }: ChatInputProps) => (
    <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onKeyDownMessage}
        placeholder="Start typing..."
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400 px-2 py-2"
        aria-label="Message input"
    />
));
