import { memo } from "react";
const Search = ({ onInput, label }) => {
  return (
    <div className="flex flex-col gap-3 w-fit items-center">
      <input
        autoFocus
        type="text"
        placeholder={label}
        className="px-5 py-2 text-lg text-center border-2 border-emerald-400 bg-transparent outline-none"
        onInput={onInput}
      />
    </div>
  );
};

export default memo(Search);
