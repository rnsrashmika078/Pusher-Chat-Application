import React from "react";

interface SearchAreaProps extends React.InputHTMLAttributes<HTMLInputElement> {
  radius?: "xs" | "md" | "xl" | "full";
  placeholder?: string;
}

const SearchArea = React.forwardRef<HTMLInputElement, SearchAreaProps>(
  (props, ref) => {
    const { placeholder } = props;
    return (
      <input
        ref={ref}
        placeholder={placeholder}
        {...props}
        className="text-[var(--foreground)]  border shadow-sm rounded-2xl p-2 pl-5 w-full bg-[var(--background)] border-[#858383]"
      />
    );
  }
);

SearchArea.displayName = "SearchArea";

export default SearchArea;
