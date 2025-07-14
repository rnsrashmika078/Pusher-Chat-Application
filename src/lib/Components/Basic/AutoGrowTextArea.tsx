import { useEffect, useRef } from "react";

const AutoGrowTextarea = ({ value = "", ...props }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    // Adjust after render frame
    requestAnimationFrame(adjustHeight);

    // Adjust on resize (for responsiveness)
    const observer = new ResizeObserver(adjustHeight);
    // @ts-ignore
    observer.observe(textRef?.current);

    return () => observer.disconnect();
  }, [value]);

  return (
    <textarea
      ref={textRef}
      value={value}
      {...props}
      className="w-full text-base sm:text-lg md:text-xl text-gray-700 border-none focus:outline-none focus:ring-0 resize-none overflow-hidden"
    />
  );
};

export default AutoGrowTextarea;
