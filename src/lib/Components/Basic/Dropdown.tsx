interface DropDownProps {
  options: string[];
  setSelection: (selection: string) => void;
}
const Dropdown = ({ setSelection, options }: DropDownProps) => {
  //   const options = ["React", "Next.js", "Laravel", "Express"];

  return (
    <div className="w-[150px] relative shadow-lg border border-gray-300 bg-white rounded-xl p-2">
      <div>
        {options?.map((opt, index) => (
          <div
            key={index}
            onClick={() => setSelection(opt.toLowerCase())}
            className="p-2 flex hover:bg-[#494949] hover:text-white rounded-xl text-black"
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
