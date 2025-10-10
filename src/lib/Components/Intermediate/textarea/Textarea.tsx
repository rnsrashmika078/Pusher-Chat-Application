"use client";
import { useRef, useState, useEffect } from "react";
import Button from "../../Basic/Button";
import { IoSend } from "react-icons/io5";

interface TextareaProps {
  className?: string;
  sendMessage: (message: string) => void;
}

const Textarea = ({ className, sendMessage }: TextareaProps) => {
  const [typedMessage, setLocalTypedMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 80;
      textareaRef.current.style.height =
        Math.min(scrollHeight, maxHeight) + "px";
      textareaRef.current.style.overflowY =
        scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [typedMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLocalTypedMessage(value);
  };

  return (
    <div className="flex w-full">
      <textarea
        ref={textareaRef}
        value={typedMessage}
        rows={1}
        placeholder="Enter Message here..."
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(typedMessage);
            setLocalTypedMessage("");
          }
        }}
        className={`${className} resize-none custom-scrollbar bg-transparent w-full text-white placeholder:text-[#b3b1b1] px-10 py-3 pr-12 rounded-2xl focus:outline-none`}
      />
      <div className="flex items-end">
        <Button
          radius="full"
          className="rounded-full bg-purple-500 text-white px-4 py-2"
          onClick={() => {
            if (!typedMessage.trim()) return;
            sendMessage(typedMessage);
            setLocalTypedMessage("");
          }}
        >
          <IoSend size={25} />
        </Button>
      </div>
    </div>
  );
};

export default Textarea;
