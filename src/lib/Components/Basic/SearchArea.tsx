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
        className="mb-2 border shadow-sm rounded-2xl p-2 pl-5 w-full bg-gray-100 border-gray-200"
      />
    );
  }
);

SearchArea.displayName = "SearchArea";

export default SearchArea;
