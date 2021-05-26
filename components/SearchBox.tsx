import { useState } from "react";
import Search from "../public/svg/fontawesome/solid/search.svg";

export interface SearchBoxProps {
  placeholder?: string;
  onClick: (arg0: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder,
  onClick,
}) => {
  const [text, setText] = useState("");

  return (
    <div className="field is-grouped">
      <p className="control has-icons-left">
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          onChange={(e) => setText(e.target.value)}
        />
        <span className="icon is-left">
          <Search style={{ height: "40%" }} />
        </span>
      </p>
      <button
        className="button is-primary"
        onClick={() => {
          onClick(text);
        }}
      >
        Search
      </button>
    </div>
  );
};
